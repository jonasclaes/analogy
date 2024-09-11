import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const analogyResponse = await fetch(`/api/v1/analogies/${params.id}`);

	if (analogyResponse.status !== 200) {
		const analogyError: { error: { message: string } } = await analogyResponse.json();

		return error(analogyResponse.status, analogyError.error.message);
	}

	const analogy: {
		data: {
			id: number;
			expertField: string;
			conceptToExplain: string;
			targetRole: string;
			analogy: string;
		};
	} = await analogyResponse.json();

	return { analogy: analogy.data };
}) satisfies PageServerLoad;
