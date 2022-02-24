<template>
  <section>
    <HeaderPrincipal />
    <div id="podcasts-content">
      <div id="podcasts-content-title">
        <h1><u>LISTE DES PODCASTS</u></h1>
      </div>
      <div id="podcasts-content-list">
        <ul v-for="animateur in animateurs" :key="animateur.idAnimateur">
         <router-link :to="{name : 'Podcast', params :{id: animateur.idAnimateur}}">
            <li>Podcasts {{animateur.fullNameAnimateur}}</li>
        </router-link>
        </ul>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        animateurs : [],

    };
  },
  created(){
      this.getAnimateur()
  },
  methods : {
    //Get les informations d'un animateur
    async getAnimateur() {
      try {
        const response = await axios.get("http://localhost:3000/animateurs");
        this.animateurs = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
