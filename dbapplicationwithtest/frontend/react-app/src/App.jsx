import React, { useState, useEffect } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import './App.css';
import { fetchUsers, deleteUser } from './services/api';

const App = () => {
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUsers, setViewingUsers] = useState(true);
    const [users, setUsers] = useState([]);
    const [userAdded, setUserAdded] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false); // For delete success message
    const [deleteUserId, setDeleteUserId] = useState(null); // Store user ID for deletion
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Show confirmation popup for delete

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        getUsers();
    }, [userAdded, userDeleted]); // Re-fetch after adding or deleting a user

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleUserUpdated = (updatedUser) => {
        setEditingUser(null);
        setUserAdded(!userAdded); // Refresh the users list
    };

    const handleUserAdded = () => {
        setUserAdded(true);
    };

    const handleDeleteUser = async (id) => {
        setDeleteUserId(id);
        setShowDeletePopup(true); // Show confirmation popup
    };

    const confirmDeleteUser = async () => {
        // Simulate deletion from the server (replace with actual deletion API call)
        const success = await deleteUser(deleteUserId);
        if (success) {
            setUserDeleted(true); // Mark deletion as successful
            setUserAdded(false);  // Reset add success state
            setShowDeletePopup(false); // Close the popup
        }
    };

    const cancelDelete = () => {
        setShowDeletePopup(false); // Close the popup without deleting
    };

    const handleClosePopup = () => {
        setUserAdded(false);
        setUserDeleted(false); // Reset both states after any popup closes
    };

    return (
        <div className="app">
            <div className="content-container">
                <h1>User Management</h1>
                <AddUser onUserAdded={handleUserAdded} />
                
                {/* User Added Success Popup */}
                {userAdded && (
                    <div className="popup">
                        <p>User successfully added!</p>
                        <button className="close-popup" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                )}

                {/* User Deleted Success Popup */}
                {userDeleted && (
                    <div className="popup">
                        <p>User successfully deleted!</p>
                        <button className="close-popup" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Popup */}
                {showDeletePopup && (
                    <div className="modal-overlay">
                        <div className="delete-popup">
                            <p>Are you sure you want to delete this user?</p>
                            <div>
                                <button className="confirm-delete" onClick={confirmDeleteUser}>
                                    Yes, Delete
                                </button>
                                <button className="cancel-delete" onClick={cancelDelete}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="user-list-container">
                    {viewingUsers && !editingUser && (
                        <UserList users={users} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
                    )}
                    {editingUser && (
                        <EditUser user={editingUser} onUserUpdated={handleUserUpdated} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
