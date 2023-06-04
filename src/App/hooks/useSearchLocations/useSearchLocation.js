import { useState, useEffect } from 'react';

export const useSearchLocations = () => {
    const [locations, setLocationsInternal] = useState(() => {
        return ("searchedLocations" in localStorage) ? JSON.parse(localStorage.getItem('searchedLocations')) : [];
    })


    useEffect(() => {

    }, [locations])

    const setLocations = newLocations => {
        localStorage.setItem('searchedLocations', JSON.stringify(newLocations));
        setLocationsInternal(newLocations);
    }

    return [locations, setLocations]

}