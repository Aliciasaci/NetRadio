<template>
<section>
    <HeaderAnimateur />
    <h1 id="title">MES CRÉNEAUX</h1>
    <div id="listeCreneaux">
      <ul v-for="creneau in creneaux" v-bind:key="creneau.idCreneau">
        <li>
            <h4>{{date(creneau.date) + ' à ' + creneau.heure.substr(0,2) + 'H' + creneau.heure.substr(3,2)}}</h4>
            <button v-on:click="programmer(creneau.date, creneau.heure)" type="submit" class="btn-programmer">Programmer</button>
        </li>
      </ul>
    </div>
      <div id="popup-programme" class="modal" v-if="creneau_data">
            <div class="modal-content">
                <span class="close" v-on:click="close()">&times;</span>
                <h3><u>NOM DE L'EMISSION</u></h3>
                <select name="emissions" id="emission" v-model="selectedEmission">
                    <option v-for="emission in emissions" v-bind:key="emission.idEmission" v-bind:value="{ id: emission.idEmission, nom: emission.nomEmission }">{{emission.nomEmission}}</option>
                </select>

                <h3><u>DATE ET HEURE DE L'EMISSION</u></h3>
                <p id="dateheure">{{date(creneau_data.date) + ' - ' + creneau_data.heure.substr(0,2) + 'h' + creneau_data.heure.substr(3,2)}}</p>

                <h3 id="episode"><u>TITRE DE L'EPISODE</u></h3>
                <input type="text" id="inputEpisode" v-model="inputEpisode"/>
                <p><button type="submit" v-on:click="confirmer(momentDate(creneau_data.date), creneau_data.heure, creneau_data.idAnimateur)">Confirmer</button></p>
                <p>{{success}}</p>
            </div>
        </div>
    <Footer />
</section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Programmes',
    data() {
        return {
            creneaux: null,
            creneau_data: null,
            emissions: null,
            selectedEmission: null,
            inputEpisode: null,
            success: null,
            idEpisode: null,
            idAnimateur: 1
        }
    },
    methods: {
        programmer(date, heure) {
            this.getListeEmissions();
            this.getCreneau(this.momentDate(date), heure);
    
            document.querySelectorAll(".btn-programmer").forEach(programmeBtn => {
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

        confirmer(date, heure, animateur){
            const episode = {
                idEmission: this.selectedEmission.id,
                titreEpisode: this.inputEpisode
            };
            
            if(this.inputEpisode == null)
            {
                this.updateCreneau(date, heure, animateur, null);
                this.success = "Votre émission a été bien programmée";
            }
            else{
                axios
                    .post("http://localhost:3000/episodes", episode)
                    .then(response => {
                        this.updateCreneau(date, heure, animateur, response.data.insertId);
                        this.success = "Votre émission a été bien programmée";
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        getCreneau(date, heure){
            axios
                .get("http://localhost:3000/animateurs/" + this.idAnimateur + '/' + date + '/' + heure + '/creneau')
                .then(response => {
                    this.creneau_data = response.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        },

        getListeEmissions(){
            axios
                .get("http://localhost:3000/animateurs/" + this.idAnimateur + '/emissions')
                .then(response => {
                    this.emissions = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        updateCreneau(date, heure, animateur, episode){
            const creneau = {
                idEmission: this.selectedEmission.id,
                idEpisode: episode
            };

            axios
                .put("http://localhost:3000/animateurs/" + animateur + '/' + date + '/' + heure + '/creneau', creneau)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created(){
        axios
            .get("http://localhost:3000/animateurs/" + this.idAnimateur + '/creneaux')
            .then(response => {
                this.creneaux = response.data.filter(creneauxFiltered => creneauxFiltered.idEmission == null && creneauxFiltered.idEpisode == null);
            })
            .catch(error => {
                console.log(error);
            });
    },
};
</script>

<style lang="scss">
#title{
  color: white;
  text-align: center;
  margin: 4% 40%;
  background-color: #424242;
  border: 2px solid #E43C3C;
  padding: 20px 0;
  border-radius: 30px;
  font-size: 18px;
}

#listeCreneaux {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 18%;
}

#listeCreneaux ul{
  list-style-type: none;
}

#listeCreneaux ul li{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#listeCreneaux ul li h4{
  color: white;
  text-align: center;
  font-weight: bold;
  background-color: #7B2020;
  padding: 30px;
  border: 1px solid #FF5050;
}

#dateheure{
    background-color: #E43C3C;
    color: white;
    border: 1px solid #E43C3C;
    border-radius: 20px;
    padding: 10px 30px;
    width: fit-content;
    margin: 6% auto;
    font-weight: bold;
    font-size: 16px !important;
}

#emission{
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 4%;
}

#episode{
    margin-top: 8%;
}

#inputEpisode{
    width: 50%;
    padding: 5px 10px;
    font-size: 15px;
    margin: auto;
}

p button{
    background-color: rgb(3, 202, 3);
    border: 1px solid rgb(3, 202, 3);
    border-radius: 5px;
    padding: 5px 20px;
    font-size: 17px;
    font-weight: bold;
    margin-top: 5%;
    cursor: pointer;
    color: white;
}

.btn-programmer{
    background-color: rgba(#494848, 0.55);
    border: 1px solid #FF5050;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    width: fit-content;
    padding: 30px;
    margin-top: 20px;
    margin-bottom: 21px;
    color: white;
    cursor: pointer;
}
</style>
