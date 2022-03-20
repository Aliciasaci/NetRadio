<template>
    <div>
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
				Vous êtes un auditeur ?
                    <router-link to="/connexion">Cliquez ici</router-link>
			</p>
		</div>
		<Footer />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ConnexionAnimateur",
	data() {
		return {
			emailconnexion: "",
			passwordconnexion: ""
		};
	},
	methods: {
		validationConnexion() {
			let donnees = {
				email: this.emailconnexion,
				password: this.passwordconnexion,
			};
			axios
				.post("http://localhost:3000/connexionAnimateur",donnees)
				.then((response) => {
					if (response.data.message == "Connexion réussi") {
						this.$store.commit('setToken',response.data.token);
						this.$store.commit('adjustMember',{
							member : response.data.member,
							status : response.data.status,
							idMembre : response.data.idAnimateur
							});
						this.$router.push("/Creneaux")
					} else {
						this.$router.push("/connexionAnimateur")
					}
				});
		}
    }
};
</script>

<style>

</style>