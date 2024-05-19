<script lang="ts">
	import { get } from "svelte/store";
    import { fade } from "svelte/transition";

	import { root } from "$lib/stores/root";
    import { page } from "$lib/stores/page";

	import lock from "$lib/assets/about-lock.webp"

	const headerTopString = "About";
	const headerBottomString = "Alexander Nguyen";

	let headerBackground: HTMLElement;
	let introText: HTMLElement;
	let fadedBar: HTMLElement;
	let pageGap: HTMLElement;

	let isScrollAtBottom = false;

	function onScroll(event: Event) {
		const node = event.currentTarget as HTMLElement;
		const maxScroll = node.clientHeight - calculateStartTop(node) * 3;
		const scroll = Math.min(node.scrollTop, maxScroll);
		const intersection = calculateIntersection(introText, fadedBar);
		const blurAmount = Math.min((node.scrollTop - maxScroll)/(node.clientHeight + pageGap.clientHeight), 1) * 8

		isScrollAtBottom = node.clientHeight + node.scrollTop >= node.scrollHeight;
		introText.style.transform = "translate(0px," + (scroll) + "px)";
		headerBackground.style.filter = "blur(" + blurAmount + "px)";

		if (intersection == -1) {
			introText.textContent = headerTopString;
		} else if (intersection == 0) {
			introText.textContent = generateRandomString(Math.floor(((headerBottomString.length - headerTopString.length - 2) * scroll/maxScroll) + (headerTopString.length + 1)));
		} else {
			introText.textContent = headerBottomString;
		}
	}

	function calculateStartTop(mainContent: HTMLElement) {
		introText.style.transform = "translate(0px,0px)";
		const startTop = introText.getBoundingClientRect().top;
		introText.style.transform = "translate(0px," + (mainContent.scrollTop) + "px)";

		return startTop;
	}

	function calculateIntersection(element1: HTMLElement, element2: HTMLElement) {
		const rect1 = element1.getBoundingClientRect();
		const rect2 = element2.getBoundingClientRect();

		if (rect1.y + rect1.height < rect2.y) {
			return -1;
		} else if (rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
			return 0;
		} else {
			return 1;
		}
	}

	function generateRandomString(length: number) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;

		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}

		return result;
	}
 </script>

<section id="about" transition:fade={{ duration: 250 }}>
	<div class="content" on:scroll={onScroll}>
		<div class="background" bind:this={headerBackground}>
			<h1 bind:this={introText}>{headerTopString}</h1>
			<div bind:this={fadedBar} />
			<img src={lock} alt="lock">
		</div>

		<div class="gap" bind:this={pageGap} />

		<section class="bio">
			<div class="dark">
				<h2>About Me</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
			<div class="light">
			</div>
		</section>

		<section class="education">
			<div class="light" />
			<div class="dark" />
		</section>
	</div>
</section>

<aside class="sidebar">
    <div class="title">
		<h1>about</h1>
	</div>
	<div class="triangle" />
	<div class="square">
		<a
			href="./Home.svelte#home"
			on:click|preventDefault={() => {page.set("home")}}
		>
			<div class="round-square">
				<div class="arrow" />
			</div>
		</a>
	</div>
</aside>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

    #about {
		margin-right: 0;
		width: 93%;
        background-color: #7c7c7c;
    }

	.content {
		display: block;
		width: 96%;
		height: 98%;
		overflow-y: auto;
	}

	.background {
		position: sticky;

		background: {
			image: url("$lib/assets/about-bg.png");
			size: cover;
			repeat: no-repeat;
		}

		h1 {
			position: absolute;
			top: 0;
			left: auto;
			white-space: nowrap;
			font-size: 3.7rem;
			font-weight: 700;
			color: #FFFFFF;
		}

		img {
			position: absolute;
			width: 15%;
		}

		div {
			width: 70%;
			height: 25%;
			background-color: #000c30;
			filter: blur(5px);
		}
	}

	.dark {
		background-color: #121212;

		h2 {
			position: absolute;
			margin-bottom: 27rem;
			font-size: 2.7rem;
			color: #f9f9f9;
		}

		p {
			color: #f9f9f9;
			width: 60ch;
			font-size: 1.4rem;
		}
	}

	.light {
		background-color: #f9f9f9;
	}

	.gap {
		height: 150%;
	}

    .sidebar {
        position: fixed;
		flex-direction: column;
		margin-left: 0;
		width: 7%;
		background-color: #7c7c7c;

        &:hover .arrow {
            border-color: #c0c0c0;
        }
    }

    .title {
        h1 {
            transform: rotate(-90deg);
            font-size: 1.7rem;
            color: #dfdede;
        }
	}

    .triangle {
		width: calc(100% - 7vw);
		height: 0;
		border: {
			right: 7vw solid transparent;
			bottom: 7vh solid #8d4061;
		}
	}

	.square {
		background-color: #8d4061;
	}

    .round-square {
		margin-top: 50%;
		width: 80%;
		height: 0;
		padding-bottom: 80%;
		border-radius: 3px;
		background-color: white;
		transition: 0.25s;

        &:hover {
            transform: scale(1.25);
        }
	}

    .arrow {
		position: absolute;
		width: 0;
		height: 0;
		padding: 15%;
		left: 6px;
		border: solid #dfdedf;
		border-width: 0 3px 3px 0;
		transform: rotate(135deg);
		transition: 0.25s;
    }

	p, h1, h2 {
		font-family: "Ubuntu";
	}

    a {
		display: contents;
	}

    section, div, aside {
        @extend %container;
    }
</style>