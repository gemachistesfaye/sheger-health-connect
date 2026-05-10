import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  User, 
  CheckCheck,
  Paperclip,
  Smile,
  Circle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MessageBubble = ({ message, isOwn }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className={`max-w-[70%] p-4 rounded-[24px] ${
      isOwn 
        ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-600/10' 
        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
    }`}>
      <p className="text-sm font-medium leading-relaxed">{message.text}</p>
      <div className={`flex items-center gap-1 mt-2 ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>
        <span className="text-[10px] font-bold uppercase">{message.time}</span>
        {isOwn && <CheckCheck size={12} />}
      </div>
    </div>
  </motion.div>
);

const ChatSidebarItem = ({ chat, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-[24px] flex items-center gap-4 transition-all duration-300
      ${isActive ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-gray-50'}
    `}
  >
    <div className="relative">
      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-lg">
        {chat.name.charAt(0)}
      </div>
      {chat.online && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
      )}
    </div>
    <div className="flex-1 text-left overflow-hidden">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h4>
        <span className="text-[10px] font-black text-gray-400 uppercase">{chat.time}</span>
      </div>
      <p className="text-xs text-gray-400 truncate font-medium">{chat.lastMessage}</p>
    </div>
    {chat.unread > 0 && (
      <div className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
        {chat.unread}
      </div>
    )}
  </button>
);

const MessagesPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(0);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const chats = [
    { id: 1, name: 'Dr. Samuel Kassa', lastMessage: 'Your test results are ready.', time: '12:45', unread: 2, online: true },
    { id: 2, name: 'Dr. Bethlehem T.', lastMessage: 'Please follow the new dosage.', time: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'Sheger AI Support', lastMessage: 'How can I assist you today?', time: '2 days ago', unread: 0, online: true },
  ];

  const [messages, setMessages] = useState([
    { id: 1, text: "Good morning Dr. Samuel, I've been feeling much better today.", time: "12:30 PM", isOwn: true },
    { id: 2, text: "That is great to hear! Have you finished the prescribed antibiotics?", time: "12:35 PM", isOwn: false },
    { id: 3, text: "Yes, I took the last one this morning.", time: "12:40 PM", isOwn: true },
    { id: 4, text: "Excellent. Your blood test results are also back and they look normal. We can skip the follow-up visit.", time: "12:45 PM", isOwn: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8">
      {/* Chat Sidebar */}
      <div className="w-80 flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
           <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Messages</h2>
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
              />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
           {chats.map((chat, idx) => (
             <ChatSidebarItem 
                key={chat.id} 
                chat={chat} 
                isActive={activeChat === idx}
                onClick={() => setActiveChat(idx)}
             />
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
         {/* Chat Header */}
         <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
                  {chats[activeChat].name.charAt(0)}
               </div>
               <div>
                  <h3 className="font-black text-gray-900 leading-none mb-1">{chats[activeChat].name}</h3>
                  <div className="flex items-center gap-1.5">
                     <div className={`w-1.5 h-1.5 rounded-full ${chats[activeChat].online ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       {chats[activeChat].online ? 'Active Now' : 'Offline'}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-3 text-gray-400 hover:bg-gray-50 hover:text-emerald-600 rounded-2xl transition-all">
                  <Phone size={20} />
               </button>
               <button className="p-3 text-gray-400 hover:bg-gray-50 hover:text-emerald-600 rounded-2xl transition-all">
                  <Video size={20} />
               </button>
               <button className="p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">
                  <MoreVertical size={20} />
               </button>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30 no-scrollbar">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
            ))}
            <div ref={messagesEndRef} />
         </div>

         {/* Chat Input */}
         <div className="p-8 border-t border-gray-50 bg-white">
            <form onSubmit={handleSend} className="flex items-center gap-4 bg-gray-50 p-2 rounded-[24px] border border-gray-100 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
               <button type="button" className="p-3 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Paperclip size={20} />
               </button>
               <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Type your message to Dr. Samuel..."
                 className="flex-1 bg-transparent border-none outline-none px-2 text-sm font-medium"
               />
               <button type="button" className="p-3 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Smile size={20} />
               </button>
               <button 
                 type="submit" 
                 disabled={!input.trim()}
                 className="w-12 h-12 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 hover:scale-105 transition-transform flex items-center justify-center"
               >
                  <Send size={20} />
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};

export default MessagesPage;
