// import React, { useState } from 'react';
// import ChatWindow from './ChatWindow';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import './WhatsAppUi.css';

// export default function WhatsAppUi() {
//     const [selectedChat, setSelectedChat] = useState(null);

//     const chats = {
//         1: [
//             // { id: 1, sender: 'You', text: 'Hello!', timestamp: '10:00 AM' },
//             { id: 2, sender: 'Ishan Yadav', text: 'Hi there!', timestamp: '10:01 AM' },
//         ],
//         2: [
//             // { id: 1, sender: 'You', text: 'How are you?', timestamp: '11:00 AM' },
//             { id: 2, sender: 'Raghbir Singh', text: 'I am good!', timestamp: '11:01 AM' },
//         ],
//     };

//     const users = [
//         { id: 1, name: 'Ishan Yadav' },
//         { id: 2, name: 'Raghbir Singh' },
//     ];

//     return (
//         <div className="App">
//             <Header />
//             <div className="content">
//                 <Sidebar users={users} onSelectChat={setSelectedChat} />
//                 <ChatWindow chat={selectedChat ? chats[selectedChat.id] : null} user={selectedChat} />
//             </div>
//         </div>
//     );
// }


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import "./WhatsAppUi.css";


export default function WhatsAppUi() {
    let { userID } = useContext(Context);
    let navigate = useNavigate()
    React.useEffect(() => {
        if (!userID) {
            navigate("/client/login")
        }
    }, [navigate, userID])

    return (
        <div className="whatsapp-container">
            <iframe
                src="https://voice.roundsms.co/login.php"
                title="WhatsApp Live Chat"
                className="whatsapp-iframe"
                allow="camera; microphone; clipboard-read; clipboard-write"
            />
        </div>
    );
}





