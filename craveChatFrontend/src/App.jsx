import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Menu from './pages/Menu';
import Chat from './pages/Chat';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/chat" element={<Chat />}/>
            <Route path="/admin" element={<AdminOrders/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;