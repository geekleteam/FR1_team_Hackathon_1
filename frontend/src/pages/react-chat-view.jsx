import React, { useState } from 'react';
import axios from 'axios';
import { Menu, Bell, LogOut, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const CHARS = 'abcdefghijklmnopqrstuvwxyz';
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const ChatInterface = () => {
  const {setAuth} = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (loading) return;
        if (inputMessage.trim() === '') return;

        // Add user message to chat
        setMessages(prevMessages => [...prevMessages, { role: 'human', content: inputMessage }] );

        let sessionId = localStorage.getItem("session_id");
        if (!sessionId) {
          const chars = [...CHARS];
          shuffle(chars);
          sessionId = chars.join('');
          localStorage.setItem("session_id", sessionId);
        }
        try {
          setLoading(true);
          // Make API call to Claude
          const response = await axios.post(
            "https://tentacle.pink/api/prompt/",
            {
              prompt: inputMessage,
            },
            {
              headers: {
                "Content-Type": "application/json",
                'Session-ID': sessionId,
              },
            },
          );
          
          // Add Claude's response to chat
          const claudeResponse = response.data.response;
          
          setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: claudeResponse }]);  
        } catch (error) {
          console.error('Error calling Claude API:', error);
          setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        }
        
        setLoading(false);
        setInputMessage('');
    };

    return (
      <div className="flex-1 flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Chat with AI</h1>
          </div>
          <div className="flex items-center space-x-4">
           
          </div>
        </div>
  
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((message, index) => (
            <div key={index} className='flex flex-col'>
            <div className={`flex ${message.role === 'human' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${
                message.role === 'human' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              
            </div>
              {index === messages.length - 1 && <Link
              
              className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              to="/table">Go to comparison</Link>}
              </div>
          ))}
                {loading && (
                    <div className="flex items-center justify-center mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                )}
        </div>
  
        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)}
            />
            <button
              className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => sendMessage(e)}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ChatInterface;