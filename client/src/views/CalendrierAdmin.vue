<template>
<section>
    <HeaderAdministrateur />
    <div class="calendar-form">
      <div class="calendar">
       <v-date-picker locale="fr" v-model="selectedDate" is-dark style="height: 250px;" is-expanded ></v-date-picker>
       <div id="listCreneaux" v-bind:getCreneaux="getCreneaux()">
       <div v-for="creneau in creneaux" v-bind:key="creneau.idCreneau">
         <ul>
           <li>{{creneau.heure}} - {{creneau.fullNameAnimateur}}</li>
         </ul>
       </div>
       </div>
      </div>
      <div class="form">
        <h1>Attribuer un créneau</h1>
        <p id="date"><em>" {{ date(selectedDate) }} "</em></p>
        <select name="heures" id="times" v-model="selectedHeure">
            <option v-bind:value="heure_text">{{heure_text}}</option>
            <option v-for="heure in heures" v-bind:key="heure.heure" v-bind:value="{ heure: heure.heure, desc: heure.description }">{{heure.description}}</option>
        </select>

        <select name="animateurs" id="times" v-model="selectedAnimateur">
            <option v-bind:value="animateur_text">{{animateur_text}}</option>
            <option v-for="animateur in animateurs" v-bind:key="animateur.idAnimateur" v-bind:value="{id: animateur.idAnimateur, name: animateur.fullNameAnimateur }">{{ animateur.fullNameAnimateur }}</option>
        </select>
        <div id="button-submit">
          <button type="submit" id="update" v-on:click="updateCreneau()">Modifier</button>
          <button type="submit" id="programmer" v-on:click="createCreneau()">Programmer</button>
        </div>
        <p id="response"><em>{{post_response}}</em></p>
      </div>
    </div>
    <Footer />
</section>
</template>

<script>
import moment from 'moment';

export default {
   data() {
    return {
      animateurs: null,
      creneaux: null,
      heures: [ { heure: "08:00:00", description: "08H00"},
                { heure: "08:30:00", description: "08H30"},
                { heure: "09:00:00", description: "09H00"},
                { heure: "09:30:00", description: "09H30"},
                { heure: "10:00:00", description: "10H00"},
                { heure: "10:30:00", description: "10H30"},
                { heure: "11:00:00", description: "11H00"},
                { heure: "11:30:00", description: "11H30"},
                { heure: "12:00:00", description: "12H00"},
                { heure: "12:30:00", description: "12H30"},
                { heure: "13:00:00", description: "13H00"},
                { heure: "13:30:00", description: "13H30"},
                { heure: "14:00:00", description: "14H00"},
                { heure: "14:30:00", description: "14H30"},
                { heure: "15:00:00", description: "15H00"},
                { heure: "15:00:00", description: "15H30"},
                { heure: "16:00:00", description: "16H00"},
                { heure: "16:30:00", description: "16H30"},
                { heure: "17:00:00", description: "17H00"},
                { heure: "17:30:00", description: "17H30"},
                { heure: "18:00:00", description: "18H00"},
                { heure: "18:30:00", description: "18H30"},
                { heure: "19:00:00", description: "19H00"},
                { heure: "19:30:00", description: "19H30"},
                { heure: "20:00:00", description: "20H00"},
                { heure: "20:30:00", description: "20H30"},
                { heure: "21:00:00", description: "21H00"},
                { heure: "21:30:00", description: "21H30"},
                { heure: "22:00:00", description: "22H00"},
                { heure: "22:30:00", description: "22H30"},
                { heure: "23:00:00", description: "23H00"},
                { heure: "23:30:00", description: "23H30"}, ],
      post_response: null,
      selectedDate: new Date(),
      heure_text: 'Sélectionner une heure',
      selectedHeure: 'Sélectionner une heure',
      animateur_text: 'Sélectionner un animateur',
      selectedAnimateur: 'Sélectionner un animateur'
    };
  },
  methods: {
    getCreneaux(){
      axios
        .get("http://localhost:3000/creneaux/" + this.momentDate(this.selectedDate) + this.selectedHeure.heure)
        .then(response => {
            this.creneaux = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    },
    createCreneau(){
      const creneau = {
        "date": this.momentDate(this.selectedDate),
        "heure": this.selectedHeure.heure,
        "idAnimateur": this.selectedAnimateur.id
      };
      axios
      .post("http://localhost:3000/creneaux", creneau)
      .then(response => {
          this.post_response = "Ce créneau a été bien donné à l'animateur";
      })
      .catch(error => {
          console.log(error);
      });
    },
    updateCreneau(){
      const creneau = {
        "date": this.momentDate(this.selectedDate),
        "heure": this.selectedHeure.heure,
        "idAnimateur": this.selectedAnimateur.id
      };
      axios
      .put("http://localhost:3000/creneaux/" + this.momentDate(this.selectedDate) + '/' + this.selectedHeure.heure, creneau)
      .then(response => {
          this.post_response = "Modification succès !";
      })
      .catch(error => {
          console.log(error);
      });
    },
    date(value) {
      moment.locale('fr');
      return moment(value).format('dddd, DD MMMM YYYY');
    },
    momentDate(value){
      return moment(value).format('YYYY-MM-DD');
    }
  },
  created(){
    axios
     .get("http://localhost:3000/animateurs")
      .then(response => {
          this.animateurs = response.data;
      })
      .catch(error => {
          console.log(error);
      });
  }
};
</script>

<style lang="scss">
.calendar-form{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  margin: 5%;
}
.calendar{
  grid-column: 1/2;
  height: 250px;
}
.calendar-form{
  grid-column: 2/3;
}
.form{
  display: flex;
  flex-direction: column;
  background-color: #2B4450;
  padding: 20px 50px;
  border: 2px solid #FFD600;
  border-radius: 10px;
  margin: 0 15%;
}
#times{
  width: 100%;
  font-size: 19px;
  padding: 15px 20px;
  margin-bottom: 10%;
  background-color: rgba(0,0,0,0.5);
  font-weight: bold;
  color: whitesmoke;
  border: none;
}
.vc-container {
  --day-content-height : 100px; // size of date cell - set your custom size here
  --day-content-width : 100px;
}
.form h1{
  color: whitesmoke;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 10%;
  margin-top: 40px;
}
button{
  background-color: green;
  border: 2px solid green;
  border-radius: 8px;
  width: fit-content;
  font-size: 18px;
  padding: 10px 30px;
  color: whitesmoke;
  font-weight: bold;
  margin-right: 20px;
}
#button-submit{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 50px;
}
#update{
  background-color: rgb(0, 106, 255);
  border: 1px solid rgb(0, 106, 255);
}
#update:hover {
  background-color: rgb(0, 106, 255, 0.6);
  border: 1px solid rgb(0, 106, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}
#programmer:hover{
  background-color: rgba(green, 0.6);
  border: 2px solid rgba(green, 0.2);
  color: rgba(255, 255, 255, 0.5);
}
#date{
  color: #FFD600;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
#response{
  color: greenyellow;
  text-align: center;
  margin-bottom: 40px;
}
#listCreneaux{
  color: white;
  margin-top: 50px;
}
</style>