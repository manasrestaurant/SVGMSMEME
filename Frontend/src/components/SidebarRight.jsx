import { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';

const SidebarRight = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderboard().then(res => setLeaders(res.data));
  }, []);

  return (
    <div className="brutal-widget">
      <div className="widget-title">🏆 LEGENDS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {leaders.map((user, index) => (
          <div key={user._id} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>{index + 1}. {user.name}</span>
            <span style={{ color: 'var(--brutal-pink)' }}>{user.karma} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarRight;