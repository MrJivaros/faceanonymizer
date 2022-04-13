import jivaros from '../../assets/images/jiv.jpg'
import jivarosBlurred from '../../assets/images/jiv-blurred.jpg'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
 return (
  <>
   <main className='container'>
    <div className='p-4 p-md-5 mb-4 text-white rounded bg-dark'>
     <div className='col-md-8 px-0'>
      <h1 className='display-4 fst-italic'>
       Artificial Intelligence implementation of an intelligent face
       anonymization system
      </h1>
      <p className='lead my-3'>
       The objective of this work is to propose a new method for the fine
       anonymization of faces, i.e. to make the identification of individuals as
       difficult as possible while preserving at best the non-verbal behavioral
       cues such as gaze direction, smile or facial mimicry.
      </p>
      <p className='lead mb-0'>
       <Link to='/upload' className='btn btn-danger'>
        GET STARTED
       </Link>
      </p>
     </div>
    </div>

    <div className='row mb-2'>
     <div className='col-md-6'>
      <div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
       <div className='col p-4 d-flex flex-column position-static justify-content-between'>
        <strong className='d-inline-block mb-2 text-primary'>After</strong>
        <h3 className='mb-0'>Original Image</h3>
        <div>
         <Link to='/upload' className='btn btn-outline-primary'>
          GET STARTED
         </Link>
        </div>
       </div>
       <div className='col-auto d-none d-lg-block'>
        <img src={jivaros} alt='jivaros' className='Image' />
       </div>
      </div>
     </div>
     <div className='col-md-6'>
      <div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
       <div className='col p-4 d-flex flex-column position-static justify-content-between'>
        <strong className='d-inline-block mb-2 text-success'>Befor</strong>
        <h3 className='mb-0'>Blurred image</h3>
        <div>
         <Link to='/upload' className='btn btn-outline-success'>
          GET STARTED
         </Link>
        </div>
       </div>
       <div className='col-auto d-none d-lg-block'>
        <img src={jivarosBlurred} alt='jivarosBlurred' className='Image' />
       </div>
      </div>
     </div>
    </div>
   </main>
  </>
 )
}
