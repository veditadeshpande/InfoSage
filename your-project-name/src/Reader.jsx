//import { useState } from 'react'
//import { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import './App.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Slider from '@mui/material/Slider';
const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];
import './Reader.css'
// Import OpenAI's library
import OpenAI from 'openai';
import { Configuration, OpenAIApi } from "openai";

function Reader() {

  const openAIKey = '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';
  const [summaries, setSummaries] = useState({});

  // Initialize the OpenAI API with your key
  const configuration = new Configuration({
    apiKey: openAIKey,
  });
  const openai = new OpenAIApi(configuration);

  // Define the state variable 'articles' and its setter 'setArticles'
  const [articles, setArticles] = useState([])

  // Function to fetch news articles
  const showNews = async () => {
    const apiKey = 'cf4f7b8798b84e60a04f361444433a29'; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      // Summarize each article after fetching
      data.articles.forEach(article => {
        summarizeText(article.content, article.title);
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  // Function to summarize a text using OpenAI's API
  const summarizeText = async (text, title) => {
    if (!text) return; // If there's no text, don't attempt to summarize.
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", // or the latest model you have access to
        prompt: `Please summarize this news article:\n\n${text}`,
        max_tokens: 150,
      });
      setSummaries(prevSummaries => ({
        ...prevSummaries,
        [title]: response.data.choices[0].text.trim()
      }));
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };
  useEffect(() => {
    showNews();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
    <h1>Latest News Summaries</h1>
      <div className='mainNewsSection'>
        {articles.map((article, index) => (
          <div key={index} className="newsText">
            <h3>{article.title}</h3>
            <div className="newsContent">
              <p>{summaries[article.title] || "Loading summary..."}</p>
            </div>
          </div>
        ))}
        <div className='customization'>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Neutrality"
              defaultValue={30}
              color="secondary"
            />
          </Box>
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
            <ButtonGroup size="large" aria-label="Large button group">
              {buttons}
            </ButtonGroup>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Reader;