<script lang="ts">
	import { pokeVfxs } from '$lib/types_videos';
	import { onMount } from 'svelte';

	import viewport from './useViewportAction';

	export let poketype: string;
	export let pokerank: number;

	async function handlePlay(e: any) {
		if(e.target.childElementCount > 1){
			if(e.target.paused){
				try {
					await e.target.play();
				} catch (err) {
					console.error("Video not played", err);
				}
			}
		}
	}

	async function handlePause(e: any) {
		if(e.target.childElementCount > 1){
			if(!e.target.paused){
				try {
					await e.target.pause();
				} catch (err) {
					console.error("Video not paused", err);
				}
			}
		}
	}

	let pokeVfxSrc: string = "";

	function handleSrcVfx(vfx: string){
		const pokeVfxKeys: string[] = [];
		for (let key in pokeVfxs) {
			if (key.startsWith(vfx)) {
				pokeVfxKeys.push(key);
			}
		}
		if(pokeVfxKeys.length > 1 && pokerank > 1){
			return pokeVfxs[pokeVfxKeys[Math.ceil(Math.random() * (pokeVfxKeys.length - 1))]];
		}
		return pokeVfxs[pokeVfxKeys[0]];
	}
	onMount(()=>{
		pokeVfxSrc = handleSrcVfx(poketype);
	})
</script>

<video
	use:viewport
	on:enterViewport={handlePlay}
	on:exitViewport={handlePause}
	loop={true}
	muted={true}
	preload="none"
	playsinline={true}
	disablepictureinpicture={true}
	class="w-full h-full object-cover"
>
	<source src={pokeVfxSrc} type="video/webm" />
	<track kind="captions" />
</video>
