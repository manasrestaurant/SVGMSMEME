const MemeCard = ({ meme, onUpvote }) => {
  return (
    <div className="meme-card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800 }}>@{meme.author.name || "Anonymous"}</span>
        <span style={{ 
          backgroundColor: 'var(--brutal-green)', 
          border: '2px solid black', 
          padding: '2px 8px', 
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          #{meme.category}
        </span>
      </div>

      {/* ENFORCED IMAGE SIZE CONTAINER */}
      <div className="meme-img-box">
        <img 
          src={meme.imageUrl} 
          alt={meme.caption} 
          crossOrigin="anonymous" 
        />
      </div>

      <h2 className="meme-caption">
        "{meme.caption}"
      </h2>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="brutal-btn bg-blue" 
          onClick={() => onUpvote(meme._id)}
          style={{ flex: 1 }}
        >
          🔥 {meme.upvotes?.length || 0}
        </button>
        <button className="brutal-btn bg-pink" style={{ flex: 1 }}>
          💬 COMMENT
        </button>
      </div>
    </div>
  );
};

export default MemeCard;