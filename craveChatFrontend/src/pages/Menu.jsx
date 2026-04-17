import React, { useEffect, useState } from 'react';
import { getMenu, placeOrder } from '../services/api';
import { ShoppingCart, Bot } from 'lucide-react';
import AiAssistant from '../components/features/AiAssistant';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMenu().then(res => {
            setMenuItems(res.data);
            setLoading(false);
        }).catch(err => console.error("Menu Fetch Error:", err));
    }, []);

    const handleOrder = async (item) => {
        const order = {
            studentId: "STU12345", // Hardcoded for demo
            items: item.name,
            totalAmount: item.price
        };
        try {
            await placeOrder(order);
            alert(`Order placed for ${item.name}! Check pgAdmin to see the row.`);
        } catch (err) {
            alert("Order failed. Is the backend running?");
        }
    };

    if (loading) return <div className="text-center mt-20">Loading Campus Menu...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Canteen Menu</h1>
                <AiAssistant /> {/* The floating AI Bot */}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <span className="text-orange-600 font-bold">₹{item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {item.aiTags.split(',').map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">#{tag.trim()}</span>
                            ))}
                        </div>
                        <button 
                            onClick={() => handleOrder(item)}
                            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                        >
                            <ShoppingCart size={18} /> Order Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;