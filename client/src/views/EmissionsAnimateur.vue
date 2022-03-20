<template>
  <section>
    <HeaderAnimateur />
    <div class="main">
      <h1 class="title">MES ÉMISSIONS</h1>
      <div class="btn-wrapper">
        <button id="add_btn" v-on:click="createEmission()"><h3>AJOUTER UNE ÉMISSION</h3></button>
        <router-link to="/CreneauxProgrammes"><button id="show_btn"><h3>MES CRÉNEAUX PROGRAMMÉS</h3></button></router-link>
      </div>
      <div class="emissions-wrapper">
        <div v-for="emission in emissions" :key="emission.idEmission" class="card-emission">
          <h2>{{emission.nomEmission}}</h2>
          <button class="read-more">Voir plus</button><img src="/img/bg-emission.png" rel="emission" />
        </div>
      </div>
      <div id="popup-programme" class="modal">
        <div class="modal-content">
            <span class="close" v-on:click="close()">&times;</span>
            <h3><u>NOM DE L'EMISSION</u></h3>
            <input type="text" id="inputEmission" v-model="inputEmission"/>

            <h3 class="margin"><u>DESCRIPTION L'EMISSION</u></h3>
            <textarea id="inputDesc" v-model="inputDesc"/>

            <h3 class="margin"><u>GENRE</u></h3>
            <input type="text" id="inputGenre" v-model="inputGenre"/>
            <p><button type="submit" v-on:click="confirmer()">Confirmer</button></p>
            <p>{{success}}</p>
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      idAnimateur : this.$store.state.idMembre,                                                 //remplacer plus tard avec l'id de l'animateur connecté, on suppose que c'est l'animateur 1 qui est connecté pour le moment
      emissions : [],
      inputDesc: "",
      inputEmission: "",
      inputGenre: "",
      success: ""
    }
  },
  mounted(){
    this.getEmissionById();
  },
  methods : {
      async getEmissionById() {
      try {
        const response = await axios.get(
          `http://localhost:3000/animateurs/${this.$store.state.idMembre}/emissions`
        );
        this.emissions = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    createEmission() {
      document.getElementById("add_btn").addEventListener('click', () => {
          document.getElementById("popup-programme").style.display = "block";
      });
    },
    close() {
        document.querySelectorAll(".close").forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                document.getElementById("popup-programme").style.display = "none";
            })
        })
        window.onclick = function (event) {
            if (event.target === document.getElementById("popup-programme")) {
                document.getElementById("popup-programme").style.display = "none";
            }
        }
    },
    confirmer(){
      let data = {
        nomEmission: this.inputEmission,
        description: this.inputDesc,
        genre: this.inputGenre,
        idAnimateur: this.idAnimateur
      };

      axios
        .post("http://localhost:3000/emissions", data)
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
  .title {
    color: white;
    margin: 2em auto 5em auto;
    text-decoration: underline;
    background-color: #464141;
    border: 2px solid #ff3535;
    padding: 20px 40px;
    border-radius: 20px;
    font-size: 20px;
    width: fit-content;
    text-align: center;
  }
  .emissions-wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 3em 0 0em 0em;
    .card-emission {
      position: relative;
      height: 500px;
      flex-basis: 40%;
      margin: 4em 0 2em 0;
      background-color: rgb(156, 27, 27);
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        position: absolute;
        top: 15%;
        width : fit-content;
        color: white;
      }
      .read-more {
        font-weight: bold;
        font-size: 16px;
        position: absolute;
        top: 60%;
        width: 20%;
        margin: 0em 40% 0em 40%;
        border: 1px solid black;
        border-radius: 20px;
        padding: 1em 1em;
        cursor: pointer;
        &:hover {
          background-color: black;
          color: white;
        }
      }
      img {
        width: 100%;
        height: 500px;
      }
    }
  }
  .btn-wrapper {
    width : 80%;
    margin : 2em 10% 0 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #show_btn {
      width: 344px;
      height: 64px;
      left: 1044px;
      top: 339px;
      background: #42a542;
      box-sizing: border-box;
      border-radius: 10px;
      border : none;
      cursor: pointer;
      &:hover{
         background: #8ae78a;
      }
    }
    #add_btn {
      width: 300px;
      height: 64px;
      left: 52px;
      top: 343px;
      background: #25a2ca;
      box-sizing: border-box;
      border-radius: 10px;
      border : none;
      cursor: pointer;
        &:hover{
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
