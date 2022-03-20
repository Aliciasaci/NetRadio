<template>
  <section>
    <div v-if="this.$store.state.idMembre == idAnimateur && this.$store.state.token">
    <HeaderAnimateur />
    </div>
    <div v-else>
    <HeaderPrincipal />
    </div>
  <div id="podcast-content">
        <div id="podcast-content-profile">
            <img :src="avatar(animateur)" alt="img-profil">
            <div id="podcast-content-profile-info">
                <div id="podcast-content-profile-info-detail">
                    <h3><strong></strong>{{animateur.fullNameAnimateur}}</h3>
                    <p><strong></strong>{{animateur.descAnimateur}}</p>
                </div>
                <div id="podcast-content-profile-info-btn" v-if="this.$store.state.status != 'animateur'">
                    <button type="submit" id="btn-subscribe">s'abonner</button>
                    <img src="/img/notification.png" alt="Notification">
                </div>
                <div id="podcast-content-profile-info-btn" v-else>
                    <button type="submit" id="btn-update">Modifier</button>
                </div>
            </div>
        </div>
        <div id="podcast-content-info">
                <div id="podcast-content-mypodcast-title">
                    <h3>PODCASTS DE "{{animateur.fullNameAnimateur}}"</h3>
                </div>
                <div id="podcast-content-mypodcast-emissions">
                    <div  v-for="emission  in emissions" :key="emission.idEmission" class="podcast-content-mypodcast-emission">
                        <div class="podcast-content-mypodcast-emission-head">
                              <router-link :to="{name : 'DetailEmission', params :{id: emission.idEmission}}"><h5><u>EMISSION : {{emission.nomEmission}}</u></h5></router-link>
                            <!-- <img src="/img/favoris.png" alt="Favoris"> -->
                        </div>
                     <podcast :emission="emission"/>
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
      emissions: [],
      idAnimateur: "",
    };
  },
  mounted() {
    this.getAnimateur();
    this.getEmissionsByAnimateur();
  },
  methods: {
    // Récuperer toutes les émissions de l'animateur actuelle
    async getEmissionsByAnimateur() {
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
        ); 
        this.animateur = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
