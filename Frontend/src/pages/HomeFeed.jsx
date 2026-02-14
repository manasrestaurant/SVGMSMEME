import { useEffect, useState } from 'react';
import { fetchMemes, upvoteMeme } from '../services/api';
import MemeCard from '../components/MemeCard';

// 1. Define your backend base URL
const BACKEND_URL = "http://localhost:5000";

const HomeFeed = ({category}) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMemes(category ? category : null);
        
        const formattedMemes = res.data.map(meme => {
          // Construct the full URL properly
          const fullUrl = meme.imageUrl?.startsWith('http') 
            ? meme.imageUrl 
            : `${BACKEND_URL}/${meme.imageUrl?.replace(/\\/g, '/').replace(/\s/g, '%20')}`;
          return {
            ...meme,
            imageUrl: fullUrl
          };
        });

        setMemes(formattedMemes);
      } catch (err) {
        console.error("Failed to load memes:", err);
      }
    };
    load();
  }, []);

  const handleUpvote = async (id) => {
    try {
      const res = await upvoteMeme(id);
      // Fixed the nested property update logic
      setMemes(memes.map(m => 
        m._id === id ? { ...m, upvotes: Array(res.data.upvotes).fill(0) } : m
      ));
    } catch (err) {
      alert("Login to upvote!");
    }
  };

  return (
    <div>
      {memes.length > 0 ? (
        memes.map(m => <MemeCard key={m._id} meme={m} onUpvote={handleUpvote} />)
      ) : (
        <div className="brutal-widget">No memes yet. Be the first menace 😈</div>
      )}
    </div>
  );
};

export default HomeFeed;