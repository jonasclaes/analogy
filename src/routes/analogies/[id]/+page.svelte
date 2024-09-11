<script lang="ts">
	import AnalogyCard from '$lib/components/AnalogyCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Analogy.cloud | Analogy #{data.analogy.id}</title>
	<meta name="description" content={data.analogy.analogy} />
	<link rel="canonical" href="https://analogy.cloud/analogies/{data.analogy.id}" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="Analogy.cloud | Analogy #{data.analogy.id}" />
	<meta property="og:description" content={data.analogy.analogy} />
	<meta property="og:url" content="https://analogy.cloud/analogies/{data.analogy.id}" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Analogy.cloud | Analogy #{data.analogy.id}" />
	<meta name="twitter:description" content={data.analogy.analogy} />
</svelte:head>

<section class="min-h-screen bg-base-200 flex flex-col justify-center items-center">
	<div class="p-4 max-w-xxl">
		<AnalogyCard analogy={data.analogy} />
	</div>
</section>
