import { type AiTextGenerationOutput, type RoleScopedChatInput } from '@cloudflare/workers-types';
import type { RequestHandler } from './$types';
import { analogiesTable } from '$lib/server/db/schema';

type AiTextGenerationOutputObject = {
	response?: string;
	tool_calls?: {
		name: string;
		arguments: unknown;
	}[];
};

const isAiTextGenerationOutputObject = (
	obj: AiTextGenerationOutput
): obj is AiTextGenerationOutputObject => {
	if (obj instanceof ReadableStream) return false;
	return true;
};

export const GET: RequestHandler = async ({ platform, url, locals: { db } }) => {
	if (!platform) return Response.json({ error: 'Platform is missing.' }, { status: 500 });

	const expertField = url.searchParams.get('expertField');
	const conceptToExplain = url.searchParams.get('conceptToExplain');
	const targetRole = url.searchParams.get('targetRole');

	if (!expertField) {
		return Response.json({ error: 'expertField is required.' }, { status: 400 });
	}

	if (!conceptToExplain) {
		return Response.json({ error: 'conceptToExplain is required.' }, { status: 400 });
	}

	if (!targetRole) {
		return Response.json({ error: 'targetRole is required.' }, { status: 400 });
	}

	const messages: RoleScopedChatInput[] = [
		{
			role: 'user',
			content: `You are tasked with creating an analogy to explain a concept from one field of expertise to someone in a different role within that field. Your goal is to make the explanation relatable and understandable using the target role\'s perspective.\n\nYou will be given the following inputs:\n<expert_field>\n${expertField}\n</expert_field>\n\n<concept_to_explain>\n${conceptToExplain}\n</concept_to_explain>\n\n<target_role>\n${targetRole}\n</target_role>\n\nUsing these inputs, create an analogy that explains the concept_to_explain in terms that would be familiar and relatable to someone in the target_role, while drawing from the context of the expert_field.\n\nYour response should be in JSON format with the following structure:\n{\n  "analogy": "Your analogy goes here"\n}\n\nMake sure your analogy is clear, concise, and directly related to the target role\'s experiences or knowledge within the expert field.\n\nRemember to output only valid JSON. Do not include any text outside of the JSON structure.`
		}
	];

	const modelResponse = await platform.env.AI.run('@cf/meta/llama-3-8b-instruct', {
		messages
	});

	if (!modelResponse) {
		return Response.json({ error: 'AI model returned empty response.' }, { status: 500 });
	}
	if (!isAiTextGenerationOutputObject(modelResponse))
		return Response.json(
			{ error: 'AI model returned stream instead of string response.' },
			{ status: 500 }
		);
	if (!modelResponse.response) {
		return Response.json({ error: 'AI model returned empty response.' }, { status: 500 });
	}

	try {
		const { analogy } = JSON.parse(modelResponse.response);

		const analogyRow = await db
			.insert(analogiesTable)
			.values({
				expertField,
				conceptToExplain,
				targetRole,
				analogy
			})
			.returning({ id: analogiesTable.id });

		return Response.json(
			{
				data: {
					id: analogyRow[0].id,
					expertField,
					conceptToExplain,
					targetRole,
					analogy
				},
				_links: {
					base: url.origin,
					self: url.href
				}
			},
			{ status: 201 }
		);
	} catch (error) {
		return Response.json(
			{ error: 'AI model returned invalid response. Please try again.' },
			{ status: 500 }
		);
	}
};
