import { useState, useContext, useEffect } from "react";
import { Box, TextField, Paper, IconButton, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { UserContext, User } from "../../ContextAPI/UserContext";
import UserList from "./UserList";
import UserDialog from "./UserDialog";
import UserModal from "./UserModal";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import SnackbarNotification from "./SnackbarNotification";

const Tables = () => {
    const { users, deleteUser, addUser, toggleActive } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
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
        createdDate: new Date().toISOString(),
        active: false,
    });

    const [localUsers, setLocalUsers] = useState<User[]>([...users]);

    useEffect(() => {
        setLocalUsers([...users]);
    }, [users]);

    const handleAddUser = () => {
        const userAdded = addUser(newUser);
        if (userAdded) {
            setSnackbarMessage("User added successfully!");
        } else {
            setSnackbarMessage("User already exists.");
        }
        setOpenSnackbar(true);
        setOpenAddUserDialog(false);
        setNewUser({
            name: "",
            email: "",
            password: "",
            createdDate: new Date().toISOString(),
            active: false,
        });
    };

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

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            setSelectedUserEmails(users.map((user) => user.email));
        } else {
            setSelectedUserEmails([]);
        }
    };

    const handleSelectUser = (email: string, isChecked: boolean) => {
        setSelectedUserEmails((prev) =>
            isChecked ? [...prev, email] : prev.filter((e) => e !== email)
        );
    };

    const handleChangePage = (newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = localUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = [...filteredUsers]
        .sort((a, b) =>
            sortAscending
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

                <UserList
                    users={users}
                    selectedUserEmails={selectedUserEmails}
                    onSelectAll={handleSelectAll}
                    onSelectUser={handleSelectUser}
                    paginatedUsers={paginatedUsers}
                    sortAscending={sortAscending}
                    onSortChange={() => setSortAscending(!sortAscending)}
                    onOpenModal={handleOpenModal}
                    onOpenConfirmDialog={(user) => {
                        setUserToDelete(user);
                        setConfirmDialogOpen(true);
                    }}
                    onChangePage={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    toggleActive={toggleActive}
                />
            </Paper>

            <UserDialog
                open={openAddUserDialog}
                onClose={() => setOpenAddUserDialog(false)}
                newUser={newUser}
                setNewUser={setNewUser}
                handleAddUser={handleAddUser}
            />

            <UserModal
                open={openModal}
                onClose={handleCloseModal}
                selectedUser={selectedUser}
            />

            <ConfirmDeleteDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                userToDelete={userToDelete}
                onConfirmDelete={handleConfirmDelete}
            />

            <SnackbarNotification
                open={openSnackbar}
                message={snackbarMessage}
                onClose={() => setOpenSnackbar(false)}
            />
        </Box>
    );
};

export default Tables;
