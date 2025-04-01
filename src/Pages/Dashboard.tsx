import { useContext, useState } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Dashboard = () => {
  const { users } = useContext(UserContext)!;
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <Table className="w-full border-collapse">
          <TableHead>
            <TableRow>
              <TableCell className="border-b text-left p-2">Name</TableCell>
              <TableCell className="border-b text-left p-2">Email</TableCell>
              <TableCell className="border-b text-left p-2">Password</TableCell>
              <TableCell className="border-b text-left p-2">Switch</TableCell>
              <TableCell className="border-b text-center p-2">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="border-b p-2">{user.name}</TableCell>
                <TableCell className="border-b p-2">{user.email}</TableCell>
                <TableCell className="border-b p-2">{user.password}</TableCell>
                <TableCell className="border-b p-2">
                  {
                    <Switch
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                  }
                </TableCell>
                <TableCell className="border-b text-center p-2">
                  <Button className="text-blue-500 hover:text-blue-700">View</Button>
                  <Button className="text-red-500 hover:text-red-700 ml-2">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Dashboard;
