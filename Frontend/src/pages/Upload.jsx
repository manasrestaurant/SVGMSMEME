import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Or use your API service

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('ExamSeason');
  const [image, setImage] = useState(null); // Holds the actual file
  const [preview, setPreview] = useState(null); // Holds the preview URL
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const handlePost = async () => {
    if (!image || !caption) return alert("Image and Caption are required!");

    // Create FormData object (Crucial for file uploads)
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    formData.append('category', category);
    formData.append('isAnonymous', isAnonymous);

    try {
      console.log("🚀 Launching meme to the Verse...");
      
      // Hit your backend endpoint
      // Ensure you have your Auth token in the headers if using protected route
      await axios.post('https://svgmsmeme.onrender.com/api/memes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate('/');
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert(err.response?.data?.message || "Upload failed. Check console.");
    }
  };

  return (
    <div className="brutal-widget" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="widget-header">📤 DROP THE CHAOS</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '1rem' }}>
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="image/*,video/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageChange} 
        />

        {/* Clickable Preview Box */}
        <div 
          className="meme-img-box" 
          onClick={() => fileInputRef.current.click()}
          style={{ 
            height: '300px', 
            borderStyle: 'dashed', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: preview ? 'transparent' : 'var(--black)'
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <p className="brutal-title" style={{ color: 'white' }}>Click to Upload Image</p>
          )}
        </div>

        <input 
          className="brutal-input" 
          placeholder="Write a savage caption..." 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <select className="brutal-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="ExamSeason">#ExamSeason</option>
          <option value="Attendance">#Attendance</option>
          <option value="Canteen">#Canteen</option>
          <option value="HostelLife">#HostelLife</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            id="anon" 
            checked={isAnonymous} 
            onChange={(e) => setIsAnonymous(e.target.checked)}
            style={{ transform: 'scale(1.5)' }} 
          />
          <label htmlFor="anon" style={{ fontWeight: 'bold' }}>POST ANONYMOUSLY</label>
        </div>

        <button className="brutal-btn bg-yellow" onClick={handlePost}>
          POST MEME 🚀
        </button>
      </div>
      
      <div style={{ background: '#ffcccc', padding: '10px', marginTop: '20px', border: '2px solid black' }}>
        <strong>⚠️ RULES:</strong> No bullying, no personal attacks. Stay brutal, not toxic.
      </div>
    </div>
  );
};

export default Upload;