import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    // 1. Guard: If already connected, don't start a second connection
    if (stompClient && stompClient.connected) {
        return;
    }

    const socket = new SockJS('http://localhost:8080/ws-canteen');
    stompClient = Stomp.over(socket);
    stompClient.debug = null; // Keeps your console clean for the examiners

    stompClient.connect({}, (frame) => {
        console.log('Connected to XD Coders Backend');
        
        // 2. Tiny delay (100ms) ensures the 'connected' state is synced
        setTimeout(() => {
            if (stompClient.connected) {
                stompClient.subscribe('/topic/campus-chat', (payload) => {
                    onMessageReceived(JSON.parse(payload.body));
                });
            }
        }, 100);
    }, (error) => {
        console.error("WebSocket Error: ", error);
        // 3. Auto-reconnect after 5 seconds if the server drops
        setTimeout(() => connectWebSocket(onMessageReceived), 5000);
    });
};

export const sendChatMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send("/app/chat.send", {}, JSON.stringify(message));
    } else {
        console.warn("Cannot send message: Not connected yet.");
    }
};