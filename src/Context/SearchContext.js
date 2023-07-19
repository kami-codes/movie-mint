import { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {

    const [searchInput, setSearchInput] = useState('')
    const [currMovieId, setCurrMovieId] = useState(localStorage.getItem('movieIndex'))

    


    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput, currMovieId, setCurrMovieId }}>
            {children}
        </SearchContext.Provider>
    )

}