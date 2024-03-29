<script lang="ts">
	import { onMount } from 'svelte';
	import Poketypes from './Poketypes.svelte';
	import TypeEffects from './TypeEffects.svelte';
	import { PokeRecursion } from './pokeRecursion';
	import missingNo from '$lib/images/missingno.webp';
    import pokeball from '$lib/images/pokeball.svg';

	export let name: string;
	export let url: string;
	const pokemonColors: { [index: string]: string } = {
		white: 'border-gray-50',
		black: 'border-black',
		blue: 'border-blue-500',
		brown: 'border-amber-500',
		gray: 'border-gray-500',
		green: 'border-green-500',
		pink: 'border-pink-500',
		purple: 'border-purple-500',
		red: 'border-red-500',
		yellow: 'border-yellow-300'
	};
	const pokemonBorder: { [index: string]: string[] } = {
		inner_top: [
			'rounded-tr-full rounded-tl-full border-b-transparent', // alone
			'rounded-tl-full border-b-transparent', // first
			'border-b-transparent', // middle
			'rounded-tr-full border-b-transparent' // last
		],
		inner_bottom: [
			'rounded-br-full rounded-bl-full border-t-transparent', // alone
			'rounded-bl-full border-t-transparent', // first
			'border-t-transparent', // middle
			'rounded-br-full border-t-transparent' // last
		],
		outer: [
			'border-2 rounded-full mx-4', // alone
			'border-l-2 border-y-2 border rounded-l-full rounded-y-full ms-4', // first
			'border-y-2 border', // middle
			'border-y-2 border-r-2 border rounded-r-full rounded-y-full me-4' // last
		]
	};

	let pokemon: {
		name: string;
		id: number;
		color: string;
		sprite: string;
		types: any[];
		evolution_rank: number; // 0 = no evolutions / evolutions not aligned with IDs, 1 = first, 2 = middle, 3 = last
	};

	let loading = true;

	async function fetchPokecardData(name: string, url: string) {
		loading = true;
		const specieData = await fetch(url).then((res) => res.json());
		const [pokeFormRes, evoChainRes] = await Promise.all([
			fetch(`https://pokeapi.co/api/v2/pokemon-form/${specieData.id}`),
			fetch(specieData.evolution_chain.url)
		]);
		const [pokeFormData, evoChainData] = [await pokeFormRes.json(), await evoChainRes.json()];
		const isFirst: boolean = specieData.evolves_from_species ? false : true;
		const pokeEvolutionRank: number = new PokeRecursion(name, evoChainData.chain, isFirst).evoRank;

		pokemon = {
			name,
			id: specieData.id,
			color: specieData.color.name,
			sprite: pokeFormData.sprites.front_default,
			types: pokeFormData.types,
			evolution_rank: pokeEvolutionRank
		};
		loading = false;
	}

	onMount(() => fetchPokecardData(name, url));
</script>

{#if loading}
	<a
		class="relative flex-1 pt-8 pb-12 my-3 overflow-hidden text-center border border-solid {pokemonBorder
			.outer[2]} {pokemonColors[0]}"
		href="pokemon/{name}"
	>
		<p class="font-thin text-gray-400 italic capitalize">{name}</p>
		<img
			width={16}
			height={16}
			class="animate-spin-fast w-16 h-16 fit-contain m-auto"
			loading="lazy"
			src={pokeball}
			alt=""
		>
		<div
			class="absolute top-[1.25rem] left-[1.25rem] right-[1.25rem] bottom-[52%] m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_top[2]} {pokemonColors[0]}"
		/>
		<div
			class="absolute top-[52%] left-20 right-20 bottom-20 m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[2]} {pokemonColors[0]}"
		/>
		<div
			class="absolute top-[52%] left-[3.75rem] right-[3.75rem] bottom-[3.75rem] m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[2]} {pokemonColors[0]}"
		/>
		<div
			class="absolute top-[52%] left-10 right-10 bottom-10 m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[2]} {pokemonColors[0]}"
		/>
		<div
			class="absolute top-[52%] left-[1.25rem] right-[1.25rem] bottom-[1.25rem] m-auto z-[-10] opacity-10 border {pokemonBorder
				.inner_bottom[2]} {pokemonColors[0]}"
		/>
	</a>
	{:else}
	<a
		on:enterViewport={()=> console.log("aFON")}
		href="pokemon/{pokemon.name}"
		class="relative flex-1 pt-2 pb-8 my-3 overflow-hidden text-center border border-solid {pokemonBorder
			.outer[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
	>
		<p class="text-gray-500"><span class="text-sm">#</span>{pokemon.id}</p>
		<p class="font-semibold capitalize">{pokemon.name}</p>
		<img class="h-16 fit-contain m-auto" src={pokemon.sprite ? pokemon.sprite : missingNo} alt="pokemon sprite" loading="lazy" />
		<div class="flex flex-row border-0 max-w-[148px] m-auto rounded-full overflow-hidden text-xs">
			<Poketypes pkntypes={pokemon.types} />
		</div>
		<div
			class="absolute top-[1.25rem] left-[1.25rem] right-[1.25rem] bottom-[52%] m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_top[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
		/>
		<div
			class="absolute top-[52%] left-20 right-20 bottom-20 m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
		/>
		<div
			class="absolute top-[52%] left-[3.75rem] right-[3.75rem] bottom-[3.75rem] m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
		/>
		<div
			class="absolute top-[52%] left-10 right-10 bottom-10 m-auto z-[-3] opacity-10 border {pokemonBorder
				.inner_bottom[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
		/>
		<div
			class="absolute top-[52%] left-[1.25rem] right-[1.25rem] bottom-[1.25rem] m-auto z-[-10] opacity-10 border {pokemonBorder
				.inner_bottom[pokemon.evolution_rank]} {pokemonColors[pokemon.color]}"
		/>
		<div class="absolute w-full h-full bottom-0 z-[-2] opacity-10 blur-sm">
			<TypeEffects poketype={pokemon.types[pokemon.types.length - 1].type.name} pokerank={pokemon.evolution_rank}/>
		</div>
	</a>
{/if}
