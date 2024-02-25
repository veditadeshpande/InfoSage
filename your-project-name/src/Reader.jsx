//import { useState } from 'react'
import { useState, useEffect } from 'react';
import './App.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

async function getResponseFromGPT(prompt) {
  const apiKey = '{API_KEY}'; // Replace 'YOUR_API_KEY' with your actual API key
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
  console.log(url); 
  const [newsContent, setNewsContent] = useState('Months before Donald Trump’s defiant turn as a witness at his New York civil fraud trial, the former president came face-to-face with the state attorney general who is suing him when he sat for a deposition last year at her Manhattan office. Video made public Friday of the seven-hour, closed-door session last April shows the Republican presidential frontrunner’s demeanor going from calm and cool to indignant — at one point ripping Attorney General Letitia James lawsuit against him as a “disgrace” and “a terrible thing.” Sitting with arms folded, an incredulous Trump complained to the state lawyer questioning him that he was being forced to “justify myself to you” after decades of success building a real estate empire that’s now threatened by the court case. Trump, who contends James’ lawsuit is part of a politically motivated “witch hunt” was demonstrative from the outset. The video shows him smirking and pouting his lips as the attorney general, a Democrat, introduced herself and told him that she was “committed to a fair and impartial legal process.” James’ office released the video Friday in response to requests from media outlets under New York’s Freedom of Information Law. Trump’s lawyers previously posted a transcript of his remarks to the trial docket in August.'); 

  const generatePointwiseSummary = async () => {
    setNewsContent(await getResponseFromGPT('summarize this pointwise and return the final output-' + newsContent) ); 
  }

   const generateSimplifiedSummary = async () => {
   setNewsContent(await getResponseFromGPT('summarize this content in max 600 words and rephrase-' + newsContent) ); 
   }

   const generateStoryContent = async () => {
   setNewsContent(await getResponseFromGPT('write this in the form of an interesting story in about 600 words-' + newsContent) ); 
    }

    const generateNeutralContent = async () => {
      setNewsContent(await getResponseFromGPT('summarize this content in max 600 words and rephrase, remove any political bias and make this news article more neutral sounding-' + newsContent) ); 
    }
    
  return (
    <>
    <h1>Sample Heading</h1>

  <div className='mainNewsSection'>

  <div className="newsText">
      <h3>Sample Source for the news/ Author ?? </h3>
      <div id='newsContent' className="newsContent">
      <h4>
 { newsContent || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Curabitur sapien tellus, consequat sit amet, tempor quis, porta eget, orci. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc"}
    </h4>
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

      </ButtonGroup>
    </Box>
    </div>
 
    </div>
  </div>

  </>
)
}

export default Reader;