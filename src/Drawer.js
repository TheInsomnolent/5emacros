import React from "react"
import { connect } from "react-redux"
import { toggleDrawer as toggleDrawer_ } from "./actions"
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from "@material-ui/core"

const Drawer = ({ heading, id, drawers, toggleDrawer, children }) => {
    const toggle = () => toggleDrawer({ key: id })
    const open = !!drawers[id]

    return (
        <ExpansionPanel expanded={open} onChange={toggle}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h2">
                    {heading}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
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
