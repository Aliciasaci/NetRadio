<template>
    <nav id="navbar-admin">
        <div id="navbar-logo">
            <router-link to="/"><img src="img/logo.png" alt="Net'Radio"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="programmes">
                    <router-link to="/Calendrier"><strong>Calendrier</strong></router-link>
                </li>
                <li id="podcasts">
                    <router-link to="/"><strong>Animateurs</strong></router-link>
                </li>
            </ul>
        </div>
        <div id="navbar-compte">
            <router-link to="/"><img src="img/compte.png" alt="Connexion"></router-link>
        </div>
    </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
   #navbar-admin{
       background-color: #424242;
       display: grid;
       grid-template-columns: 0.6fr 0.4fr 0.13fr;
   }

   #navbar-admin #navbar-content ul{
       grid-template-columns: 0.55fr 0.85fr;
   }

   #navbar-admin #navbar-content ul #programmes{
       grid-column: 1/2;
   }

   #navbar-admin #navbar-content ul #podcasts{
       grid-column: 2/3;
       
   }

   #navbar-compte{
       display: flex;
       justify-content: center;
   }
</style>
