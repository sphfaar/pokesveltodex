<script lang="ts">
	import Pokecard from './Pokecard.svelte';

	export let pokespeciesList: {name: string, url: string}[];
</script>

<ul class="grid grid-cols-pokegrid gap-2 p-6">
	{#each pokespeciesList as pokemon (pokemon.name)}
		<Pokecard name={pokemon.name} url={pokemon.url}/>
	{/each}
</ul>
