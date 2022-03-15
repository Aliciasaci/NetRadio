<template>
    <nav id="navbar-anim">
        <div id="navbar-logo">
            <router-link to="/Creneaux"><img src="img/logo.png" alt="Net'Radio"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="programmes">
                    <router-link to="/Creneaux"><strong>Mes créneaux</strong></router-link>
                </li>
                <li id="podcasts">
                    <router-link :to="{name : 'Podcast', params : {id:this.$store.state.idMembre}}"><strong>Mes podcasts</strong></router-link>
                </li>
                <li id="emissions">
                    <router-link to="/EmissionsAnimateur">
                        <strong>Mes émissions</strong>
                    </router-link>
                </li>
            </ul>
        </div>
         <div v-if="this.$store.state.token" id="navbar-compte">
            <router-link to="/Deconnexion"><img src="img/logout.png" alt="deconnexion"></router-link>
        </div>
        <div v-else id="navbar-compte">
            <router-link to="/connexion"><img src="img/compte.png" alt="Connexion"></router-link>
        </div>
    </nav>
</template>

<script>
export default {
};
</script>

<style lang="scss">
   #navbar-anim{
       background-color: #424242;
       display: grid;
       grid-template-columns: 0.3fr 1.5fr 0.1fr;
   }

   #navbar-anim #navbar-content ul{
       grid-template-columns: 0.24fr 0.4fr 0.27fr;
   }

   #navbar-anim #navbar-content ul #programmes{
       grid-column: 1/2;
   }

   #navbar-anim #navbar-content ul #podcasts{
       grid-column: 2/3;  
   }

   #navbar-anim #navbar-content ul #ledirect{
       grid-column: 3/4;  
   }

   #navbar-compte{
       display: flex;
       justify-content: center;
   }
</style>

