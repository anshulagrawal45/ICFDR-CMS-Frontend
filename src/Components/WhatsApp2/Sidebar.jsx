import React from 'react';
import './WhatsAppUi.css';

export default function Sidebar({ users, onSelectChat }) {
    return (
        <div className="sidebar">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => onSelectChat(user)}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}