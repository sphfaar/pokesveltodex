<script lang="ts">
	import type { PageData } from './$types';
	import Poketypes from '../../Poketypes.svelte';
	import Pokestats from './Pokestats.svelte';
	import missingNo from '$lib/images/missingno.webp';
	import pokeball from '$lib/images/pokeball.svg';

	export let data: PageData;

	function getFlavorText() {
		for (let i = 0; i < data.poke.specie.flavor_text_entries.length; i++) {
			if (data.poke.specie.flavor_text_entries[i].language.name === 'en')
				return data.poke.specie.flavor_text_entries[i].flavor_text;
		}
	}
</script>

<svelte:head>
	<title>{data.poke.mon.name}</title>
	<link rel="icon" type="image/x-icon" href={data.poke.mon.sprites.front_default} />
</svelte:head>

<div class="container m-auto">
	{#if data.poke.mon}
		<div class="flex flex-row justify-between items-center gap-12 m-8">
			<p class="text-gray-500">#{data.poke.mon.id}</p>
			<h1 class="capitalize">{data.poke.mon.name}</h1>
		</div>
		<div class="flex flex-row">
			<img
				width={32}
				height={32}
				class="w-32 h-32 border-2 border-red-600"
				src={data.poke.mon.sprites.front_default
					? data.poke.mon.sprites.other['official-artwork'].front_default
					: missingNo}
				alt="pokemon front img"
			/>
			<div class="flex-1 flex flex-col gap-2 ps-2 text-center align-middle uppercase">
				<Poketypes pkntypes={data.poke.mon.types} />
			</div>
		</div>
	{:else}
		<img height={32} width={32} class="w-32 h-32 border-2 border-red-600" src={pokeball} alt="pokeloading" />
	{/if}
	{#if data.poke.specie.flavor_text_entries}
		<p class="my-4">{getFlavorText()}</p>
		<div>
			<h3 class="mt-8 mb-4 text-xl font-bold">Base stats</h3>
			<Pokestats stats={data.poke.mon.stats} />
		</div>
	{:else}
		<p>Loading stats...</p>
	{/if}
</div>
