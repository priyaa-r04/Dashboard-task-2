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
    Checkbox,
} from "@mui/material";
import { Visibility, Delete, ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import { UserContext, User } from "../ContextAPI/UserContext";

const Tables = () => {
    const { users, deleteUser } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [sortAscending, setSortAscending] = useState(true);

    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
    const [newUser, setNewUser] = useState<User>({
        name: "",
        email: "",
        password: "",
    });

    const [localUsers, setLocalUsers] = useState<User[]>([...users]);

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
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            setSelectedUserEmails(users.map((user) => user.email));
        } else {
            setSelectedUserEmails([]);
        }
    };

    const handleSelectUser = (email: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedUserEmails((prev) => [...prev, email]);
        } else {
            setSelectedUserEmails((prev) => prev.filter((selectedEmail) => selectedEmail !== email));
        }
    };

    const filteredUsers = localUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const paginatedUsers = [...filteredUsers]
    .sort((a, b) => (sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        const handleAddUser = () => {
            setLocalUsers((prevUsers) => [...prevUsers, newUser]);
            setNewUser({ name: "", email: "", password: "" });
            setOpenAddUserDialog(false);
            setSnackbarMessage("User added successfully!");
            setOpenSnackbar(true);
        };

    return (
        <Box p={3}>
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    sx={{ p: 2 }}
                >
                    <TextField
                        placeholder="Search..."
                        size="small"
                        sx={{ width: "350px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Box display="flex" alignItems="center" sx={{ pr: 1 }}>
                                    <IconButton size="small" sx={{ color: "gray" }}>
                                        <Search />
                                    </IconButton>
                                </Box>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAddUserDialog(true)}
                        sx={{ ml: "auto" }}
                    >
                        Add User
                    </Button>
                </Box>
                <Table>
                    <TableHead sx={{ bgcolor: "lightgray", color: 'white' }}>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    onChange={handleSelectAll}
                                    checked={selectedUserEmails.length === users.length && users.length > 0}
                                    indeterminate={selectedUserEmails.length > 0 && selectedUserEmails.length < users.length}
                                />
                            </TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    Name
                                    <IconButton
                                        size="small"
                                        onClick={() => setSortAscending(!sortAscending)}
                                    >
                                        {sortAscending ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                </Box>
                            </TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.email}>

                                <TableCell>
                                    <Checkbox
                                        checked={selectedUserEmails.includes(user.email)}
                                        onChange={(e) => handleSelectUser(user.email, e.target.checked)}
                                    />
                                </TableCell>

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
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => handleChangePage(newPage)}
                    onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
                />
            </Paper>

            <Dialog open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddUserDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary" variant="contained">
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>

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

                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", mb: 2, ml: 4 }}
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

