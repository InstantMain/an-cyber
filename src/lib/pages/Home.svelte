<script lang="ts">
    import { onMount } from "svelte";
    import { quadOut } from "svelte/easing";
    import { slide } from 'svelte/transition';

	import { banners } from "$lib/assets/banners";
    import { page } from "$lib/stores/page";
    import CommandLine from "$lib/components/CommandLine.svelte";

    export let shouldAnimate = true;

    const links = [
        { page: "about", hash: "About.svelte#about" },
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
            <h1>root@an-cyber.pages.dev: ~</h1>
        </div>
        <div class="body">
            {#if isMounted}
                <CommandLine text="whoami" animated={shouldAnimate} bind:completed={hasTypedWhoAmI}/>
            {/if}
            {#if hasTypedWhoAmI}
                {#each banners as banner}
                    <pre class="banner">{banner}</pre>
                {/each}
                <CommandLine text="tree" animated={shouldAnimate} bind:completed={hasTypedLs}/>
            {/if}
            {#if hasTypedLs}
                {#each links as link (link.page)}
                    <ul>
                        <li>
                            <span>├──</span>
                            <a
                                href={"/src/lib/pages/" + link.hash}
                                on:click|preventDefault={() => {page.set(link.page); shouldAnimate = false;}}
                            >{link.page}</a>
                        </li>
                    </ul>
                {/each}
            {/if}
            <pre class="cow">
                ___________________
               &lt Cyber Innovations >
                -------------------
                       \   ^__^
                        \  (oo)\_______
                           (__)\       )\/\
                               ||----w |
                               ||     ||</pre>
        </div>
    </div>

    <div class="ripples">
        {#each { length: 3 } as _}
            <div class="ripple" />
        {/each}
    </div>

    <div class="bubbles">
        {#each { length: 5 } as _}
            <div class="bubble" />
        {/each}
    </div>
</section>

<style lang="scss">
    @use "sass:math";
    @use "src/lib/styles/container.scss" as *;

    @mixin rise($index, $half, $full) {
        @keyframes #{"rise-" + $index} {
            0% {
                margin-bottom: -25%;
                bottom: 0%;
                transform: translate(0%);
            }
            50% {
                transform: translate($half);
            }

            100% {
                margin-bottom: 100%;
                bottom: 100%;
                transform: translate($full);
            }
        }
    }

    #home {
        position: absolute;
        margin: 0;
        z-index: 1;
        background: {
            image: linear-gradient(to top right, #83123d, #cb4015);
            size: cover;
        }
    }

    .terminal {
        width: 90%;
        height: 80%;
        justify-content: start;
        flex-wrap: wrap;
    }

    .header {
        height: 10%;
        z-index: 1;
        border-radius: 10px 10px 0px 0px;
        background-color: #4b4841;

        h1 {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 1rem;
            color: #FFFFFF;
        }
    }

    .body {
        flex-direction: column;
        height: 90%;
        z-index: 1;
        justify-content: start;
        align-items: start;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #2f0922;
    }

    .banner {
        margin: 0.3rem 0.7rem;
        color: #FFFFFF;
        font-size: 0.3rem;
    }

    .cow {
        position: absolute;
        right: 0.3rem;
        bottom: 0.7rem;
        font-size: 1rem;
    }

    .ripples {
        position: absolute;
        z-index: -1;

        @for $i from 1 through 3 {
            &:hover .ripple:nth-child(3n + #{$i}) {
                animation-name: ripple;
                animation-duration: 4.75s;
                animation-timing-function: cubic-bezier(0.65, 0, 0.34, 1);
                animation-iteration-count: infinite;
                animation-delay: ($i - 1) * 1.25s;
            }
        }
    }

    .ripple {
        position: absolute;
		width: 0;
		height: 0;
		border-radius: 50%;
		border: 3px solid rgba(0, 0, 0, 0.44);
	}

    .bubbles {
        position: absolute;
        z-index: -2;
    }

    .bubble {
        position: absolute;
        margin-bottom: -25%;
		height: 0;
        bottom: 0%;
		border-radius: 50%;
		border: 8px solid rgba(0, 0, 0, 0.2);
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.5, -1, 0.5, 1);

        @for $i from 1 through 5 {
            $radius: math.div(percentage(random(10) + 3), 100);
            &:nth-child(5n + #{$i}) {
                left: math.div(percentage(random(100) - 1), 100);
                margin-left: math.div(percentage(random(25) - 1), -100);
                width: $radius;
                padding-bottom: $radius;
                animation-duration: random(10) + 10 + s;
                animation-delay: random(3) + 3 + s;
                animation-name: #{"rise-" + $i};
            }
        }
    }

    ul {
        margin: 0.3rem 0;
        padding: 0;
        padding-left: 0.1rem;
    }

    li {
        list-style-type: none;

        span {
            font-size: 1.1rem;
            color: #FFFFFF;
        }

        a {
            left: 1ch;
            text-decoration: none;
            cursor: pointer;
            font-size: 1.1rem;
            color: #b2c1e6;

            &::before {
                content: "[";
                position: absolute;
                left: 50%;
                opacity: 0;
                z-index: -1;
                transition: 0.25s;
            }
            &::after {
                content: "]";
                position: absolute;
                right: 50%;
                opacity: 0;
                z-index: -1;
                transition: 0.25s;
            }

            &:hover::before {
                left: -0.65rem;
                opacity: 1;
                transform: scale(1.2);
            }

            &:hover::after {
                right: -0.65rem;
                opacity: 1;
                transform: scale(1.2);
            }
        }
    }

    pre {
        margin: 0;
        color: #FFFFFF;
    }

    h1, span, a, li {
        position: relative;
        font: {
            family: "Ubuntu Mono";
            weight: 700;
        }
    }

    section, div {
        @extend %container;
    }

    @keyframes ripple {
		from {
			opacity: 1;
			width: 0%;
			padding-bottom: 0%;
		}

		to {
			opacity: 0;
			width: 100%;
			padding-bottom: 100%;
		}
	}

    @for $i from 1 through 5 {
        @include rise($i, math.div(percentage(random(200) - 100), 100), math.div(percentage(random(200) - 100), 100));
    }
</style>