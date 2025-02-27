import { useEffect, useState } from "react";
import { getUsers } from "../Services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError(error.response?.data?.detail || "Failed to fetch users. Please try again.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Username</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2">{user.id}</td>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;