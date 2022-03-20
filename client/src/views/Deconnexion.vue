
<script>
export default {
  mounted() {
    this.$store.commit("setToken", false);
    this.$store.state.idMembre = 0;
    this.$store.state.status = null;
    this.$store.state.member = null;
    setTimeout(() => {
      this.$router.push("/connexion");
    }, 100);
  },
};
</script>
