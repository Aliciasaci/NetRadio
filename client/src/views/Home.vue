<template>
  <section class="wrap">
      <div class="box"><h1><router-link to="/Accueil">Je suis Auditeur</router-link></h1></div>
      <div class="box"><h1><router-link to="/EnDirect">Je suis Animateur</router-link></h1></div>
      <div class="box"><h1><router-link to="/ ">Je suis Administrateur</router-link></h1></div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body{
    .wrap{
        display : flex;
        color : white;
        justify-content : space-around;
        align-items : center;
        margin-top : 5em;
        .box{
            flex-basis: 22%;
            background-color : rgb(32, 31, 31);
            text-align : center;
            cursor: pointer;
            &:hover{
                background-color : rgb(82, 78, 78);
            }
        }
    }
}
</style>