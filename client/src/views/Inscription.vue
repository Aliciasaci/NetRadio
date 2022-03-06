<template>
	<div class="connexionVue">
		<div id="compte-header">
			<a href="accueil.html"><img src="img/logo.png" /></a>
		</div>
        <p id="message">{{message}}</p>
		<div id="compte-content">
			<form @submit.prevent="validationInscription()" id="compte-content-register">
				<h1>INSCRIPTION</h1>
				<div id="compte-content-register-form">
					<p>Nom</p>
					<input required v-model="nominscription" type="text" class="input" />
					<p>Email</p>
					<input required v-model="emailinscription" type="email" class="input" />
					<p>Mot de passe</p>
					<input required v-model="passwordinscription" type="password" class="input" />
					<div class="btn">
                        <button id="btn-register">S'inscrire</button>
					</div>
				</div>
			</form>
		</div>
        <div id="compte-footer">
			<p>
				Vous avez déjà un compte ?
                    <router-link to="/connexion">Se connecter</router-link>
			</p>
			<p>
				Vous êtes un(e) Animateur(e) ?
                    <router-link to="/connexionAnimateur">Cliquez ici</router-link>
			</p>
        </div>
	
			
 
		<Footer />
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Inscription",
	data() {
		return {
			nominscription: "",
			emailinscription: "",
			passwordinscription: "",
            message: ""
		};
	},
	methods: {
		validationInscription() {
			let donnees = {
				fullNameAuditeur: this.nominscription,
				emailAuditeur: this.emailinscription,
				mdpAuditeur: this.passwordinscription,
			};
			axios
				.post("http://localhost:3000/auditeurs",donnees)
				.then((response) => {
                    this.message = "Compte créé, veuillez vous connecter";
					this.nominscription = "",
					this.emailinscription = "",
					this.passwordinscription = ""
				});

		},
	},
};
</script>

<style scoped>
#message{
    font-size: 16px;
    color: green;
    text-align: center;
}
.connexionVue{
	padding-bottom: 50px;
}
</style>
