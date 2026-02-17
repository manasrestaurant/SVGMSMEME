import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://svgmsmeme.onrender.com/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="brutal-widget" style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="widget-header">🧬 JOIN THE VERSE</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '1rem' }}>
        <input 
          className="brutal-input" 
          placeholder="FULL NAME" 
          required
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" 
          className="brutal-input" 
          placeholder="COLLEGE EMAIL" 
          required
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          className="brutal-input" 
          placeholder="PASSWORD" 
          required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="brutal-btn bg-green">CREATE ACCOUNT 🔓</button>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          ALREADY A MEMBER? <Link to="/login" style={{ color: 'var(--brutal-pink)' }}>LOG IN</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;