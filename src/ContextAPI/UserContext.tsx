import { createContext, useState, ReactNode, } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
  createdDate: string; 
  active: boolean;
};

type UserContextType = {
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => boolean;
  deleteUser: (email: string) => void;
  checkCredentials: (email: string, password: string) => boolean;
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  toggleActive: (email: string, isActive: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  currentUser: null,
  addUser: () => false,
  deleteUser: () => {},
  checkCredentials: () => false,
  setCurrentUser: () => {},
  setUsers: () => {}, 
  toggleActive: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers
        ? JSON.parse(storedUsers).map((user: User) => ({
            ...user,
            createdDate: user.createdDate || new Date().toISOString(),
            active: user.active !== undefined ? user.active : false,
          }))
        : [];
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

    const newUser = {
      ...user,
      createdDate: new Date().toISOString(), 
      active: false, 
    };

    const updatedUsers= [...users,user]
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    console.log("User added:", newUser); 
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

  const toggleActive = (email: string, isActive: boolean) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, active: !isActive } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        addUser,
        deleteUser,
        checkCredentials,
        setCurrentUser,
        setUsers,
        toggleActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

