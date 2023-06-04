import React, { useContext, useEffect } from 'react'

import hourlyForecastStyle from './HourlyForecast.module.css'
import WeatherIcon from '../weatherIcon/WeatherIcon';
import { webAppContext } from '../../../Contexts/contexts'

export default function HourlyForecast() {

    const { appSettings, setAppSettings } = useContext(webAppContext);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [appSettings.dataLocation])


    const formatTemprature = (data, unit = "celcius") => {
        if (unit == "celcius") {
            return data.temp_c + "ºC"
        } else {
            return data.temp_f + "ºF"
        }
    }

    const formatHourlyTime = (time) => {
        let d = new Date(time);
        return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    return (
        <div className={hourlyForecastStyle['hourly-weather-section']}>
            <h3>Hourly Weather </h3>
            <div className={hourlyForecastStyle['hourly-grid']}>
                {

                    (!appSettings.isLoading) ?   // next 24 hours
                        appSettings.weatherData.forecast.forecastday[0].hour.map((e) => {
                            return <div key={e.time} className={hourlyForecastStyle['futureWeatherCard']}>
                                <WeatherIcon size={40} condition={e.condition.text}></WeatherIcon>

                                <div className={hourlyForecastStyle['weather_data']}>
                                    <span className={hourlyForecastStyle['weather_temprature']}>
                                        {formatTemprature(e)}
                                    </span>
                                    <span className={hourlyForecastStyle['weather_time']}>
                                        {formatHourlyTime(e.time)}
                                    </span>
                                </div>
                            </div>
                        }) :
                        <>
                            {
                                [1, 1, 1, 1, 1].map(e => {
                                    return <div className='placeholder' style={{ width: "180px", height: "61px" }}></div>
                                })
                            }
                        </>

                }
            </div>
        </div>
    )
}
