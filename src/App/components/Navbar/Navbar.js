import React from 'react'
import LocationList from '../locationList/LocationList'
import LocationSearchBar from '../LocationSearchBar/LocationSearchBar'
import navStyle from './navbar.module.css'

export default function navbar() {
    return (
        <div className={navStyle['navbar']}>
            <div className={navStyle['navbar_inner']}>
                <LocationList></LocationList>
                <LocationSearchBar></LocationSearchBar>
            </div>
        </div>
    )
}
