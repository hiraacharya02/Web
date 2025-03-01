import React from 'react';

const UserCard = ({ user, onDelete, onEdit }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="user-card-buttons">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default UserCard;
