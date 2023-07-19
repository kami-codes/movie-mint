import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';


function MovieCard(props) {
    const { setCurrMovieId} = useContext(SearchContext)
     const navigate = useNavigate();

    const handleClick =()=>{
        localStorage.setItem('movieIndex', props.idi)
        
        setCurrMovieId(props.idi)
        console.log('this is the id of the movie ' + props.idi)
        navigate(`/movie/${props.idi}`)
    }

    return (
        <>
            <div className="col-md-2 col-sm-3 col-6 my-3" >
                <div className="card text-bg-dark" style={{cursor: 'pointer'}} onClick={handleClick} >
                    <img src={props.imgUrl } className="card-img-top" alt="..." style={{borderRadius: '10px'}} />
                    <div className="card-body p-2" >
                        <h6 >{props.title}</h6>
                        <div className='d-flex justify-content-between mt-3 mb-0 text-secondary'>
                            <p className='mb-0' >⭐{props.rating}</p>
                            <p className='mb-0'>{props.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard
