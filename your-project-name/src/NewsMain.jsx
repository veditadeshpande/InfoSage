import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Reader from './Reader.jsx'; 
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import './NewsMain.css';

function NewsMain() {
  const [articles, setArticles] = useState([]); // State to store news articles
  const [readerMode, setReaderMode] = useState(false); // State to track reader mode
  const [selectedArticleUrl, setSelectedArticleUrl] = useState('');

  // Function to fetch news articles
  const fetchNews = async () => {
    const apiKey = 'cf4f7b8798b84e60a04f361444433a29'; // Replace with your actual API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

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

  const openReaderMode = () => {
    // Set reader mode to true and clear articles
    setReaderMode(true);
    setArticles([]);
    console.log('Reader mode activated');
  }

  return (
    <>
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
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer">Read Source</Button>
                <Button onClick={openReaderMode}>Read Here</Button>
              </ButtonGroup>
            </CardActions>
          </Card>
        ))}
        {/* Conditional rendering for reader mode paragraph */}
        {readerMode && (
          <div>
            <Reader url={'test'}></Reader>
          </div>
        )}
      </div>
    </>
  );
}

export default NewsMain;
