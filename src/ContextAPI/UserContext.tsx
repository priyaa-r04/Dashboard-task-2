// import { createContext, useState, ReactNode, useEffect } from "react";

// export type User = {
//   name: string;
//   email: string;
//   password: string;
// };

// type UserContextType = {
//   users: User[];
//   addUser: (user: User) => void;
//   checkCredentials: (email: string, password: string) => boolean;
// };

// export const UserContext = createContext<UserContextType>({
//   users: [],
//   addUser: () => { },
//   checkCredentials: () => false,
// });

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
//     setUsers(storedUsers);
//     console.log("Fetched users in UserProvider:", storedUsers); 
//   }, []);

//   const addUser = (user: User) => {
//     setUsers((prevUsers) => {
//     const updatedUsers = [...prevUsers, user];
//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//     return updatedUsers;
//   });
// };

//   const checkCredentials = (email: string, password: string) => {
//     return users.some((user) => user.email === email && user.password === password);
//   };

//   return (
//     <UserContext.Provider value={{ users, addUser, checkCredentials }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, ReactNode, useEffect } from "react";

// Define the User type
export type User = {
  name: string;
  email: string;
  password: string;
};

// Define the context's type
type UserContextType = {
  users: User[];
  addUser: (user: User) => boolean;
  deleteUser: (email: string) => void;
  checkCredentials: (email: string, password: string) => boolean;
};

// Create the context with default values
export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => false,
  deleteUser: () => {},
  checkCredentials: () => false,
});

// UserProvider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch the users from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
    console.log("Fetched users in UserProvider:", storedUsers); // Debugging: Show the fetched users
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Users saved to localStorage:", users); // Debugging: Log saved users
  }, [users]);

  // Add a user to the list and update localStorage
  const addUser = (user: User): boolean => {
    const emailExists = users.some((existingUser) => existingUser.email === user.email);

    if (emailExists) {
      console.log("Add user failed: Email already exists"); // Debugging
      return false; // Indicate failure due to duplicate email
    }

    setUsers((prevUsers) => [...prevUsers, user]);
    console.log("User added:", user); // Debugging
    return true; // Indicate success
  };

  // Delete a user by email
  const deleteUser = (email: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    console.log(`User with email ${email} deleted.`); // Debugging
  };

  // Check if the provided email and password match any user in the list
  const checkCredentials = (email: string, password: string) => {
    return users.some((user) => user.email === email && user.password === password);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, checkCredentials }}>
    {children}
  </UserContext.Provider>
  );
};

