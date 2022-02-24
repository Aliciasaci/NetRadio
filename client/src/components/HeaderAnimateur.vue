<template>
    <nav class="navbar">
        <div id="navbar-logo">
            <router-link to="/"><img src="img/logo.png" alt="Net'Radio"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="creneaux">
                    <router-link to="/Programmes"><strong>Mes Créneaux</strong></router-link>
                </li>
                <li id="podcasts">
                       <router-link :to="{name : 'ProfilAnimateur', params :{id: idAnimateur}}"><strong>Mes podcasts</strong></router-link>
                </li>
                <li id="emissions">
                    <router-link to="/EmissionsAnimateur">
                        <strong>Mes émissions</strong>
                    </router-link>
                </li>
            </ul>
        </div>
        <div id="navbar-compte">
            <router-link to="/"><img src="img/compte.png" alt="Connexion"></router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            idAnimateur : 1,
        }
    }
};
</script>

<style lang="scss">
   
</style>
