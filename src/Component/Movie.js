import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MovieCard from './MovieCard'
import { SearchContext } from '../Context/SearchContext'
import regularImg from '../assets/regular.png'



function Movie() {
const {currMovieId, setCurrMovieId} = useContext(SearchContext)
    const location = useLocation()

    let id = location.pathname
    console.log('this is ' + id)

    let movieId = id.replace('/movie/', '')
    console.log('this is movieId ' + movieId)

    

    setCurrMovieId(localStorage.getItem('movieIndex'))
    console.log( 'hey! look here this is the curr movie id' + currMovieId)

    const [info, setInfo] = useState({})
    const [genr, setGenr] = useState([])
    const [productionCompaines, setProductionCompanies] = useState([])
    const [movieImgs, setMovieImgs] = useState([])
    const [acotrs, setActors] = useState([])
    const [recom, setRecom] = useState([])
    const [watchi, setWatchi] = useState([])
    const [review, setReview] = useState([])

    const fetchInfo = async () => {
try {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}?api_key=220228b3ce82b3c943721a0d42616d3e&language=en-US&page=1`)
    const jsnData = await data.json()
    console.log(jsnData)
    setInfo(jsnData)
    setGenr(jsnData.genres)
    setProductionCompanies(jsnData.production_companies)
    
} catch (error) {
    
}
    }

    const fetchImgs = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}/images?api_key=220228b3ce82b3c943721a0d42616d3e`)
            const jsnData = await data.json()
    
            setMovieImgs(jsnData.backdrops)
        } catch (error) {
            
        }
    }

    const fetchActors = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}/credits?api_key=220228b3ce82b3c943721a0d42616d3e`)
            const jsnData = await data.json()
            const final = jsnData.cast.slice(0,12)
            setActors(final)
        } catch (error) {
            
        }
    }

    const fetchRecomendations = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}/recommendations?api_key=220228b3ce82b3c943721a0d42616d3e`)
            const jsnData = await data.json()
            const final = jsnData.results.slice(0,12)
            setRecom(final)
        } catch (error) {
            
        }
    }

    const fetchwatch = async ()=>{
        try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}/watch/providers?api_key=220228b3ce82b3c943721a0d42616d3e`)
        const jsnData = await data.json()
           const final = jsnData.results.US.buy
           setWatchi(final)
       } catch (error) {
        console.log(error)
       }
    }
    const fetchReview = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${currMovieId}/reviews?api_key=220228b3ce82b3c943721a0d42616d3e`)
            const jsnData = await data.json()
            const final = jsnData.results.slice(0,12)
            setReview(final)
        } catch (error) {
            
        }
    }
   

    useEffect(() => {
        fetchInfo()
        fetchImgs()
        fetchActors()
        fetchRecomendations()
        fetchwatch()
        fetchReview()
    }, [currMovieId])

    return (

        <>
            <div className='container text-light'>
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <img style={{ width: '90%', objectFit: 'cover', maxWidth: 500 }} src={'https://image.tmdb.org/t/p/w500' + info.poster_path} alt="" />
                    </div>
                    <div className="col-sm-6 p-2">
                        <h1 className='my-2' > {info.title} </h1>
                        <p className='text-white-50' > {info.overview} </p>
                        <p> Lenght: <span className='text-white-50'> {info.runtime} min </span> </p>
                        <p> Status:- <span className='text-white-50' > {info.status}  </span>  </p>
                        <p>Release Date :- <span className='text-white-50' > {info.release_date}  </span>  </p>
                        <span>⭐ <span className='text-white-50'> {info.vote_average} </span>  </span>
                        <p>Total votes: <span className='text-white-50'> {info.vote_count} </span> </p>
                        <p>Genres -  {genr.map((element) => {
                            return <span className='text-warning' style={{ border: '1px solid rgb(255, 193, 7)', borderRadius: '2px', margin: '5px', padding: '2px 5px' }} > {element.name} </span>
                        })} </p>

                        <div className='mt-5 mb-1'>
                            <h4>Available at</h4>
                           
                            {watchi.length === 0 ? <p>🍀 not available 🍀</p>: watchi.map((element)=>{
                                
                                return  <img style={{ width: '70px', margin: '10px' }} src={'https://image.tmdb.org/t/p/w500' + element.logo_path} alt="" />
                            })}
                        </div>

                        <div className='mt-5 mb-1' >
                            <h6>Production Companies :-</h6>
                            {productionCompaines.length === 0 ? <p>🍀 error not found 🍀</p> : productionCompaines.map((element) => {
                                return <img style={{ width: '150px', margin: '10px' }} src={element.logo_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.logo_path } alt="" />
                            })}
                        </div>




                    </div>
                </div>
                <div className='mt-5 mb-1'>
                    <div className="text-center">
                    <h1>Related Movies 🍀</h1>
                    </div>
                    <div className='row'>
                        {recom.map((element) => {
                            return <MovieCard key={element.id} idi={element.id} date={element.release_date.slice(0,4)} rating={element.vote_average} title={element.title}  imgUrl={element.poster_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.poster_path } />
                        })}
                    </div>
                </div>

                <div className='text-center mt-4'>
                    <h2 className='mt-5'>Cast 🍀</h2>
                    <div className="row mb-4">
                        {acotrs.map((element) => {
                            if (element.known_for_department === "Acting") {

                                return (<div className="col-md-2 col-4 my-4 px-2"> <img style={{ borderRadius: '100%', objectFit: 'cover', width: '100px', height: '100px' }} src={element.profile_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.profile_path } alt="" /> <h6>{element.character}</h6> <span className='text-white-50'> {element.name}</span> </div>)
                            }
                        })}
                    </div>
                </div>

                <div className="row ">
                    <div className="col-sm-9 mx-auto text-center">
                        <h2 className='mt-5'>Images 🍀</h2>
                        <div className='row my-2'>
                            {movieImgs.map((element) => {
                                
                                    return <div className='col-sm-4 col-6 p-0'> <img style={{ objectFit: 'cover', height: '100%', width: '100%' }} src={element.file_path === null ? regularImg : 'https://image.tmdb.org/t/p/w500' + element.file_path } alt="" /> </div>
                                
                            })}

                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-sm-9 mx-auto">
                        <h2 className='my-5'>Reviews 🍀</h2>
                            {review.length === 0 ? <p className='text-white-50'>not available</p> : review.map((element)=>{
                                return <div className='my-3'><h6 className='my-0'>{element.author}</h6> <p className='text-white-50'>{element.content}</p> </div>
                            })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Movie
