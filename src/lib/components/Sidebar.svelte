<script lang="ts">
    import { page } from "$lib/stores/page";

    export let title = "";
    export let section = "Home";
</script>

<aside class="sidebar">
    <div>
		<h1>{title}</h1>
	</div>
	<div class="triangle" />
	<div class="square">
		<a
            href = "/src/lib/pages/{section}.svelte#{section.toLowerCase()}"
			on:click|preventDefault={() => {page.set(section.toLowerCase())}}
		>
			<div class="round-square">
				<div class="arrow" />
			</div>
		</a>
	</div>
</aside>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

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

    h1 {
        transform: rotate(-90deg);
        color: #dfdede;
        font: {
            family: "Ubuntu";
            size: 1.7rem;
        }
	}

    a {
		display: contents;
	}

    aside, div {
        @extend %container;
    }
</style>