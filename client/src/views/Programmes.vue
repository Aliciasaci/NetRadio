<template>
<section>
    <HeaderPrincipal />
    <div id="programmes-content">
        <h1 class="title"><u><strong>PROGRAMMES DE LA SEMAINE</strong></u></h1>

        <div class="programmes-content-date">
            <div v-if="emission_date == date()">
                <p v-on:click="emission_date = date()" class="disabled">{{date()}}</p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = date()" class="notdisabled">{{date()}}</p>
            </div>
            <div v-if="emission_date == moment().add(1, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(1, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(1, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(1, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(1, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-if="emission_date == moment().add(2, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(2, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(2, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(2, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(2, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-if="emission_date == moment().add(3, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(3, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(3, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(3, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(3, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-if="emission_date == moment().add(4, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(4, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(4, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(4, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(4, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-if="emission_date == moment().add(5, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(5, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(5, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(5, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(5, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-if="emission_date == moment().add(6, 'days').format('dddd, DD MMMM YYYY')">
                <p v-on:click="emission_date = moment().add(6, 'days').format('dddd, DD MMMM YYYY')" class="disabled">{{moment().add(6, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
            <div v-else>
                <p v-on:click="emission_date = moment().add(6, 'days').format('dddd, DD MMMM YYYY')" class="notdisabled">{{moment().add(6, 'days').format('dddd, DD MMMM YYYY')}} </p>
            </div>
        </div>

        <div id="programmes-content-emission">
            <div v-for="emission in emissions" v-bind:key="emission.id">
                <div v-if="emission_date == date(emission.date) && emission.idEmission != null && emission.idEpisode != null">
                    <div class="programmes-content-emission-time">
                        <h2><u>{{emission.heure.substr(0, 2) + 'H' + emission.heure.substr(3, 2)}}</u></h2>
                        <img src="img/favoris.png" alt="Favoris">
                    </div>

                    <ul class="programmes-content-emission-list">
                        <li v-if="emission.titleEpisode != null">
                            <h3>{{emission.nomEmission}} - {{emission.titleEpisode}}</h3>
                            <button v-on:click="voirDetail(emission.idCreneau)" type="submit" class="btn-info">Voir plus</button>
                        </li>
                        <li v-else>
                            <h3>{{emission.nomEmission}}</h3>
                            <button v-on:click="voirDetail(emission.idCreneau)" type="submit" class="btn-info">Voir plus</button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

        <div id="popup-programme" class="modal" v-if="emission_data">
            <div class="modal-content" v-if="emission_data.titreEpisode != null">
                <span class="close" v-on:click="close()">&times;</span>
                <h3><u>NOM DE L'EMISSION</u></h3>
                <p>{{emission_data.nomEmission}}</p>

                <h3><u>DATE ET HEURE DE L'EMISSION</u></h3>
                <p>{{date(emission_data.date)}}</p>
                <p>{{emission_data.heure.substr(0, 2) + 'H' + emission_data.heure.substr(3, 2)}}</p>
                
                <h3><u>GENRE</u></h3>
                <p>{{emission_data.genre}}</p>
                
                <h3><u>DESCRIPTION DE L'EMISSION</u></h3>
                <p>{{emission_data.description}}</p>
                
                <div class="popup-programme-footer">
                    <h3><u>TITRE DE L'EPISODE : {{emission_data.titreEpisode}}</u></h3>
                    <img src="img/notification.png">
                </div>
            </div>
            <div class="modal-content" v-else>
                <span class="close" v-on:click="close()">&times;</span>
                <h3><u>NOM DE L'EMISSION</u></h3>
                <p>{{emission_data.nomEmission}}</p>
                
                <h3><u>DATE ET HEURE DE L'EMISSION</u></h3>
                <p>{{date(emission_data.date)}}</p>
                <p>{{emission_data.heure.substr(0, 2) + 'H' + emission_data.heure.substr(3, 2)}}</p>
                
                <h3><u>GENRE</u></h3>
                <p>{{emission_data.genre}}</p>
                
                <h3><u>DESCRIPTION DE L'EMISSION</u></h3>
                <p>{{emission_data.description}}</p>
                
                <div class="popup-programme-footer">
                    <h3><u>TITRE DE L'EPISODE :</u> -</h3>
                    <img src="img/notification.png">
                </div>
            </div>
        </div>
    </div>
    <Footer />
</section>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Programmes',
    data() {
        return {
            emissions: null,
            emission_data: null,
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
                moment.locale('fr');
                return moment(String(value)).format('dddd, DD MMMM YYYY');
            } else {
                moment.locale('fr');
                return moment().format('dddd, DD MMMM YYYY');
            }
        },
        getEmissionById(id) {
            this.$api
                .get("creneau/" + id)
                .then(response => {
                    this.emission_data = response.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        },
        moment() {
            return moment();
        }
    },
    created(){
         this.$api
            .get("creneaux")
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
.title {
    padding-bottom: 50px;
}

#programmes-content{
    margin: 0 2% 0 2%;
    padding-bottom: 100px;
}

.programmes-content-date {
    display: flex;
    flex-direction: row;
}

.programmes-content-date p{
    cursor: pointer;
}

.programmes-content-date:nth-of-type(1) {
    margin: 0 8%;
}

.programmes-content-date:nth-of-type(2) {
    margin: 0 20% 8% 20%;
}

.disabled {
    background-color: gray;
    color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    border: 1px solid gray;
    font-size: 19px;
    text-align: center;
    padding: 15px 20px 15px 20px;
    width: fit-content;
    font-weight: bold;
    margin: 20px 10px 20px auto;
}

.notdisabled {
    border-radius: 15px;
    border: 1px solid #E43C3C;
    font-size: 19px;
    text-align: center;
    padding: 15px 20px 15px 20px;
    width: fit-content;
    font-weight: bold;
    margin: 20px 10px 20px auto;
    color: white;
    background-color: #E43C3C;
}

.popup-programme-footer h3{
    background-color: #E43C3C;
    padding: 10px 20px;
    width: fit-content;
    border-radius: 15px;
    margin-left: 80px;
}


#programmes-content-emission .programmes-content-emission-list li .btn-info{
   padding-top: -20px;
}
</style>
