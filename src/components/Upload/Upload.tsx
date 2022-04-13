import React, { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { API_URL } from '../../api/api'

interface BlurredImage {
 status: boolean
 url: string
}

export default function UploadScreen() {
 const [images, setImages] = React.useState<ImageListType>([])
 const [blurredImage, setBlurredImage] = useState({
  status: false,
  url: ''
 })
 const maxNumber = 69

 const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
  setImages([imageList[imageList.length - 1]])
  setBlurredImage({
   status: false,
   url: ''
  })
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
   <main className='container'>
    <div className='p-4 p-md-5 mb-4 rounded card'>
     <div className='col-12'>
      <h1 className='display-4 fst-italic'>Upload an image</h1>
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
        isDragging,
        dragProps
       }) => (
        <div className='d-flex justify-content-between w-100'>
         <div className='d-flex flex-column gap-4'>
          <button
           onClick={onImageUpload}
           className={`btn-lg ${
            isDragging ? 'btn-danger' : 'btn-success'
           } border-none`}
           {...dragProps}>
           {isDragging ? 'Drop here' : 'Click or Drop here'}
          </button>

          <button className='btn btn-outline-danger' onClick={sendImage}>
           Blurred
          </button>
         </div>
         <div className='col-6 d-flex justify-content-end'>
          {blurredImage.status ? (
           <img
            src={blurredImage.url}
            alt=''
            className='img-fluid rounded UploadImage'
           />
          ) : (
           imageList.map((image, index) => (
            <img
             src={image['data_url']}
             alt=''
             className='img-fluid rounded UploadImage'
            />
           ))
          )}
         </div>
        </div>
       )}
      </ImageUploading>
     </div>
    </div>
   </main>
  </div>
 )
}
