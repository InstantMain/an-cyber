<script lang="ts">
	import { fade } from 'svelte/transition';

    export let page: string;
</script>

<section id="about" transition:fade={{ duration: 250 }}>
    <a
        on:click|preventDefault={() => (page = "home")}
        href="/src/pages/Home.svelte#home"
    >├── home</a>
</section>

<style lang="scss">
    @use "src/lib/styles/container.scss" as *;

    #about {
        @extend %container;
    }
</style>