document.addEventListener('DOMContentLoaded', postData) // makes sure script listens out for when DOM content of results.html is loaded, and then posts data

const data = document.location.search; // constant value that we're not changing
const params = new URLSearchParams(data);
const apiKey = "e7a7b4558570fb687cba7eb602ef3e9b";
let apiUrl;

// getting values from user inputs
const fname = params.get('fname'); // this is why the "name" tag is so important when creating things in our HTML form
const amt = params.get('amount');
let genre = params.get('genre');
genre = parseInt(genre);

const inputString = params.getAll('top-movies');

// setting an array that is to be updated with similar movies to the user's inputted movie
let similarMovies = [];
let str_genre;
let page_color;

// getting similar movies using the TMDB Javascript API
async function getSimilarMovies(movieTitle){
    let searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;
    try {
        const response = await fetch(searchApiUrl); // making sure that the fetch() function is actually done before  updating array
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const searchResults = await response.json();
        if (searchResults.results.length > 0) {
            const firstMovie = searchResults.results[0];
            let movieId = firstMovie.id;
            let similarApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;
            const similarResponse = await fetch(similarApiUrl);
            if (!similarResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await similarResponse.json();
            if (data.results.length > 1) {
                for (let i=0; i < 100; i++) {
                    const releaseDate = new Date(data.results[i].release_date);
                    const releaseYear = releaseDate.getFullYear();
                    const age = 2023 - releaseYear;
                    console.log(data.results[i].genre_ids)
                    if (age <= amt && data.results[i].genre_ids.includes(genre)) {
                        if (genre == 28) {
                            str_genre = "Action";
                            page_color = "black";
                        } else if (genre == 12) {
                            str_genre = "Adventure";
                            page_color = "brown";
                        } else if (genre == 16) {
                            str_genre = "Animation";
                            page_color = "lightblue";
                        } else if (genre == 35) {
                            str_genre = "Comedy";
                            page_color = "brown";
                        } else if (genre == 80) {
                            str_genre = "Crime";
                            page_color = "blue";
                        } else if (genre == 99) {
                            str_genre = "Documentary";
                            page_color = "green";
                        } else if (genre == 18) {
                            str_genre = "Drama";
                            page_color = "purple";
                        } else if (genre == 10751) {
                            str_genre = "Family";
                            page_color = "brown";
                        } else if (genre == 14) {
                            str_genre = "Fantasy";
                            page_color = "pink";
                        } else if (genre == 36) {
                            str_genre = "Horror";
                            page_color = "black";
                        } else if (genre == 10402) {
                            str_genre = "Music";
                            page_color = "lightblue";
                        } else if (genre == 9648) {
                            str_genre = "Mystery";
                            page_color = "red";
                        } else if (genre == 10749) {
                            str_genre = "Romance";
                            page_color = "pink";
                        } else if (genre == 878) {
                            str_genre = "Science Fiction";
                            page_color = "black";
                        } else if (genre == 53) {
                            str_genre = "Thriller";
                            page_color = "red";
                        } else if (genre == 10770) {
                            str_genre = "TV Movie";
                            page_color = "black";
                        } else if (genre == 10752) {
                            str_genre = "War";
                            page_color = "red";
                        } else if (genre == 37) {
                            str_genre = "Western";
                            page_color = "brownd=";
                        }
                        similarMovies.push(`${data.results[i].title} | Release Date: ${releaseYear} | Genre: ${str_genre}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error', error);
    }
}

// writing HTML code
function postData() {
    const container = document.getElementById("results");
    getSimilarMovies(inputString).then(() => {
        console.log(similarMovies);
        container.innerHTML = `<div style="font-weight: bold; background-color: ${page_color}; color:white; font-size: 14px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;text-align: center;"><br><h1>Your favorite movie is ${inputString}!</h1><br></div><div style="font-color: black; font-size: 14px; font-family: system-ui; text-align: center"><h2>Your movie recommendations are: <li>${similarMovies[0]}</li><li>${similarMovies[1]}</li><li>${similarMovies[2]}</li><li>${similarMovies[3]}</li><li>${similarMovies[4]}</li></h2><button style = "font-weight: bold; font-family: system-ui; font-size: 20px; padding: 10px; box-sizing: border-box;" onclick="window.location.href = '/form.html';">Back Home</button></div>`;
    });
}