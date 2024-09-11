<script lang="ts">
	let errorDialog: HTMLDialogElement;
	let dialog: HTMLDialogElement;
	let formData = {
		expertField: '',
		conceptToExplain: '',
		targetRole: ''
	};
	let dialogAnalogy = {
		id: 0,
		expertField: '',
		conceptToExplain: '',
		targetRole: '',
		analogy: ''
	};
	let dialogAnalogyLoading = false;

	const fetchAnalogy = async (event: SubmitEvent) => {
		if (dialogAnalogyLoading) return;

		try {
			dialogAnalogyLoading = true;

			const url = new URL('/api/v1/analogy', window.location.origin);
			url.searchParams.set('expertField', formData.expertField);
			url.searchParams.set('conceptToExplain', formData.conceptToExplain);
			url.searchParams.set('targetRole', formData.targetRole);

			const response = await fetch(url.toString());

			if (response.status !== 201) throw new Error(await response.text());

			const body: {
				data: {
					id: number;
					expertField: string;
					conceptToExplain: string;
					targetRole: string;
					analogy: string;
				};
			} = await response.json();

			dialogAnalogy = body.data;
			dialog.showModal();
		} catch (error) {
			console.error(error);
			errorDialog.showModal();
		} finally {
			dialogAnalogyLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Analogy.cloud | AI-Powered Analogy Generator</title>
	<meta
		name="description"
		content="Generate AI-powered analogies to explain something to someone."
	/>
	<link rel="canonical" href="https://analogy.cloud" />

	<!-- Open Graph tags for social media sharing -->
	<meta property="og:title" content="Analogy - AI-Powered Analogy Generator" />
	<meta
		property="og:description"
		content="Generate AI-powered analogies to explain something to someone."
	/>
	<meta property="og:url" content="https://analogy.cloud" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Analogy - AI-Powered Analogy Generator" />
	<meta
		name="twitter:description"
		content="Generate AI-powered analogies to explain something to someone."
	/>

	<!-- Structured Data for Rich Snippets -->
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "AI-Generated Analogies Archive",
			"description": "A comprehensive collection of AI-generated analogies.",
			"url": "https://analogy.cloud/analogies"
		}
	</script>
</svelte:head>

<section>
	<div class="hero bg-base-200 min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold break-all">Analogy.cloud</h1>
				<p class="pt-6">
					Generate AI-powered analogies to explain something to someone.<br />Want to see the 1000+
					analogies others got before you? Go check the
					<a href="/analogies" class="text-blue-500">history</a> page!
				</p>
				<form class="pt-6 flex flex-col" on:submit|preventDefault={fetchAnalogy}>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">What field does this analogy relate to?</span>
						</div>
						<input
							type="text"
							placeholder="Software Engineering"
							class="input input-bordered w-full"
							name="expertField"
							required
							bind:value={formData.expertField}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">What are you trying to explain?</span>
						</div>
						<input
							type="text"
							placeholder="What does web application test automation entail?"
							class="input input-bordered w-full"
							name="conceptToExplain"
							required
							bind:value={formData.conceptToExplain}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Who is the analogy for?</span>
						</div>
						<input
							type="text"
							placeholder="My wife"
							class="input input-bordered w-full"
							name="targetRole"
							required
							bind:value={formData.targetRole}
						/>
					</label>
					<button
						class="btn btn-primary text-neutral-100 px-12 mt-4 plausible-event-name=Analogy+Generations"
						type="submit"
					>
						{#if dialogAnalogyLoading}
							<span class="loading loading-spinner loading-md"></span>
						{:else}
							Generate Analogy!
						{/if}
					</button>
				</form>
				<p class="font-mono pt-24">
					Try out the API at <a href="/api/v1/analogy" class="text-blue-500">/api/v1/analogy</a>
				</p>
			</div>
		</div>
	</div>
</section>

<dialog class="modal" bind:this={errorDialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Oops, an error occurred!</h3>
		<p class="py-4">An error occurred whilst generating an analogy. Please, try again.</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Analogy #{dialogAnalogy.id}</h3>
		<p class="pt-4"><span class="font-bold">I'm an expert in:</span> {dialogAnalogy.expertField}</p>
		<p><span class="font-bold">And I want to explain:</span> {dialogAnalogy.conceptToExplain}</p>
		<p><span class="font-bold">To:</span> {dialogAnalogy.targetRole}</p>
		<p class="pb-4">{dialogAnalogy.analogy}</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
