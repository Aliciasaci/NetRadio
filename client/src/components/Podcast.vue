<template>
<section v-if="emission">
    <ul  v-for="episode  in episodes" :key="episode.idEpisode" class="podcast-content-mypodcast-emission-list">
        <router-link :to="{name : 'Play', params :{id: episode.idEpisode}}" style='margin: 15px 0 0 120px'>
        <li>
          <h3>{{episode.titreEpisode}}</h3>
          <div @click="alert(episode.idEpisode)"><img src="../../public/img/trash-bin.png" id="icone-delete"></div>
          <div><img src="../../public/img/edit.png" id="icone-update"></div>
        </li>
          </router-link>

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
    deleteEpisode(idEpisode){
      console.log(idEpisode);
    }
    }
}
</script>

<style lang='scss'>
.podcast-content-mypodcast-emission-list a {
  text-decoration: none;
  color : white;
}

.podcast-content-mypodcast-emission-list a li #icone-delete{
  height: 40px;
  width : 40px;
  margin-right : 10em;
  z-index: 1;
}

.podcast-content-mypodcast-emission-list a li #icone-update{
  height: 45px;
  width : 45px;
  margin-right : 14em;
  z-index: 1;
}


</style>