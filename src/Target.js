import React from "react"
import { connect } from "react-redux"
import {
    FormControlLabel,
    Radio,
    Grid,
    Input,
    Slider,
    Typography
} from "@material-ui/core"
import { setDamageModifier as setDamageModifier_, setDC } from "./actions"
import Drawer from "./Drawer"
import Security from "@material-ui/icons/SecurityRounded"

const resistanceEnum = {
    VULNERABLE: "Vulnerable",
    null: "Normal",
    RESISTANT_NON_MAGICAL: "Resistant",
    RESISTANT: "Magically Resistant"
}

const ResistanceRow = ({ type, state, setDamageModifier, topRow = false }) => {
    const stringified_state = !state ? "null" : state

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginRight: topRow ? "15px" : "0px",
                paddingTop: "50px",
                width: "45px"
            }}
        >
            <div
                style={{
                    transform: topRow
                        ? "translateX(-58px) rotate(45deg) "
                        : "translateX(-70px) rotate(45deg) ",
                    transformOrigin: "bottom right",
                    minWidth: "90px",
                    textAlign: "right"
                }}
            >
                {type}
            </div>
            {Object.keys(resistanceEnum).map(key => {
                if (topRow) {
                    return (
                        <FormControlLabel
                            key={key}
                            value={key}
                            control={
                                <Radio
                                    color="primary"
                                    checked={stringified_state === key}
                                    style={{
                                        borderLeft: topRow
                                            ? "none"
                                            : "1px solid grey",
                                        borderRadius: "0px"
                                    }}
                                    onChange={() => {
                                        setDamageModifier({
                                            type,
                                            value: key === "null" ? null : key
                                        })
                                    }}
                                />
                            }
                            label={resistanceEnum[key]}
                            labelPlacement="start"
                        />
                    )
                } else
                    return (
                        <Radio
                            key={key}
                            color="primary"
                            checked={stringified_state === key}
                            style={{
                                borderLeft: topRow ? "none" : "1px solid grey",
                                borderRadius: "0px"
                            }}
                            onChange={() => {
                                setDamageModifier({
                                    type,
                                    value: key === "null" ? null : key
                                })
                            }}
                        />
                    )
            })}
        </div>
    )
}

const Resistances = ({
    damageModifiers,
    setDamageModifier,
    currentDC,
    rollData = {},
    updateDC,
    small
}) => {
    return (
        <Drawer
            id="target"
            heading={`Target Details (AC ${currentDC})`}
            small={small}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "800px",
                    margin: "auto",
                    justifyContent: "center"
                }}
            >
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
                            marks={Object.values(rollData).map(({ toHit }) => ({
                                label: toHit,
                                value: toHit
                            }))}
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
                <div
                    style={{
                        overflowY: "auto"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            minWidth: "800px"
                        }}
                    >
                        {Object.keys(damageModifiers).map((key, index) => (
                            <ResistanceRow
                                key={index}
                                type={key}
                                state={damageModifiers[key]}
                                topRow={index === 0}
                                setDamageModifier={setDamageModifier}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    damageModifiers: state.damageModifiers,
    rollData: state.rollData,
    currentDC: state.currentDC
})

const mapDispatchToProps = dispatch => ({
    setDamageModifier({ type, value }) {
        dispatch(setDamageModifier_({ type, value }))
    },
    updateDC({ DC }) {
        dispatch(setDC({ DC }))
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Resistances)
