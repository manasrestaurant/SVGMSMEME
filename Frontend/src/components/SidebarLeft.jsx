import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SidebarLeft = () => {
  const [quote, setQuote] = useState({ quote: "Loading vibes...", author: "Verse" });
  const [news, setNews] = useState([
    { title: "Loading", url: "#" },
    
]);
 const [loading, setLoading] = useState(true);
 const [loadingQuote, setLoadingQuote] = useState(true);

  const NEWS_API_KEY = "pub_7c37dd53d0ec4c349ce75fb164817a6d";
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=in&language=en&category=technology,entertainment`
        );
        // NewsData.io returns data in a 'results' array
        setNews(response.data.results.slice(0, 5));
      } catch (err) {
        console.error("News fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await axios.get('https://thequoteshub.com/api/');
        const rawData = res.data; // This is the long string in your console

    // Use a regular expression or split to extract Quote and Author
    const quoteMatch = rawData.match(/Quote: ([\s\S]*?)\nAuthor:/);
    const authorMatch = rawData.match(/Author: (.*)\nTags:/);
    if (quoteMatch && authorMatch) {
      setQuote({
        text: quoteMatch[1].trim(),
        author: authorMatch[1].trim()
      });
    }
  } catch (err) {
    console.error("Quote fetch failed:", err);
    setQuote({ text: "Success is the best revenge.", author: "Sohail" });
  }
};

    fetchNews();
    fetchQuote();
  }, []);

  return (
    <div className="sidebar-container left-sticky">
      {/* MOTIVATION WIDGET */}
      <div className="brutal-widget bg-yellow">
        <div className="widget-header">INSPIRATION ⚡</div>
        <div style={{ padding: '15px' }}>
          <p style={{ fontWeight: '900', fontSize: '1rem', marginBottom: '8px' }}>
            {quote.text}
          </p>
          <p style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '0.8rem' }}>
            — {quote.author || "Unknown"}  
          </p>
        </div>
      </div>

      {/* LIVE NEWS WIDGET */}
      <div className="brutal-widget bg-white">
        <div className="widget-header">INDIA BUZZ 🇮🇳</div>
        <ul style={{ listStyle: 'none', padding: '10px' }}>
          {news.map((item, index) => (
            <li key={index} style={{ 
              marginBottom: '12px', 
              borderBottom: '2px solid var(--black)',
              paddingBottom: '8px' 
            }}>
              <a href={item.url} target="_blank" rel="noreferrer" style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarLeft;