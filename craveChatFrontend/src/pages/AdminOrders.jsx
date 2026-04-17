import React, { useState, useEffect } from 'react';
import { connectWebSocket } from '../services/socket';
import { Clock, CheckCircle, ChefHat, Bell } from 'lucide-react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    // 1. Fetch existing orders on load
    useEffect(() => {
        axios.get("http://localhost:8080/api/orders").then(res => {
            setOrders(res.data.reverse()); // Show newest first
        });

        // 2. Listen for NEW orders in real-time
        connectWebSocket((newOrder) => {
            if (newOrder.items) { 
                setOrders(prev => [newOrder, ...prev]);
                // Play a subtle notification sound if you want to be fancy!
            }
        });
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
                    <ChefHat className="text-orange-500" size={40} /> KITCHEN LIVE
                </h1>
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    LIVE CONNECTION ACTIVE
                </div>
            </div>

            <div className="grid gap-6">
                <div className="mb-4 text-gray-600 font-medium">
    Showing {orders.length} active orders for today.
</div>
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-orange-500 flex justify-between items-center transform transition-all hover:scale-[1.01]">
                        <div>
                            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Order #{order.id}</span>
                            <h2 className="text-2xl font-bold text-gray-800 mt-1">{order.items}</h2>
                            <p className="text-gray-500 font-medium">Student: <span className="text-gray-800">{order.studentId}</span></p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-sm font-bold text-orange-500 flex items-center gap-1 justify-end">
                                    <Clock size={14} /> {order.status}
                                </p>
                                <p className="text-2xl font-black text-gray-900">₹{order.totalAmount}</p>
                            </div>
                            <button className="bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100">
                                <CheckCircle size={28} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;