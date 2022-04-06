<template>
    <nav class="navbar">
        <div id="navbar-logo">
            <router-link to="/"><img src="img/logo.png" alt="Net'Radio"></router-link>
        </div>
        <div id="navbar-content">
            <ul>
                <li id="programmes">
                    <router-link to="/Programmes"><strong>Programme</strong></router-link>
                </li>
                <li id="podcasts">
                    <router-link to="/Podcasts"><strong>Podcasts</strong></router-link>
                </li>
                <li id="ledirect" v-if="emission_data">
                    <router-link :to="{name : 'EcouterDirect', params :{id: emission_data.idCreneau}}">
                        <div id="ledirect-play">
                            <img src="img/ledirect.png" alt="Le direct">
                        </div>
                        <div id="ledirect-text"><strong>LE DIRECT</strong></div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div id="navbar-search">
            <input type="text" value="Recherche..."/>
            <button type="submit" id="btn-search"><i class="fas fa-search"></i></button>
        </div>
        <div v-if="this.$store.state.token" id="navbar-compte">
            <router-link to="/Deconnexion"><img src="img/logout.png" alt="Deconnexion"></router-link>
        </div>
        <div v-else id="navbar-compte">
            <router-link to="/connexion"><img src="img/compte.png" alt="Connexion"></router-link>
        </div>
    </nav>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            emission_data: null,
            current_time: this.getCurrentTime()
        }
    },
    methods: {
        momentDate(value){
            return moment(value).format('YYYY-MM-DD');
        },
        getCurrentTime(){
            const today = new Date();
            return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
        },
        getTimePlus30Min(emission_time){
            console.log(emission_time.slice(0,2) + emission_time.slice(3,5) + emission_time.slice(6,8))
            const plus30 = moment(emission_time, 'HH:mm:ss A').add(30, 'minutes').format('HH:mm:ss');
            return plus30;
        },
    },
    created(){
         this.$api
            .get("creneaux/" +  this.momentDate(this.emission_date))
            .then(response => {
                this.emission_data = response.data.filter(emissionsFiltered =>
                                emissionsFiltered.heure <= this.getCurrentTime() && this.getCurrentTime() < this.getTimePlus30Min(emissionsFiltered.heure))[0];
                 console.log(this.emission_data);              
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>

<style lang="scss">

</style>
