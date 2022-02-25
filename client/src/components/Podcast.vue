<template>
<section v-if="emission">
    <ul  v-for="episode  in episodes" :key="episode.idEpisode" class="podcast-content-mypodcast-emission-list">
        <li>
          <h5>{{episode.titreEpisode}}</h5>
          <router-link :to="{name : 'Play', params :{id: episode.idEpisode}}" style='margin: 15px 0 0 120px'><img src="/img/play.png" alt="Réecouter podcast"/></router-link>
          <!-- <img src="/img/telecharger.png" alt="Télécharger podcast" /> -->
        </li>
      </ul>
</section>
</template>

<script>
import axios from "axios";
export default {
    props : ["emission"],
    data(){
        return {
            episodes : [],
        }
    },
    mounted(){
    this.getEpisodes();
    },
    methods : {
    //   Get All episodes
    async getEpisodes() {
      try {
        const response = await axios.get(`http://localhost:3000/emissions/${this.emission.idEmission}/episodes`);
        this.episodes = response.data;
        console.log(this.episodes);
      } catch (err) {
        console.log(err);
      }
    },
    }
}
</script>

<style lang='scss'>
.podcast-content-mypodcast-emission-list li:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    cursor: pointer;
}
</style>