<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';

    import CommandLine from "$lib/components/CommandLine.svelte";
	import { banners } from "$lib/assets/banners.svelte";

    export let page: string;
    export let shouldAnimate: boolean;

    let isMounted = false;
    let hasStartedTyping = false;
    let hasTypedWhoAmI = false;
    let hasTypedLs = false;

    onMount(() => {
        isMounted = true;
    })
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<section id="home" transition:slide={{ duration: 250, easing: quadOut, axis: "x" }}>
    <div class="terminal">
        <div class="header">
            <p>root@an-cyber.pages.dev: ~</p>
        </div>
        <div class="body">
            {#if isMounted}
                <CommandLine text="whoami" animated={shouldAnimate} bind:completed={hasTypedWhoAmI}/>
            {/if}
            {#if hasTypedWhoAmI}
                {#each banners as banner}
                    <pre>{banner}</pre>
                {/each}
                <CommandLine text="tree" animated={shouldAnimate} bind:completed={hasTypedLs}/>
            {/if}
            {#if hasTypedLs}
                <a
                    on:click|preventDefault={() => {page = "about"; shouldAnimate = false}}
                    href="/src/pages/About.svelte#about"
                >├── about</a>
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

    #home {
        @extend %container;
        z-index: 1;
        background: {
            image: linear-gradient(to top right, #83123d, #cb4015);
            size: cover;
        }
    }

    .terminal {
        @extend %container;
        position: relative;
        width: 90%;
        height: 80%;
        place-content: start;
        flex-wrap: wrap;

        p, button {
            position: relative;
            font: {
                family: "Ubuntu Mono";
                weight: 700;
            }
        }
    }

    .header {
        @extend %container;
        position: relative;
        width: 100%;
        height: 10%;
        z-index: 1;
        border-radius: 10px 10px 0px 0px;
        background-color: #4b4841;

        p {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 1rem;
            color: #FFFFFF;
        }
    }

    .body {
        @extend %container;
        position: relative;
        flex-direction: column;
        width: 100%;
        height: 90%;
        place-content: start;
        align-items: start;
        overflow: auto;
        background-color: #2f0922;

        pre {
            margin: 0.3rem 0.7rem;
            text-overflow: nowrap;
            color: #FFFFFF;
            font: {
                weight: 400;
                size: 0.3rem;
            }
        }

        a {
            text-align: left;
            top: 0.3rem;
            left: 0.1rem;
            overflow: hidden;
            cursor: pointer;
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 1.1rem;
            color: #b2c1e6;
            text-decoration: none;
        }
    }
</style>