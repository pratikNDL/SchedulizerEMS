
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import Home from './pages/Home'
import Department from './pages/Department'

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/department' element={<Department/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
