import React, { createContext, useState, useContext, useEffect } from "react";

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

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};