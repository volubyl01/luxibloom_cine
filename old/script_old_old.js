const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};
// la fonction fetch
fetch("https://api.themoviedb.org/3/list/1?language=fr-FR&page=1", options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

const getMethod = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};

async function listMovies() {
	try {
		const response = await fetch(
			"https://api.themoviedb.org/3/list/3?language=fr-FR&page=1",
			getMethod
		);
		const data = await response.json();
		return data.items;
	} catch (error) {
		console.error("Erreur lors de la requête:", error.message);
	}
}

// Fonction principale pour charger les films
async function loadMovies() {
	try {
		const liste = await listMovies();
		console.log(liste);

		// Récupérez le conteneur
		const container = document.getElementById("container");
		favoris = JSON.parse(localStorage.getItem("favorisMovies")) || [];

		liste.forEach((movie) => {
			// Créez les éléments de la carte
			const card = document.createElement("div");
			//v3 pour la couleur
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
			bodyCard.resume = "card-text";
			resume.textContent = movie.overview;
			resume.textContent = movie.overview.slice(0, 40) + "...";

			const addButton = document.createElement("button");
			addButton.className = "btn btn-warning";
			addButton.textContent = "Ajouter aux favoris ";

			const removeButton = document.createElement("button");
			removeButton.className = "btn btn-danger";
			removeButton.textContent = "Supprimer des favoris ";

			// les petits enfants
			bodyCard.appendChild(titre);
			bodyCard.appendChild(resume);
			bodyCard.appendChild(addButton);
			bodyCard.appendChild(removeButton);

			// les parents
			card.appendChild(img);
			card.appendChild(bodyCard);

			// Ajoutez la carte au conteneur le papi
			container.appendChild(card);
		});

		afficherFilmsFavoris();
	} catch (error) {
		console.error("Erreur lors du chargement des films:", error.message);
	}
}

// Liste de films favoris
let favoris = [];

// Liste de films (accessible dans le contexte global)
let moviesList;

// Fonction pour ajouter un film aux favoris
function ajouterAuxFavoris(movie) {
	favoris.push(movie);
	localStorage.setItem("favorisMovies", JSON.stringify(favoris));
}

// Fonction pour afficher les titres des films favoris
function afficherFilmsFavoris() {
	const container = document.getElementById("container");
	container.innerHTML = ""; // Effacer le contenu précédent

	console.log("Films favoris :");
	favoris.forEach((movie) => {
		console.log(movie.title);
		// Créez et ajoutez les éléments HTML pour afficher le film
		const card = document.createElement("div");
		card.textContent = movie.title;
		container.appendChild(card);
	});
}

// Fonction pour supprimer un film des favoris
function supprimerDesFavoris(titre) {
	const index = favoris.findIndex((movie) => movie.title === titre);
	if (index !== -1) {
		favoris.splice(index, 1);
		console.log(`Le film "${titre}" a été supprimé des favoris.`);
		afficherFilmsFavoris();
		localStorage.setItem("favorisMovies", JSON.stringify(favoris));
	} else {
		console.log(`Film non trouvé dans les favoris : "${titre}"`);
	}
}

// Fonction pour créer une carte de film
function creerCarteFilm(movie) {
	const card = document.createElement("div");
	card.className = "card text-bg-dark m-2";
	card.style.width = "18rem";

	const img = document.createElement("img");
	img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	img.className = "card-img-top p-2";
	img.alt = movie.title;

	const cardBody = document.createElement("div");
	cardBody.className = "card-body";

	const title = document.createElement("h5");
	title.className = "card-title";
	title.textContent = movie.title;

	const overview = document.createElement("p");
	overview.className = "card-text";
	overview.textContent = movie.overview.slice(0, 40) + "...";

	const addButton = document.createElement("button");
	addButton.textContent = "Ajouter aux favoris";
	addButton.className = "btn btn-primary";
	addButton.addEventListener("click", () => ajouterAuxFavoris(movie));

	const removeButton = document.createElement("button");
	removeButton.textContent = "Supprimer des favoris";
	removeButton.className = "btn btn-danger";
	removeButton.addEventListener("click", () =>
		supprimerDesFavoris(movie.title)
	);

	cardBody.appendChild(title);
	cardBody.appendChild(overview);
	cardBody.appendChild(addButton);
	cardBody.appendChild(removeButton);

	card.appendChild(img);
	card.appendChild(cardBody);

	container.appendChild(card);
}

// Fonction principale pour charger les films
async function loadMovies() {
	try {
		moviesList = await listMovies();
		console.log(moviesList);

		const container = document.getElementById("container");

		// Récupérer les favoris depuis le localStorage
		favoris = JSON.parse(localStorage.getItem("favorisMovies")) || [];

		moviesList.forEach((movie) => {
			creerCarteFilm(movie);
		});

		afficherFilmsFavoris();
	} catch (error) {
		console.error("Erreur lors du chargement des films:", error.message);
	}
}

loadMovies();
