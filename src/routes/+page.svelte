<script lang="ts">
    import "../lib/styles/home.scss"
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
    <section id="home">
        <div id="terminal">
            <div id="header">
                <p>root@an-cyber.pages.dev: ~</p>
            </div>
            <div id="body">
                <p>root@an-cyber.pages.dev:<span style="color:#464c6f">~</span><span style="font-weight:400;color:#FFFFFF">$</span></p>
            </div>
        </div>
    </section>
</main>

<style lang="scss">
    #home {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top right, #83123d, #cb4015);
        background-size: cover;
    }

    #terminal {
        display: flex;
        position: relative;
        place-content: center;
        flex-wrap: wrap;
        top: 8%;
        left: 5%;
        width: 90%;
        height: 80%;

        #header {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 100%;
            height: 10%;
            z-index: 1;
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
        #body {
            display: inline-block;
            position: relative;
            width: 100%;
            height: 90%;
            background-color: #2f0922;
            overflow: hidden;

            p {
                text-align: left;
                top: -1.1rem;
                left: 0.1rem;
                font-size: 1.1rem;
                color: #97bc4a;
            }
        }

        p {
            position: relative;
            font-family: Ubuntu Mono;
            font-weight: 700;
        }
    }
</style>