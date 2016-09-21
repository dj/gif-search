import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "./components/App"

const key = window.location.pathname.split('/')[2]

ReactDOM.render(
    <App key={key} />,
    document.getElementById('react-container')
)
