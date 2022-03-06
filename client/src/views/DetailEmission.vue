<template>
  <section>
      <!-- Revoir ça 
      Recuperer uniquement les informations d'une émission sans l'id d'épisode etc.. voir pourquoi dans l'api
      --> 
    <HeaderPrincipal />
    <div id="detail-creneaux-programmes-content" v-if="emission">
      <h1>
        <u><strong>Nom de l'émission</strong></u>
      </h1>
      <h3>{{emission.nomEmission}}</h3>
      <h1>
        <u><strong>Animateur</strong></u>
      </h1>
      <h3>William</h3>
      <h1>
        <u><strong>Descriptions de l'émission</strong></u>
      </h1>
      <div class="description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          corrupti quasi vero ea eius molestiae natus nulla repellendus minus,
          harum ipsam adipisci aperiam. In est, porro molestias quo ex neque.
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
      emission : []
    };
  },
  created(){
      this.getEmission()
  },
  methods: {
    async getEmission() {
      try {
        const response = await axios.get(
          `http://localhost:3000/emissions/${this.idEmission}`
        );
        this.emission = response.data;
        console.log(this.emission);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
