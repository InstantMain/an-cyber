<script lang="ts">
    import { onMount } from "svelte";
    import CommandLine from "$lib/components/CommandLine.svelte";
	import { banners } from "$lib/assets/banners.svelte";

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

<main>
    <section class="container home">
        <div class="container terminal">
            <div class="header">
                <p>root@an-cyber.pages.dev: ~</p>
            </div>
            <div class="body">
                {#if isMounted}
                    <CommandLine text="whoami" on:end={() => (hasTypedWhoAmI = true)}/>
                {/if}
                {#if hasTypedWhoAmI}
                    {#each banners as banner}
                        <pre>{banner}</pre>
                    {/each}
                    <CommandLine text="tree" on:end={() => (hasTypedLs = true)}/>
                {/if}
                {#if hasTypedLs}
                    <button>├── about</button>
                {/if}
            </div>
        </div>
    </section>
</main>

<style lang="scss">
    .container {
        display: flex;
        position: relative;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
        place-content: center;
        align-items: center;
        overflow: hidden;
    }

    .home {
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to top right, #83123d, #cb4015);
        background-size: cover;
    }

    .terminal {
        width: 90%;
        height: 80%;
        place-content: start;
        flex-wrap: wrap;

        p, button {
            position: relative;
            font-family: "Ubuntu Mono";
            font-weight: 700;
        }
    }

    .header {
        display: flex;
        position: relative;
        width: 100%;
        height: 10%;
        z-index: 1;
        place-content: center;
        align-items: center;
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
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 90%;
        place-content: start;
        align-items: start;
        overflow: auto;
        background-color: #2f0922;

        pre {
            margin: 0.3rem 0.7rem;
            text-overflow: nowrap;
            font-weight: 400;
            font-size: 0.3rem;
            color: #FFFFFF;
        }

        button {
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
        }
    }

</style>