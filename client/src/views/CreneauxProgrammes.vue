<template>
  <section>
    <HeaderAnimateur />
    <div id="creneaux-programmes-content">
      <h1>
        <u><strong>Mes créneaux programmés</strong></u>
      </h1>
      <ul class="programmes-content-list" >
        <li v-for="creneau  in creneaux" :key="creneau.idCreneau">
          <h3>{{creneau.title}} - {{creneau.titreEpisode}} - {{creneau.heure}} - {{creneau.date}}</h3>
          <router-link type="submit" class="btn-info" :to="{ name: 'DetailCreneauProgramme' }"><span>Voir plus</span></router-link>
        </li>
      </ul>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
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
  },
};
</script>
<style lang="scss"></style>
