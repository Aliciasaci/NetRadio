<template>
  <section name="fade" v-if="emission">
      <ul v-for="episode in episodes" :key="episode.idEpisode" class="podcast-content-mypodcast-emission-list">
        <li>
          <router-link :to="{ name: 'Play', params: { id: episode.idEpisode } }" style="margin: 15px 0 0 120px" >
            <h3>{{ episode.titreEpisode }}</h3>
          </router-link>
          <div class="btn-wrapper" v-if="$store.state.status == 'animateur' ">
            <div  @click="deleteEpisode(episode.idEpisode)">
              <img src="../../public/img/trash-bin.png" id="icone-delete" />
            </div>
          </div>
        </li>
      </ul>
  </section>
</template>

<script>
export default {
  props: ["emission"],
  data() {
    return {
      episodes: [],
      messageDelete : "",
    };
  },
  mounted() {
    this.getEpisodes();
  },
  methods: {
    //   Get All episodes
    getEpisodes() {
      this.$api
        .get(
          `emissions/${this.emission.idEmission}/episodes`
        )
        .then((response) => {
          this.episodes = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteEpisode(idEpisode){
      if(confirm("êtes-vous sûre de vouloir supprimer cet episode ?")){
      this.$api
        .delete(`episodes/${idEpisode}`)
        .then((response) => {
          this.$router.go()
          this.messageDelete = "Votre Episode a bien été supprimé";
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.podcast-content-mypodcast-emission-list a {
  text-decoration: none;
  color: white;
}

.podcast-content-mypodcast-emission-list li {
  // display: flex;
  justify-content: space-around;
  background-color: #7b2020;
  width : 70%;
  margin : auto;
}
.podcast-content-mypodcast-emission-list li a {
  list-style: none;
  text-decoration: none;
  height: 90px;
  flex-basis: 80%;
}
.btn-wrapper {
  width: 10%;
  #icone-delete {
    height: 40px;
    width: 40px;
    margin-right: 12em;
    margin-top : 1em;
  }
}
#messageDelete{
  text-align: center;
  color : red;
}
</style>
