import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
