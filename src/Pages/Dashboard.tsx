import { useContext } from "react";
import { UserContext } from "./UserContext";

const Dashboard = () => {
  const { users } = useContext(UserContext)!; 

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b text-left p-2">Name</th>
              <th className="border-b text-left p-2">Email</th>
              <th className="border-b text-left p-2">Password</th>
              <th className="border-b text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border-b p-2">{user.name}</td>
                <td className="border-b p-2">{user.email}</td>
                <td className="border-b p-2">{user.password}</td>
                <td className="border-b text-center p-2">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                  <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
