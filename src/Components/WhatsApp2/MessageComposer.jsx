import React from 'react';
import './WhatsAppUi.css';

export default function MessageComposer() {
    return (
        <div className="message-composer">
            <button className="emoji-button">😊</button>
            <button className="document-button">📎</button>
            <input type="text" placeholder="Type your message..." />
            <button className="send-button">Send</button>
        </div>
    );
}
