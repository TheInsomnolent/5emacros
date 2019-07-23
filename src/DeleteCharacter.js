import React from "react"
import { connect } from "react-redux"
import { confirmDelete, cancelDelete } from "./actions"
import { makeStyles } from "@material-ui/core/styles"
import { DialogActions, Button } from "@material-ui/core"
import DeleteForever from "@material-ui/icons/DeleteForever"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"

const useStyles = makeStyles({
    modal: {
        backgroundColor: "#efefef"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const DeleteCharacter = ({ pendingDelete, cancel, confirm }) => {
    const classes = useStyles()
    return (
        <Dialog
            open={!!pendingDelete}
            maxWidth="xl"
            TransitionComponent={Transition}
            aria-labelledby="responsive-dialog-title"
            scroll="body"
            PaperProps={{
                className: classes.modal
            }}
        >
            <DialogTitle
                id="responsive-dialog-title"
                className={classes.modal}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                Delete character
            </DialogTitle>
            <DialogContent className={classes.modal}>
                This will delete all character data permanently
            </DialogContent>
            <DialogActions>
                <Button onClick={confirm} color="primary">
                    <DeleteForever /> Delete
                </Button>
                <Button onClick={cancel} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    pendingDelete: state.pendingDelete
})

const mapDispatchToProps = dispatch => ({
    cancel() {
        dispatch(cancelDelete())
    },
    confirm() {
        dispatch(confirmDelete())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteCharacter)
