<script lang="ts">
    import { fade } from 'svelte/transition';

    import { page } from "$lib/stores/page";
 </script>

<section id="certifications" transition:fade={{ duration: 250 }}>

</section>

<aside class="sidebar">
    <div class="title">
		<p>certifications</p>
	</div>
	<div class="triangle" />
	<div class="square">
		<a
			href="./Home.svelte#home"
			on:click|preventDefault={() => {document.documentElement.scrollTop = 0;; page.set("home")}}
		>
			<div class="round-square">
				<div class="arrow" />
			</div>
		</a>
	</div>
</aside>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

    #certifications {
        overflow: 200vh;
        background-color: #7c7c7c;
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
		position: relative;
		height: 100%;

        p {
            transform: rotate(-90deg);
            font-family: "Ubuntu";
            font-size: 1.7rem;
            color: #dfdede;
        }
	}

    .triangle {
		position: relative;
		width: calc(100% - 7vw);
		height: 0;
		border-right: 7vw solid transparent;
		border-bottom: 7vh solid #8d4061;
	}

	.square {
		position: relative;
		height: 100%;
		background-color: #8d4061;
	}

    .round-square {
		position: relative;
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

    a {
		display: contents;
	}

    section, div, aside {
        @extend %container;
    }
</style>