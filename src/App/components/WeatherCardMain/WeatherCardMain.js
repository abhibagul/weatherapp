import React, { useContext } from 'react'
import weatherCardStyle from './WeatherCardMain.module.css'
import WeatherIcon from '../weatherIcon/WeatherIcon'


export default function WeatherCardMain({ weatherData, refreshData, isLoading, showCountry = false, fullCard }) {

    const formatTemprature = (unit = "celcius") => {
        if (unit == "celcius") {
            return weatherData.current.temp_c + "ºC"
        } else {
            return weatherData.current.temp_f + "ºF"
        }
    }

    const formatDateString = (date) => {
        let d = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        return d;
    }

    const formatHourlyTime = (time) => {
        let d = new Date(time);
        return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    return (
        <div className={(!fullCard) ? weatherCardStyle['card-shrink'] : weatherCardStyle['card-full']}>
            {
                (!isLoading) ?
                    <div className={weatherCardStyle['weather_card']}>
                        <div className={weatherCardStyle['weather_data']}>
                            <WeatherIcon size={85} condition={weatherData.current.condition.text}></WeatherIcon>
                            <div className={weatherCardStyle['weather_meta_templocation']}>
                                <span className={weatherCardStyle['weather_meta_temp']}>
                                    {formatTemprature("celcius")}
                                </span>
                                <span className={weatherCardStyle['weather_meta_location']}>
                                    {weatherData.location.name}
                                </span>
                            </div>
                        </div>
                        <div className={weatherCardStyle['weather_meta']}>
                            {(showCountry) && <span className={weatherCardStyle['weather_meta_location_address']}>
                                {weatherData.location.region + ", " + weatherData.location.country}
                            </span>}
                            <span className={weatherCardStyle['weather_meta_date']}>
                                <span>{formatDateString(weatherData.location.localtime)}</span>
                                <span>{formatHourlyTime(weatherData.location.localtime)}</span>
                            </span>
                            <div className={weatherCardStyle['weather_meta_last_update']}>
                                Last Updated : {weatherData.current.last_updated}
                                <button className={weatherCardStyle['realod_card']} onClick={refreshData}><i className=' ci-Arrows_Reload_01'></i></button>
                            </div>
                        </div>
                    </div>
                    : <>

                        <div className={weatherCardStyle['weather_card']}>
                            <div className={weatherCardStyle['weather_data']}>
                                <div className='placeholder' style={{ width: '100px', height: '100px' }}></div>
                                <div className={weatherCardStyle['weather_meta_templocation']}>
                                    <span className={weatherCardStyle['weather_meta_temp']}>
                                        <div className='placeholder' style={{ width: '100px', height: '30px' }}></div>
                                    </span>
                                    <span className={weatherCardStyle['weather_meta_location']}>
                                        <div className='placeholder' style={{ width: '150px', height: '30px' }}></div>
                                    </span>
                                </div>
                            </div>
                            <div className={weatherCardStyle['weather_meta']}>
                                <span className={weatherCardStyle['weather_meta_date']}>
                                    <div className='placeholder' style={{ width: '130px', height: '30px' }}></div>
                                </span>
                                <div className={weatherCardStyle['weather_meta_last_update']}>
                                    <div className='placeholder' style={{ width: '150px', height: '30px' }}></div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>

    )
}
