
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import Home from './pages/Home'
import Department from './pages/Department'
import Faculty from './pages/Faculty'
import Course from './pages/Course'
import Infrastructure from './pages/Infrastructure'
import Schedules from './pages/Schedules'
import ScheduleMenu from './components/Schedule/ScheduleMenu'
import Rough from './pages/Rough'
import StudentGroup from './pages/StudentGroup'
import { FacultyConstraint } from './components/Schedule/ManageFaculties'
import ScheduleStudentGroup from './components/Schedule/ScheduleStudentGroup'
import Schedule from './components/Schedule/Schedule'

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
        <Route path='/studentGroup' element={<StudentGroup/>}/>

        
        <Route path='/schedule/' element={<Schedules/>}>
          <Route path='' element={<ScheduleMenu/>}/>
          <Route path=':scheduleId' element={<Schedule/>}/>
          <Route path='faculty/:facultyId' element={<FacultyConstraint/>}/>
          <Route path=':scheduleId/studentGroup/:studentGroupId' element={<ScheduleStudentGroup/>} />
        </Route>

        
        <Route path='/rough' element={<Rough/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
