import React, { useEffect, useState, useContext } from 'react'
import searchBarStyle from './LocationSearchBar.module.css'
import { webAppContext } from '../../../Contexts/contexts';
import { useNavigate } from 'react-router-dom';
import { useSearchLocations } from '../../hooks/useSearchLocations/useSearchLocation';

export default function LocationSearchBar({ isCollpasible = true }) {

    const { appSettings, setAppSettings } = useContext(webAppContext);
    const [locations, setLocations] = useSearchLocations();

    const [serachQuery, setSearchQuery] = useState("");
    const [searchbarVisible, setSearchBarVisible] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const navigate = useNavigate();

    const updateSearchQuery = (e) => {
        setSearchQuery(e.target.value.trim());
    }

    const updateLocation = (e) => {
        e.preventDefault();

        navigate("/" + serachQuery, { state: { location: serachQuery } });
        setSearchQuery("");
        setShowDropDown(false)
    }

    useEffect(() => {
        if (appSettings.locationName) setSearchQuery(appSettings.locationName)
    }, [])

    const showHistoryLocation = (loc) => {
        console.log(loc, 'loc');
        navigate("/" + loc, { state: { location: loc } });
        setSearchQuery("");
        setSearchBarVisible(false);
        setShowDropDown(false)
    }

    useEffect(() => {

    }, [locations])

    useEffect(() => {

    }, [showDropDown])

    return (
        <div className={(isCollpasible) ? searchBarStyle['searchbar_container'] : searchBarStyle['searchbar_container_non_collapse']}>

            <form className={(searchbarVisible) ? searchBarStyle['showLocationSearchBar'] : searchBarStyle['hideLocationSearchBar']} onSubmit={updateLocation}>
                <input onFocus={() => setShowDropDown(true)} placeholder='Search' className={searchBarStyle['locationSearchBar']} type='search' value={serachQuery} onChange={updateSearchQuery}></input>
                <button className={searchBarStyle['searchbarSearchIcon']} ><i className='ci-Search_Magnifying_Glass'></i></button>
            </form>
            {(isCollpasible && !searchbarVisible) &&
                <button className={searchBarStyle['toggleShowSearch']} onClick={() => setSearchBarVisible(true)}><i className='ci-Search_Magnifying_Glass'></i></button>
            }
            {(isCollpasible && searchbarVisible) &&
                <button className={searchBarStyle['toggleHideSearch']} onClick={() => setSearchBarVisible(false)}><i className='ci-Close_LG'></i></button>}

            {(locations.length > 0 && showDropDown) && <ul className={searchBarStyle['locationHistory']}>
                {
                    locations.map(loc => {
                        return (loc.toLowerCase().indexOf(serachQuery.toLowerCase()) == -1) ? "" : <li key={loc} className={searchBarStyle['locationHistoryItem']} onClick={() => showHistoryLocation(loc)}><i className='ci-Redo'></i>{loc}</li>
                    })
                }
            </ul>}
        </div>

    )
}
