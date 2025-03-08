import { useEffect, useState } from "react";
import { fetchUsers } from "../services";
import UserForm from "../components/AddUser";
import UserList from "../components/EditUser";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    const getUsers = async () => {
        const data = await fetchUsers();
        setUsers(data.users);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="home">
            <h1>User Management</h1>
            <UserForm fetchUsers={getUsers} userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
            <UserList users={users} fetchUsers={getUsers} setUserToEdit={setUserToEdit} />
        </div>
    );
};

export default Home;
