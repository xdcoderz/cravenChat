import { Link } from 'react-router-dom';
import { Utensils, MessageSquare } from 'lucide-react';

const Navbar = () => (
    <nav className="bg-white border-b border-gray-200 py-4 mb-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black text-orange-500 italic">CRAVE & CHAT</Link>
            <div className="flex gap-6">
                <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                    <Utensils size={18} /> Crave
                </Link>
                <Link to="/chat" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                    <MessageSquare size={18} /> Chat
                </Link>
                <Link to="/admin" className="text-gray-400 text-xs hover:text-orange-500">Admin Panel</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;