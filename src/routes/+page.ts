import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=50&offset=0");
    const pokedata = await response.json();
    const pokespeciesList = await pokedata.results;
    const nextPokeurl = await pokedata.next;
    return { pokespeciesList, nextPokeurl };
}) satisfies PageLoad;