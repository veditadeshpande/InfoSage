import { useState, useEffect } from 'react';
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
import Box from '@mui/material/Box';
import Intro from './Intro.jsx';
function App() {
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
      setArticles([]);
      setReaderMode(true);

    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  const openReaderMode = (url) => { // Modify openReaderMode to accept url parameter
    // Set reader mode to true and clear articles
    setReaderMode(true);
    setSelectedArticleUrl(url); // Set the selected article URL
    setArticles([]); // Clear articles
    console.log('Reader mode activated');
  }

  return (
    <div className='newsMain'>
      <div className="card-container">
        {articles.map((article, index) => (
          <Card key={index} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345, margin: 2, height: '100%', borderRadius: 8 }}>
            {article.urlToImage && (
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt={article.title}
              />
            )}
            <CardContent className='selectedCard' sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
            </CardContent>
<CardActions sx={{ marginTop: 'auto', justifyContent: 'center' }}>
<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
        <ButtonGroup aria-label="Basic button group" >
    <Button variant="contained" color="secondary" size="large" href={article.url} target="_blank" rel="noopener noreferrer">Read Source</Button>
    {/* Pass article.url to openReaderMode */}
    <Button variant="contained" color="secondary" size="large" onClick={() => openReaderMode(article.url)}>Read Here</Button>
  </ButtonGroup>
    </Box>

</CardActions>
          </Card>
        ))}
        {/* Conditional rendering for reader mode paragraph */}
        {readerMode && (
          <div>
            {/* Pass the selectedArticleUrl as prop */}
            <Intro />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
