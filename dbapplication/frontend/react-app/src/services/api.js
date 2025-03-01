import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data.users;
    } catch (error) {
        console.error("Error fetching users", error);
        return [];
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/delete-user/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true;  // Return success if the deletion was successful
        } else {
            return false;  // Return false if there was an issue with deletion
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;  // Return false if an error occurs
    }
};

export const addUser = async (user) => {
    try {
        await axios.post(`${API_URL}/add-user`, user);
        return true;
    } catch (error) {
        console.error("Error adding user", error);
        return false;
    }
};

export const updateUser = async (id, user) => {
    try {
        await axios.put(`${API_URL}/update-user/${id}`, user);
        return true;
    } catch (error) {
        console.error("Error updating user", error);
        return false;
    }
};