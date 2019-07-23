import React, { Fragment } from "react"
import AdmiralAppBar from "./AppBar"
import Attacks from "./Attacks"
import theme from "./theme"
import Roll from "./Roll"
import Combos from "./Combos"

function App() {
    return (
        <Fragment>
            <AdmiralAppBar />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    width: "90%",
                    justifyContent: "center",
                    margin: "0 auto",
                }}
            >
                <Attacks />
                <Combos />
            </div>

            <Roll />
        </Fragment>
    )
}

export default App
