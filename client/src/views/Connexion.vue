<template>
	<div class="connexionVue">
		<div id="compte-header">
			<a href="accueil.html"><img src="img/logo.png" /></a>
		</div>
		<div id="compte-content">
			<form id="compte-content-connection">
				<h1>CONNEXION</h1>
				<div id="compte-content-connection-form">
					<p>Email</p>
					<input type="text" class="input" />
					<p>Mot de passe</p>
					<input type="text" class="input" />
					<div class="btn">
						<a href="#">
                                   <button id="btn-connection">Se connecter</button>
                              </a>
					</div>
				</div>
			</form>
			<form id="compte-content-register">
				<h1>INSCRIPTION</h1>
				<div id="compte-content-register-form">
					<p>Nom</p>
					<input type="text" class="input" />
					<p>Email</p>
					<input type="text" class="input" />
					<p>Mot de passe</p>
					<input type="text" class="input" />
					<div class="btn">
						<a href="#">
                                   <button id="btn-register">S'inscrire</button>
                              </a>
					</div>
				</div>
			</form>
		</div>
		<div id="compte-footer">
			<p>
				Vous êtes invité(e) ?
                    <router-link to="/invite">
                         <button type="submit" id="btn-invitation">Cliquez ici</button>
                    </router-link>
			</p>
			<div id="compte-footer-btn">
				<router-link to="/">
                         <button type="submit" id="btn-accueil">Retourner à l'accueil</button>
                    </router-link>
			</div>
		</div>
		<footer>@Net'Radio - 2021/2022</footer>
		<div id="form-invitation" class="modal">
			<div class="modal-content">
				<span class="close">&times;</span>
				<h1><u>METTEZ VOTRE LIEN D'INVITATION</u></h1>
				<form>
					<input type="text" class="input" />
					<div class="btn-form">
						<button type="button" id="btn-confirm">Confirmer</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ConnexionInscription",
	data() {
		return {
			emailconnexion: "",
			passwordconnexion: "",
			nominscription: "",
			emailinscription: "",
			passwordinscription: "",
		};
	},
	methods: {
		validationConnexion() {
			let donnees = {
				email: this.emailconnexion,
				password: this.passwordconnexion,
			};
		},
		validationInscription() {
			let donnees = {
				nom: this.nominscription,
				email: this.emailinscription,
				password: this.passwordinscription,
			};
		},
	},
};
</script>

<style scoped>
</style>
