import logo from '../../assets/images/logo.png'
export default function Header() {
 return (
  <>
   <div className='container'>
    <header className='blog-header py-3'>
     <div className='row flex-nowrap justify-content-between align-items-center'>
      <div className='col-4 pt-1'>
       <img src={logo} alt='logo' className='Logo' />
      </div>

      <div className='col-4 d-flex justify-content-end align-items-center'>
       <a className='link-danger' href='#' aria-label='Search'>
        <svg
         xmlns='http://www.w3.org/2000/svg'
         width='20'
         height='20'
         fill='none'
         stroke='currentColor'
         stroke-linecap='round'
         stroke-linejoin='round'
         stroke-width='2'
         className='mx-3'
         role='img'
         viewBox='0 0 24 24'>
         <title>Search</title>
         <circle cx='10.5' cy='10.5' r='7.5' />
         <path d='M21 21l-5.2-5.2' />
        </svg>
       </a>
       <a className='btn btn-sm btn-outline-danger' href='#'>
        Sign up
       </a>
      </div>
     </div>
    </header>
   </div>
  </>
 )
}
