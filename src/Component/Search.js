import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../Context/SearchContext';
import { Link, Navigate } from 'react-router-dom';


function Search() {

    const {  setSearchInput } = useContext(SearchContext)

    const [text, setText] = useState('')

    const onSearchChange = (event) => {
        setText(event.target.value)
        console.log(text)
    }
    const handleSubmit = (e) => {
        
        setSearchInput(text)
        return <Navigate to='/searched' />
    }
    return (
        <>
            <div className="container my-5 text-light">
                <h1>Search the movie you want🍀</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-lg my-3">

                        <input value={text} onChange={onSearchChange} type="text" className="form-control shadow-none text-light" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                            style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid limegreen', outline: 'none', borderRadius: '0px' }}
                        />
                        <Link to='/searched'>
                        <button onClick={handleSubmit} className='btn btn-lg btn-dark' type='sumbit'> <SearchIcon /> </button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search
