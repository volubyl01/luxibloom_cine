window.onload = function () {
	const favorisContainer = document.getElementById("favorisContainer");

	function createMovieCard(movie) {
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

		bodyCard.appendChild(titre);
		bodyCard.appendChild(resume);

		card.appendChild(img);
		card.appendChild(bodyCard);

		return card;
	}

	function afficherFavoris() {
		const favorisMovies =
			JSON.parse(localStorage.getItem("favorisMovies")) || [];

		favorisContainer.innerHTML = "";

		favorisMovies.forEach((movie) => {
			const card = createMovieCard(movie);
			favorisContainer.appendChild(card);
		});
	}

	afficherFavoris();
};

function redirectToFavorisPage() {
	const favoris = JSON.parse(localStorage.getItem("favorisMovies")) || [];
	const favorisEncoded = encodeURIComponent(JSON.stringify(favoris));
	window.location.href = `favoris.html?favoris=${favorisEncoded}`;
}

function ajouterAuxFavoris(movie) {
	const favoris = JSON.parse(localStorage.getItem("favorisMovies")) || [];
	const existingMovie = favoris.find((m) => m.id === movie.id);

	if (existingMovie) {
		console.log(`Le film "${movie.title}" est déjà dans les favoris.`);
		return;
	}

	favoris.push(movie);
	localStorage.setItem("favorisMovies", JSON.stringify(favoris));

	console.log(`Le film "${movie.title}" a été ajouté aux favoris.`);
}

function supprimerDesFavoris(movie) {
	const favoris = JSON.parse(localStorage.getItem("favorisMovies")) || [];
	const index = favoris.findIndex((m) => m.id === movie.id);

	if (index !== -1) {
		const movieRemoved = favoris.splice(index, 1)[0];
		localStorage.setItem("favorisMovies", JSON.stringify(favoris));

		console.log(`Le film "${movieRemoved.title}" a été supprimé des favoris.`);
	} else {
		console.log(`Film non trouvé dans les favoris : "${movie.title}"`);
	}
}
