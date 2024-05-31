window.onload = function () {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
		},
	};

	fetch("https://api.themoviedb.org/3/list/1?language=fr-FR&page=1", options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
	// on crée une fonction associée à la méthode GET
	const getMethod = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
		},
	};

	const movie = [];
	let moviesList;

	async function listMovies() {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/list/4?language=fr-FR&page=1",
				getMethod
			);
			const data = await response.json();
			//console.log(data.items);
			return data.items;
		} catch (error) {
			// Gérer les erreurs ici, si nécessaire
			console.error("Erreur lors de la requête:", error.message);
		}
	}

	// Utilisez une fonction asynchrone pour attendre la résolution de la promesse
	async function loadMovies() {
		const liste = await listMovies();
		console.log(liste);
		moviesList = liste;

		// Récupérez le conteneur
		const container = document.getElementById("container");
		const favorisContainer = document.getElementById("favorisContainer");

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
			addButton.addEventListener("click", () => ajouterAuxFavoris(movie));

			const removeButton = document.createElement("button");
			removeButton.className = "btn btn-danger";
			removeButton.textContent = "Supprimer des favoris ";
			removeButton.addEventListener("click", () =>
				supprimerDesFavoris(movie.title)
			);

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
	}
	loadMovies();

	const favoris = [];

	// Fonction pour ajouter un favoris
	function ajouterAuxFavoris(movie) {
		const movie = moviesList.find((movie) => movie.title === titre);

		if (movie) {
			console.log(`Le film "${movie.title}" est déjà dans les favoris.`);
		} else {
			console.log(`Film non trouvé : "${movie.title}"`);
		}
		favoris.push(movie);
		console.log(`Le film "${movie.title}" a été ajouté aux favoris.`);
		afficherFilmsFavoris();
		localStorage.setItem("favorisMovies", JSON.stringify(favoris));
	}
	// Fonction pour supprimer des favoris
	function supprimerDesFavoris(titre) {
		const index = favoris.findIndex((movie) => movie.title === titre);

		if (index !== -1) {
			const movieRemoved = favoris.splice(index, 1)[0];
			console.log(
				`Le film "${movieRemoved.title}" a été supprimé des favoris.`
			);
			afficherFilmsFavoris();
			localStorage.setItem("favorisMovies", JSON.stringify(favoris));
		} else {
			console.log(`Film non trouvé dans les favoris : "${titre}"`);
		}
	}

	// Fonction pour afficher les titres des films favoris
	function afficherFilmsFavoris() {
		console.log("Films favoris :");
		for (const movie of favoris) {
			console.log(movie.title);
		}
	}

	// tests pour la fonction rechercher
	// **************************************************************************

	// searchBtn.addEventListener("click", () => {
	// 	const searchTerm = searchInput.value;
	// 	console.log(`searching for "${searchTerm}"`);
	// 	chercherFavoris(searchTerm);
	// });

	// function chercherFavoris(searchTerm) {
	// 	const index = movie.findIndex((title) => movie.title === searchTerm);
	// 	if (index !== 1) {
	// 		afficherFilmsFavoris();
	// 	} else {
	// 		console.log(`Film non trouvé dans les favoris : "${titre}"`);
	// 	}
	// }
	// Effectuer une requête HTTP vers l'API
	const titre = document.querySelector("h5");
	const searchTerm = document.querySelector("#champ1");
	const searchBtn = document.querySelector("#searchBtn");
	searchBtn.addEventListener("click", () => AfficherSearchMovie(title));

	function AfficherSearchMovie(title) {
		if (searchTerm == movie.title) {
			console.log("titre trouvé !");
		}
	}
};
