import React, { useState, useEffect } from 'react';
import { updateUser } from '../services/api';

const EditUser = ({ user, onUserUpdated }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUser(user.id, { name, email });
        if (success) {
            onUserUpdated({ ...user, name, email });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Update User</button>
        </form>
    );
};

export default EditUser;
