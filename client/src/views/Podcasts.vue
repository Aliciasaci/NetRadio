<template>
  <section>
    <HeaderPrincipal />
    <div id="podcasts-content">
      <div id="podcasts-content-title">
        <h1><u>PODCASTS</u></h1>
      </div>
      <div>
        <ul id="podcasts-content-list" >
          <li v-for="animateur in animateurs" :key="animateur.idAnimateur">
             <router-link :to="{name : 'Podcast', params :{id: animateur.idAnimateur}}">
                <img :src="avatar(animateur)" rel="podcast">
                <h3>{{animateur.fullNameAnimateur}}</h3>
            </router-link>
        </li>
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
      this.getAllAnimateur()
  },
  methods : {
    //Get les informations d'un animateur
    async getAllAnimateur() {
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
