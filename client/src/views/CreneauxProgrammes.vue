<template>
  <section>
    <HeaderAnimateur />
    <div id="creneaux-programmes-content">
      <h1>
        <u><strong>Mes créneaux programmés</strong></u>
      </h1>
      <ul class="programmes-content-list" >
        <div v-for="creneau  in creneaux" :key="creneau.idCreneau">
        <li v-if="creneau.nomEmission != null && creneau.titreEpisode != null">
            <h3>{{creneau.nomEmission}} - {{creneau.titreEpisode}} : {{date(creneau.date) + ' à '}} {{creneau.heure.substr(0,2) + 'H' + creneau.heure.substr(3,2)}}</h3>
            <router-link type="submit" class="btn-info" :to="{ name: 'DetailCreneauProgramme', params :{id: creneau.idCreneau}}"><span>Voir plus</span></router-link>
        </li>
        </div>
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
      creneaux : [],
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
      } catch (err) {
      }
    },
    date(value) {
      moment.locale('fr');
      return moment(value).format('dddd, DD MMMM YYYY');
    },
  },

};
</script>
<style lang="scss">
#creneaux-programmes-content .programmes-content-list li .btn-info{
  padding-top: 20px;
}
</style>



