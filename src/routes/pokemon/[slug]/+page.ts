import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
    const poke: {[index: string]: any} = {
		mon: {},
		specie: {},
	};
    poke.mon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`).then( res => res.json() );
    poke.specie = await fetch(poke.mon.species.url).then( res => res.json() );
    return { poke };
}) satisfies PageLoad;