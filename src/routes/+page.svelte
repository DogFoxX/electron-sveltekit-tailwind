<script>
    // SvelteKit Imports
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    const carouselImages = [
        {
            src: "/images/svelte.svg",
            description: "Built using SvelteKit 👌"
        },
        {
            src: "/images/tailwind.svg",
            description: "Easy styling with Tailwind 😍"
        },
        {
            src: "/images/electron.svg",
            description: "Wrapped in Electron 🤖"
        }
    ];

    let i = 0;

    onMount(() => {
        setInterval(() => {
            i = (i + 1) % carouselImages.length
        }, 5000);
    })
</script>

<h1 class="text-6xl font-semibold uppercase">Introducing</h1>
<h2 class="my-6 text-4xl uppercase">Electron + SvelteKit + Tailwind</h2>
<div id="hero" class="p-6">
    <span class="hero-img">
        {#each [carouselImages[i]] as {src} (i)}
            <img in:fly={{y: -100, duration: 800}} out:fly|local={{y: 150, duration: 800}} {src} alt="" />
        {/each}
    </span>
    <span class="hero-title">
        {#each [carouselImages[i]] as {description} (i)}
            <span in:fly={{x: -300, duration: 800}} out:fly|local={{x: 300, duration: 800}} class="text-3xl">{description}</span>
        {/each}
    </span>
</div>