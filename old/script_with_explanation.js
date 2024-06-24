// Cette ligne définit une fonction anonyme qui sera exécutée lorsque la fenêtre (page web) aura complètement chargé, y compris toutes les ressources (images, feuilles de style, etc.).
window.onload = function () {
	// Cette ligne récupère les favoris stockés dans le localStorage sous la clé "favorisContainer". Si aucun favori n'est trouvé, un tableau vide [] est attribué à la constante favoris.
	const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];
	// Cette ligne sélectionne l'élément HTML avec l'ID "favorisContainer" et le stocke dans la constante favorisContainer.
	const favorisContainer = document.getElementById("favorisContainer");
	// Si le tableau favoris est vide (aucun favori), cette condition insère un élément <h1> avec le texte "Aucun favori pour le moment." dans l'élément favorisContainer.
	if (favoris.length === 0) {
		favorisContainer.innerHTML =
			'<h1 class="text-center">Aucun favori pour le moment.</h1>';
	}
	// Sinon (s'il y a des favoris), cette boucle forEach est exécutée pour chaque film dans le tableau favoris. Pour chaque film, une carte de film est créée avec la fonction createMovieCard(movie, true), et cette carte est ajoutée au conteneur favorisContainer.
	else {
		favoris.forEach((movie) => {
			const card = createMovieCard(movie, true);
			favorisContainer.appendChild(card);
		});
	}
};
// Cette constante options définit les en-têtes HTTP pour les requêtes vers l'API The Movie Database (TMDb).
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};
// Cette ligne effectue une requête GET à l'API TMDb pour récupérer une liste de films, en utilisant les options d'en-tête définies précédemment. La réponse est ensuite convertie en JSON et affichée dans la console. En cas d'erreur, celle-ci est également affichée dans la console
fetch("https://api.themoviedb.org/3/list/1?language=fr-FR&page=1", options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
// Cette constante getMethod définit les en-têtes HTTP pour les requêtes GET vers l'API TMDb.
const getMethod = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};
// Cette ligne déclare une variable moviesList qui sera utilisée pour stocker la liste des films récupérés depuis l'API.
let moviesList;
// Cette fonction asynchrone listMovies effectue une requête GET à l'API TMDb pour récupérer une liste de films, en utilisant les options d'en-tête définies dans getMethod. La réponse est convertie en JSON et les films sont retournés. En cas d'erreur, celle-ci est affichée dans la console.
async function listMovies() {
	try {
		const response = await fetch(
			"https://api.themoviedb.org/3/list/7?language=fr-FR&page=1",
			getMethod
		);
		const data = await response.json();
		return data.items;
	} catch (error) {
		console.error("Erreur lors de la requête:", error.message);
	}
}
// Cette fonction asynchrone loadMovies appelle la fonction listMovies pour récupérer la liste des films. Elle sélectionne ensuite les éléments HTML container et favorisContainer, et récupère les favoris depuis le localStorage. Si l'élément container existe, une boucle forEach est exécutée pour chaque film de la liste. Pour chaque film, une carte est créée avec createMovieCard(movie, isFavorite), où isFavorite indique si le film est déjà dans les favoris ou non. La carte est ensuite ajoutée au conteneur container. Ensuite, une autre boucle forEach est exécutée pour chaque film dans les favoris. Pour chaque film, une carte est créée avec createMovieCard(movie, true) (puisque le film est déjà dans les favoris) et ajoutée au conteneur favorisContainer.
// Ensuite, une autre boucle forEach est exécutée pour chaque film dans les favoris. Pour chaque film, une carte est créée avec createMovieCard(movie, true) (puisque le film est déjà dans les favoris) et ajoutée au conteneur favorisContainer.
async function loadMovies() {
	const liste = await listMovies();
	console.log(liste);
	moviesList = liste;

	const container = document.getElementById("container");
	const favorisContainer = document.getElementById("favoris");
	const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];
	if (container) {
		// Vérifier si l'élément existe avant d'y accéder
		liste.forEach((movie) => {
			const isFavorite = favoris.some((m) => m.id === movie.id);
			const card = createMovieCard(movie, isFavorite);
			container.appendChild(card);
		});
	} else {
		console.error(
			"L'élément avec l'ID 'container' n'a pas été trouvé dans le DOM."
		);
	}
	favoris.forEach((movie) => {
		const card = createMovieCard(movie, true);
		favorisContainer.appendChild(card);
	});
}
// Cette fonction createMovieCard crée une carte de film avec une image, un titre, un résumé et des boutons "Ajouter aux favoris" et "Retirer des favoris". La carte est créée dynamiquement en utilisant des éléments HTML créés avec document.createElement. Le bouton approprié ("Ajouter aux favoris" ou "Retirer des favoris") est affiché en fonction de la valeur du paramètre isFavorite.
function createMovieCard(movie, isFavorite = false) {
	const card = document.createElement("div");
	card.className = "card text-bg-tertiary m-2";
	card.style.width = "16rem";

	const img = document.createElement("img");
	img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	img.className = "card-img-top p-2";
	img.alt = movie.title;

	const bodyCard = document.createElement("div");
	bodyCard.className = "card-body";

	const titre = document.createElement("h5");
	titre.className = "card-title";
	titre.textContent = movie.title;

	const resume = document.createElement("p");
	resume.className = "card-text";
	resume.textContent = movie.overview.slice(0, 40) + "...";

	const addButton = document.createElement("button");
	addButton.className = "btn btn-warning";
	addButton.textContent = isFavorite
		? "Retirer des favoris"
		: "Ajouter aux favoris";
	addButton.addEventListener("click", () => {
		if (isFavorite) {
			supprimerDesFavoris(movie);
		} else {
			ajouterAuxFavoris(movie);
		}
	});

	const removeButton = document.createElement("button");
	removeButton.className = "btn btn-danger";
	removeButton.textContent = "Supprimer des favoris";
	removeButton.addEventListener("click", () => supprimerDesFavoris(movie));

	bodyCard.appendChild(titre);
	bodyCard.appendChild(resume);
	bodyCard.appendChild(addButton);

	if (isFavorite) {
		bodyCard.appendChild(removeButton);
	}

	card.appendChild(img);
	card.appendChild(bodyCard);

	return card;
}
// Cette fonction ajouterAuxFavoris ajoute un film aux favoris. Elle récupère d'abord les favoris depuis le localStorage, vérifie si le film n'est pas déjà dans les favoris, puis ajoute le film au tableau favoris et met à jour le localStorage. Enfin, une carte de film est créée avec createMovieCard(movie, true) et ajoutée au conteneur favorisContainer.
function ajouterAuxFavoris(movie) {
	let favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];
	const existingMovie = favoris.find((m) => m.id === movie.id);

	if (existingMovie) {
		console.log(`Le film "${movie.title}" est déjà dans les favoris.`);
		return;
	}

	favoris.push(movie);
	localStorage.setItem("favorisContainer", JSON.stringify(favoris));

	const favorisContainer = document.getElementById("favorisContainer");
	const card = createMovieCard(movie, true);
	favorisContainer.appendChild(card);

	console.log(`Le film "${movie.title}" a été ajouté aux favoris.`);
}
// Cette fonction supprimerDesFavoris supprime un film des favoris. Elle récupère d'abord les favoris depuis le localStorage, trouve l'index du film dans le tableau favoris, supprime le film du tableau et met à jour le localStorage. Ensuite, elle recherche la carte de film correspondante dans le conteneur favorisContainer et la supprime.
function supprimerDesFavoris(movie) {
	const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];
	const index = favoris.findIndex((m) => m.id === movie.id);

	if (index !== -1) {
		favoris.splice(index, 1);
		localStorage.setItem("favorisContainer", JSON.stringify(favoris));

		const favorisContainer = document.getElementById("favorisContainer");
		const cards = favorisContainer.getElementsByClassName("card");
		const cardsArray = Array.from(cards);

		const cardToRemove = cardsArray.find((card) => {
			const h5Element = card.querySelector("h5");
			return h5Element && h5Element.textContent === movie.title;
		});

		if (cardToRemove) {
			favorisContainer.removeChild(cardToRemove);
		}

		console.log(`Le film "${movie.title}" a été supprimé des favoris.`);
	} else {
		console.log(`Film non trouvé dans les favoris : "${movie.title}"`);
	}
}
// Cette ligne ajoute un écouteur d'événement DOMContentLoaded qui appelle la fonction loadMovies lorsque le DOM est complètement chargé et analysé, mais avant que les ressources (images, feuilles de style, etc.) ne soient complètement chargées. Ce code permet d'afficher les favoris stockés dans le localStorage, de créer des cartes de films pour chaque favori, d'ajouter ou de supprimer des films des favoris, et d'interagir avec l'API TMDb pour récupérer des listes de films.
document.addEventListener("DOMContentLoaded", function () {
	loadMovies();
});
