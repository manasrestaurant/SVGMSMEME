import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderboard().then(res => setLeaders(res.data));
  }, []);

  const getRankColor = (index) => {
    if (index === 0) return 'var(--brutal-yellow)';
    if (index === 1) return 'var(--brutal-blue)';
    if (index === 2) return 'var(--brutal-pink)';
    return 'white';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="main-title" style={{ fontSize: '3rem' }}>Legends of Memes</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {leaders.map((user, index) => (
          <div 
            key={user._id} 
            className="meme-card" 
            style={{ 
              backgroundColor: getRankColor(index),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 2rem'
            }}
          >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span className="brutal-title" style={{ fontSize: '2rem' }}>#{index + 1}</span>
              <div>
                <h3 style={{ margin: 0 }}>{user.name}</h3>
                <small className="brutal-btn bg-white" style={{ padding: '2px 5px', fontSize: '10px' }}>
                  {user.rank}
                </small>
              </div>
            </div>
            <span className="brutal-title">{user.karma} PTS</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;