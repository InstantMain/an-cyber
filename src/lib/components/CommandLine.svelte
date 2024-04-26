<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let text = "";

    let hasStarted = false;
    let isCompleted = false;

    const dispatch = createEventDispatcher();

    setTimeout(() => (hasStarted = true), 2000);

    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
    function typewrite(node: HTMLElement, { delay = 0, wordsPerSecond = 12, startIndex = 0, endIndex = node.textContent?.length }) {
		const text = node.textContent ? node.textContent : "";
		const duration = 1000/(wordsPerSecond/text.length);

		return {
			delay,
			duration,
			tick: (t: number) => {
				const i = clamp(Math.floor(text.length * t) + startIndex, startIndex, endIndex);
				node.textContent = text.slice(0, i);
			}
		};
	}

    function onComplete() {
        isCompleted = true;
        dispatch("end");
    }
</script>

<p>root@an-cyber.pages.dev:<span style="color:#464c6f">~</span><span
    style="font-weight:400;color:#FFFFFF"
    transition:typewrite={{ delay: 2000, wordsPerSecond: 2, startIndex: 2 }}
    on:introend={onComplete}
>
    $ {text}</span><span class:cursor-animate={hasStarted == false && isCompleted == false} class:cursor={isCompleted == false && hasStarted}>&nbsp</span>
</p>

<style>
    .cursor {
        background-color: #FFFFFF;
    }

    .cursor-animate {
        background-color: #FFFFFF;
        animation-name: cursor-blink;
        animation-duration: 0.75s;
        animation-iteration-count: infinite;
    }

    p {
        position: relative;
        font-family: "Ubuntu Mono";
        font-weight: 700;
        top: 0.3rem;
        left: 0.1rem;
        margin: 0;
        font-size: 1.1rem;
        word-break: break-all;
        color: #97bc4a;
    }

    @keyframes cursor-blink {
        from {opacity: 0;}
        to {opacity: 1;}
    }
</style>