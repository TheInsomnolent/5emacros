import React, { Fragment } from "react"
import { Typography } from "@material-ui/core"
import theme from "./theme"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    chip: {
        margin: theme.spacing(1)
    }
}))

const DamageBreakdown = ({ nonMagicalDamageByType, magicalDamageByType }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {Object.keys(nonMagicalDamageByType).map(key => (
                <Chip
                    key={key}
                    label={`${nonMagicalDamageByType[key]} ${key.toLowerCase()}`}
                    className={classes.chip}
                />
            ))}
            {Object.keys(magicalDamageByType).map(key => (
                <Chip
                    key={key}
                    label={`${magicalDamageByType[key]} magical ${key.toLowerCase()}`}
                    className={classes.chip}
                />
            ))}
        </div>
    )
}

const Damage = ({ rollData, currentDC, damageModifiers }) => {
    let totalDamage = 0
    let critSuccessDamage = 0
    let critFailDamage = 0
    let magicalDamageByType = {}
    let nonMagicalDamageByType = {}

    rollData.forEach(attack => {
        if (attack.crit === "FAIL") {
            critFailDamage += attack.damage
        } else if (attack.toHit >= currentDC || attack.crit === "SUCCESS") {
            let attackDamage
            switch (damageModifiers[attack.type]) {
                case "VULNERABLE":
                    attackDamage = 2 * attack.damage
                    break
                case "RESISTANT_NON_MAGICAL":
                    attackDamage = attack.magical
                        ? attack.damage
                        : Math.floor(0.5 * attack.damage)
                    break
                case "RESISTANT":
                    attackDamage = Math.floor(0.5 * attack.damage)
                    break
                default:
                    attackDamage = attack.damage
                    break
            }
            totalDamage += attackDamage
            if (attack.crit === "SUCCESS") critSuccessDamage += attackDamage
            if (attack.magical) {
                if (!magicalDamageByType[attack.type])
                    magicalDamageByType[attack.type] = 0
                magicalDamageByType[attack.type] += attackDamage
            } else {
                if (!nonMagicalDamageByType[attack.type])
                    nonMagicalDamageByType[attack.type] = 0
                nonMagicalDamageByType[attack.type] += attackDamage
            }
        }
    })

    return (
        <Fragment>
            <Typography
                variant="h6"
                component="h2"
                style={{
                    textTransform: "capitalize",
                    marginTop: theme.space.s
                }}
            >
                Aggregated Damage
            </Typography>
            <span
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline"
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    style={{
                        textTransform: "capitalize",
                        marginTop: theme.space.s
                    }}
                >
                    {totalDamage}
                </Typography>
                <Typography
                    variant="subtitle1"
                    // style={{
                    //     marginTop: theme.space.s
                    // }}
                >
                    {" damage"}
                </Typography>
            </span>
            <DamageBreakdown
                magicalDamageByType={magicalDamageByType}
                nonMagicalDamageByType={nonMagicalDamageByType}
            />
        </Fragment>
    )
}

const mapStateToProps = state => ({
    rollData: state.rollData,
    currentDC: state.currentDC,
    damageModifiers: state.damageModifiers
})

export default connect(mapStateToProps)(Damage)
