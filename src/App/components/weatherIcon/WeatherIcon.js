import React from 'react'

export default function WeatherIcon({ size, condition }) {

    const WEATHER_ICONS = {
        "Sunny": "/assets/img/cloudsunrain.png",
        "Mist": "/assets/img/cloudy.png",
        "Rain": "/assets/img/Rainy.png",
        "Clear": "/assets/img/cloudy.png",
    }

    const getRelatedImg = (condition) => {
        if (condition in WEATHER_ICONS) {
            return WEATHER_ICONS[condition];
        }

        return "/assets/img/cloudsunrain.png";
    }

    return (
        <div>
            <img style={{ width: size + "px" }} src={getRelatedImg(condition)}></img>
        </div>
    )
}
