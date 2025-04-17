import { Snackbar, Alert } from "@mui/material";

interface SnackbarNotificationProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

const SnackbarNotification = ({
    open,
    message,
    onClose,
}: SnackbarNotificationProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert severity="success" onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
