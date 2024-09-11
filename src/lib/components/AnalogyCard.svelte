<script lang="ts">
	export let analogy: {
		id: number;
		expertField: string;
		conceptToExplain: string;
		targetRole: string;
		analogy: string;
	};
	export let link = false;
</script>

{#if link}
	<a
		href="/analogies/{analogy.id}"
		class="card bg-base-100 shadow-xl text-wrap hover:scale-105 transition-all duration-300"
	>
		<div class="card-body">
			<h2 class="card-title">
				<span class="opacity-30 font-mono">#{analogy.id}</span>
			</h2>
			<p><span class="font-bold">I'm an expert in:</span> {analogy.expertField}</p>
			<p><span class="font-bold">And I want to explain:</span> {analogy.conceptToExplain}</p>
			<p><span class="font-bold">To:</span> {analogy.targetRole}</p>
			<p>{analogy.analogy}</p>
		</div>
	</a>
{:else}
	<div class="card bg-base-100 shadow-xl text-wrap">
		<div class="card-body">
			<h2 class="card-title">
				<span class="opacity-30 font-mono">#{analogy.id}</span>
			</h2>
			<p><span class="font-bold">I'm an expert in:</span> {analogy.expertField}</p>
			<p><span class="font-bold">And I want to explain:</span> {analogy.conceptToExplain}</p>
			<p><span class="font-bold">To:</span> {analogy.targetRole}</p>
			<p>{analogy.analogy}</p>
		</div>
	</div>
{/if}
