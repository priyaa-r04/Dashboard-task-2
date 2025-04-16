import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { User } from "../ContextAPI/UserContext";

type SetUserState = (value: User | ((prev: User) => User)) => void;

interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    newUser: User;
    setNewUser: SetUserState;
    handleAddUser: () => void;
}

const UserDialog = ({
    open,
    onClose,
    newUser,
    setNewUser,
    handleAddUser,
}: UserDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={newUser.name}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                />
                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddUser} color="primary" variant="contained">
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDialog;
