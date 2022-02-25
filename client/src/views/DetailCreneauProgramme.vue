<template>
  <section>
    <HeaderAnimateur />
    <div id="detail-creneaux-programmes-content">
      <h1>
        <u><strong>Nom de l'émission</strong></u>
      </h1>
      <h3>{{creneau.title}} _ {{creneau.titreEpisode}}</h3>
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
      <router-link :to="{ name: 'BordAnimateur', params :{id: creneau.idCreneau} ,query: { idEmission: creneau.idEmission, titleEmission : creneau.title}}"><button class="btn-start">Lancer l'émission</button></router-link>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      creneau : [],
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
  }
};
</script>

<style></style>
