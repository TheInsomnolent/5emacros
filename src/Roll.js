import React from "react"
import { sum } from "lodash"
import { connect } from "react-redux"
import { clearCurrentRoll as clearCurrentRoll_, setDC } from "./actions"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Grid, Box, IconButton } from "@material-ui/core"
import Security from "@material-ui/icons/SecurityRounded"
import Close from "@material-ui/icons/Close"
import Heart from "@material-ui/icons/FavoriteBorder"
import Damage from "./Damage"
import Target from "./Target"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import Drawer from "./Drawer"

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

const useStyles = makeStyles(theme_ => {
    return {
        modal: {
            backgroundColor: "#efefef"
        }
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const RollModal = ({ children, title, close, ...rest }) => {
    const classes = useStyles()
    const fullscreen = document.documentElement.clientWidth < 500
    return (
        <Dialog
            maxWidth="xl"
            fullScreen={fullscreen}
            TransitionComponent={Transition}
            aria-labelledby="responsive-dialog-title"
            scroll="body"
            PaperProps={{
                className: classes.modal
            }}
            {...rest}
        >
            <DialogTitle
                disableTypography
                id="responsive-dialog-title"
                className={classes.modal}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>

                <IconButton
                    aria-label="Account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={close}
                    color="inherit"
                >
                    <Close styles={{ marginLeft: "auto" }} />
                </IconButton>
            </DialogTitle>
            <DialogContent
                style={{ minWidth: fullscreen ? "" : "400px" }}
                className={classes.modal}
            >
                {children}
            </DialogContent>
        </Dialog>
    )
}

const Roll = ({ rollData, clearCurrentRoll, currentDC, updateDC }) => {
    return (
        <RollModal
            open={!!rollData && rollData.length > 0}
            onClose={clearCurrentRoll}
            close={clearCurrentRoll}
            title="Attack Results"
        >
            <Damage />
            <Target small />

            <Drawer id="rolls" heading="Individual Attack Rolls" small>
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
                                            isMiss
                                                ? "textSecondary"
                                                : "textPrimary"
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
                                            isMiss
                                                ? "textSecondary"
                                                : "textPrimary"
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
            </Drawer>
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
