import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { askAi } from '../../services/api';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const res = await askAi(query);
            setResponse(res.data);
        } catch (err) {
            setResponse("Oops! The bot is taking a nap. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 transition-transform hover:scale-110 flex items-center gap-2"
            >
                {isOpen ? <X size={24} /> : <><Bot size={24} /> <span className="font-bold text-sm">Ask Crave-Bot</span></>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-orange-500 p-4 text-white flex items-center gap-2">
                        <Sparkles size={18} />
                        <span className="font-bold">AI Food Suggestion</span>
                    </div>

                    <div className="p-4 h-48 overflow-y-auto text-sm text-gray-700 bg-gray-50">
                        {response ? (
                            <div className="bg-white p-3 rounded-2xl border border-gray-100 italic">
                                "{response}"
                            </div>
                        ) : (
                            <p className="text-gray-400">Ask me: "What's spicy?" or "I want something cheesy under 50"</p>
                        )}
                        {loading && <div className="mt-2 animate-pulse text-orange-500">Thinking...</div>}
                    </div>

                    <form onSubmit={handleAsk} className="p-3 border-t border-gray-100 flex gap-2">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type here..."
                            className="flex-1 text-sm p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button type="submit" className="text-orange-500 hover:text-orange-600">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AiAssistant;