import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Flex, Alert, AlertIcon, Checkbox } from '@chakra-ui/react'
import ImageCard from './imageCard'
import './gallery.css'
import ImageFilter from './imageFilter'

function Gallery({ images }) {
  // State to manage the images in the gallery
  const [galleryImages, setGalleryImages] = useState(images)
  // State to manage the selected images for deletion
  const [selectedImages, setSelectedImages] = useState([])
  // State to manage the deleted images
  const [deletedImages, setDeletedImages] = useState([])
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false)
  // State to manage the selected deleted images for restoration
  const [selectedDeletedImages, setSelectedDeletedImages] = useState([])
  // To keep the bar vixed
  const [isScrolled, setIsScrolled] = useState(false)

  // Function to handle the reordering of images
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = galleryImages[dragIndex]
    const newImages = [...galleryImages]
    newImages.splice(dragIndex, 1)
    newImages.splice(hoverIndex, 0, draggedImage)
    setGalleryImages(newImages)
  }

  // Function to handle the selection and deselection of images
  const handleSelect = (id, isSelected) => {
    if (isSelected) {
      setSelectedImages([...selectedImages, id])
    } else {
      setSelectedImages(
        selectedImages.filter((selectedId) => selectedId !== id)
      )
    }
  }

  // Function to handle the deletion of selected images
  const handleDelete = () => {
    const newImages = galleryImages.filter(
      (image) => !selectedImages.includes(image.id)
    )
    const deleted = galleryImages.filter((image) =>
      selectedImages.includes(image.id)
    )
    setGalleryImages(newImages)
    setDeletedImages([...deletedImages, ...deleted])
    setSelectedImages([])
  }

  // Function to handle setting a feature image
  const handleSetFeature = (id) => {
    const newImages = [...galleryImages]
    const featureIndex = newImages.findIndex((image) => image.id === id)
    const [featureImage] = newImages.splice(featureIndex, 1)
    newImages.unshift(featureImage)
    setGalleryImages(newImages)
  }

  // Function to handle the click of the add button
  const handleAddButtonClick = () => {
    setShowModal(true)
  }

  // Function to handle the selection and deselection of deleted images
  const handleDeletedImageSelect = (id, isSelected) => {
    if (isSelected) {
      setSelectedDeletedImages([...selectedDeletedImages, id])
    } else {
      setSelectedDeletedImages(
        selectedDeletedImages.filter((selectedId) => selectedId !== id)
      )
    }
  }

  // Function to handle the addition of selected deleted images back to the gallery
  const handleAddToGallery = () => {
    const newImages = [...galleryImages]
    selectedDeletedImages.forEach((id) => {
      const image = deletedImages.find((img) => img.id === id)
      if (image) {
        newImages.push(image)
      }
    })
    setGalleryImages(newImages)
    setDeletedImages(
      deletedImages.filter((img) => !selectedDeletedImages.includes(img.id))
    )
    setSelectedDeletedImages([])
    setShowModal(false)
  }

  // Function to handle the closing of the modal
  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='gallery-container'>
        <div className='header'>
          <Flex
            position='fixed'
            maxWidth='100vw'
            top='0'
            left='0'
            right='0'
            alignItems='center'
            justifyContent='space-between'
            padding='1rem'
            backgroundColor={isScrolled ? '#1eeacf' : '#1eeacfab'}
            backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
            transition='background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out'
            zIndex={100}
          >
            {selectedImages.length > 0 && (
              <span className='selected-count'>
                <Checkbox isChecked isReadOnly marginRight='2' />
                {selectedImages.length} items have been selected
              </span>
            )}
            <h1 className='title'>
              <b>Image Gallery</b>
            </h1>
            {selectedImages.length > 0 && (
              <button onClick={handleDelete} className='delete-button'>
                Delete Selected Images
              </button>
            )}
          </Flex>
        </div>
        <div className='border'></div>
        <div className='gallery'>
          {galleryImages.map((image, index) => (
            <ImageCard
              key={image.id}
              index={index}
              id={image.id}
              image={image}
              isFeatured={index === 0}
              moveImage={moveImage}
              onSelect={handleSelect}
              onSetFeature={handleSetFeature}
            />
          ))}
          <button onClick={handleAddButtonClick} className='add-button'>
            Restore Images
          </button>
        </div>
        {showModal && (
          <div className='modal' onClick={handleCloseModal}>
            <div className='modal-content'>
              <Alert status={deletedImages.length > 0 ? 'info' : 'success'}>
                {deletedImages.length > 0 ? (
                  <div className='show-delete-images'>
                    Showing deleted images
                  </div>
                ) : (
                  <div className='all-images'>
                    <AlertIcon boxSize='8' marginRight='2' />
                    All images are on display
                  </div>
                )}
              </Alert>
              <div className='deleted-images'>
                {deletedImages.map((image) => (
                  <div key={image.id} className='deleted-image'>
                    <img
                      src={image.src}
                      alt=''
                      className='each-deleted-images'
                    />
                    <input
                      type='checkbox'
                      onChange={(e) =>
                        handleDeletedImageSelect(image.id, e.target.checked)
                      }
                    />
                  </div>
                ))}
              </div>
              {selectedDeletedImages.length > 0 && (
                <button
                  onClick={handleAddToGallery}
                  className='add-to-gallery-button'
                >
                  Add to Gallery
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  )
}

export default Gallery
