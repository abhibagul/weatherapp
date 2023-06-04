import React, { useEffect, useContext } from 'react'
import DSNFStyle from './DestinationNotFound.module.css'
import LocationSearchBar from '../LocationSearchBar/LocationSearchBar';


export default function DestionationNotFound() {

    return (
        <div className={DSNFStyle['dsnfcontainer']}>
            <h3>{"Oops! We can't find details relating to this location :("}</h3>
            <p>Try Searching Again,</p>


            <LocationSearchBar isCollpasible={false} />
        </div>
    )
}
