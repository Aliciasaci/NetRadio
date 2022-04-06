<template>
  <section>
    <HeaderPrincipal />
    <div id="ledirect-content">
      <div id="ledirect-content-title" v-if="emission_data">
        <h1><u>{{emission_data.nomEmission}} - {{emission_data.titreEpisode}}</u></h1>
      </div>
      <div id="ledirect-content-img">
        <img src="/img/emission.jpg" alt="Le journal" />
      </div>
      <button @click="quitLive" type="submit" id="btn-stop">
        Quitter le direct
      </button>
      <button @click="reqInvite" type="submit" id="invitation">
        Demander à participer
      </button>
    </div>
    <Footer />
  </section>
</template>

<script>
import { io } from "socket.io-client";
export default {
  data() {
    return {
      socket: io("http://localhost:3000"),
      blob: {},
      audio: null,          //remettre à "" si ça marche pas
      id: null,
      invite: false,
      emission: this.$route.params.emission,
      episode: this.$route.params.episode,
      emission_data : null
    };
  },
  mounted() {
    console.log("You joined the live");
    //recoit le son de l'animateur
    this.socket.on("voice", (arrayBuffer) => {
      let blob = new Blob([arrayBuffer], { type: "audio/ogg; codecs=opus" });
      let audio = document.createElement("audio");
      audio.src = window.URL.createObjectURL(blob);
      audio.play();
    });
    //recois le son de l'invité
    this.socket.on("voiceInvite", (arrayBuffer) => {
      console.log("test");
      if (this.invite) {
        let blob = new Blob([arrayBuffer], { type: "audio/ogg; codecs=opus" });
        let audio = document.createElement("audio");
        audio.src = window.URL.createObjectURL(blob);
        audio.play();
      }
    });
    this.socket.on("diconnect", () => {
      this.invite = false;
    });
    // recoit la réponse de l'animateur
    this.socket.on("authorisation", (invite) => {
      if (this.id === invite.id) {
        if (invite.response) {
          console.log("je suis invité");
          this.invite = invite.response;

          let constraints = {
            audio: true,
          };
          let mediaRecorder;

          navigator.mediaDevices
            .getUserMedia(constraints)
            .then((mediaStream) => {
              mediaRecorder = new MediaRecorder(mediaStream);
              mediaRecorder.onstart = () => {
                this.chunks = [];
              };

              // Lorsque la donnée son est prête.
              mediaRecorder.ondataavailable = (e) => {
                this.chunks.push(e.data);
                let blob = new Blob(this.chunks, {
                  type: "audio/mp3; codecs=opus",
                });
                if (this.invite) {
                  this.socket.emit("radioInvite", blob);
                }
              };

              //Commencer le live
              mediaRecorder.start();

              //L'interval de diffusion
              setInterval(() => {
                if (this.invite) {
                  mediaRecorder.stop();
                  mediaRecorder.start();
                }
              }, 1000);
            });
        } else {
          console.log("Demande refusée !");
        }
      }
    });

    //charger les informations de l'emissions actuelle.
    this.$api
      .get("creneau/" + this.$route.params.id)
      .then((response) => {
        this.emission_data = response.data[0];
        console.log(this.emission_data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    quitLive() {
      this.$router.push("/");
    },
    reqInvite() {
      const genRanHex = (size) =>
        [...Array(size)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("");
      this.id = genRanHex(20);
      console.log(this.id);
      this.socket.emit("invite", { id: this.id, accepted: false });
    },
  },
  
};
</script>

<style lang="scss">
#ledirect-content {
  padding-bottom: 70px;
}

#inv_bt{
  color: white;
  background-color: dodgerblue;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 15px;
  margin-bottom: 50px;
}

#inv_bt:hover{
  background-color: lightskyblue;
}
</style>
