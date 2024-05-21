<script lang="ts">
    import Home from "$lib/pages/Home.svelte";
    import About from "$lib/pages/About.svelte";

    import { page } from "$lib/stores/page";

    let shouldAnimate = true;
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
</svelte:head>

<main>
    {#if $page == "home"}
        <Home bind:shouldAnimate />
    {:else if $page == "about"}
        <About />
    {/if}
</main>

<style lang="scss">
    main {
        position: absolute;
        margin: 0;
        padding: 0;
        inset: 0;
        width: 100%;
        min-height: 100svh;
        overflow-x: clip;
        overflow-y: auto;
    }
</style>