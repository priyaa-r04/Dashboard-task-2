// components/TaskList.tsx
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Box, TextField, Avatar, Typography
} from "@mui/material";
import { useTaskContext } from "../ContextAPI/TaskContext";
import { useContext, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const TaskList = () => {
    const { tasks } = useTaskContext();
    const { users } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');

    const getUser = (email: string) => users.find((user) => user.email === email);

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: "300px" }}
                />
                <IconButton color="primary">
                    <AssignmentTurnedInIcon />
                    <Typography ml={1}>Task List</Typography>
                </IconButton>
            </Box>

            <Table>
                <TableHead sx={{ bgcolor: "lightgray" }}>
                    <TableRow>
                        <TableCell>Profile</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTasks.map((task, idx) => {
                        const user = getUser(task.assignedTo);
                        return (
                            <TableRow key={idx}>
                                <TableCell>
                                    {task.imageUrl ? (
                                        <Avatar alt={task.title} src={task.imageUrl} />
                                    ) : (
                                        <Avatar>{task.title[0]}</Avatar>
                                    )}
                                </TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{user?.name || task.assignedTo}</TableCell>
                                <TableCell>{task.description}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
};

export default TaskList;
