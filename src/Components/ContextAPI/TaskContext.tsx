import React, { createContext, useState, useContext } from "react";

type Task = {
    title: string;
    assignedTo: string;
    description: string;
    fileName?: string;
    imageUrl?: string;
};

type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    addTask: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks((prev) => [...prev, task]);
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    );
};
