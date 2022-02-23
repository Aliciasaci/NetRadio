<template>
<section>
    <HeaderAdministrateur />
    <h1 id="title">LISTE DES ANIMATEURS</h1>
    <div id="listAnimateurs">
      <ul v-for="animateur in animateurs" v-bind:key="animateur.idAnimateur">
        <li>{{animateur.fullNameAnimateur}}</li>
      </ul>
    </div>
    <Footer />
</section>
</template>

<script>

export default {
   data() {
    return {
      animateurs: null,
    };
  },
  created(){
    axios
        .get("http://localhost:3000/animateurs")
        .then(response => {
            this.animateurs = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    },
};
</script>

<style lang="scss">
#title{
  color: white;
  text-align: center;
  margin: 4% 35%;
  background-color: #424242;
  border: 2px solid #1D7A7A;
  padding: 20px 0;
  border-radius: 30px;
}

#listAnimateurs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 5% 2% 20% 2%;
}

#listAnimateurs ul{
  list-style-type: none;
}

#listAnimateurs ul li{
  color: white;
  text-align: center;
  font-weight: bold;
  background-color: #1D7A7A;
  padding: 30px;
}
</style>