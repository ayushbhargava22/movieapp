const API_KEY = '768af71ec1fce013e16ea86275026184'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=768af71ec1fce013e16ea86275026184'
const image = 'https://image.tmdb.org/t/p/w500'

function generateurl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=768af71ec1fce013e16ea86275026184`
    return url;
}

function requestmovies(url , onComplete , onError)
{
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError)
}

function searchmovie(value) {
    const path = '/search/movie';
    const url = generateurl(path) + '&query=' + value
    requestmovies(url ,movierender,handlingerror)
}

function upcomingmovies() {
    const path = '/movie/upcoming';
    const url = generateurl(path)
    requestmovies(url ,moviesrendering,handlingerror)
}

