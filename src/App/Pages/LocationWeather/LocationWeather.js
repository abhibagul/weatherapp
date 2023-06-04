import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { webAppContext } from '../../../Contexts/contexts'
import axios from 'axios'
import WeatherCardMain from '../../components/WeatherCardMain/WeatherCardMain';

import locationPageStyle from './locationweather.module.css'
import { useSearchLocations } from '../../hooks/useSearchLocations/useSearchLocation';
import { useLocation, useParams } from 'react-router-dom';
import HourlyForecast from '../../components/HourlyForecast/HourlyForecast';
import LocationInfoDetails from '../../components/locationInfoDetails/LocationInfoDetails';
import DestionationNotFound from '../../components/DestinationFound/DestionationNotFound';


export default function LocationWeather() {

    const { appSettings, setAppSettings } = useContext(webAppContext);

    const params = useLocation();
    const paramsLink = useParams();

    const [locations, setLocations] = useSearchLocations();


    const getLocationData = async (location) => {
        try {

            if (appSettings.isLoading) {
                return;
            }

            setAppSettings(settings => {
                return { ...settings, isLoading: true }
            })

            await axios
                .get(
                    `https://api.weatherapi.com/v1/forecast.json?key=f686f832203e4d269f954958230103&q=${location}&aqi=no`)
                .then(response => {
                    let { data } = response;
                    return data;
                })
                .then(data => {
                    if ("error" in data) {
                        setAppSettings(settings => {
                            return { ...settings, weatherData: {}, isLoading: false }
                        })
                        return;
                    }

                    setAppSettings(settings => {
                        return { ...settings, weatherData: data, isLoading: false }
                    })

                    if ("name" in data.location) {
                        location = data.location.name;
                    }


                    if (locations) {
                        let locs = [...locations];

                        if (locs.includes(location)) {
                            locs.splice(locs.indexOf(location), 1);
                        }
                        locs.unshift(location);

                        if (locs.length > 10) {
                            locs.length = 10;
                        }

                        setLocations(locs);
                    } else {
                        setLocations([location]);
                    }

                }).catch(err => {
                    setAppSettings(settings => {
                        return { ...settings, weatherData: {}, isLoading: false }
                    })
                })



        } catch (e) {
            console.error(e);
            setAppSettings(settings => {
                return { ...settings, weatherData: {}, isLoading: false }
            })
        }
    }


    const refreshData = () => {
        if (!appSettings.readLocation) {
            getLocationData(appSettings.dataLocation);
        }
    }


    useEffect(() => {
        if (params.state && params.state.location) {
            getLocationData(params.state.location.trim());
            return;
        }
        if ("location" in paramsLink) {
            getLocationData(paramsLink.location.trim());
            return;
        }
    }, [params, paramsLink])




    return (
        <div>
            <Navbar />

            <div className={locationPageStyle['container']}>



                {
                    ("location" in appSettings.weatherData) ? <>
                        <WeatherCardMain fullCard={true} weatherData={appSettings.weatherData} isLoading={appSettings.isLoading} refreshData={refreshData} showCountry={true}></WeatherCardMain>

                        <HourlyForecast></HourlyForecast>

                        <LocationInfoDetails weatherData={appSettings.weatherData} isLoading={appSettings.isLoading}></LocationInfoDetails>


                    </> :
                        <>
                            <DestionationNotFound />
                        </>

                }
            </div>



        </div>
    )
}
