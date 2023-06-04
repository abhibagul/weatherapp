import React, { useEffect, useContext } from 'react'
import locationListStyle from './LocationList.module.css'
import { webAppContext } from '../../../Contexts/contexts'

export default function LocationList() {

    const { appSettings, setAppSettings } = useContext(webAppContext);



    const getLocationName = () => {
        if ("location" in appSettings.weatherData && "name" in appSettings.weatherData.location) {
            return appSettings.weatherData.location.name
        }
    }

    const showHistoryLocation = (location) => {
        setAppSettings(settings => {
            return { ...settings, dataLocation: location }
        })
    }

    useEffect(() => {

    }, [appSettings.weatherData]);



    return (
        <div className={locationListStyle['locationList']}>

            <div className={locationListStyle["locationListSelection"]}>

                <span className={locationListStyle['activeLocation']}><i className="ci-Map_Pin"></i> {getLocationName()} </span>


            </div>
        </div>
    )
}
