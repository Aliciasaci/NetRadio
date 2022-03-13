<template>
  <section>
      <HeaderPrincipal />
      <div id="content-accueil">
        <div id="content-left">
            <img src="img/bg-emission.png">
            <div id="content-info" v-if="emission_data">
                <div v-if="(emission_data.heure <= current_time) && (current_time < getTimePlus30Min(emission_data.heure))">
                    <div>
                        <h1>{{emission_data.nomEmission + " : " + emission_data.titreEpisode}}</h1>
                    </div>
                    <h3>Par {{emission_data.fullNameAnimateur}}</h3>
                    <router-link :to="{name : 'EcouterDirect', params :{id: emission_data.idCreneau}}">
                        <button type="submit" id="btn-play">
                            <img src="img/play.png">
                            <strong>Ecouter le direct</strong>
                        </button>
                    </router-link>
                                 <!-- <router-link :to="{name : 'Podcast', params :{id: animateur.idAnimateur}}"> -->
                </div>
                <div v-else>
                    <div>
                        <h1>{{emission_data.nomEmission + " : " + emission_data.titreEpisode}}</h1>
                    </div>
                    <h3>Par {{emission_data.fullNameAnimateur}}</h3>
                </div>
            </div>
            <div v-else>
                    <h1 id="h1">Cliquez sur l'émission en cours pour rejoindre...</h1>
            </div>
        </div>
        <div id="content-right">
            <div class="content-program" v-for="emission in emissions" v-bind:key="emission.idCreneau">
                <div v-if="emission != null && emission.idEmission != null && emission.idEpisode != null ">
                    <div v-if="(emission.heure <= current_time) && (current_time < getTimePlus30Min(emission.heure))">
                        <div>
                            <div class="content-program-info" id="clicked-program" @click="getEmissionByIdCreneau(emission.idCreneau)">
                                <p class="content-program-time"><strong>{{emission.heure.substr(0, 2) + 'H' + emission.heure.substr(3, 2)}}</strong></p>
                                <p class="content-program-name"><strong>{{emission.nomEmission + " : " + emission.titreEpisode}}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="content-program-info" v-on:click="getEmissionByIdCreneau(emission.idCreneau)">
                            <p class="content-program-time"><strong>{{emission.heure.substr(0, 2) + 'H' + emission.heure.substr(3, 2)}}</strong></p>
                            <p class="content-program-name"><strong>{{emission.nomEmission + " : " + emission.titreEpisode}}</strong></p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Accueil',
    data() {
        return {
            emissions: null,
            emission_data: null,
            current_time: this.getCurrentTime(),
            emission_time: null,
            emission_date: this.date(),
        }
    },
    methods: {
        date(value) {
            if (value) {
                return moment(String(value)).format('dddd, DD MMMM YYYY');
            } else {
                return moment().format('dddd, DD MMMM YYYY');
            }
        },
        momentDate(value){
            return moment(value).format('YYYY-MM-DD');
        },
        currentTime(value){
            return value.substr(0, 8);
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
        getEmissionByIdCreneau(id) {
            axios
                .get("http://localhost:3000/creneau/" + id)
                .then(response => {
                    this.emission_data = response.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created(){
         axios
            .get("http://localhost:3000/creneaux/" +  this.momentDate(this.emission_date))
            .then(response => {
                this.emissions = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
<style lang="scss">
//npm run build
.content-program-info{
    cursor: pointer;
    background-color: #E43C3C;
}

.content-program-info:hover{
    background-color: rgba(255,255,255,0.5);
}

#content-accueil #content-left #content-info{
    position: absolute;
    color: white;
    text-align: center;
    padding-left: 50px;
    margin-top: -15%;
}

#content-accueil{
    padding-bottom: 100px;
}

#clicked-program{
    background-color:gray;
}
#h1{
    color : rgb(253, 253, 253);
    position : absolute;
    top : 500px;
    left : 320px;
}
</style>