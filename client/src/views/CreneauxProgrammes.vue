<template>
  <section>
    <HeaderAnimateur />
    <div id="creneaux-programmes-content">
      <h1>
        <u><strong>Mes créneaux programmés</strong></u>
      </h1>
      <ul class="programmes-content-list" >
        <div v-for="creneau in creneaux" :key="creneau.idCreneau">
        <li>
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
      idAnimateur : this.$store.state.idMembre,
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
        this.creneaux = response.data.filter(creneauxFiltered => creneauxFiltered.idEmission != null && creneauxFiltered.idEpisode != null 
                                && this.momentDate(creneauxFiltered.date) >= this.date() 
                                && ((creneauxFiltered.heure <= this.getCurrentTime() && this.getCurrentTime() < this.getTimePlus30Min(creneauxFiltered.heure)) 
                                || creneauxFiltered.heure > this.getCurrentTime()));
        console.log(this.momentDate(creneauxFiltered.date));      
      } catch (err) {
      }
    },
    date(value) {
      if (value) {
          moment.locale('fr');
          return moment(String(value)).format('dddd, DD MMMM YYYY');
      } else {
          moment.locale('fr');
          return moment().format('YYYY-MM-DD');
      }
    },
    momentDate(value){
       moment.locale('fr');
       return moment(String(value)).format('YYYY-MM-DD');
    },
    getCurrentTime(){
      const today = new Date();
      return today.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
    },
    getTimePlus30Min(emission_time){
        const plus30 = moment(emission_time, 'HH:mm:ss A').add(30, 'minutes').format('HH:mm:ss');
        return plus30;
    },
  },

};
</script>
<style lang="scss">
#creneaux-programmes-content .programmes-content-list li .btn-info{
  padding-top: 20px;
}
</style>



