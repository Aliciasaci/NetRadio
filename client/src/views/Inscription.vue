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
		async validationInscription() {
			const msgUint8 = new TextEncoder().encode(this.passwordinscription);// encode as (utf-8) Uint8Array
          	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);// hash the message
          	const hashArray = Array.from(new Uint8Array(hashBuffer));// convert buffer to byte array
          	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');// convert bytes to hex string

			let donnees = {
				fullNameAuditeur: this.nominscription,
				emailAuditeur: this.emailinscription,
				mdpAuditeur: hashHex,
			};
			this.$api
				.post("auditeurs",donnees)
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
