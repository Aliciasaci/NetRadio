<template>
  <section>
   <div v-if="this.$store.state.status == 'animateur' && this.$store.state.token">
    <HeaderAnimateur />
    </div>
    <div v-else>
    <HeaderPrincipal />
    </div>
    <div id="ledirect-content">
      <div id="ledirect-content-title">
        <h1><u>{{emission.nomEmission}} - {{episode.titreEpisode}}</u></h1>
      </div>
      <div id="ledirect-content-img">
        <img src="/img/emission.jpg" alt="image emission" />
      </div>
      <div>
        <img id="btn_play" src="/img/play.png" rel="play" @click="play" />
      </div>
      <audio id="audio" src=""></audio>
      <!-- <button type="submit" id="btn-stop">Arrêter d'écouter</button> -->
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      audio: "",
      lien: "",
      episode: [],
      emission: [],
    };
  },
  mounted() {
    this.getEpisodeById();
  },
  methods: {
    async getEpisodeById() {
      try {
        const response = await this.$api.get(
          `episodes/${this.$route.params.id}`
        );
        this.episode = response.data;
        this.getEmissionById(this.episode.idEmission);
      } catch (err) {
        console.log(err);
      }
    },

    async getEmissionById(id) {
      try {
        const response = await this.$api.get(
          `emissions/${id}`
        );
        this.emission = response.data;
      } catch (err) {
        console.log(err);
      }
    },

     async play() {
      this.audio = document.querySelector("#audio");
      this.audio.type = "audio/mp3";
      this.audio.setAttribute("controls", "");
      this.episode.lien = this.episode.lien.replace("www", "dl");
      this.audio.src = this.episode.lien;
      try {
        await audio.play();
        console.log("Playing...");
      } catch (err) {
        console.log("Failed to play..." + err);
      }
    },
  },
};
</script>

<style lang="scss">
#btn_play {
  cursor: pointer;
}

#ledirect-content{
  padding-bottom: 70px;
}
</style>
