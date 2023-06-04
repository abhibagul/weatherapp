import { useState } from "react";
import { webAppContext } from "../contexts";

const WebAppState = (props) => {

    const [appSettings, setAppSettings] = useState({
        appName: "Weather App Task",
        dataLocation: null,
        readLocation: true,
        isLoading: false,
        weatherData: {}
    })

    return (
        <webAppContext.Provider value={{ appSettings, setAppSettings }}>
            {props.children}
        </webAppContext.Provider>
    )

}

export default WebAppState;