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

	const getMethod = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
		},
	};

	let moviesList;

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

	async function loadMovies() {
		const liste = await listMovies();
		console.log(liste);
		moviesList = liste;

		const container = document.getElementById("container");
		const favorisContainer = document.getElementById("favoris");
		const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];

		liste.forEach((movie) => {
			const isFavorite = favoris.some((m) => m.id === movie.id);
			const card = createMovieCard(movie, isFavorite);
			container.appendChild(card);
		});

		favoris.forEach((movie) => {
			const card = createMovieCard(movie, true);
			favorisContainer.appendChild(card);
		});
	}

	const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || []; ///// A placer avec window.onload
	const favorisContainer = document.getElementById("favorisContainer");
	if (favoris.length === 0) {
		favorisContainer.innerHTML =
			'<p class="text-center">Aucun favori pour le moment.</p>';
	} else {
		favoris.forEach((movie) => {
			const card = createMovieCard(movie, true);
			favorisContainer.appendChild(card);
		});
	} // fin

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

	const favoris = [];

	function ajouterAuxFavoris(movie) {
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

	function supprimerDesFavoris(movie) {
		const favoris = JSON.parse(localStorage.getItem("favorisContainer")) || [];
		const index = favoris.findIndex((m) => m.id === movie.id);

		if (index !== -1) {
			const movieRemoved = favoris.splice(index, 1)[0];
			localStorage.setItem("favorisContainer", JSON.stringify(favoris));

			const favorisContainer = document.getElementById("favorisContainer");
			const cards = favorisContainer.getElementsByClassName("card");

			for (let i = 0; i < cards.length; i++) {
				const card = cards[i];
				const h5Element = card.querySelector("h5");
				if (h5Element && h5Element.textContent === movieRemoved.title) {
					favorisContainer.removeChild(card);
					break;
				}
			}

			favorisContainer.innerHTML = "";
			favoris.forEach((movie) => {
				const card = createMovieCard(movie, true);
				favorisContainer.appendChild(card);
			});

			console.log(
				`Le film "${movieRemoved.title}" a été supprimé des favoris.`
			);
		} else {
			console.log(`Film non trouvé dans les favoris : "${movie.title}"`);
		}
	}

	loadMovies();
};
