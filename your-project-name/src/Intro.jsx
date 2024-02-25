//import { useState } from 'react'
import { useState, useEffect } from 'react';
import './App.css'
import Box from '@mui/material/Box';

function Intro() {
    
  return (
    <>
    <h1>NEW.Sage</h1>

  <div className='mainNewsSection'>

  <div className="newsText">
      <div id='newsContent' className="newsContent">
      <h2>
 { "Welcome to NEW.Sage, your gateway to a new era of informed living. In a world inundated with information, we offer a refreshing approach to staying updated. Our platform seamlessly integrates curated news from reputable sources, ensuring you receive a diverse array of stories tailored to your interests. But NewsCapsule is more than just a news aggregator; it's a community hub where you can engage with stories, share insights, and broaden your perspective. Join us in transforming information overload into an opportunity for enlightenment."}
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
 
    </Box>
    </div>
 
    </div>
  </div>

  </>
)
}

export default Intro;