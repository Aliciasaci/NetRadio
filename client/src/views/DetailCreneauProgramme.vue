<template>
  <section>
    <HeaderAnimateur />
    <div id="detail-creneaux-programmes-content">
      <h1>
        <u><strong>Nom de l'émission</strong></u>
      </h1>
      <h3>{{creneau.nomEmission}} _ {{creneau.titreEpisode}}</h3>
      <h1>
        <u><strong>Date et heure de l'émission</strong></u>
      </h1>
      <h3>{{dateFormatted}} à {{creneau.heure}}</h3>
      <h1>
        <u><strong>Descriptions de l'émission</strong></u>
      </h1>
      <div class="description">
        <p>
          {{creneau.description}}
        </p>
      </div>
      <button class="btn-start" @click="checkCreneau()">
        Lancer l'émission
        <router-link :to="{ name: 'BordAnimateur', params :{id: creneau.idCreneau} ,query: { idEmission: creneau.idEmission, titleEmission : creneau.titre}}"></router-link>
      </button>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      creneau : [],
      emission: "",
      dateFormatted : ""
    };
  },
  mounted() {
    this.getCreneauInformationsById()
  },
  methods: {
    async getCreneauInformationsById() {
      try {
        let idCreneau = this.$route.params.id;
        const response = await axios.get(
          `http://localhost:3000/creneau/${idCreneau}`
        );
        this.creneau = response.data[0]
        this.formatDate(this.creneau.date)
      } catch (err) {
        console.log(err);
      }
    },
     formatDate(date) {
       this.dateFormatted = date.substring(0,10);
       let year = this.dateFormatted.substring(0,4);
       let month = this.dateFormatted.substring(5,7)
       let day = this.dateFormatted.substring(8,10)
       this.dateFormatted = day+"/"+month+"/"+year
    },
    getCurrentTime(){
          const today = new Date();
          return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
      },
    momentDate(){
          return moment().format('YYYY-MM-DD');
    },
    checkCreneau(){
      axios
        .get("http://localhost:3000/creneaux/" +  this.momentDate() + '/' + this.getCurrentTime())
        .then(response => {
            this.emission = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
};
</script>

<style></style>
