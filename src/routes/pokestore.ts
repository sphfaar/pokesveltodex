import { writable } from 'svelte/store';

export const pokeData = writable({
        pokespeciesList: <any>[],
        nextUrl: "https://pokeapi.co/api/v2/pokemon-species?limit=50&offset=0",
        loading: false,
    });

    let newPokespeciesList: any[] =[];
    let nextUrl = "https://pokeapi.co/api/v2/pokemon-species?limit=50&offset=0";
    let loading = false;

export async function fetchPokemons() {
    loading = true;
    const response = await fetch(nextUrl);
    const data = await response.json();
    loading = false;
    newPokespeciesList = data.results;
    nextUrl = data.next;
    //pokeData.set({pokespeciesList, nextUrl, loading});
    console.log(newPokespeciesList);
    
    pokeData.update((currentValue) => ({
        ...currentValue,
        pokespeciesList: [...currentValue.pokespeciesList, ...newPokespeciesList],
    }));
}