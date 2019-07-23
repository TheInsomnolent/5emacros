import React from "react"
import { sum } from "lodash"
import { connect } from "react-redux"
import Modal from "@material-ui/core/Modal"
import { clearCurrentRoll as clearCurrentRoll_, setDC } from "./actions"
import { makeStyles } from "@material-ui/core/styles"
import theme from "./theme"
import { Typography, Grid, Input, Box } from "@material-ui/core"
import Slider from "@material-ui/core/Slider"
import Security from "@material-ui/icons/SecurityRounded"
import Heart from "@material-ui/icons/FavoriteBorder"
import Damage from "./Damage"

const polyDie_ = faces => Math.floor(Math.random() * Math.floor(faces)) + 1
const d20 = () => polyDie_(20)

const polyDice = ({ diceString, critSuccess }) => {
    let numberOfDice = diceString.split("d")[0]
    let numberOfFaces = diceString.split("d")[1]
    if (critSuccess) numberOfDice = 2 * numberOfDice

    let total = 0
    for (let i = 0; i < numberOfDice; i++) {
        total += polyDie_(numberOfFaces)
    }

    return total
}

export const rollAttacks = attacks => {
    let rollData = []

    attacks.forEach(attack => {
        // Handle advantage canceling
        let advantage = attack.advantage
        let disadvantage = attack.disadvantage
        if (advantage && disadvantage) {
            advantage = false
            disadvantage = false
        }

        // Handle attack type data
        let result = {
            name: attack.name,
            type: attack.type,
            magical: attack.magical
        }

        // Handle to hit roll
        result.toHit = advantage
            ? Math.max(d20(), d20())
            : disadvantage
            ? Math.min(d20(), d20())
            : d20()

        if (result.toHit === 1) result.crit = "FAIL"
        else if (result.toHit === 20) result.crit = "SUCCESS"
        result.toHit = result.toHit + parseInt(attack.hit)

        // Handle damage dice
        result.damage = sum(
            attack.damage.split(/[-+]/).map(substring => {
                if (substring.includes("d")) {
                    return polyDice({
                        diceString: substring,
                        critSuccess: result.crit === "SUCCESS"
                    })
                } else return parseInt(substring)
            })
        )
        rollData.push(result)
    })

    return rollData
}

const modalWidth = window.innerWidth >= 550 ? 800 : 400

const useStyles = makeStyles(theme_ => ({
    paper: {
        position: "absolute",
        width: modalWidth,
        left: (window.innerWidth - modalWidth) / 2,
        top: theme.space.xl,
        backgroundColor: theme_.palette.background.paper,
        border: "none",
        boxShadow: theme_.shadows[5],
        padding: theme_.spacing(2, 4, 4),
        outline: "none"
    }
}))

const RollModal = ({ children, ...rest }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            {...rest}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                className={classes.paper}
            >
                {children}
            </div>
        </Modal>
    )
}

const Roll = ({ rollData, clearCurrentRoll, currentDC, updateDC }) => {
    return (
        <RollModal
            open={!!rollData && rollData.length > 0}
            onClose={clearCurrentRoll}
        >
            <Typography
                variant="h5"
                component="h2"
                style={{ textTransform: "capitalize" }}
            >
                Attack Results
            </Typography>

            <Damage />

            <Typography id="input-slider" gutterBottom>
                Attack DC
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Security />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={currentDC}
                        onChange={(event, newValue) =>
                            updateDC({ DC: newValue })
                        }
                        aria-labelledby="input-slider"
                        min={1}
                        max={30}
                        marks={[
                            { label: "1", value: 1 },
                            { label: "20", value: 20 }
                        ]}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={currentDC}
                        margin="dense"
                        onChange={event => {
                            if (event.target.value)
                                updateDC({ DC: event.target.value })
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider"
                        }}
                    />
                </Grid>
            </Grid>

            <Typography
                variant="h6"
                component="h2"
                style={{
                    textTransform: "capitalize",
                    marginTop: theme.space.s
                }}
            >
                Individual Attack Rolls
            </Typography>
            <Grid
                container
                spacing={2}
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                }}
            >
                {rollData.map((roll, index) => {
                    let isMiss = roll.toHit < currentDC

                    let bgcolor = null
                    if (roll.crit === "SUCCESS") {
                        bgcolor = "gold"
                        isMiss = false
                    }
                    if (roll.crit === "FAIL") {
                        bgcolor = "error.main"
                        isMiss = true
                    }

                    return (
                        <Grid key={index} item>
                            <Box
                                p={2}
                                m={1}
                                bgcolor={bgcolor}
                                boxShadow={1}
                                style={{ width: "150px" }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="h3"
                                    style={{
                                        textTransform: "capitalize",
                                        width: "100%",
                                        textAlign: "center",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflowX: "hidden"
                                    }}
                                >
                                    {roll.name}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    color={
                                        isMiss ? "textSecondary" : "textPrimary"
                                    }
                                    style={{
                                        width: "100%",
                                        textAlign: "center"
                                    }}
                                >
                                    {`${
                                        roll.crit === "SUCCESS"
                                            ? "N20"
                                            : roll.crit === "FAIL"
                                            ? "N1"
                                            : roll.toHit
                                    }`}
                                    <Security />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    color={
                                        isMiss ? "textSecondary" : "textPrimary"
                                    }
                                    style={{
                                        width: "100%",
                                        textAlign: "center"
                                    }}
                                >
                                    {roll.damage}
                                    <Heart />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                        textTransform: "lowercase"
                                    }}
                                >
                                    {roll.magical && "magic "}
                                    {roll.type}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </RollModal>
    )
}

const mapStateToProps = state => ({
    rollData: state.rollData,
    currentDC: state.currentDC
})

const mapDispatchToProps = dispatch => ({
    clearCurrentRoll() {
        dispatch(clearCurrentRoll_())
    },
    updateDC({ DC }) {
        dispatch(setDC({ DC }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Roll)
