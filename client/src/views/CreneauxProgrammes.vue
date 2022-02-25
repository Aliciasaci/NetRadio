<template>
  <section>
    <HeaderAnimateur />
    <div id="creneaux-programmes-content">
      <h1>
        <u><strong>MES CRÉNEAUX PROGRAMMÉS</strong></u>
      </h1>
      <ul class="programmes-content-list" >
        <li v-for="creneau  in creneaux" :key="creneau.idCreneau">
          <h3>{{creneau.nomEmission}} - {{creneau.titreEpisode}} : {{date(creneau.date) + ' à '}} {{creneau.heure.substr(0,2) + 'H' + creneau.heure.substr(3,2)}}</h3>
          <router-link type="submit" class="btn-info" :to="{ name: 'DetailCreneauProgramme' }"><span>Voir plus</span></router-link>
        </li>
      </ul>
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
      test: false,
      idAnimateur : 1,
      creneaux : []
    };
  },
  mounted() {
    this.getCreneauxByAnimateur();
  },
  methods: {
    async getCreneauxByAnimateur() {
      try {
        const response = await axios.get(`http://localhost:3000/animateurs/${this.idAnimateur}/creneaux`);
        this.creneaux = response.data;
        console.log(this.creneaux);
      } catch (err) {
        console.log(err);
      }
    },
    date(value) {
      return moment(value).format('dddd, DD MMMM YYYY');
    }
  },
};
</script>
<style lang="scss">
#creneaux-programmes-content .programmes-content-list li .btn-info{
  padding-top: 20px;
}
</style>
