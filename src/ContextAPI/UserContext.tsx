
import { createContext, useState, ReactNode, useEffect } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  users: User[];
  addUser: (user: User) => boolean;
  deleteUser: (email: string) => void;
  checkCredentials: (email: string, password: string) => boolean;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => false,
  deleteUser: () => {},
  checkCredentials: () => false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(JSON.parse(localStorage.getItem("users")??'' )??[]);

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
    return users.some((user) => user.email === email && user.password === password);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, checkCredentials }}>
    {children}
  </UserContext.Provider>
  );
};

