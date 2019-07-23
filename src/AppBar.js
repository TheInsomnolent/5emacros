import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import RecentActors from "@material-ui/icons/RecentActors"
import Add from "@material-ui/icons/Add"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { connect } from "react-redux"
import {
    newCharacter,
    changeCharacter,
    renameCurrentCharacter
} from "./actions"
import theme from "./theme"
import { TextField } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    }
}))

const MenuAppBar = ({
    characters,
    currentCharacterName,
    makeNewCharacter,
    switchCharacter,
    editCharacterName
}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    function handleMenu(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        5e Macro Roller
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            id="standard-bare"
                            className="characterNameInput"
                            value={currentCharacterName}
                            onChange={e =>
                                editCharacterName({ name: e.target.value })
                            }
                        />
                        <IconButton
                            aria-label="Account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <RecentActors />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                {currentCharacterName}
                            </MenuItem>
                            {Object.values(characters)
                                .filter(
                                    ({ name }) => name !== currentCharacterName
                                )
                                .map(({ id, name }) => (
                                    <MenuItem
                                        key={name}
                                        onClick={() => {
                                            handleClose()
                                            switchCharacter({ id })
                                        }}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    makeNewCharacter()
                                }}
                            >
                                <Add /> New Character
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = state => ({
    characters: state.characters,
    currentCharacterId: state.currentCharacterId,
    currentCharacterName: state.currentCharacterName
})

const mapDispatchToProps = dispatch => ({
    makeNewCharacter() {
        dispatch(newCharacter())
    },
    switchCharacter({ id }) {
        dispatch(changeCharacter({ id }))
    },
    editCharacterName({ name }) {
        dispatch(renameCurrentCharacter({ name }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuAppBar)
