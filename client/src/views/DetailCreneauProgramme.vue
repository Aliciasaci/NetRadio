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
      <router-link v-if="(this.dateFormatted == this.current_date) && (creneau.heure <= current_time) && (current_time < getTimePlus30Min(creneau.heure))" :to="{ name: 'BordAnimateur', params :{id: creneau.idCreneau} ,query: { idEmission: creneau.idEmission, titleEmission : creneau.nomEmission, titleEpisode : creneau.titreEpisode}}"><button class="btn-start">Lancer l'émission</button></router-link>
      <div v-else><h2>Vous ne pouvez pas encore lancer cette émission.</h2></div>
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
      dateFormatted : "",
      current_time: this.getCurrentTime(),
      current_date: this.getCurrentDate()
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
        this.dateFormatted = this.momentDate(this.creneau.date)
      } catch (err) {
        console.log(err);
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
    getCurrentDate() {
                moment.locale('fr');
                return moment().format('YYYY-MM-DD');
        },
    getCurrentTime(){
            const today = new Date();
            return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
    },
    getTimePlus30Min(emission_time){
            console.log(emission_time.substring(0,2) + emission_time.substring(3,5) + emission_time.substring(6,8))
            const plus30 = moment(emission_time, 'HH:mm:ss A').add(30, 'minutes').format('HH:mm:ss');
            return plus30;
    }
  }
};
</script>

<style lang="scss">
h2{
  color : red;
}
</style>
