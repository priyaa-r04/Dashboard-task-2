import { createContext, useState, ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  users: User[];
  addUser: (user: User) => void;
  checkCredentials: (email: string, password: string) => boolean;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => { },
  checkCredentials: () => false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const checkCredentials = (email: string, password: string) => {
    return users.some((user) => user.email === email && user.password === password);
  };

  return (
    <UserContext.Provider value={{ users, addUser, checkCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
