import React, { useState } from 'react'
import Gallery from './components/gallery'
import './App.css'
import image10 from './assets/image-10.jpeg'
import image11 from './assets/image-11.jpeg'
import image1 from './assets/image-1.jpg'
import image2 from './assets/image-2.jpg'
import image3 from './assets/image-3.jpg'
import image4 from './assets/image-4.jpg'
import image5 from './assets/image-5.jpg'
import image6 from './assets/image-6.jpg'
import image7 from './assets/image-7.jpg'
import image8 from './assets/image-8.jpg'
import image9 from './assets/image-9.jpg'

function App() {


const images = [
  { id: 10, src: image10 },
  { id: 11, src: image11 },
  { id: 1, src: image1 },
  { id: 2, src: image2 },
  { id: 3, src: image3 },
  { id: 4, src: image4 },
  { id: 5, src: image5 },
  { id: 6, src: image6 },
  { id: 7, src: image7 },
  { id: 8, src: image8 },
  { id: 9, src: image9 },
  

  // ... more images
]

  return (
    <div>
      <Gallery images={images} />
    </div>
  )
}

export default App
