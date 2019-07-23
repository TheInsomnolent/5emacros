import React from "react"
import { connect } from "react-redux"
import { toggleDrawer as toggleDrawer_ } from "./actions"
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import theme from "./theme"

const useStyles = makeStyles(theme => {
    return {
        error: {
            background: theme.palette.error.main
        },
        normal: {
            background: "#fcfcfc"
        }
    }
})

const Drawer = ({
    heading,
    id,
    drawers,
    toggleDrawer,
    children,
    small,
    error
}) => {
    const toggle = () => toggleDrawer({ key: id })
    const open = !!drawers[id]
    const classes = useStyles()

    return (
        <ExpansionPanel
            expanded={open}
            onChange={toggle}
            style={{ width: "100%" }}
        >
            <ExpansionPanelSummary
                className={error ? classes.error : classes.normal}
            >
                <Typography variant={small ? "h6" : "h4"} component="h2">
                    {heading}
                </Typography>
                {open ? (
                    <ExpandLessIcon
                        style={{
                            marginLeft: "auto",
                            fontSize: theme.font.size.xxl
                        }}
                    />
                ) : (
                    <ExpandMoreIcon
                        style={{
                            marginLeft: "auto",
                            fontSize: theme.font.size.xxl
                        }}
                    />
                )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                className={error ? classes.error : classes.normal}
            >
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const mapStateToProps = state => ({
    drawers: state.drawers
})

const mapDispatchToProps = dispatch => ({
    toggleDrawer({ key }) {
        dispatch(toggleDrawer_({ key }))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)
