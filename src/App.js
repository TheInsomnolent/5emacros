import React, { Fragment } from "react"
import AdmiralAppBar from "./AppBar"
import Attacks from "./Attacks"
import Roll from "./Roll"
import Combos from "./Combos"
import Target from "./Target"
import DeleteCharacter from "./DeleteCharacter"

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
                    margin: "0 auto"
                }}
            >
                <Target />
                <Attacks />
                <Combos />
            </div>

            <Roll />
            <DeleteCharacter />
        </Fragment>
    )
}

export default App
