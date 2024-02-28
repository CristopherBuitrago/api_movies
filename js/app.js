//! Change page
let page = 1;

const btnBack = document.getElementById("btnAnterior");
const btnNext = document.getElementById("btnSiguiente");

btnNext.addEventListener("click", () => {
    if (page < 1000) {

        page += 1;
        loadMovies();

    }


})

btnBack.addEventListener("click", () => {
    if (page > 1) {

        page -= 1;
        loadMovies();

    }

    
})
//! Get the Movies

const loadMovies = async () => {

    try{

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=50f7cd06d24db9b08626bef1e1b17166&language=es-MX&page=${page}`);
        console.log(response);

        //! Verify response code
        if (response.status === 200) {
            
            //Acces to the json info
            const data = await response.json();
            
            //Save a movie for each iteration
            let movies = "";
            data.results.forEach( movie => {
                movies +=  `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <h3 class="titulo">${movie.title}</h3>
                    </div>
                `
            });
            
            document.getElementById("contenedor").innerHTML = movies;


        }else if (response.status === 401) {

            //?If the movie key doesn't exist
            console.error("Error: Acces token not found, try verifying the token again.");

        }else if (response.status === 404) {

            //?If the page doesn't exist
            console.error("Error: The movie you are trying to search for does not exist. Please try to check the id again.")

        }else{
            //?If something was wrong or unknowed error
            console.warn("Something was wrong. Please try to contact the code manager or report this problem to the gerent.")
        }

    }catch(error){
        console.error(error);
    }
}

//! Load the movies
loadMovies()    