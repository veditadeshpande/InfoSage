//import { useState } from 'react'
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//Card
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './NewsMain.css'

function NewsMain() {
  const [count, setCount] = useState(0)
  const [articles, setArticles] = useState([]); // State to store news articles

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
    <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer">Read More</Button>
      </CardActions>
    </Card>
  ))}
</div>

  </>
)
}

export default NewsMain;

