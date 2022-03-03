<template>
  <section>
    <HeaderPrincipal />
    <div id="ledirect-content">
      <div id="ledirect-content-title">
        <h1><u>{{emission.nomEmission}} - {{episode.titreEpisode}}</u></h1>
      </div>
      <div id="ledirect-content-img">
        <img src="/img/lejournal.png" alt="Le journal" />
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
        const response = await axios.get(
          `http://localhost:3000/episodes/${this.$route.params.id}`
        );
        this.episode = response.data;
        this.getEmissionById(this.episode.idEmission);
      } catch (err) {
        console.log(err);
      }
    },

    async getEmissionById(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/emissions/${id}`
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
