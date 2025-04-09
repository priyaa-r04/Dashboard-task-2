import { useState, useContext } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Modal,
    Box,
    Typography,
    Snackbar,
    Alert,
    TablePagination,
    TextField,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { UserContext, User } from "../ContextAPI/UserContext";

const Tables = () => {
    const { users, deleteUser } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleOpenModal = (user: User) => {
        setSelectedUser(user);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };
    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete.email);
            setSnackbarMessage("User deleted successfully!");
            setOpenSnackbar(true);
        }
        setConfirmDialogOpen(false); 
    };

    const handleOpenConfirmDialog = (user: User) => {
        setUserToDelete(user);
        setConfirmDialogOpen(true);
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedUsers = users.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    return (
        <Box p={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, mb: 3 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <TextField
                        placeholder="Search..."
                        size="small"
                        sx={{ width: "350px" }}
                    />
                    <Button variant="contained" color="primary"  
                     sx={{
                        
                    }}>
                        Add User
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Table>
                    <TableHead sx={{ bgcolor: "lightgray", color: 'white' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleOpenModal(user)}
                                        sx={{ color: 'blue', '&:hover': { backgroundColor: '#f0f0f0' } }}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpenConfirmDialog(user)}
                                        sx={{ color: 'red', '&:hover': { backgroundColor: '#ffe6e6' } }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal open={openModal} onClose={handleCloseModal}>
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
                        width: 400,
                        height: 200,
                    }}
                >

                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "grey",
                        }}
                    >
                        <Typography>x</Typography>
                    </IconButton>

                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", mb: 2, ml:4}}
                    >
                        User Data
                    </Typography>

                    <Typography>Name: {selectedUser?.name}</Typography>
                    <Typography>Email: {selectedUser?.email}</Typography>
                    <Typography>Password: {selectedUser?.password}</Typography>

                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" onClose={handleCloseSnackbar}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you really want to delete the user{" "}
                        <strong>{userToDelete?.name}</strong>? This action cannot
                        be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmDialogOpen(false)}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="primary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default Tables;






