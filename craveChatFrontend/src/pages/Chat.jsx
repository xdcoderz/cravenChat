import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendChatMessage } from '../services/socket';
import { Send, User } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        connectWebSocket((msg) => {
            setMessages(prev => [...prev, msg]);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const chatMsg = {
            sender: "Student_X", // Backend will mask this
            content: input,
            type: 'CHAT'
        };
        
        sendChatMessage(chatMsg);
        setInput("");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg h-[80vh] flex flex-col overflow-hidden border border-gray-100">
            <div className="bg-orange-500 p-6 text-white">
                <h2 className="text-xl font-bold">Campus Whispers</h2>
                <p className="text-orange-100 text-sm">Anonymous & Real-time</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === "System" ? 'items-center' : 'items-start'}`}>
                        <span className="text-[10px] text-gray-400 ml-1 mb-1">{msg.sender}</span>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type anonymously..."
                    className="flex-1 p-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button type="submit" className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors">
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Chat;