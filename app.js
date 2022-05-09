const API_KEY =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fc3eb28d1845e186a51715bfa4ab1ded&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=fc3eb28d1845e186a51715bfa4ab1ded&query="';

const movieBox = document.querySelector(".movie");
const search = document.querySelector(".search");
const form = document.querySelector("form");
const notFound = document.querySelector(".not-found");

//Get Movies
getMovies(API_KEY);

async function getMovies(URL) {
    const res = await fetch(URL);
    const data = await res.json();

    console.log(data.results);
    if (data.results.length <= 0) {
        notFound.style.display = "block";
        movieBox.innerHTML = "";
    } else {
        showMovies(data.results);
        notFound.style.display = "none";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm);

        search.value = "";
    } else {
        window.location.reload();
    }
});

function showMovies(movies) {
    movieBox.innerHTML = "";

    movies.map((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("item");
        movieEl.innerHTML = `
            <div class="item-img">
                <img
                    src="${IMG_PATH + poster_path}"
                    alt="${title}"
                />
            </div>
            <div class="item-info">
                <h3>${title}</h3>
                <span class=${getVote(vote_average)}>${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>
                    ${overview}
                </p>
            </div>
            `;
        movieBox.appendChild(movieEl);
    });
}

function getVote(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
