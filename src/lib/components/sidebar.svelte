<script>
	// SvelteKit Imports
    import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";

	// Set Theme Modes
	let themeModes = [
		"light",
		"dark",
		"system"
	];

	// Global Vars
	let cond = true;

	// Get index of current theme mode
	// Read from electron-store
	let i = themeModes.indexOf(theme.get());

	// Theme mode change handlers
	const prev = () => {
		cond = false;

		// Loop backward through themeModes		
		setTimeout(() => {
			i = (i != 0 ? i - 1 : 2) % themeModes.length;
		}, 10);
	}

	const next = () => {
		cond = true;

		// Loop forward through themeModes
		setTimeout(() => {
			i = (i + 1) % themeModes.length;
		}, 10);
	}

	// Subscribe to theme mode index change and set theme
	// Saves theme mode with electron-store
	$: theme.set(themeModes[i]);
</script>

<div id="sidebar">
	<div class="sidebar-content">
		<header>
			<span class="text-xl">Page Routing</span>
		</header>
		<a class="my-1 link-btn" href="/page1">Page 1</a>
		<a class="my-1 link-btn" href="/page2">Page 2</a>
		<a class="my-1 link-btn" href="/page3">Page 3</a>
	</div>
	<div class="my-4 sidebar-content">
		<header>
			<span class="text-xl">Theme</span>
		</header>
		<div class="carousel">
			<button on:click={prev} class="fa-solid fa-chevron-left" />
			<div class="carousel-item">
				{#each [themeModes[i]] as themeMode (i)}
					<span in:fly={{x: cond ? -80 : 80, duration: 500, easing: backOut}} out:fly={{x: cond ? 80 : -80, duration: 500, easing: backOut}} class="capitalize">{themeMode}</span>
				{/each}
			</div>
			<button on:click={next} class="fa-solid fa-chevron-right" />
		</div>
	</div> 
</div>