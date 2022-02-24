<template>
    <nav class="navbar">
        <div id="navbar-logo">
            <router-link to="/"><img src="img/logo.png" alt="Net'Radio"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="podcasts">
                    <router-link to="/CalendrierRadio"><strong>Calendrier</strong></router-link>
                </li>
                <li id="emissions">
                    <router-link to="/">
                        <strong>Animateurs</strong>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
   
</style>
