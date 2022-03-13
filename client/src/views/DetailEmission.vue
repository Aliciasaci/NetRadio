<template>
  <section>
    <HeaderPrincipal />
    <div id="detail-creneaux-programmes-content" v-if="emission">
      <h1>
        <u><strong>Nom de l'émission</strong></u>
      </h1>
      <h3>{{emission.nomEmission}}</h3>
      <h1>
        <u><strong>Animateur</strong></u>
      </h1>
      <h3>{{animateur.fullNameAnimateur}}</h3>
      <h1>
        <u><strong>Descriptions de l'émission</strong></u>
      </h1>
      <div class="description">
        <p>
         {{emission.description}}
        </p>
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
      idEmission: this.$route.params.id,
      emission : [],
      animateur : [],
    };
  },
  created(){
      this.getEmission()
  },
  methods: {
    async getEmission() {
      try {
        const response = await axios.get(
          `http://localhost:3000/emission/${this.idEmission}`
        );
        this.emission = response.data[0];
        this.getAnimateur(response.data[0].idAnimateur)
      } catch (err) {
        console.log(err);
      }
    },
     async getAnimateur(idAnimateur) {
      try {
        const response = await axios.get(
          `http://localhost:3000/animateurs/${idAnimateur}`
        );
        this.animateur = response.data;
      } catch (err) {
        console.log(err);
      }
    },

  },
};
</script>

<style></style>
