import React from "react"
import { connect } from "react-redux"
import { FormControlLabel, Radio } from "@material-ui/core"
import { setDamageModifier as setDamageModifier_ } from "./actions"
import Drawer from "./Drawer"

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
                marginRight: topRow ? "10px" : "0px",
                marginLeft: topRow ? "100px" : "0px",
                paddingTop: "50px",
                width: "45px"
            }}
        >
            <div
                style={{
                    transform: topRow
                        ? "translateX(-57px) rotate(45deg) "
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

const Resistances = ({ damageModifiers, setDamageModifier }) => {
    return (
        <Drawer id="target" heading="Target Details">
            <div style={{ display: "flex", flexDirection: "row" }}>
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
        </Drawer>
    )
}

const mapStateToProps = state => ({
    damageModifiers: state.damageModifiers
})

const mapDispatchToProps = dispatch => ({
    setDamageModifier({ type, value }) {
        dispatch(setDamageModifier_({ type, value }))
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Resistances)
