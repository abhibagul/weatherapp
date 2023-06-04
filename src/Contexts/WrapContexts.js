import React from 'react'

import WebAppState from './webAppContext/webAppState'


export default function WrapContexts(props) {
    return (
        <>
            <WebAppState>
                {props.children}
            </WebAppState>
        </>
    )
}