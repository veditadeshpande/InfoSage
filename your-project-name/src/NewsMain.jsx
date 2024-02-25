//import { useState } from 'react'
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Reader.jsx'; 
import { useNavigate } from 'react-router-dom'; 
//Card
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia'; 
import './NewsMain.css'
import Reader from './Reader.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsMain />} />
        <Route path="/Reader" element={<Reader />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}
function NewsMain() {
  const [count, setCount] = useState(0)
  const [articles, setArticles] = useState([]); // State to store news articles
  const navigate = useNavigate();
  const handleReadMoreClick = (articleUrl) => {
    navigate('/reader', { state: { articleUrl } }); // Use the '/reader' path or whatever path you've assigned to the Reader component
  };

  // Function to fetch news articles
  const fetchNews = async () => {
    const apiKey = 'cf4f7b8798b84e60a04f361444433a29'; // Replace with your actual API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    //const NewsAPI = require('newsapi');
    //const newsapi = new NewsAPI('cf4f7b8798b84e60a04f361444433a29');

    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
    <div>
      
    </div>
    <h1>NEWS</h1>
   

    <div className="card-container">
  {articles.map((article, index) => (
    <Card key={index} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345, margin: 2, height: '100%' }}>
      {article.urlToImage && (
    <CardMedia
      component="img"
      height="140"
      image={article.urlToImage}
      alt={article.title}
    />
  )}
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="div">
        {article.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {article.description}
      </Typography>
    </CardContent>
    <CardActions sx={{ marginTop: 'auto' }}>
      <Button size="small" onClick={() => handleReadMoreClick(article.url)}>Read More</Button> {/*Link the third page here*/}
    </CardActions>
  </Card>
  ))}
</div>


  </>
)
}

export default NewsMain;



