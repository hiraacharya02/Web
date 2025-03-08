import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onEditUser, onDeleteUser }) => {
    return (
        <div className="user-list">
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={() => onDeleteUser(user.id)}  // Trigger the delete modal
                    onEdit={() => onEditUser(user)}
                />
            ))}
        </div>
    );
};

export default UserList;
