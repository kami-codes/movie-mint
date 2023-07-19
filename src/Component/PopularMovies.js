import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import regularImg from '../assets/regular.png'
function PopularMovies() {

    
    const [trend , setTrend] = useState([])

    const fetchTrend = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1')
        const jsnData = await data.json()
        const final = jsnData.results.slice(0,12)
        setTrend(final)
    }
    
    const [latest , setLatest] = useState([])

    const fetchLatest = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1')
        const jsnData = await data.json()
        const final = jsnData.results.slice(0,12)
        setLatest(final)
    }
    
    const [comming , setComming] = useState([])

    const fetchComming = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1')
        const jsnData = await data.json()
        const final = jsnData.results.slice(0,12)
        setComming(final)
    }

    const [topRated, setTopRated] = useState([])
    const fetchTop = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1')
        const jsnData = await data.json()
        const final = jsnData.results.slice(0,12)
        setTopRated(final)
    }


useEffect(()=>{
    fetchComming()
    fetchLatest()
    fetchTrend()
    fetchTop()
}, [])
    return (
        <>
        <div>
            <div className="  mt-5 mb-2 text-light">
            <h1>Trending Movies🍀</h1>
        </div>
            <div className="row">
                {trend.map((element)=>{
                    return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title}  imgUrl={element.poster_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.poster_path } />
                })}
                
            </div>
        </div>
        <div>
        <div className="  mt-5 mb-2 text-light">
            <h1>Top Rated🍀</h1>
        </div>
            <div className="row">
            {topRated.map((element)=>{
                    return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title}  imgUrl={element.poster_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.poster_path } />
                })}
            </div>
        </div>
        <div>
            <div className="  mt-5 mb-2 text-light">
            <h1>Latest Movies Realeased🍀</h1>
        </div>
            <div className="row">
            {latest.map((element)=>{
                    return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title}  imgUrl={element.poster_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.poster_path } />
                })}
            </div>
        </div>
        
        <div>
            <div className="  mt-5 mb-2 text-light">
            <h1>Comming Soon🍀</h1>
        </div>
            <div className="row">
            {comming.map((element)=>{
                    return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title}  imgUrl={element.poster_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.poster_path } />
                })}
            </div>
            
        </div>
        

        </>
    )
}

export default PopularMovies
