import React from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { API_URL } from './api/api'

export default function App() {
 const [images, setImages] = React.useState<ImageListType>([])
 const maxNumber = 69

 const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
  // data for submit
  console.log(imageList, addUpdateIndex)
  setImages(imageList)
 }

 const sendImage = async () => {
  const data = new FormData()
  console.log(images)
  const reader = new FileReader()
  images[0].file?.arrayBuffer().then((res) => {
   const blob = new Uint8Array(res)
   let blob1 = new Blob([new Uint8Array(blob)], { type: 'image/png' })
   data.append('file', blob1, 'Jivaros.' + images[0].file?.type.split('/')[1])
   fetch(API_URL + '/saveimage', {
    method: 'POST',
    body: data
   }).then(console.log)
  })
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

   <img src='http://127.0.0.1:8086/get-image/moi.jpg' alt='' />
  </div>
 )
}
