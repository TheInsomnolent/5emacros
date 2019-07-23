import React, { Component } from "react"
import { Card, Box, Container, Grid, IconButton } from "@material-ui/core"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/Input"
import MagicIcon from "@material-ui/icons/Brightness7"
import DeleteIcon from "@material-ui/icons/Close"
import { connect } from "react-redux"
import theme from "./theme"
import {
    saveCurrentCombo,
    rollCombo as rollCombo_,
    rollCurrentCombo as rollCurrentCombo_,
    clearCurrentCombo as clearCurrentCombo_,
    editCombo as editCombo_,
    deleteCombo as deleteCombo_,
    updateCurrentComboName as updateCurrentComboName_,
    removeAttackFromCombo as removeAttackFromCombo_
} from "./actions"

const TypeAbbreviations = {
    Slashing: "Sla",
    Bludgeoning: "Blu",
    Piercing: "Pie",
    Fire: "Fir",
    Cold: "Col",
    Poison: "Poi",
    Acid: "Aci",
    Psychic: "Psy",
    Necrotic: "Nec",
    Radiant: "Rad",
    Lightning: "Lig",
    Thunder: "Thu",
    Force: "For"
}

const useStyles = makeStyles({
    card: {
        width: 260,
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

const RenderCombos = ({
    combos,
    classes,
    deleteCombo,
    editCombo,
    rollCombo
}) => {
    return Object.keys(combos).map(name => {
        const combo = combos[name]
        return (
            <Card key={name} className={classes.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        color="textPrimary"
                        style={{
                            textTransform: "capitalize",
                            margin: `0 ${theme.space.xs}`,
                            whiteSpace: "nowrap",
                            overflowX: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {name}
                    </Typography>
                    {combo.map((attack, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "flex-start"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    style={{
                                        textTransform: "capitalize",
                                        margin: `0 ${theme.space.xs}`,
                                        width: "100px",
                                        whiteSpace: "nowrap",
                                        overflowX: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                >
                                    {attack.name}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    style={{
                                        margin: `0 ${theme.space.xs}`,
                                        width: "25px"
                                    }}
                                >
                                    {attack.hit}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    style={{
                                        margin: `0 ${theme.space.xs}`,
                                        width: "80px",
                                        whiteSpace: "nowrap",
                                        overflowX: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                >
                                    {`${attack.damage} ${
                                        TypeAbbreviations[attack.type]
                                    }`}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    style={{
                                        margin: `0 ${theme.space.xs}`,
                                        width: "20px"
                                    }}
                                >
                                    {attack.magical && (
                                        <MagicIcon fontSize={theme.font.m} />
                                    )}
                                </Typography>
                            </div>
                        )
                    })}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={() => rollCombo({ name })}
                    >
                        Roll
                    </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="small"
                        color="primary"
                        onClick={() => editCombo({ name })}
                    >
                        Edit
                    </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                    <Button
                        className={classes.cardActionButton}
                        size="small"
                        color="secondary"
                        onClick={() => deleteCombo({ name })}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        )
    })
}

class CurrentCombo extends Component {
    state = {
        error: false
    }

    submitHandler = event => {
        event.persist()
        const name = this.props.currentComboName.toLowerCase()

        let error = false
        if (!name || name === "") error = true

        if (!error) {
            this.props.saveCombo({ name })
            this.setState({
                name: "",
                errors: false
            })
        } else {
            this.setState({ error: true })
        }
        event.preventDefault()
    }

    renderCombos() {
        if (!this.props.currentCombo) return null
        return this.props.currentCombo.map((attack, index) => {
            return (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        style={{
                            textTransform: "capitalize",
                            margin: `0 ${theme.space.xs}`,
                            width: "100px",
                            whiteSpace: "nowrap",
                            overflowX: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {attack.name}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{ margin: `0 ${theme.space.xs}`, width: "25px" }}
                    >
                        {attack.hit}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{
                            margin: `0 ${theme.space.xs}`,
                            width: "80px",
                            whiteSpace: "nowrap",
                            overflowX: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {`${attack.damage} ${TypeAbbreviations[attack.type]}`}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{
                            margin: `0 ${theme.space.xs}`,
                            width: "20px",
                            display: "inline-flex"
                        }}
                    >
                        {attack.magical && (
                            <MagicIcon fontSize={theme.font.m} />
                        )}
                    </Typography>

                    <IconButton aria-label="Delete" size="small">
                        <DeleteIcon
                            fontSize={theme.font.size.s}
                            onClick={() => {
                                this.props.removeAttackFromCombo({ index })
                            }}
                        />
                    </IconButton>
                </div>
            )
        })
    }

    render() {
        const {
            classes,
            currentCombo,
            rollCurrentCombo,
            clearCurrentCombo,
            updateCurrentComboName,
            currentComboName
        } = this.props

        return (
            <Box className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create Combo
                    </Typography>
                    <form
                        style={{ display: "flex", flexDirection: "column" }}
                        onSubmit={this.submitHandler}
                    >
                        <TextField
                            id="name"
                            className={classes.textField}
                            value={currentComboName}
                            onChange={e =>
                                updateCurrentComboName({
                                    name: e.target.value
                                })
                            }
                            placeholder="Name"
                            margin="dense"
                            error={!!this.state.error}
                        />
                        {this.renderCombos()}

                        <CardActions className={classes.cardActions}>
                            <Button
                                className={classes.cardActionButton}
                                size="medium"
                                variant="contained"
                                color="primary"
                                disabled={
                                    !currentCombo || currentCombo.length === 0
                                }
                                onClick={() => rollCurrentCombo()}
                            >
                                Roll
                            </Button>
                        </CardActions>

                        <CardActions className={classes.cardActions}>
                            <Button
                                type="submit"
                                color="secondary"
                                variant="outlined"
                                className={classes.button}
                                disabled={
                                    !currentCombo || currentCombo.length === 0
                                }
                            >
                                Save
                            </Button>
                        </CardActions>

                        <CardActions className={classes.cardActions}>
                            <Button
                                className={classes.cardActionButton}
                                size="small"
                                color="secondary"
                                onClick={() => clearCurrentCombo()}
                            >
                                Clear
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Box>
        )
    }
}

const Combos = ({
    combos,
    currentCombo,
    saveCombo,
    rollCombo,
    rollCurrentCombo,
    editCombo,
    deleteCombo,
    clearCurrentCombo,
    updateCurrentComboName,
    currentComboName,
    removeAttackFromCombo
}) => {
    const classes = useStyles()

    return (
        <Container>
            <Typography variant="h4" component="h2">
                Combos
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <RenderCombos
                    combos={combos}
                    classes={classes}
                    deleteCombo={deleteCombo}
                    editCombo={editCombo}
                    rollCombo={rollCombo}
                />
                <CurrentCombo
                    classes={classes}
                    currentComboName={currentComboName}
                    updateCurrentComboName={updateCurrentComboName}
                    saveCombo={saveCombo}
                    currentCombo={currentCombo}
                    rollCurrentCombo={rollCurrentCombo}
                    clearCurrentCombo={clearCurrentCombo}
                    removeAttackFromCombo={removeAttackFromCombo}
                />
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    currentCombo: state.currentCombo,
    currentComboName: state.currentComboName,
    combos: state.combos
})

const mapDispatchToProps = dispatch => ({
    saveCombo({ name }) {
        dispatch(saveCurrentCombo({ name }))
    },
    rollCombo({ name }) {
        dispatch(rollCombo_({ name }))
    },
    rollCurrentCombo() {
        dispatch(rollCurrentCombo_())
    },
    deleteCombo({ name }) {
        dispatch(deleteCombo_({ name }))
    },
    editCombo({ name }) {
        dispatch(editCombo_({ name }))
    },
    clearCurrentCombo() {
        dispatch(clearCurrentCombo_())
    },
    updateCurrentComboName({ name }) {
        dispatch(updateCurrentComboName_({ name }))
    },
    removeAttackFromCombo({ index }) {
        dispatch(removeAttackFromCombo_({ index }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Combos)
