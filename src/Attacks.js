import React, { Component } from "react"
import { Card, Box } from "@material-ui/core"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import MagicCheckboxUnchecked from "@material-ui/icons/Brightness1Outlined"
import MagicCheckboxChecked from "@material-ui/icons/Brightness7"
import { connect } from "react-redux"
import theme from "./theme"
import { pick } from "lodash"
import {
    addAttack as addAttack_,
    deleteAttack as deleteAttack_,
    rollAttack as rollAttack_,
    addAttackToCombo as addAttackToCombo_
} from "./actions"
import Drawer from "./Drawer"

const useStyles = makeStyles({
    card: {
        minWidth: 160,
        maxWidth: 400,
        margin: theme.space.s
    },
    cardActions: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    cardActionButton: {
        margin: `${theme.space.xs} auto`
    },
    formControl: {
        margin: `${theme.space.xs} auto`,
        minWidth: 120
    },
    textField: {
        margin: `${theme.space.xs} auto`,
        width: 120
    },
    title: {
        fontSize: 14,
        textTransform: "capitalize"
    },
    button: {
        width: 100,
        margin: `${theme.space.s} auto`
    }
})

const RenderAttacks = ({
    attacks,
    classes,
    deleteAttack,
    rollAttack,
    addAttackToCombo
}) => {
    return Object.keys(attacks).map(name => {
        const attack = attacks[name]
        return (
            <Card key={name} className={classes.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{ textTransform: "capitalize" }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {attack.type} {attack.magical && <i>(magical)</i>}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {`${attack.hit} to hit`}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {`${attack.damage} damage`}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={() => rollAttack({ name })}
                    >
                        Roll
                    </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="medium"
                        color="primary"
                        onClick={() => addAttackToCombo({ name })}
                    >
                        Add to combo
                    </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="small"
                        color="secondary"
                        onClick={() => deleteAttack({ name })}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        )
    })
}

class AddAttack extends Component {
    state = {
        type: "",
        hit: "",
        damage: "",
        name: "",
        magical: false,
        errors: {}
    }

    submitHandler = event => {
        event.persist()

        let errors = {}

        let attack = pick(this.state, [
            "type",
            "hit",
            "damage",
            "name",
            "magical"
        ])
        attack.name = attack.name.toLowerCase()
        attack.hit = attack.hit.replace(" ", "")
        attack.damage = attack.damage.replace(" ", "").toLowerCase()

        if (this.state.name === "") errors.name = "Must provide name"
        if (this.state.type === "") errors.type = "Must select damage type"
        if (!/(^[+-]\d\d*$)/.test(this.state.hit))
            errors.hit = "Invalid hit text"

        const splitDamage = this.state.damage.replace(" ", "").split(/[+-]/)
        const valid = splitDamage.map(
            substr => /^(\d\d*)$/.test(substr) || /^(\d\d*d\d\d*)$/.test(substr)
        )
        if (valid.length !== valid.filter(v => !!v).length)
            errors.damage = "Invalid damage text"

        if (Object.keys(errors).length === 0) {
            this.props.addAttack({ attack })
            this.setState({
                type: "",
                hit: "",
                damage: "",
                name: "",
                magical: false,
                errors: {}
            })
        } else {
            this.setState({ errors })
        }
        event.preventDefault()
    }

    render() {
        const { classes } = this.props
        const damageTypes = [
            "Slashing",
            "Bludgeoning",
            "Piercing",
            "Fire",
            "Cold",
            "Poison",
            "Acid",
            "Psychic",
            "Necrotic",
            "Radiant",
            "Lightning",
            "Thunder",
            "Force"
        ]
        const errors = this.state.errors

        return (
            <Box className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Add Attack
                    </Typography>
                    <form
                        style={{ display: "flex", flexDirection: "column" }}
                        onSubmit={this.submitHandler}
                    >
                        <TextField
                            id="name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={e =>
                                this.setState({ name: e.target.value })
                            }
                            placeholder="Name"
                            margin="dense"
                            error={!!errors.name}
                        />

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">
                                Damage type
                            </InputLabel>
                            <Select
                                error={!!errors.type}
                                value={this.state.type}
                                onChange={e =>
                                    this.setState({ type: e.target.value })
                                }
                                inputProps={{
                                    name: "type",
                                    id: "type"
                                }}
                            >
                                {damageTypes.map(type => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            id="hit"
                            label="To Hit"
                            className={classes.textField}
                            error={!!errors.hit}
                            value={this.state.hit}
                            onChange={e =>
                                this.setState({ hit: e.target.value })
                            }
                            placeholder="To Hit"
                            margin="dense"
                        />

                        <TextField
                            id="damage"
                            label="Damage"
                            className={classes.textField}
                            error={!!errors.damage}
                            value={this.state.damage}
                            onChange={e =>
                                this.setState({ damage: e.target.value })
                            }
                            placeholder="Damage"
                            margin="dense"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    style={{
                                        margin: `${theme.space.xs}`
                                    }}
                                    icon={
                                        <MagicCheckboxUnchecked fontSize="small" />
                                    }
                                    checkedIcon={
                                        <MagicCheckboxChecked fontSize="small" />
                                    }
                                    value="checkedMagical"
                                    onChange={event =>
                                        this.setState({
                                            magical: event.target.checked
                                        })
                                    }
                                />
                            }
                            label="Magical"
                        />
                        <Button
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            className={classes.button}
                        >
                            Add
                        </Button>
                    </form>
                </CardContent>
            </Box>
        )
    }
}

const Attacks = ({
    attacks,
    addAttack,
    deleteAttack,
    rollAttack,
    addAttackToCombo
}) => {
    const classes = useStyles()

    return (
        <Drawer id="attacks" heading="Attacks">
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <RenderAttacks
                    attacks={attacks}
                    classes={classes}
                    deleteAttack={deleteAttack}
                    rollAttack={rollAttack}
                    addAttackToCombo={addAttackToCombo}
                />
                <AddAttack classes={classes} addAttack={addAttack} />
            </Box>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    attacks: state.attacks
})

const mapDispatchToProps = dispatch => ({
    addAttack({ attack }) {
        dispatch(addAttack_({ attack }))
    },
    deleteAttack({ name }) {
        dispatch(deleteAttack_({ name }))
    },
    rollAttack({ name }) {
        dispatch(rollAttack_({ name }))
    },
    addAttackToCombo({ name }) {
        dispatch(addAttackToCombo_({ name }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Attacks)
