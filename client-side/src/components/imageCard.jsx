import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './imageCard.css'
import ImageFilter from './imageFilter'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const ItemType = 'image'

function ImageCard({
  id,
  image,
  index,
  isFeatured,
  moveImage,
  onSelect,
  onSetFeature,
}) {
  // Use Drop to handle the drop of an image
  const [, ref] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveImage(item.index, index)
        item.index = index
      }
    },
  })

  // Use Drag to handle the drag of an image
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Set the opacity based on whether the image is being dragged
  const opacity = isDragging ? 0 : 1

  // State to manage whether the image is selected
  const [selected, setSelected] = useState(false)

  // Function to handle the selection and deselection of an image
  const handleSelect = () => {
    setSelected(!selected)
    onSelect(id, !selected)
  }

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`image-card ${isFeatured ? 'featured' : ''} ${
        selected ? 'selected' : ''
      }`}
    >
      {isFeatured ? (
        // If the image is featured, apply the filter
        <ImageFilter src={image.src} />
      ) : (
        // If the image is not featured, display the image without filter
        <img ref={drag} src={image.src} alt='' className='image' />
      )}
      <input
        type='checkbox'
        checked={selected}
        onChange={handleSelect}
        className={`checkbox ${selected ? 'selected' : ''}`}
      />
      {!isFeatured && (
        // If the image is not featured, display the "Set as Feature" button
        <button onClick={() => onSetFeature(id)} className='feature-button'>
          Set as Feature
        </button>
      )}
    </div>
  )
}

export default ImageCard
