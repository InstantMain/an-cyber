<script lang="ts">
    import Home from "$lib/pages/Home.svelte";
    import About from "$lib/pages/About.svelte";

    let page = "home";
    let shouldAnimate = true;
</script>

<main>
    {#if page == "home"}
        <Home bind:page bind:shouldAnimate/>
    {:else if page == "about"}
        <About bind:page/>
    {/if}
</main>

<style lang="scss">
    main {
        position: fixed;
        margin: 0;
        padding: 0;
        inset: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
</style>