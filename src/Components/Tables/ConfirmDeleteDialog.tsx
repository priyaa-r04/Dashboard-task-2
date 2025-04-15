import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import { User } from "../../ContextAPI/UserContext";

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    userToDelete: User | null;
    onConfirmDelete: () => void;
}

const ConfirmDeleteDialog = ({
    open,
    onClose,
    userToDelete,
    onConfirmDelete,
}: ConfirmDeleteDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <Typography>
                    Do you really want to delete the user{" "}
                    <strong>{userToDelete?.name}</strong>? This action cannot
                    be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirmDelete} color="primary" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
