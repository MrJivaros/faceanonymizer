import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import HomeScreen from './components/Home/Home'
import UploadScreen from './components/Upload/Upload'

export default function App() {
 return (
  <>
   <Header />
   <Routes>
    <Route path='/' element={<HomeScreen />} />
    <Route path='/upload' element={<UploadScreen />} />
   </Routes>
  </>
 )
}
