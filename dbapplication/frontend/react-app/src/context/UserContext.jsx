import { createContext, useState, useEffect } from 'react';
import { fetchUsers } from '../services/api.js'; // Ensure correct import

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data.users);
    };

    return (
        <UserContext.Provider value={{ users, setUsers, loadUsers }}>
            {children}
        </UserContext.Provider>
    );
};

