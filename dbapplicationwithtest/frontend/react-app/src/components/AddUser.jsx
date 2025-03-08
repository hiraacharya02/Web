import React, { useState } from 'react';
import { addUser } from '../services/api';

const AddUser = ({ onUserAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addUser({ name, email });
        if (success) {
            onUserAdded();
            setName('');
            setEmail('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-user-form">
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUser;
