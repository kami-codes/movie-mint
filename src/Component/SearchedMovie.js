import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../Context/SearchContext'
import MovieCard from './MovieCard'

function SearchedMovie() {

  const { searchInput } = useContext(SearchContext)

  const [searchResult, setSearchResult] = useState([])

  const fetchInfo = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1`)
    const jsnData = await data.json()
    console.log(jsnData.results)
    setSearchResult(jsnData.results)
  }


  useEffect(() => {
    fetchInfo();
  }, [searchInput])

  return (
    <>
      <div className='container'>
        <div className="row">
          {searchResult.map((element) => {
            return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title} imgUrl={'https://image.tmdb.org/t/p/w500' + element.poster_path} />   
          })}
        </div>
      </div>
    </>
  )
}

export default SearchedMovie
