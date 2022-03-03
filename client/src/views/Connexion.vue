<template>
	<div class="connexionVue">
		<div id="compte-header">
			<a href="accueil.html"><img src="img/logo.png" /></a>
		</div>
		<div id="compte-content">
			<form @submit.prevent="validationConnexion()" id="compte-content-connection">
				<h1>CONNEXION</h1>
				<div id="compte-content-connection-form">
					<p>Email</p>
					<input required v-model="emailconnexion" type="email" class="input" />
					<p>Mot de passe</p>
					<input required v-model="passwordconnexion" type="password" class="input" />
					<div class="btn">
                        <button id="btn-connection">Se connecter</button>
					</div>
				</div>
			</form>
		</div>
		<div id="compte-footer">
			<p>
				Pas encore inscrit ?
                    <router-link to="/inscription">
                        <button id="btn-invitation">S'inscrire</button>
                    </router-link>
			</p>
		</div>
		<div id="compte-footer">
			<p>
				Vous êtes un(e) Animateur(e) ?
                    <router-link to="/connexionAnimateur">
                        <button id="btn-invitation">Cliquez ici</button>
                    </router-link>
			</p>
		</div>
		<footer>@Net'Radio - 2021/2022</footer>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "ConnexionInscription",
	data() {
		return {
			emailconnexion: "",
			passwordconnexion: "",
			auditeurs: ""
		};
	},
	methods: {
		validationConnexion() {
			let donnees = {
				email: this.emailconnexion,
				password: this.passwordconnexion,
			};
			axios
				.post("http://localhost:3000/connexionAuditeur", donnees)
				.then((response) => {
					if (response.data.message == "Connexion réussi") {
						this.$store.commit('setToken',response.data.token);
						this.$store.commit('adjustMember',{
							member : response.data.member,
							status : response.data.status,
							idMembre : response.data.idAuditeur
							});
						this.$router.push("/")
					} else {
						this.$router.push("/connexion")
					}
				});
		},
	},
};
</script>

<style scoped>
.connexionVue{
	padding-bottom: 50px;
}
</style>
