import React, { Fragment } from "react"
import AdmiralAppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Attacks from "./Attacks"
import theme from "./theme"
import Roll from "./Roll"
import Combos from "./Combos";

function App() {
    return (
        <Fragment>
            <AdmiralAppBar>
                <Toolbar position="static">
                    <Typography variant="h6" color="inherit">
                        5e Combo Calculator
                    </Typography>
                </Toolbar>
            </AdmiralAppBar>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    width: "90%",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginTop: theme.space.xl
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
