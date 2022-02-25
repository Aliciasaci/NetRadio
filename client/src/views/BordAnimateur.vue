<template>
  <section>
    <HeaderAnimateur />
    <div class="wrapper">
      <div class="main">
        <div class="live">
          <h1 class="title">{{titleEmission}}</h1>
          <span :class="{ liveicon: isActive }"></span>
          <img src="img/live.jpg" />
          <div class="btn">
            <button @click="startLive" id="live_btn">
              <strong>Lancer l'émission</strong>
            </button>
            <button @click="stopLive" id="stop_btn">
              <strong>Arrêter l'émission</strong>
            </button>
          </div>
        </div>
        <div class="playlist">
          <h1 class="title">LISTE DE MUSIQUES</h1>
          <ul class="musicList scroller">
            <li>Musique 1</li>
            <li>Musique 2</li>
            <li>Musique 3</li>
            <li>Musique 1</li>
            <li>Musique 2</li>
            <li>Musique 3</li>
            <li>Musique 1</li>
            <li>Musique 2</li>
            <li>Musique 3</li>
          </ul>
          <div class="btn">
            <button id="stop_btn"><strong>Arrêter la musique</strong></button>
          </div>
        </div>
        <div class="btn">
          <button id="save_btn" @click="saveEpisode">
            <strong>Enregistrer l'émission</strong>
          </button>
        </div>
      </div>
      <div class="audio">
        <audio id="audio" src=""></audio>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import { io } from "socket.io-client";
import axios from "axios";
export default {
  data() {
    return {
      socket: io("http://localhost:3000"),
      bool: false,
      isActive: false,
      audioCtx: "",
      savedChunks: [],
      audio: "",
      blob: {},
      episodeName: "",
      titleEmission : this.$route.query.titleEmission,
      save: false,
      id: "1",
      link: "",
            
    };
  },
  mounted() {
    //Disable the play stop button
    document.querySelector("#stop_btn").disabled = true;
    document.querySelector("#stop_btn").style.color = "gray";

    //Disable the save button
    document.querySelector("#save_btn").disabled = true;
    document.querySelector("#save_btn").style.backgroundColor = "#86B697";

  },
  methods: {
    startLive() {
      let constraints = {
        audio: true,
      };
      let mediaRecorder;
      this.bool = true;
      document.querySelector("#stop_btn").disabled = false;
      document.querySelector("#stop_btn").style.color = "white";

      document.querySelector("#live_btn").disabled = true;
      document.querySelector("#live_btn").style.backgroundColor = "lightcoral";

      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.onstart = () => {
          this.chunks = [];
        };

        // Lorsque la donnée son est prête.
        mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
          this.savedChunks.push(e.data);
          var blob = new Blob(this.chunks, {
            type: "audio/mp3; codecs=opus",
          });
          if (this.bool) {
            this.socket.emit("radio", blob);
          }
        };

        //Commencer le live
        mediaRecorder.start();
        this.isActive = !this.isActive;

        //L'interval de diffusion
        setInterval(() => {
          if (this.bool) {
            mediaRecorder.stop();
            mediaRecorder.start();
          }
        }, 1000);
      });
    },

    stopLive() {
      console.log("Live stoped");
      this.bool = false;
      this.isActive = false;

      document.querySelector("#stop_btn").disabled = true;
      document.querySelector("#stop_btn").style.color = "gray";

      document.querySelector("#live_btn").disabled = false;
      document.querySelector("#live_btn").style.backgroundColor = "#FF3535";

      document.querySelector("#save_btn").disabled = false;
      document.querySelector("#save_btn").style.backgroundColor = "green";

      //créer l'élement audio
      this.audio = document.querySelector("#audio");
      this.audio.setAttribute("controls", "");

      this.blob = new Blob(this.savedChunks, {
        type: "audio/mp3; codecs=opus",
      });
      this.savedChunks = [];
      const audioURL = window.URL.createObjectURL(this.blob);
      this.audio.src = audioURL;
    },

    saveEpisode() {
      var Dropbox = require("dropbox").Dropbox;
      var dbx = new Dropbox({
        accessToken:
          "sl.BCsFwgtXB5twtoaxhNUvcEZRTnz_yi6lK6VpJ15_tM8eRQVb5UQb76fZUC65hJ8J2PGhIrTGEmptsRjO_emyFNHVezsb3DWzWgaeRAR9jyYU4Ek5-KMQjCqOW5nQh7l02tkqfqPYUnKT",
      });
      this.episodeName = prompt(
        "Entrez le titre de votre épisode. Attention ! vous ne pouvez pas avoir le même nom d'épisode plus d'une fois"
      );
      dbx
        .filesUpload({
          path: `/NETRADIO/A${this.id}/${this.episodeName}.mp3`,
          contents: this.blob,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            alert("Votre episode a bien été enregistré");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // Get the sharing link for the episode
      setTimeout(
        () =>
          dbx
            .sharingCreateSharedLink({
              path: `/NETRADIO/A${this.id}/${this.episodeName}.mp3`,
            })
            .then((response) => {
              this.link = response.result.url;
              //Save the link in the database
              this.putEpisodeLinkInDatabase(this.link);
            }),
        5000
      );
    },
    async putEpisodeLinkInDatabase(link) {
      try {
        await axios.post("http://localhost:3000/episodes", {
          titreEpisode: this.episodeName,
          idEmission: this.$route.query.idEmission,
          statusSauvegarde: "0",
          statusPodcast: "0",
          lien: this.link,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .main {
    flex-basis: 100%;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    margin-bottom: 100px;
    .btn {
      flex-basis: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      #save_btn {
        background: rgb(56, 170, 90);
        color: white;
        border: none;
        border-radius: 5px;
        width: fit-content;
        padding: 15px 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    }
  }

 .audio{
   flex-basis: 300px;
   background-color: white;
   margin-bottom : 1em;
  }

  .playlist {
    grid-column: 2/3;
    margin-top: 5em;

    .title {
      color: white;
      text-decoration: underline;
      font-size: 20px;
      text-align: center;
      margin-bottom: 2em;
    }

    .musicList {
      width: 60%;
      margin: 3.5em auto auto auto;
      list-style-type: none;
      font-size: 18px;
      font-weight: bold;
      color: white;
      text-align: center;
      cursor: pointer;
    }

    .musicList li {
      background-color: rgba(darkred, 0.7);
      padding: 20px 20px;
      margin-bottom: 10px;
    }

    .musicList li:hover {
      background-color: rgba(lightcoral, 0.8);
      color: yellow;
    }

    .scroller {
      height: 50%;
      overflow: scroll;
      scrollbar-color: rebeccapurple green;
      scrollbar-width: thin;
    }

    .btn {
      flex-basis: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 2em;
      margin-left: 5%;
      #stop_btn {
        background: rgb(70, 63, 63);
        color: white;
        border: none;
        border-radius: 5px;
        width: fit-content;
        padding: 15px 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    }
  }

  .live {
    grid-column: 1/2;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 2em;

    .title {
      color: white;
      margin: 2em auto auto auto;
      text-decoration: underline;
      background-color: rgb(70, 65, 65);
      border: 2px solid #ff3535;
      padding: 20px 40px;
      border-radius: 20px;
      font-size: 20px;
    }

    .btn {
      flex-basis: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: -150px;

      #live_btn {
        background: #ff3535;
        color: white;
        border: none;
        border-radius: 3px;
        width: fit-content;
        padding: 15px 25px;
        margin-right: 2em;
        font-size: 20px;
      }

      #stop_btn {
        background: rgb(70, 63, 63);
        color: white;
        border: none;
        border-radius: 5px;
        width: fit-content;
        padding: 15px 25px;
        margin-right: 2em;
        font-size: 20px;
      }

      #record_btn {
        background: rgb(47, 146, 88);
        border: none;
        border-radius: 5px;
        outline: none;
        width: 100px;
        height: 100px;
        cursor: pointer;
        margin-right: 2em;
      }
    }

    //Icone live
    span.liveicon {
      position: absolute;
      top: 125px;
      right: 50%;
      display: inline-block;
      position: relative;
      background-color: red;
      width: 15px;
      height: 15px;
      border: 1px solid rgba(black, 0.1);
      border-radius: 50%;
      z-index: 1;

      &:before {
        content: "";
        display: block;
        position: absolute;
        background-color: rgba(red, 0.6);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: live 2s ease-in-out infinite;
        z-index: -1;
      }
    }

    img {
      width: 60%;
      height: fit-content;
      margin: -50px 20% 0 20%;
      border: 2px solid #ff3535;
    }

    @keyframes live {
      0% {
        transform: scale(1, 1);
      }

      100% {
        transform: scale(3.5, 3.5);
        background-color: rgba(red, 0);
      }
    }
  }
}
</style>
