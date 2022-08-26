<script>
    // SvelteKit Imports
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    // CSS Imports
    import "$lib/css/theme-colors.css";
    import "$lib/css/global.css";

    // Component Imports
    import TitleBar from "$lib/components/title-bar.svelte";
    import SideBar from "$lib/components/sidebar.svelte";
    
    let isMax;

    onMount(async () => {
        isMax = await mainWindow.getState();
    });

    const windowResize = async () => {
        isMax = await mainWindow.getState();
    };
</script>

<svelte:head>
    <title>{$page.data.title} - Electron SvelteKit Template</title>
</svelte:head>

<svelte:window on:resize={windowResize} />

<TitleBar title={`${$page.data.title} - Electron SvelteKit Template`} {isMax}/>
<main>
    <SideBar />
    <div id="page">
        <slot />
    </div>
</main>