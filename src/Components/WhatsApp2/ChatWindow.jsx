import React from 'react';
import MessageComposer from './MessageComposer';
import './WhatsAppUi.css';

function ChatWindow({ chat, user }) {
    return (
        <div className="chat-window">
            {user ? (
                <>
                    <h2>{user.name}</h2>
                    <ul>
                        {chat ? chat.map((message) => (
                            <li key={message.id} className={`message ${message.sender === 'You' ? 'right' : 'left'}`}>
                                {/* <div className="message-sender">{message.sender}</div> */}
                                <div className="message-text">{message.text}</div>
                                <div className="message-time">{message.timestamp}</div>
                            </li>
                        )) : <p>No messages yet.</p>}
                    </ul>
                    <MessageComposer />
                </>
            ) : (
                <p>Select a user to start chatting</p>
            )}
        </div>
    );
}

export default ChatWindow;
