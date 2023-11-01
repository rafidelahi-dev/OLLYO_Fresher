import React, { useState } from 'react'
import './imageFilter.css'

function ImageFilter({ src }) {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className='image-filter'>
      <img src={src} alt='' className={`image ${filter}`} />
      <select onChange={handleFilterChange} className='filter-select'>
        <option value=''>None</option>
        <option value='grayscale'>Grayscale</option>
        <option value='sepia'>Sepia</option>
        <option value='brightness'>Brightness</option>
        <option value='contrast'>Contrast</option>
      </select>
    </div>
  )
}

export default ImageFilter
