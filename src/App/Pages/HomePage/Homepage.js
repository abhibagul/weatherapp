import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { webAppContext } from '../../../Contexts/contexts'
import axios from 'axios'
import WeatherCardMain from '../../components/WeatherCardMain/WeatherCardMain';

import homepageStyle from './homepage.module.css'
import { useSearchLocations } from '../../hooks/useSearchLocations/useSearchLocation';
import DailyForecast from '../../components/dailyForcast/DailyForecast';
import HourlyForecast from '../../components/HourlyForecast/HourlyForecast';
import DestionationNotFound from '../../components/DestinationFound/DestionationNotFound';

export default function Homepage() {

    const { appSettings, setAppSettings } = useContext(webAppContext);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                    console.log(data, 'axd');
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

    const setLocation = (loc) => {

        getLocationData(loc.coords.latitude + "," + loc.coords.longitude);
        setAppSettings(settings => {
            return { ...settings, dataLocation: loc.coords.latitude + "," + loc.coords.longitude, readLocation: false }
        })

    }

    const getUserLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation);
        } else {
            //unable to get location ask the user for the location
        }
    }

    const refreshData = () => {
        if (!appSettings.readLocation) {
            getLocationData(appSettings.dataLocation);
        }
    }

    useEffect(() => {

        if (appSettings.readLocation) {
            getUserLocation();
        }


    }, [])



    useEffect(() => {
        if (!appSettings.readLocation) {
            getLocationData(appSettings.dataLocation);
        }

    }, [appSettings.dataLocation])

    return (
        <div>
            <Navbar />


            <div className={homepageStyle['container']}>
                {
                    ("location" in appSettings.weatherData) ? <>
                        <WeatherCardMain fullCard={false} weatherData={appSettings.weatherData} isLoading={appSettings.isLoading} refreshData={refreshData}></WeatherCardMain>

                        <HourlyForecast></HourlyForecast>


                        <DailyForecast></DailyForecast>

                    </> :
                        <>
                            <DestionationNotFound />
                        </>

                }
            </div>



        </div>
    )
}
