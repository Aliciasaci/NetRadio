<template>
  <section>
    <HeaderAnimateur />
    <div class="main">
      <h1 class="title">MES ÉMISSIONS</h1>
            <h3 style="color : red">{{deleteMessage}}</h3>
      <div class="btn-wrapper-top">
        <button id="add_btn" v-on:click="createEmission()"><h3>AJOUTER UNE ÉMISSION</h3></button>
        <router-link to="/CreneauxProgrammes"><button id="show_btn">
            <h3>MES CRÉNEAUX PROGRAMMÉS</h3>
          </button></router-link>
      </div>
      <div class="emissions-wrapper">
        <div v-for="emission in emissions" :key="emission.idEmission" class="card-emission">
          <img src="../../public/img/mic.jpg" />
          <h3>{{ emission.nomEmission }}</h3>
          <div class="btn-wrapper-bottom">
              <button @click="voirDetail(emission.idEmission)" id="btn-info" type="submit">
              Voir plus
            </button>
            <button @click="modifierDetail(emission.idEmission)" id="btn-update" type="submit">
              Modifier
            </button>
            <button @click="supprimerEmission(emission.idEmission)" id="btn-delete">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
    <div id="popup-programme-create" class="modal">
        <div class="modal-content">
            <span class="close" v-on:click="closeCreate()">&times;</span>
            <h3><u>NOM DE L'EMISSION</u></h3>
            <input type="text" id="inputEmission" v-model="inputEmission"/>

            <h3 class="margin"><u>DESCRIPTION L'EMISSION</u></h3>
            <textarea id="inputDesc" v-model="inputDesc"/>

            <h3 class="margin"><u>GENRE</u></h3>
            <input type="text" id="inputGenre" v-model="inputGenre"/>
            <p><button type="submit" v-on:click="confirmerCreate()">Confirmer</button></p>
            <p>{{success}}</p>
        </div>
      </div>
    <!-- Détail émission -->
    <div id="popup-programme" class="modal" v-if="emission_data">
      <div class="modal-content">
        <span class="close" v-on:click="close()">&times;</span>
        <h3><u>NOM DE L'EMISSION</u></h3>
        <p>{{ emission_data.nomEmission }}</p>

        <h3><u>GENRE</u></h3>
        <p>{{ emission_data.genre }}</p>

        <h3><u>DESCRIPTION DE L'EMISSION</u></h3>
        <p>{{ emission_data.description }}</p>
      </div>
    </div>
   <!-- Modifier émission -->
    <div id="popup-modifier-emission" class="modal" v-if="emission_data">
      <div class="modal-content">
        <span class="close" v-on:click="closeUpdate()">&times;</span>
        <h3><u>NOM DE L'EMISSION</u></h3>
        <textarea
          rows="1"
          cols="50"
          type="text"
          id="inputEpisode"
          style="font-size: 20px; text-align: center"
          v-model="emission_data.nomEmission"
        ></textarea>

        <h3><u>GENRE</u></h3>
        <textarea
          rows="1"
          cols="50"
          type="text"
          id="inputEpisode"
          style="font-size: 20px; text-align: center"
          v-model="emission_data.genre"
        ></textarea>

        <h3><u>DESCRIPTION DE L'EMISSION</u></h3>
        <textarea rows="5" cols="50" type="text" id="inputEpisode" style="font-size: 20px; text-align: center" v-model="emission_data.description"
        ></textarea>
        <p><button class="btn-confirm" type="submit" v-on:click="confirmer(emission_data.idEmission)">Confirmer</button></p>
        <p style="color : green">{{success}}</p>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
export default {
  data() {
    return {
      idAnimateur: this.$store.state.idMembre,
      emissions: [],
      emission_data: null,
      success : null,
      deleteMessage : null,
    };
  },
  mounted() {
    this.getEmissionByAnimateur();
  },
  methods: {
    voirDetail(id) {
      this.getEmissionById(id);
      document.querySelectorAll("#btn-info").forEach((programmeBtn) => {
        programmeBtn.addEventListener("click", () => {
          document.getElementById("popup-programme").style.display = "block";
        });
      });
    },
    createEmission() {
      document.getElementById("add_btn").addEventListener('click', () => {
          document.getElementById("popup-programme-create").style.display = "block";
      });
    },
    modifierDetail(id) {
      this.getEmissionById(id);
      document.querySelectorAll("#btn-update").forEach((programmeBtn) => {
        programmeBtn.addEventListener("click", () => {
          document.getElementById("popup-modifier-emission").style.display =
            "block";
        });
      });
    },
    close() {
      document.querySelectorAll(".close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          document.getElementById("popup-programme").style.display = "none";
        });
      });
      window.onclick = function (event) {
        if (event.target === document.getElementById("popup-programme")) {
          document.getElementById("popup-programme").style.display = "none";
        }
      };
    },
    closeCreate() {
      document.querySelectorAll(".close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          document.getElementById("popup-programme-create").style.display = "none";
        });
      });
      window.onclick = function (event) {
        if (event.target === document.getElementById("popup-programme")) {
          document.getElementById("popup-programme-create").style.display = "none";
        }
      };
    },
    closeUpdate() {
      document.querySelectorAll(".close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          document.getElementById("popup-modifier-emission").style.display =
            "none";
        });
      });
      window.onclick = function (event) {
        if (event.target === document.getElementById("popup-programme")) {
          document.getElementById("popup-modifier-emission").style.display =
            "none";
        }
      };
    },
    getEmissionById(id) {
      this.$api
        .get("emissions/" + id)
        .then((response) => {
          this.emission_data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getEmissionByAnimateur() {
      try {
        const response = await this.$api.get(
          `animateurs/${this.idAnimateur}/emissions`
        );
        this.emissions = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    confirmer(idEmission) {
      const emission = {
        nomEmission: this.emission_data.nomEmission,
        description: this.emission_data.description,
        genre: this.emission_data.genre,
        idAnimateur: this.$store.state.idMembre,
      };

      this.$api
        .put(`emissions/${idEmission}`,emission)
        .then((response) => {
          console.log(response);
          this.success = "Votre émission a été modifiée";
        })
        .catch((error) => {
          console.log(error);
        });
    },
     supprimerEmission(idEmission) {
      this.$api
        .delete(`emissions/${idEmission}`)
        .then((response) => {
          this.deleteMessage = "Votre émission a bien été supprimée";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmerCreate(){
      let data = {
        nomEmission: this.inputEmission,
        description: this.inputDesc,
        genre: this.inputGenre,
        idAnimateur: this.idAnimateur
      };

      this.$api
        .post("emissions", data)
        .then(response => {
            this.success = "Cette émission a été bien ajoutée";
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.main {
  padding-bottom: 100px;
  text-align: center;
  .title {
    color: white;
    margin: 2em auto 5em auto;
    text-decoration: underline;
    background-color: #464141;
    padding: 20px 40px;
    border-radius: 20px;
    font-size: 20px;
    width: fit-content;
    text-align: center;
    border : 1px solid red;
  }
  .emissions-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-wrap: wrap;
    .card-emission {
      height: 200px;
      flex-basis: 23%;
      margin: 4em 0 2em 0;
      background-color: rgb(71, 67, 67);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      height : 300px;
      img {
        width: 100%;
      }
      h3 {
        width: fit-content;
        color: white;
        font-size: 25px;
        position: absolute;
        top: 5px;
      }
      .btn-wrapper-bottom {
        display: flex;
        position: absolute;
        bottom: 10px;
        align-items: space-between;
        #btn-info {
          background-color: rgba(0, 0, 0);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 0 20px 0 20px;
          color: white;
          cursor: pointer;
          margin : 0 0.7em 0 0.7em;
        }
        #btn-update {
          background-color: rgba(37, 150, 43);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 20px 20px 20px 20px;
          color: white;
          cursor: pointer;
          margin : 0 0.7em 0 0.7em;
        }
        #btn-delete{
           background-color: rgb(177, 43, 43);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 0 20px 0 20px;
          color: white;
          cursor: pointer;
          margin : 0 0.7em 0 0.7em;
        }
      }
    }
  }
  .btn-wrapper-top {
    width: 80%;
    margin: 2em 10% 0 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #show_btn {
      width: 300px;
      height: 64px;
      left: 1044px;
      top: 339px;
      background: #42a542;
      box-sizing: border-box;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      &:hover {
        background: #8ae78a;
      }
    }
    #add_btn {
      width: 250px;
      height: 64px;
      left: 52px;
      top: 343px;
      background: #25a2ca;
      box-sizing: border-box;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      &:hover {
        background: #77aec0;
      }
    }
  }
}
#inputGenre{
    width: 50%;
    padding: 5px 10px;
    font-size: 15px;
     margin: 2% auto auto auto;
}

#inputEmission{
    width: 50%;
    padding: 5px 10px;
    font-size: 15px;
    margin: 2% auto auto auto;
}

#inputDesc{
    width: 50%;
    height: 50px;
    padding: 5px 10px;
    font-size: 15px;
    margin: 2% auto auto auto;
}

.margin{
    margin-top: 8%;
}
</style>
