<template>
  <section>
      <HeaderPrincipal />
      <div id="content-accueil">
        <div id="content-left">
            <img src="img/bg-emission.png">
            <div id="content-info" v-if="emission_data">
                <h1>{{emission_data.nomEmission + " : " + emission_data.titleEpisode}}</h1>
                <h3>Par {{emission_data.fullNameAnimateur}}</h3>
                <router-link to="/EcouterDirect">
                    <button type="submit" id="btn-play">
                        <img src="img/play.png">
                        <strong>Ecouter le direct</strong>
                    </button>
                </router-link>
            </div>
        </div>
        <div id="content-right">
            <div class="content-program" v-for="emission in emissions" v-bind:key="emission.idCreneau">
                <div class="content-program-info" v-on:click="getEmissionById(emission.idCreneau)">
                    <p class="content-program-time"><strong>{{emission.heure.substr(0, 2) + 'H' + emission.heure.substr(3, 2)}}</strong></p>
                    <p class="content-program-name"><strong>{{emission.nomEmission + " : " + emission.titleEpisode}}</strong></p>
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
            emission_date: this.date()
        }
    },
    methods: {
        voirDetail(id) {
            this.getEmissionById(id);
            document.querySelectorAll(".btn-info").forEach(programmeBtn => {
                programmeBtn.addEventListener('click', () => {
                    document.getElementById("popup-programme").style.display = "block";
                });
            });
        },
        close() {
            document.querySelectorAll(".close").forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    document.getElementById("popup-programme").style.display = "none";
                })
            })
            window.onclick = function (event) {
                if (event.target === document.getElementById("popup-programme")) {
                    document.getElementById("popup-programme").style.display = "none";
                }
            }
        },
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
            return today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'});
        },
        getEmissionById(id) {
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
            .get("http://localhost:3000/creneaux/" +  this.momentDate(this.emission_date) + "/" + this.currentTime(this.current_time))
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


</style>