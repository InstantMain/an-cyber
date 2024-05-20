<script lang="ts">
    import { fade } from "svelte/transition";

    import { page } from "$lib/stores/page";

	import lock from "$lib/assets/about-lock.webp";
	import portrait from "$lib/assets/portrait.png";
	import magnolia from "$lib/assets/magnolia-logo.png";
	import magtest from "$lib/assets/magnolia-test.png";
	import cypress from "$lib/assets/cypress-logo.png";
	import cytest from "$lib/assets/cypress-test.png";

	const headerTopString = "About";
	const headerBottomString = "Alexander Nguyen";

	let headerBackground: HTMLDivElement;
	let introText: HTMLHeadingElement;
	let fadedBar: HTMLDivElement;
	let sectionContainer: HTMLDivElement;
	const gaps: HTMLDivElement[] = [];

	function setSections(node: HTMLDivElement) {
		const sections = Array.from(node.children) as HTMLElement[];
		for (const [index, section] of sections.entries()) {
			section.style["z-index"] = sections.length - index - 1;
		}
	}

	function onHoverImage(event: MouseEvent) {
		const node = event.currentTarget as HTMLDivElement;
		const circle = node.previousElementSibling as HTMLImageElement;
		const rect = node.getBoundingClientRect();
		circle.style["z-index"] = 2;
		const circleHalf = circle.offsetWidth/2;
		const x = event.pageX - node.offsetLeft;
		const y = event.pageY - node.offsetTop;
		console.log(x, y);
		console.log(x - circleHalf, y - circleHalf);
		console.log(event.clientX - rect.left, event.clientY - rect.top);
		console.log(event.clientX - rect.left + (node.offsetLeft + rect.width / 2), node.offsetTop + rect.height / 2);
		circle.style.left = `${event.clientX}px`;
		circle.style.top = `${event.clientX}px`;
	}

	function onScroll(event: Event) {
		const node = event.currentTarget as HTMLDivElement;
		handleHeader(node);
		handleSections(node);
	}

	function handleHeader(scrollContainer: HTMLDivElement) {
		const maxScroll = scrollContainer.clientHeight - calculateStartTop(scrollContainer) * 3;
		const scroll = Math.min(scrollContainer.scrollTop, maxScroll);
		const intersection = calculateIntersection(introText, fadedBar);
		const blurAmount = Math.min((scrollContainer.scrollTop - maxScroll)/(scrollContainer.clientHeight + gaps[0].clientHeight), 1) * 8

		introText.style.transform = `translate(0px, ${scroll}px)`;
		headerBackground.style.filter = `blur(${blurAmount}px)`;
		if (intersection == -1) {
			introText.textContent = headerTopString;
		} else if (intersection == 0) {
			introText.textContent = generateRandomString(Math.floor(((headerBottomString.length - headerTopString.length - 2) * scroll/maxScroll) + (headerTopString.length + 1)));
		} else {
			introText.textContent = headerBottomString;
		}
	}

	function calculateStartTop(mainContent: HTMLElement) {
		introText.style.transform = "translate(0px, 0px)";
		const startTop = introText.getBoundingClientRect().top;
		introText.style.transform = `translate(0px, ${mainContent.scrollTop}px)`;;

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

	function handleSections(scrollContainer: HTMLDivElement) {
		setStickyPages(scrollContainer);
		transitionPages(scrollContainer);
	}

	function setStickyPages(scrollContainer: HTMLDivElement) {
		if (scrollContainer.scrollTop >= sectionContainer.clientHeight + gaps[1].clientHeight) {
			sectionContainer.style.position = "sticky";
		} else {
			sectionContainer.style.position = "relative";
		}
	}

	function transitionPages(scrollContainer: HTMLDivElement) {
		const sections = Array.from(sectionContainer.children);

		for (let i = 0; i < sections.length - 1; i++) {
			const length = sections[i].clientHeight + gaps[i+1].clientHeight * (i + 1);

			let ratio;
			if (scrollContainer.scrollTop >= length) {
				const total = (length - headerBackground.clientHeight) / (i + 1) - 1;
				ratio = Math.min((scrollContainer.scrollTop - length) / total, 1);

				if (ratio == 1) {
					sections[i].style["z-index"] = -1;
				} else {
					sections[i].style["z-index"] = sections.length - i - 1;
				}
			} else {
				ratio = 0;
			}

			for (const element of sections[i].children as HTMLCollectionOf<HTMLElement>) {
				element.style.height = `${100 - (ratio * 100)}%`;
			}
		}
	}
</script>

<section id="about" transition:fade={{ duration: 250 }}>
	<div class="content" on:scroll={onScroll}>
		<div class="background" bind:this={headerBackground}>
			<h1 bind:this={introText}>{headerTopString}</h1>
			<div bind:this={fadedBar} />
			<img src={lock} alt="Cyber Lock">
		</div>

		<div class="gap" bind:this={gaps[0]} />

		<div class="sections" bind:this={sectionContainer} use:setSections >
			<section class="bio">
				<div class="dark">
					<h2>About Me</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
				<div class="light">
					<img src={portrait} alt="Portrait of Alexander Nguyen">
				</div>
			</section>
			<section class="education">
				<div class="light">
					<div class="image-out">
						<img src={magtest} alt="Magnolia Logo">
						<img src={magnolia} alt="Magnolia Logo">
					</div>
					<div class="image-out">
						<img src={cytest} alt="Cypress Logo">
						<img src={cypress} alt="Cypress Logo">
					</div>
				</div>
				<div class="dark">
					<h2>Education</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			</section>
			<section class="skills">
				<div class="dark">
					<h2>Technical Skills</h2>
					<div class="list">
						<ul>
							<li>Linux (Ubuntu)</li>
							<li>Programming
								<ul>
									<li>Python</li>
									<li>Lua</li>
									<li>TypeScript</li>
									<li>SQL</li>
									<li>HTML/CSS</li>
								</ul>
							</li>
							<li>Microsoft Office
								<ul>
									<li>Word</li>
									<li>Excel</li>
									<li>PowerPoint</li>
								</ul>
							</li>
							<li>100+ WPM Typing Speed</li>
						</ul>
					</div>
				</div>
				<div class="light">
					<h2>Soft Skills</h2>
					<ul>
						<li>Critical thinking</li>
						<li>Planning skills</li>
						<li>Problem solving</li>
						<li>Collaboration</li>
						<li>Organization</li>
					</ul>
				</div>
			</section>
		</div>

		<div class="gap" bind:this={gaps[1]} />
		<div class="gap" bind:this={gaps[2]} />
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

	.gap {
		height: 150%;
	}

	.sections {
		z-index: 1;

		h2 {
			position: absolute;
			margin-bottom: 27rem;
			font-size: 2.7rem;
		}

		p, li {
			margin-left: 1.4rem;
			width: 60ch;
			font-size: 1.4rem;
		}

		li {
		}

		ul {
			display: inline-block;
			position: relative;
			text-align: left;
		}
	}

	.bio, .education, .skills {
		position: absolute;
	}

	.dark {
		background-color: #121212;
		text-align: center;

		h2, p, li {
			color: #f9f9f9;
		}

		li::marker {
			color: #f9f9f9;
		}
	}

	.light {
		background-color: #f9f9f9;
		justify-content: space-around;

		h2, p, li {
			color: #121212;
		}

		img {
			width: 50%;
			border-radius: 8px;
		}
	}

	.image-out {
		flex: 1 1 0;
		img {
			position: absolute;
			width: 80%;
			margin: auto;
			inset: 0;

			&:nth-child(1) {
				border-radius: 50%;
			}
		}
	}

	.test-out {
		flex: 1 1 0;
		border-radius: 8px;

		div {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 50%;
			height: 0;
			padding-bottom: 50%;
			background: center center no-repeat fixed;
			background-size: cover;
			border-radius: 50%;
		}
	}

	.list {
		text-align: center;
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