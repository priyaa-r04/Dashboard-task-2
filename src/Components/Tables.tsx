import { useState, useContext } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    // Switch,
    IconButton,
    Modal,
    Box,
    Typography,
    Snackbar,
    Alert,
    TablePagination,
} from "@mui/material";
import { Visibility, Delete,Close} from "@mui/icons-material";
import { UserContext,User } from "../ContextAPI/UserContext";

const Tables = () => {
    const { users, deleteUser } = useContext(UserContext); 
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = (user: User) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    const handleDelete = (email: string) => {
        deleteUser(email); 
        setSnackbarMessage("User deleted successfully!");
        setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        {/* <TableCell>Switch</TableCell> */}
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: User) => (
                        <TableRow key={user.email}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleOpenModal(user)}>
                                    <Visibility sx={{ color: "primary.main" }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDelete(user.email)}
                                    sx={{ ml: 2 }}
                                >
                                    <Delete sx={{ color: "error.main" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "grey.500",
                        }}
                    >
                        <Close />
                    </IconButton>
                    {selectedUser && (
                        <>
                            <Typography id="modal-title" variant="h6" component="h2">
                                User Details
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                <strong>Name:</strong> {selectedUser.name}
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 1 }}>
                                <strong>Email:</strong> {selectedUser.email}
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 1 }}>
                                <strong>Password:</strong> {selectedUser.password}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
   </>
            
    );
};


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default Tables;
