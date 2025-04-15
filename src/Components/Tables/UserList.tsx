import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    Box,
    Switch,
    TablePagination,
} from "@mui/material";
import { Visibility, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { User } from "../../ContextAPI/UserContext";

interface UserListProps {
    users: User[];
    selectedUserEmails: string[];
    onSelectAll: (event: { target: { checked: boolean } }) => void;
    onSelectUser: (email: string, isChecked: boolean) => void;
    paginatedUsers: User[];
    sortAscending: boolean;
    onSortChange: () => void;
    onOpenModal: (user: User) => void;
    onOpenConfirmDialog: (user: User) => void;
    onChangePage: (newPage: number) => void;
    onRowsPerPageChange: (event: { target: { value: string } }) => void;
    rowsPerPage: number;
    page: number;
    toggleActive: (email: string, currentState: boolean) => void;
}

const UserList = ({
    users,
    selectedUserEmails,
    onSelectAll,
    onSelectUser,
    paginatedUsers,
    sortAscending,
    onSortChange,
    onOpenModal,
    onOpenConfirmDialog,
    toggleActive,
    onChangePage,
    onRowsPerPageChange,
    rowsPerPage,
    page,
}: UserListProps) => {
    return (
        <>
            <Table>
                <TableHead sx={{ bgcolor: "lightgray", color: 'white' }}>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                onChange={(e) => onSelectAll(e)}
                                checked={selectedUserEmails.length === users.length && users.length > 0}
                                indeterminate={selectedUserEmails.length > 0 && selectedUserEmails.length < users.length}
                            />
                        </TableCell>
                        <TableCell>
                            <Box display="flex" alignItems="center">
                                Name
                                <IconButton size="small" onClick={onSortChange}>
                                    {sortAscending ? <ArrowUpward /> : <ArrowDownward />}
                                </IconButton>
                            </Box>
                        </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedUsers.map((user) => (
                        <TableRow key={user.email}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedUserEmails.includes(user.email)}
                                    onChange={(e) => onSelectUser(user.email, e.target.checked)}
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={user.active}
                                    onChange={() => toggleActive(user.email, user.active)}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onOpenModal(user)} sx={{ color: 'blue', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                    <Visibility />
                                </IconButton>
                                <IconButton onClick={() => onOpenConfirmDialog(user)} sx={{ color: 'red', '&:hover': { backgroundColor: '#ffe6e6' } }}>
                                    <Delete />
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
                onPageChange={(_, newPage) => onChangePage(newPage)} 
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}  
            />
        </>
    );
};

export default UserList;


