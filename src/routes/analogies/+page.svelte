<script lang="ts">
	import { page } from '$app/stores';
	import AnalogyCard from '$lib/components/AnalogyCard.svelte';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

	let errorDialog: HTMLDialogElement;
	let moreResultsLoading = false;
	const analogies = writable<
		{
			id: number;
			expertField: string;
			conceptToExplain: string;
			targetRole: string;
			analogy: string;
		}[]
	>([]);
	let moreAnalogiesAvailable = true;

	let observerTarget: HTMLDivElement;

	const fetchAnalogies = async () => {
		if (moreResultsLoading) return;

		let cursor = undefined;
		if ($analogies.length > 0) cursor = $analogies[$analogies.length - 1].id;

		try {
			moreResultsLoading = true;
			const url = new URL($page.url);
			url.pathname = '/api/v1/analogies';
			url.searchParams.set('limit', '25');
			if (cursor) url.searchParams.set('cursor', cursor.toString());

			const response = await fetch(url.pathname + url.search);

			if (response.status !== 200) throw new Error(await response.text());

			const body: {
				data: {
					id: number;
					expertField: string;
					conceptToExplain: string;
					targetRole: string;
					analogy: string;
				}[];
				size: number;
				limit: number;
			} = await response.json();

			if (body.size !== body.limit) moreAnalogiesAvailable = false;

			analogies.update((value) => {
				return [...value, ...body.data];
			});
		} catch (error) {
			console.error(error);
			errorDialog.showModal();
		} finally {
			moreResultsLoading = false;
		}
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			async (entries) => {
				const first = entries[0];
				if (first.isIntersecting) {
					fetchAnalogies();
				}
			},
			{
				root: null, // Use the viewport as the root
				rootMargin: '0px',
				threshold: 1.0
			}
		);

		if (observerTarget) {
			observer.observe(observerTarget);
		}

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	});
</script>

<svelte:head>
	<title>Analogy.cloud | AI-Generated Analogies Archive</title>
	<meta
		name="description"
		content="Explore our extensive archive of AI-generated analogies. Find the perfect analogy, backed by artificial intelligence!"
	/>
	<link rel="canonical" href="https://analogy.cloud/analogies" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="Analogy.cloud | AI-Generated Analogies Archive" />
	<meta
		property="og:description"
		content="Dive into our treasure trove of AI-generated analogies. Find the perfect analogy, backed by artificial intelligence!"
	/>
	<meta property="og:url" content="https://analogy.cloud/analogies" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Analogy.cloud | AI-Generated Analogies Archive" />
	<meta
		name="twitter:description"
		content="Dive into our treasure trove of AI-generated analogies. Find the perfect analogy, backed by artificial intelligence!"
	/>

	<!-- Structured Data for Rich Snippets -->
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "AI-Generated Analogies Archive",
			"description": "Explore our extensive archive of AI-generated analogies. Find the perfect analogy, backed by artificial intelligence!",
			"url": "https://analogy.cloud/analogies"
		}
	</script>
</svelte:head>

<section>
	<div class="hero bg-base-200 py-32">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Previously Created Analogies</h1>
				<p class="pt-6">See the great analogies that others have created before you!</p>
			</div>
		</div>
	</div>
	<div class="p-4 bg-base-200">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{#each $analogies as analogy}
				<AnalogyCard {analogy} link />
			{/each}
		</div>

		<div bind:this={observerTarget} class="h-1"></div>

		<div class="flex justify-center pt-12 pb-8">
			{#if moreAnalogiesAvailable}
				<button
					class="btn btn-primary text-neutral-100 px-12 plausible-event-name=More+Analogies+Clicks"
					on:click={() => fetchAnalogies()}
				>
					{#if moreResultsLoading}
						<span class="loading loading-spinner loading-md"></span>
					{:else}
						Get More Analogies!
					{/if}
				</button>
			{:else}
				<p class="text-center">You've reached the end! Come back soon for more!</p>
			{/if}
		</div>
	</div>
</section>

<dialog class="modal" bind:this={errorDialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Oops, an error occurred!</h3>
		<p class="py-4">An error occurred whilst getting the analogies. Please, try again later.</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
