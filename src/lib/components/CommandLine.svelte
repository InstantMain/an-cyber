<script lang="ts">
    export let text = "";
    export let animated = true;
    export let completed = false;

    const delay = 1750;
    const wordsPerSecond = 3.25;

    let hasStarted = false;

    function typewrite(node: HTMLElement, { delay = 0, wordsPerSecond = 12, startIndex = 0 }) {
        if (!animated) {
            completed = true;
            return;
        }

		const text = node.textContent ? node.textContent : "";

        setTimeout(() => (hasStarted = true), delay);

		return {
			delay,
			duration: 1000/(wordsPerSecond/text.length),
			tick: (t: number) => {
				const i = Math.floor((text.length * t) + startIndex);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<p>root@an-cyber.pages.dev:<span style="color:#464c6f">~</span><span
    style="font-weight:400;color:#FFFFFF"
    transition:typewrite={{ delay: delay, wordsPerSecond: wordsPerSecond, startIndex: 2 }}
    on:introend={() => (completed = true)}
>
    $ {text}</span><span class:cursor--animate={!hasStarted && !completed} class:cursor={!completed && hasStarted}>&nbsp</span>
</p>

<style lang="scss">
    .cursor {
        background-color: #FFFFFF;

        &--animate {
            @extend .cursor;
            animation: {
                name: cursor-blink;
                duration: 0.75s;
                iteration-count: infinite;
            }
        }
    }

    p {
        position: relative;
        top: 0.3rem;
        left: 0.1rem;
        margin: 0;
        word-break: break-all;
        color: #97bc4a;
        font: {
            family: "Ubuntu Mono";
            weight: 700;
            size: 1.1rem;
        }
    }

    @keyframes cursor-blink {
        from {opacity: 0;}
        to {opacity: 1;}
    }
</style>