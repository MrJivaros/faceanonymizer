import React, { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { API_URL } from './api/api'

interface BlurredImage {
 status: boolean
 url: string
}

export default function App() {
 const [images, setImages] = React.useState<ImageListType>([])
 const [blurredImage, setBlurredImage] = useState({
  status: false,
  url: ''
 })
 const maxNumber = 69

 const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
  setImages(imageList)
 }

 const sendImage = async () => {
  const data = new FormData()
  const arrayBuffer = await images[0].file?.arrayBuffer()
  const fileType = images[0].file?.type.split('/')[1]
  const fileName = images[0].file?.name
  if (arrayBuffer && fileType && fileName) {
   const uint8Array = new Uint8Array(arrayBuffer)
   const blod = new Blob([new Uint8Array(uint8Array)], {
    type: 'image/' + fileType
   })
   data.append('file', blod, fileName)
   const response: BlurredImage = await (
    await fetch(API_URL, {
     method: 'POST',
     body: data
    })
   ).json()

   setBlurredImage(response)
  }
 }

 return (
  <div className='App'>
   <ImageUploading
    multiple
    value={images}
    onChange={onChange}
    maxNumber={maxNumber}
    dataURLKey='data_url'>
    {({
     imageList,
     onImageUpload,
     onImageRemoveAll,
     onImageUpdate,
     onImageRemove,
     isDragging,
     dragProps
    }) => (
     // write your building UI
     <div className='upload__image-wrapper'>
      <button
       style={isDragging ? { color: 'red' } : undefined}
       onClick={onImageUpload}
       {...dragProps}>
       Click or Drop here
      </button>
      &nbsp;
      <button onClick={onImageRemoveAll}>Remove all images</button>
      {imageList.map((image, index) => (
       <div key={index} className='image-item'>
        <img src={image['data_url']} alt='' width='100' />
        <div className='image-item__btn-wrapper'>
         <button onClick={() => onImageUpdate(index)}>Update</button>
         <button onClick={() => onImageRemove(index)}>Remove</button>
        </div>
       </div>
      ))}
     </div>
    )}
   </ImageUploading>

   <button onClick={sendImage}>send</button>
   {blurredImage.status && <img src={blurredImage.url} alt='' />}
  </div>
 )
}
