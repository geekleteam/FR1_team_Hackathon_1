import React, { useState } from 'react';
import axios from 'axios';
import { Menu, Bell, LogOut } from 'lucide-react';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message to chat
        setMessages(prevMessages => [...prevMessages, { role: 'human', content: inputMessage }]);

        try {
            // Make API call to Claude
            const response = await axios.post(
                'https://api.anthropic.com/v1/messages',
                {
                    model: "claude-3-opus-20240229",
                    max_tokens: 1024,
                    messages: [
                        ...messages,
                        { role: 'human', content: inputMessage }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'YOUR_API_KEY_HERE' // Replace with your actual API key
                    }
                }
            );

            // Add Claude's response to chat
            const claudeResponse = response.data.content[0].text;
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: claudeResponse }]);
        } catch (error) {
            console.error('Error calling Claude API:', error);
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        }

        setInputMessage('');
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Top bar */}
            <div className="bg-white shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Menu className="text-gray-500 mr-4" />
                    <div className="relative">

                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Bell className="text-gray-500" />
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">8</span>
                    </div>
                    <a href="#" className="text-gray-500 flex items-center">
                        <LogOut size={18} className="mr-1" />
                        Log out
                    </a>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Chat messages would go here */}
            </div>

            {/* Input area */}
            <div className="p-4 border-t">
                <input
                    type="text"
                    placeholder="Enter message text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ChatInterface;