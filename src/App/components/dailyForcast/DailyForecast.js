import React, { useContext, useEffect } from 'react'
import dailyForecastStyle from './dailyForecast.module.css'
import { webAppContext } from '../../../Contexts/contexts'
import WeatherIcon from '../weatherIcon/WeatherIcon';

export default function DailyForecast() {

    const { appSettings, setAppSettings } = useContext(webAppContext);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const formatTempratureDaily = (data, unit = "celcius") => {
        if (unit == "celcius") {
            return data.avgtemp_c + "ºC"
        } else {
            return data.avgtemp_f + "ºF"
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [appSettings.dataLocation])

    return (
        <div className={dailyForecastStyle['daily-weather-section']}>
            <h3>Daily </h3>
            <div className={dailyForecastStyle['daily-grid']}>
                {

                    (!appSettings.isLoading) ?   // next 24 hours
                        appSettings.weatherData.forecast.forecastday.map((e) => {

                            return <div key={e.time} className={dailyForecastStyle['dailyforecast']}>

                                <WeatherIcon size={40} condition={e.day.condition.text}></WeatherIcon>
                                <div className={dailyForecastStyle['weather_data_daily']}>
                                    <span className={dailyForecastStyle['weather_text_daily_day']}>
                                        {days[new Date(e.date).getDay()]}
                                    </span>
                                    <span className={dailyForecastStyle['weather_text_daily_message']}>
                                        {e.day.condition.text}
                                    </span>
                                </div>
                                <div className={dailyForecastStyle['weather_data_daily_more']}>
                                    <span className={dailyForecastStyle['weather_temprature_daily']}>
                                        {formatTempratureDaily(e.day)}
                                    </span>
                                </div>
                            </div>
                        }) :
                        <>
                            {
                                [1, 1, 1, 1].map(e => {
                                    return <div className='placeholder' style={{ width: "100%", height: "61px" }}></div>
                                })
                            }
                        </>

                }
            </div>
        </div>
    )
}
