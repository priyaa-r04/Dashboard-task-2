import { useContext, useState ,type ChangeEvent,} from 'react';
import {
    TextField,
    MenuItem,
    Button,
    Typography,
    Box,
    InputLabel,
    FormControl,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { UserContext } from '../ContextAPI/UserContext';
import { useTaskContext } from '../ContextAPI/TaskContext';

type Task = {
    title: string;
    assignedTo: string;
    description: string;
};

const AssignTask = () => {
    const { users } = useContext(UserContext);
    const { addTask } = useTaskContext();

    const [task, setTask] = useState<Task>({
        title: '',
        assignedTo: '',
        description: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleAssignChange = (e: SelectChangeEvent<string>) => {
        setTask((prev) => ({ ...prev, assignedTo: e.target.value }));
    };

    const handleSubmit = () => {
        if (task.title && task.assignedTo && task.description) {
            addTask(task);
            setTask({ title: '', assignedTo: '', description: '' });
        } else {
            alert('Please fill in all required fields');
        }
    };

    return (
        <Box className="flex flex-col gap-4 w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl">
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Assign Task
            </Typography>

            <TextField fullWidth label="Task Title" name="title" value={task.title} onChange={handleChange} />

            <FormControl fullWidth>
                <InputLabel id="assigned-to-label">Assign To</InputLabel>
                <Select
                    labelId="assigned-to-label"
                    name="assignedTo"
                    value={task.assignedTo}
                    label="Assign To"
                    onChange={handleAssignChange}
                    sx={{
                        width: '100%',
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                width: 'auto', 
                                minWidth: '250px', 
                                maxWidth: '350px', 
                            },
                        },
                    }}
                >
                    {users.map((user) => (
                        <MenuItem key={user.email} value={user.email}>
                            {user.name} ({user.email})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                name="description"
                label="Task Description"
                multiline
                rows={4}
                variant="outlined"
                value={task.description}
                onChange={handleChange}
            />
            <div className="text-center">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Task
                </Button>
            </div>
        </Box>
    );
};

export default AssignTask;
