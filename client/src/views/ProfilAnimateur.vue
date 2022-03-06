<template>
  <section>
    <HeaderAnimateur />
  <div id="podcast-content">
        <div id="podcast-content-profile">
            <img src="" alt="George">
            <div id="podcast-content-profile-info">
                <div id="podcast-content-profile-info-detail">
                    <p><strong>Nom : </strong>{{animateur.fullNameAnimateur}}</p>
                    <p><strong>Description : </strong>{{animateur.descAnimateur}}</p>
                </div>
                <div id="podcast-content-profile-info-btn">
                    <button type="submit" id="btn-subscribe">S'abonner</button>
                    <img src="/img/notification.png" alt="Notification">
                </div>
            </div>
        </div>
        <div id="podcast-content-info">
            <!-- <div id="podcast-content-announcement">
                <div id="podcast-content-announcement-title">
                    <h5><u>Annonces à la une !</u></h5>
                </div>
                <div id="podcast-content-announcement-content">
                    <ul>
                        <li>Annonce 1</li>
                        <li>Annonce 2</li>
                        <li>Annonce 3</li>
                    </ul>
                </div>
            </div> -->
            <div id="podcast-content-mypodcast">
                <div id="podcast-content-mypodcast-title">
                    <h4>ÉMISSIONS ET PODCASTS DE "{{animateur.fullNameAnimateur}}"</h4>
                </div>
                <div id="podcast-content-mypodcast-emissions">
                    <div  v-for="emission  in emissions" :key="emission.idEmission" class="podcast-content-mypodcast-emission">
                        <div class="podcast-content-mypodcast-emission-head">
                            <h5><u>EMISSION : {{emission.nomEmission}}</u></h5>
                            <img src="/img/favoris.png" alt="Favoris">
                        </div>
                     <podcast :emission="emission"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
import Podcast from "../components/Podcast.vue";
export default {
  components: {
    Podcast
  },
  data() {
    return {
      audio: "",
      lien: "",
      animateur: "",
      episodes: [],
      emissions: [],
      idAnimateur: "",
    };
  },
  mounted() {
    this.getAnimateur();
    this.getEmissions();
  },
  methods: {
    // Récuperer toutes les émissions de l'animateur actuelle
    async getEmissions() {
      try {
        const response = await axios.get(
          `http://localhost:3000/animateurs/${this.idAnimateur}/emissions/`
        );
        this.emissions = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    //Get les informations d'un animateur
    async getAnimateur() {
      try {
        this.idAnimateur = this.$route.params.id;
        const response = await axios.get(
          `http://localhost:3000/animateurs/${this.idAnimateur}`
        ); //on recupère les infos de l'animateur 1 pour exemple
        this.animateur = response.data;
        // console.log(this.animateur.emailAnimateur);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
#podcast-content-mypodcast-title{
  padding: 0 30px;
}
</style>
