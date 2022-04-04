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
                    <router-link to="/inscription">S'inscrire</router-link>
			</p>
			<p>
				Vous êtes un(e) Animateur(e) ?
                    <router-link to="/connexionAnimateur">Cliquez ici</router-link>
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
		async validationConnexion() {
			const msgUint8 = new TextEncoder().encode(this.passwordconnexion);// encode as (utf-8) Uint8Array
          	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);// hash the message
          	const hashArray = Array.from(new Uint8Array(hashBuffer));// convert buffer to byte array
          	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');// convert bytes to hex string

			let donnees = {
				email: this.emailconnexion,
				password: hashHex,
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
						alert("erreur lors de la connexion : ndc ou mdp incorrect")
					}
				});
		},
	},
};
</script>

<style scoped>
.connexionVue{
	padding-bottom: 100px;
}
</style>
