import { createContext, useState, ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => boolean;
  deleteUser: (email: string) => void;
  checkCredentials: (email: string, password: string) => boolean;
  setCurrentUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  currentUser: null,
  addUser: () => false,
  deleteUser: () => {},
  checkCredentials: () => false,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const addUser = (user: User): boolean => {
    const emailExists = users.some((existingUser) => existingUser.email === user.email);

    if (emailExists) {
      console.log("Add user failed: Email already exists");
      return false; 
    }
    const updatedUsers= [...users,user]
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    console.log("User added:", user); 
    return true; 
  };

 
  const deleteUser = (email: string) => {
    const updatedUsers= users.filter((user) => user.email !== email)
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const checkCredentials = (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user); 
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ users,currentUser, addUser, deleteUser, checkCredentials, setCurrentUser}}>
    {children}
  </UserContext.Provider>
  );
};

