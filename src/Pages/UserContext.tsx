import { createContext, useState, ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
  users: User[];
  addUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
