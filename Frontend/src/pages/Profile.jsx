import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userMemes, setUserMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user info from localStorage (saved during login)
  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Fetching profile : ", storedUser?._id || "Unknown User");
        // 1. Fetch User Stats (Karma, Rank, etc.)
        const userRes = await axios.get(`https://svgmsmeme.onrender.com/api/users/${storedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(userRes.data);

        // 2. Fetch only memes uploaded by this user
        const memesRes = await axios.get(`https://svgmsmeme.onrender.com/api/users/user-memes/${storedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserMemes(memesRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="brutal-widget">LOADING PROFILE...</div>;
  if (!profileData) return <div className="brutal-widget">PLEASE LOGIN TO VIEW PROFILE</div>;

  return (
    <div className="app-container" style={{ display: 'block' }}>
      <div className="meme-card bg-white" style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '120px', height: '120px', background: 'var(--brutal-blue)', 
          border: '4px solid black', margin: '0 auto 1rem', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem'
        }}>
          {profileData.avatar || "🐼"}
        </div>
        
        <h1 className="brutal-title">{profileData.name}</h1>
        
        <p className="brutal-btn bg-green" style={{ display: 'inline-block', marginTop: '10px' }}>
          {profileData.rank || "Meme Novice"}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
          <div className="brutal-widget" style={{ flex: 1 }}>
            <h3>Karma</h3>
            <span className="brutal-title" style={{ fontSize: '2rem' }}>{profileData.karma}</span>
          </div>
          <div className="brutal-widget" style={{ flex: 1 }}>
            <h3>Memes</h3>
            <span className="brutal-title" style={{ fontSize: '2rem' }}>{userMemes?.length || 0}</span>
          </div>
        </div>
      </div>

      <h2 className="brutal-title" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Your Hall of Fame</h2>
      
      <div className="meme-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {userMemes.length == 0 ? userMemes.map(meme => (
          <div key={meme._id} className="meme-card" style={{ padding: '10px' }}>
            <div className="meme-img-box" style={{ height: '200px' }}>
              <img src={`https://svgmsmeme.onrender.com/${meme.image}`} alt="User Meme" />
            </div>
            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{meme.caption}</p>
          </div>
        )) : <p style={{ textAlign: 'center' }}>You haven't uploaded any memes yet. Get memeing! 🎬</p>}
      </div>
    </div>
  );
};

export default Profile;