const API_KEY = '768af71ec1fce013e16ea86275026184'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=768af71ec1fce013e16ea86275026184'
const image = 'https://image.tmdb.org/t/p/w500'

const buttonelement = document.querySelector("#search") ;
const inputelement = document.querySelector("#inputvalue") ;
const moviesearchable = document.querySelector("#moviesearchable")
const moviescontainer = document.querySelector("#moviecontainer")

function generateurl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=768af71ec1fce013e16ea86275026184`
    return url;
}


function moviesection(movies) {
    return movies.map((movie ) =>{
        if(movie.poster_path){
            return `<img \
                src=${image + movie.poster_path} 
                data-movie-id=${movie.id}
            />`;
        }
})
}

function movierender(data) {
    moviesearchable.innerHTML ='';
    const movies = data.results ;
    const movieblock = moviecontainer(movies)
    moviesearchable.appendChild(movieblock);
    console.log('data:' , data)
}


function movierendering(data) {
    
    const movies = data.results ;
    const movieblock = moviecontainer(movies , this.title)
    moviescontainer.appendChild(movieblock);
}


function moviecontainer(movies , title = ''){
    const movieelement = document.createElement('div')
    movieelement.setAttribute('class' , 'movie')

    const movietemplate = `
    <h2>${title}</h2>
        <section class ="section">
            ${moviesection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    
    `;
    movieelement.innerHTML = movietemplate;
    return movieelement;
}





buttonelement.onclick = event => {
    event.preventDefault() ;    
    const value = inputelement.value;
    searchmovie(value) ;

    inputelement.value= ''
    console.log(value)
}

function createiframe(video) {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360 ;
    iframe.height = 315 ;
    iframe.allowFullscreen = true;

    return iframe;
}

function createvediostemplate(data , content) {
    content.innerHTML = '<p id="content-close">X</p>'
    console.log('vedios' , data)
    const vedios = data.results ;
    const length = vedios.length > 4 ? 4: vedios.length ;
    const iframecontainer = document.createElement('div')


    for(let i=0; i<length;i++)
    {
        const video = vedios[i];
        const iframe = createiframe(video)
        iframecontainer.appendChild(iframe);
        content.appendChild(iframecontainer)
    }

}

document.onclick = function(event) {

    const target = event.target;
    if(target.tagName.toLowerCase() === 'img')
    {
        const movieid = target.dataset.movieId;
        console.log(movieid)
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        console.log("hello world") ;
        //featch movie vedios
        const path = `/movie/${movieid}/videos`
        const url = generateurl(path)
        fetch(url)
        .then((res) => res.json())
        .then((data) => createvediostemplate(data , content))
        .catch((error) => 
        {
            console.log('erro:' , error)
        })
    }
    if(target.id === 'content-close')
    {
        const content = target.parentElement;
        content.classList.remove('content-display')
    }
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

function handlingerror() {
    console.log(error)
}


function getupcomingmovies() {
    const path = '/movie/upcoming';
    const url = generateurl(path)
    const render = movierendering.bind({ title:'Upcoming Movies' })
    requestmovies(url , render ,handlingerror)
}

function gettopratedmovies() {
    const path = '/movie/top_rated';
    const url = generateurl(path)
    const render = movierendering.bind({ title:'Top Rated Movies' })
    requestmovies(url ,render,handlingerror)
}

function getpopularmovies() {
    const path = '/movie/popular';
    const url = generateurl(path)
    const render = movierendering.bind({ title:'Popular Movies' })
    requestmovies(url ,render,handlingerror)
}


getupcomingmovies()
gettopratedmovies()
getpopularmovies()