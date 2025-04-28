import {
    Modal,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { User } from "../ContextAPI/UserContext";

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
}

const UserModal = ({ open, onClose, selectedUser }: UserModalProps) => {

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    width: 600,
                    height: 300,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "gray",
                        "&:hover": { backgroundColor: "transparent" },
                    }}
                >
                    <Close />
                </IconButton>
                <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    User Data
                </Typography>
                <Typography>Name: {selectedUser?.name}</Typography>
                <Typography>Email: {selectedUser?.email}</Typography>
                <Typography>Created Date: {selectedUser?.createdDate && new Date(selectedUser.createdDate).toLocaleDateString()}</Typography>
                <Typography>Active: {selectedUser?.active ? "Yes" : "No"}</Typography>
            </Box>
        </Modal>
    );
};

export default UserModal;
