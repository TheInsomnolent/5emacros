import React, { Fragment } from "react"
import { Typography } from "@material-ui/core"
import theme from "./theme"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Drawer from "./Drawer"

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1)
    }
}))

const DamageBreakdown = ({
    nonMagicalDamageByType,
    magicalDamageByType,
    critFail = false
}) => {
    const classes = useStyles()
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                minHeight: "48px",
                margin: "auto"
            }}
        >
            {Object.keys(nonMagicalDamageByType).map(key => (
                <Chip
                    key={key}
                    label={`${
                        nonMagicalDamageByType[key]
                    } ${key.toLowerCase()}`}
                    className={classes.chip}
                    color={critFail ? "secondary" : "default"}
                />
            ))}
            {Object.keys(magicalDamageByType).map(key => (
                <Chip
                    key={key}
                    label={`${
                        magicalDamageByType[key]
                    } magical ${key.toLowerCase()}`}
                    className={classes.chip}
                    color={critFail ? "secondary" : "default"}
                />
            ))}
        </div>
    )
}

const CritFailDamageBlock = ({
    critFailDamage,
    magicalDamageByType,
    nonMagicalDamageByType
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                width: "100%",
                alignItems: "center"
            }}
        >
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
                    {critFailDamage}
                </Typography>
                <Typography variant="subtitle1">{" damage"}</Typography>
            </span>
            <DamageBreakdown
                magicalDamageByType={magicalDamageByType}
                nonMagicalDamageByType={nonMagicalDamageByType}
                critFail
            />
            <Typography
                variant="body1"
                style={{
                    marginTop: theme.space.s,
                    display: "block",
                    marginLeft: "auto"
                }}
            >
                I wonder who that's gonna hit...
            </Typography>
        </div>
    )
}

const Damage = ({ rollData, currentDC, damageModifiers }) => {
    let totalDamage = 0
    let critFailDamage = 0
    let magicalDamageByType = {}
    let nonMagicalDamageByType = {}
    let critFailMagicalDamageByType = {}
    let critFailNonMagicalDamageByType = {}

    rollData.forEach(attack => {
        if (attack.crit === "FAIL") {
            critFailDamage += attack.damage
            if (attack.magical) {
                if (!critFailMagicalDamageByType[attack.type])
                    critFailMagicalDamageByType[attack.type] = 0
                critFailMagicalDamageByType[attack.type] += attack.damage
            } else {
                if (!critFailNonMagicalDamageByType[attack.type])
                    critFailNonMagicalDamageByType[attack.type] = 0
                critFailNonMagicalDamageByType[attack.type] += attack.damage
            }
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
            {critFailDamage > 0 && (
                <Drawer
                    id="critFailDamage"
                    heading="Oh No, A Crit Fail!"
                    small
                    error
                >
                    <CritFailDamageBlock
                        critFailDamage={critFailDamage}
                        magicalDamageByType={critFailMagicalDamageByType}
                        nonMagicalDamageByType={critFailNonMagicalDamageByType}
                    />
                </Drawer>
            )}
            <Drawer id="damage" heading="Damage" small>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "center"
                    }}
                >
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
                        <Typography variant="subtitle1">{" damage"}</Typography>
                    </span>
                    <DamageBreakdown
                        magicalDamageByType={magicalDamageByType}
                        nonMagicalDamageByType={nonMagicalDamageByType}
                    />
                </div>
            </Drawer>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    rollData: state.rollData,
    currentDC: state.currentDC,
    damageModifiers: state.damageModifiers
})

export default connect(mapStateToProps)(Damage)
