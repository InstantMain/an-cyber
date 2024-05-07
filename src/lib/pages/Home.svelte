<script lang="ts">
    import { onMount } from "svelte";
    import { quadOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

	import { banners } from "$lib/assets/banners";
    import { page } from "$lib/stores/page";
    import CommandLine from "$lib/components/CommandLine.svelte";

    export let shouldAnimate = true;

    const links = [
        { page: "about", hash: "About.svelte#about" },
        { page: "certifications", hash: "Certifications.svelte#certifications" }
    ]

    let isMounted = false;
    let hasStartedTyping = false;
    let hasTypedWhoAmI = false;
    let hasTypedLs = false;

    onMount(() => {
        isMounted = true;
    })
</script>

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
                {#each links as link (link.page)}
                    <a
                        href={"/src/lib/pages/" + link.hash}
                        on:click|preventDefault={() => {page.set(link.page); shouldAnimate = false;}}
                    >├── {link.page}</a>
                {/each}
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

    #home {
        z-index: 1;
        background: {
            image: linear-gradient(to top right, #83123d, #cb4015);
            size: cover;
        }
    }

    .terminal {
        position: relative;
        width: 90%;
        height: 80%;
        place-content: start;
        flex-wrap: wrap;

        p, a {
            position: relative;
            font: {
                family: "Ubuntu Mono";
                weight: 700;
            }
        }
    }

    .header {
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
        position: relative;
        flex-direction: column;
        width: 100%;
        height: 90%;
        place-content: start;
        align-items: start;
        overflow-x: hidden;
        overflow-y: auto;
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
            text-decoration: none;
            cursor: pointer;
            font-size: 1.1rem;
            color: #b2c1e6;
        }
    }

    section, div {
        @extend %container;
    }
</style>