<template>
  <section>
    <HeaderAnimateur />
    <div class="main">
      <h1 class="title">MES ÉMISSIONS</h1>
      <div class="btn-wrapper">
        <router-link to="/AjouterEmission"><button id="add_btn"><h3>AJOUTER UNE ÉMISSION</h3></button></router-link>
        <router-link to="/CreneauxProgrammes"><button id="show_btn"><h3>MES CRÉNEAUX PROGRAMMÉS</h3></button></router-link>
      </div>
      <div class="emissions-wrapper">
        <div v-for="emission in emissions" :key="emission.idEmission" class="card-emission">
          <h1>{{emission.title}}</h1>
          <button class="read-more">Voir plus</button><img src="/img/bg-emission.png" rel="emission" />
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
      idAnimateur : 1,                                                 //remplacer plus tard avec l'id de l'animateur connecté, on suppose que c'est l'animateur 1 qui est connecté pour le moment
      emissions : [],
  }
  },
  mounted(){
    this.getEmissionById();
  },
  methods : {
      async getEmissionById() {
      try {
        const response = await axios.get(
          `http://localhost:3000/animateurs/${this.idAnimateur}/emissions`
        );
        this.emissions = response.data;
        console.log(this.emissions);
      } catch (err) {
        console.log(err);
      }
    },
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
      h3 {
        position: absolute;
        top: 10%;
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
</style>
