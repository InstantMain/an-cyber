<script lang="ts">
    import { fade } from "svelte/transition";

    import { page } from "$lib/stores/page";

	import lock from "$lib/assets/about-lock.webp";
	import portrait from "$lib/assets/portrait.png";
	import magnolia from "$lib/assets/magnolia-logo.png";
	import cypress from "$lib/assets/cypress-logo.png";

	import Sidebar from "$lib/components/Sidebar.svelte";

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
		const sections = Array.from(sectionContainer.children) as HTMLElement[];

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
				<div class="dark text">
					<h2>About Me</h2>
					<p>
						I am a student in the cybersecurity pathway at Magnolia High School. 
						I possess high creativity and critical thinking skills. 
						I plan to enter the cybersecurity field and become a cybersecurity analyst, penetration tester, or application security engineer. 
						I currently own 6 certificates from platforms like Coursera, CompTIA, SANS, and Cisco. 
						My hobbies include piano, coding, and video game development.
					</p>
				</div>
				<div class="light">
					<img src={portrait} alt="Portrait of Alexander Nguyen">
				</div>
			</section>
			<section class="education">
				<div class="light">
					<img src={magnolia} alt="Magnolia Logo">
					<img src={cypress} alt="Cypress Logo">
				</div>
				<div class="dark text">
					<h2>Education</h2>
					<p>Magnolia High School</p>
					<ul style:margin-bottom="3ch">
						<li>‣ Exclusive Cybersecurity Pathway (CS3/MCI)</li>
						<li>‣ Cyber Literacy 1 & 2</li>
						<li>‣ Cyber Innovations</li>
					</ul>
					<p>Cypress College (Dual Enrollment)</p>
					<ul style:margin-bottom=0>
						<li>‣ CIS 150 C - Microsoft Office Applications</li>
						<li>‣ CIS 230 C - Cisco Networking 1</li>
						<li>‣ CIS 195 C - Network Security</li>
						<li>‣ CIS 196 C - Ethical Hacking</li>
						<li>‣ CIS 247 C - Python Programming</li>
					</ul>
				</div>
			</section>
			<section class="skills">
				<div class="dark text">
					<h2>Technical Skills</h2>
					<ul>
						<li>‣ Linux (Ubuntu)</li>
						<li>‣ Programming
							<ul>
								<li>▹ Python</li>
								<li>▹ Lua</li>
								<li>▹ TypeScript</li>
								<li>▹ SQL</li>
								<li>▹ HTML/CSS</li>
							</ul>
						</li>
						<li>‣ Microsoft Office
							<ul>
								<li>▹ Word</li>
								<li>▹ Excel</li>
								<li>▹ PowerPoint</li>
							</ul>
						</li>
						<li>‣ 100+ WPM Typing Speed</li>
					</ul>
				</div>
				<div class="light text">
					<h2>Soft Skills</h2>
					<ul>
						<li>‣ Critical thinking</li>
						<li>‣ Planning skills</li>
						<li>‣ Problem solving</li>
						<li>‣ Collaboration</li>
						<li>‣ Organization</li>
					</ul>
				</div>
			</section>
		</div>

		<div class="gap" bind:this={gaps[1]} />
		<div class="gap" bind:this={gaps[2]} />
	</div>
</section>

<Sidebar title="about" />

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
			font-size: 2.7rem;
		}

		p {
			width: 95%;
			margin: 0;
			text-align: left;
			font-size: 1.4rem;
		}
	}

	.bio, .education, .skills {
		position: absolute;
	}

	.text {
		flex-direction: column;
	}

	.dark {
		background-color: #121212;
		text-align: center;

		h2, p, li {
			color: #f9f9f9;
		}
	}

	.light {
		background-color: #f9f9f9;
		justify-content: space-around;

		h2, li {
			color: #121212;
		}

		img {
			width: 40%;
			border-radius: 8px;
		}
	}

	ul {
		padding: 0;
		margin: 0;
		margin-bottom: auto;
		text-align: left;

		ul {
			text-indent: 4ch;
		}
	}

	li {
		list-style-type: none;
		font-size: 1.4rem;
	}

	p, h1, h2, li {
		font-family: "Ubuntu";
	}

    section, div {
        @extend %container;
    }
</style>