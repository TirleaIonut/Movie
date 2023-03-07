import {useEffect, useState} from "react"
import './App.css';
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard"
import AppTitle from "./componenets/AppTitle";

const url = "http://www.omdbapi.com?apikey=24b7d75c"

const movie1=
  {
    "Title": "Superman Returns",
    "Year": "2006",
    "imdbID": "tt0348150",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
}

const App =() => {
  
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm]= useState([])


  const searchMovie = async (title) =>{
    const response = await fetch(`${url}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }
    
  useEffect(() =>{
    searchMovie('Superman')
  }, [])

  return (
    <div className="App">
      <AppTitle heading='Movies' />
      <div className="search">
        <input type="text" placeholder="Search for movies" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <img src={SearchIcon} 
        alt='searchIcon'
        onClick={() => searchMovie(searchTerm)} />
      </div>

      {
        movies?.length >0 
        ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
      </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )
      }
      

    </div>
  );
}

export default App;
