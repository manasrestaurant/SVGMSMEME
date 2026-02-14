import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeFeed from './pages/HomeFeed';
import Upload from './pages/Upload';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';

function App() {
  // 1. Theme State Logic
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Category Filtering State
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <div className="app-container">
        {/* LEFT SIDEBAR: Handles category selection */}
        <aside className="sidebar-left">
          <SidebarLeft 
            onCategoryClick={setSelectedCategory} 
            activeCategory={selectedCategory} 
          />
        </aside>

        <div className="main-content">
          <Routes>
            {/* HOME FEED: Receives selectedCategory to filter memes */}
            <Route path="/" element={<HomeFeed category={selectedCategory} />} />
            
            <Route path="/upload" element={<Upload />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="*" element={
              <div className="brutal-widget" style={{ margin: '4rem auto', maxWidth: '500px', textAlign: 'center' }}>
                <h1 className="brutal-title">404</h1>
                <p>YOU'RE LOST IN THE VERSE! 🤡</p>
              </div>
            } />
          </Routes>
        </div>

        <aside className="sidebar-right">
          <SidebarRight />
        </aside>
      </div>
    </Router>
  );
}

export default App;