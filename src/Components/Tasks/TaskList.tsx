import {
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Box, TextField, Avatar, Typography
} from "@mui/material";
import { useTaskContext } from "../ContextAPI/TaskContext";
import { useContext, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const TaskList = () => {
    const { tasks } = useTaskContext();
    const { currentUser, users } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');

    const getUser = (email: string) => users.find((user) => user.email === email);

    const filteredTasks = tasks.filter((task) => {
        const user = getUser(task.assignedTo);
        return (
            task.assignedTo === currentUser?.email &&
            (user?.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: "300px" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: 'gray' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton color="primary">
                    <AssignmentTurnedInIcon />
                    <Typography ml={1}>Task List</Typography>
                </IconButton>
            </Box>

            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
    <TableHead sx={{ bgcolor: "lightgray" }}>
        <TableRow>
            <TableCell sx={{ textAlign: "center", width: "25%" }}>Name</TableCell>
            <TableCell sx={{ textAlign: "center", width: "25%" }}>Title</TableCell>
            <TableCell sx={{ textAlign: "center", width: "25%" }}>Assigned To</TableCell>
            <TableCell sx={{ textAlign: "center", width: "25%" }}>Description</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {filteredTasks.map((task, idx) => {
            const user = getUser(task.assignedTo);
            return (
                <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center" }}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            {user?.profileImageUrl ? (
                                <Avatar alt={user.name} src={user.profileImageUrl} sx={{ mr: 1 }} />
                            ) : (
                                <Avatar sx={{ mr: 1 }}>{user?.name?.[0]}</Avatar>
                            )}
                            <Typography variant="body1">{user?.name}</Typography>
                        </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{task.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user?.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{task.description}</TableCell>
                </TableRow>
            );
        })}
    </TableBody>
</Table>

        </>
    );
};

export default TaskList;
