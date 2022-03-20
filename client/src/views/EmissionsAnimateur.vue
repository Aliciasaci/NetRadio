<template>
  <section>
    <HeaderAnimateur />
    <div class="main">
      <h1 class="title">MES ÉMISSIONS</h1>
      <div class="btn-wrapper">
        <router-link to="/AjouterEmission"
          ><button id="add_btn">
            <h3>AJOUTER UNE ÉMISSION</h3>
          </button></router-link
        >
        <router-link to="/CreneauxProgrammes"
          ><button id="show_btn">
            <h3>MES CRÉNEAUX PROGRAMMÉS</h3>
          </button></router-link
        >
      </div>
      <div class="emissions-wrapper">
        <div
          v-for="emission in emissions"
          :key="emission.idEmission"
          class="card-emission"
        >
          <h3>{{ emission.nomEmission }}</h3>
          <div class="btn-wrapper">
            <button @click="voirDetail(emission.idEmission)" id="btn-info" type="submit">
              Voir plus
            </button>
            <button @click="modifierDetail(emission.idEmission)" id="btn-update" type="submit">Modifier</button>
          </div>
        </div>
      </div>
    </div>
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
     <div id="popup-modifier-emission" class="modal" v-if="emission_data">
      <div class="modal-content">
        <span class="close" v-on:click="closeUpdate()">&times;</span>
        <h3><u>NOM DE L'EMISSION</u></h3>
          <textarea rows="1" cols="50" type="text" id="inputEpisode" style="font-size: 20px; text-align: center" v-model="emission_data.nomEmission"></textarea>

        <h3><u>GENRE</u></h3>
          <textarea rows="1" cols="50"  type="text" id="inputEpisode"  style="font-size: 20px; text-align: center" v-model="emission_data.genre"></textarea>

        <h3><u>DESCRIPTION DE L'EMISSION</u></h3>
          <textarea rows="5" cols="50" type="text" id="inputEpisode" style="font-size: 20px; text-align: center" v-model="emission_data.description"></textarea>
       <p><button type="submit" v-on:click="confirmer(emission_data)">Confirmer</button></p>
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
      idAnimateur: this.$store.state.idMembre,
      emissions: [],
      emission_data: null,
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
     modifierDetail(id) {
      this.getEmissionById(id);
      document.querySelectorAll("#btn-update").forEach((programmeBtn) => {
        programmeBtn.addEventListener("click", () => {
          document.getElementById("popup-modifier-emission").style.display = "block";
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
    closeUpdate() {
      document.querySelectorAll(".close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          document.getElementById("popup-modifier-emission").style.display = "none";
        });
      });
      window.onclick = function (event) {
        if (event.target === document.getElementById("popup-programme")) {
          document.getElementById("popup-modifier-emission").style.display = "none";
        }
      };
    },
    getEmissionById(id) {
      axios
        .get("http://localhost:3000/emissions/" + id)
        .then((response) => {
          this.emission_data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getEmissionByAnimateur() {
      try {
        const response = await axios.get(
          `http://localhost:3000/animateurs/${this.idAnimateur}/emissions`
        );
        this.emissions = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  confirmer(nouvelle_emisson){
            const emission = {
                nomEmission: this.emission_data.nomEmission,
                titreEpisode: this.emission_data.genre
                // titreEpisode: this.emission_data.genre
            };
            
            if(this.inputEpisode == null)
            {
                this.updateCreneau(date, heure, animateur, null);
                this.success = "Votre émission a été bien programmée";
            }
            else{
                axios
                    .post("http://localhost:3000/episodes", episode)
                    .then(response => {
                        this.updateCreneau(date, heure, animateur, response.data.insertId);
                        this.success = "Votre émission a été bien programmée";
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
};
</script>

<style lang="scss">
.main {
  padding-bottom: 100px;
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
  }
  .emissions-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card-emission {
      height: 300px;
      flex-basis: 20%;
      margin: 4em 0 2em 0;
      background-color: rgb(71, 67, 67);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      h3 {
        margin-top: 50px;
        width: fit-content;
        color: white;
        font-size: 25px;
      }
      .btn-wrapper {
        #btn-info {
          background-color: rgba(0, 0, 0, 0.55);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 20px;
          margin-top: 20px;
          margin-bottom: 21px;
          color: white;
          cursor: pointer;
        }
        #btn-update {
          background-color: rgba(37, 150, 43, 0.55);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 20px;
          margin-top: 20px;
          margin-bottom: 21px;
          color: white;
          cursor: pointer;
        }
      }
      img {
        width: 100%;
        height: 500px;
      }
    }
  }
  .btn-wrapper {
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
</style>
