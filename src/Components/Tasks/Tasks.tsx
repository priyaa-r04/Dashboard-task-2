import { Box, Button, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import TaskList from "./TaskList";
import AssignTask from "./AssignTask";

const Tasks = () => {
    const [tab, setTab] = useState<"list" | "assign">("list");

    const handleTabChange = (_: any, newValue: "list" | "assign") => {
        setTab(newValue);
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                Task Management
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Task List" value="list" />
                    <Tab label="Assign Task" value="assign" />
                </Tabs>
                <Button
                    variant="contained"
                    onClick={() => setTab("assign")}
                    sx={{ backgroundColor: "#1976d2", ml: 2 }}
                >
                    + Assign Task
                </Button>
            </Box>

            <Box>
                {tab === "list" && <TaskList />}
                {tab === "assign" && <AssignTask />}
            </Box>
        </Box>
    );
};

export default Tasks;
