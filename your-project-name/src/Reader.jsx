//import { useState } from 'react'
import { useState, useEffect } from 'react';
import './App.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

async function getResponseFromGPT(prompt) {
  const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.7
       })
      });

      if (!response.ok) {
          throw new Error('Failed to get response from GPT');
      }

      const data = await response.json();
      console.log(data.choices[0].message.content);
      return data.choices[0].message.content;
  } catch (error) {
      console.error('Error:', error);
      return 'Error occurred while fetching response from GPT';
  }
}


function Reader(props) {
  const url = props;
  const [newsContent, setNewsContent] = useState(url.url); 

  const generatePointwiseSummary = async () => {
    setNewsContent(await getResponseFromGPT('summarize this pointwise and return the final output using bullets(each on a new line)-' + newsContent) ); 
  }

   const generateSimplifiedSummary = async () => {
   setNewsContent(await getResponseFromGPT('summarize this content in 1000 words and rephrase-' + newsContent) ); 
   }

   const generateStoryContent = async () => {
   setNewsContent(await getResponseFromGPT('write this in the form of an interesting story in 1000 words-' + newsContent) ); 
    }

    const generateNeutralContent = async () => {
      setNewsContent(await getResponseFromGPT('summarize this content in 1000 words and rephrase, remove any political bias and make this news article more neutral sounding-' + newsContent) ); 
    }

    const generateSwiftieContent = async () => {
      setNewsContent(await getResponseFromGPT('rewrite it using lines from Taylor Swift songs, use any taylors phrases if required, make it sound like Taylor wrote it -' + newsContent) ); 
    }
    
  return (
    <>
    <h1>{ }</h1>

  <div className='mainNewsSection'>

  <div className="newsText">
      <div id='newsContent' className="newsContent">
      <h2>
 { newsContent }
    </h2>
      </div>
    <div className='customization'>
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
      <ButtonGroup color="secondary" variant="contained" size="large" aria-label="Large button group">
      <Button onClick={generatePointwiseSummary}>Generate Points</Button>
      <Button onClick={generateSimplifiedSummary}>Simplify</Button>
      <Button onClick={generateStoryContent}>Story Mode</Button>
      <Button onClick={generateNeutralContent}>Remove bias</Button>
      <Button onClick={generateSwiftieContent}>Swiftie Mode</Button>
      
      </ButtonGroup>
    </Box>
    </div>
 
    </div>
  </div>

  </>
)
}

export default Reader;