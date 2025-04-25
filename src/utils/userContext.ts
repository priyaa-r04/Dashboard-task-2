import { createContext } from "react";
export type User = {
    name: string;
    email: string;
    password: string;
    createdDate: string; 
    active: boolean;
    profileImageUrl?: string;
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
  updateProfileImage: (email: string, newImageUrl: string) => void; 
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
  updateProfileImage: () => {},
});