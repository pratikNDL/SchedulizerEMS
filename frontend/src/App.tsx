
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import Home from './pages/Home'
import Department from './pages/Department'
import Faculty from './pages/Faculty'
import Course from './pages/Course'
import Infrastructure from './pages/Infrastructure'

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/department' element={<Department/>}/>
        <Route path='/faculty' element={<Faculty/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/infrastructure' element={<Infrastructure/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
