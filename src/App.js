import React, { Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Attacks from "./Attacks"
import theme from "./theme"

function App() {
    return (
        <Fragment>
            <AppBar>
                <Toolbar position="static">
                    <Typography variant="h6" color="inherit">
                        Combo Calculator
                    </Typography>
                </Toolbar>
            </AppBar>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "90%",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginTop: theme.space.xl
                }}
            >
                <Attacks />
            </div>
        </Fragment>
    )
}

export default App
