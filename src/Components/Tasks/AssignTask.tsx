// components/AssignTask.tsx
import { useContext, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UserContext } from '../ContextAPI/UserContext';
import { useTaskContext } from '../ContextAPI/TaskContext';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type Task = {
    title: string;
    assignedTo: string;
    description: string;
    fileName?: string;
    imageUrl?: string;
};

const AssignTask = () => {
    const { users } = useContext(UserContext);
    const { addTask } = useTaskContext();

    const [task, setTask] = useState<Task>({
        title: '',
        assignedTo: '',
        description: '',
    });

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleAssignChange = (e: SelectChangeEvent<string>) => {
        setTask((prev) => ({ ...prev, assignedTo: e.target.value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedFile(file);
            setTask((prev) => ({ ...prev, fileName: file.name, imageUrl }));
        }
    };

    const handleSubmit = () => {
        if (task.title && task.assignedTo && task.description) {
            addTask(task);
            setTask({ title: '', assignedTo: '', description: '' });
            setUploadedFile(null);
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

            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: '#881337', '&:hover': { backgroundColor: '#701a30' } }}
            >
                Upload Profile Image
                <VisuallyHiddenInput type="file" onChange={handleFileUpload} multiple />
            </Button>

            <div className="text-center">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Task
                </Button>
            </div>
        </Box>
    );
};

export default AssignTask;
