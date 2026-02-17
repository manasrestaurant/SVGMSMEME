import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://svgmsmeme.onrender.com/api/users/login', formData);
      
      // Check if the response contains the required data
      if (res.data && res.data.token) {
        // 1. Store the JWT Token for API authorization
        localStorage.setItem('token', res.data.token);
        
        // 2. Store user details for UI personalization (Name, Rank, etc.)
        // We stringify the object because localStorage only stores strings
        localStorage.setItem('user', JSON.stringify(res.data.user || res.data));
        
        console.log("✅ Credentials accepted. Welcome to the Verse.");
        
        // Navigate and force a reload to let the App/Navbar pick up the new state
        navigate('/');
        window.location.reload(); 
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert(err.response?.data?.message || "Invalid Credentials! 💀");
    }
  };

  return (
    <div className="brutal-widget" style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="widget-header">🔑 LOG INTO CHAOS</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '1rem' }}>
        <input 
          type="email" 
          className="brutal-input" 
          placeholder="EMAIL" 
          required
          autoComplete="email"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          className="brutal-input" 
          placeholder="PASSWORD" 
          required
          autoComplete="current-password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="brutal-btn bg-blue">ENTER VERSE 🚀</button>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          NEW HERE? <Link to="/register" style={{ color: 'var(--brutal-green)' }}>SIGN UP</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;