//import { useState } from 'react'
import { useState, useEffect } from 'react';
import './App.css'
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

function Intro() {
    
  return (
    <>
    <h1>Info Sage</h1>

  <div className='mainNewsSection'>

  <div className="newsText">
      <div id='newsContent' className="newsContent">
      <h1>
 { "Hello Sage ! 🔥"}
    </h1>
    <h2>Welcome to Infosage, your gateway to a new era of informed living. In a world inundated with information, we offer a refreshing approach to staying updated. Our platform seamlessly integrates curated news from reputable sources, ensuring you receive a diverse array of stories tailored to your interests. But Infosage is more than just a news aggregator; it's a community hub where you can engage with stories, share insights, and broaden your perspective. Join us in transforming information overload into an opportunity for enlightenment.</h2>
      </div>
    <div className='customization'>
    <Button variant="contained" size="large" >Get Started</Button>

    </div>
 
    </div>
  </div>

  </>
)
}

export default Intro;