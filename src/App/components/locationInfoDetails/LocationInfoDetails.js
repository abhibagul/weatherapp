import React from 'react'
import locationInfoStyle from './locationInfoDetails.module.css'

export default function LocationInfoDetails({ weatherData, isLoading }) {
    return (
        <div className={locationInfoStyle["locationDetailsModule"]}>
            <h3 className={locationInfoStyle["locationHeader"]}>
                Detail Information
            </h3>
            <div className={locationInfoStyle["locationDetailsContent"]}>
                <div className={locationInfoStyle["locationDetailsAQI"]}>
                    <div className={locationInfoStyle["locationDetailsAQIChart"]}>

                    </div>
                    <div className={locationInfoStyle["locationDetailsAQIData"]}>
                        <span className={locationInfoStyle["locationDetailsAQIDataHeader"]}>{weatherData.current.temp_c}</span>
                        <span className={locationInfoStyle["locationDetailsAQIDataText"]} >{weatherData.current.condition.text} / Showing temprature here as AQI was not available in the API.</span>
                    </div>
                </div>
                <div className={locationInfoStyle["locationOtherDetails"]}>
                    <div className={locationInfoStyle["locationDetailsCard"]}>
                        <img src="/assets/img/wind.png" />
                        <span className={locationInfoStyle["locationDetailsCardMeta"]}>
                            <span className={locationInfoStyle["locationDetailsCardValue"]}>{weatherData.current.wind_mph} m/h</span>
                            <span className={locationInfoStyle["locationDetailsCardDescription"]}>{weatherData.current.condition.text}</span>
                        </span>
                    </div>
                    <div className={locationInfoStyle["locationDetailsCard"]}>
                        <img src="/assets/img/vector.png" />
                        <span className={locationInfoStyle["locationDetailsCardMeta"]}>
                            <span className={locationInfoStyle["locationDetailsCardValue"]}>{weatherData.current.pressure_in} </span>
                            <span className={locationInfoStyle["locationDetailsCardDescription"]}>{weatherData.current.condition.text}</span>
                        </span>
                    </div>
                    <div className={locationInfoStyle["locationDetailsCard"]}>
                        <img src="/assets/img/Group.png" />
                        <span className={locationInfoStyle["locationDetailsCardMeta"]}>
                            <span className={locationInfoStyle["locationDetailsCardValue"]}>{weatherData.current.humidity} </span>
                            <span className={locationInfoStyle["locationDetailsCardDescription"]}>{weatherData.current.condition.text}</span>
                        </span>
                    </div>
                    <div className={locationInfoStyle["locationDetailsCard"]}>
                        <img src="/assets/img/Group2.png" />
                        <span className={locationInfoStyle["locationDetailsCardMeta"]}>
                            <span className={locationInfoStyle["locationDetailsCardValue"]}>{weatherData.current.uv} </span>
                            <span className={locationInfoStyle["locationDetailsCardDescription"]}>{weatherData.current.condition.text}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}
