
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Signup } from './pages/Signup'
// import { Signin } from './pages/Signin'
import Home from './pages/Home'
import Department from './pages/Department'
import Faculty from './pages/Faculty'
import Course from './pages/Course'
import Infrastructure from './pages/Infrastructure'
import Schedules from './pages/Schedules'
import ScheduleMenu from './components/Schedule/ScheduleMenu'
import StudentGroup from './pages/StudentGroup'
import ManageFaculties from './components/Schedule/ManageFaculties'
import Schedule from './components/Schedule/Schedule'
import ManageRooms from './components/Schedule/ManageRooms'
import ManageStudents from './components/Schedule/ManageStudents'
import FacultyConstraint from './components/Schedule/FacultyConstraints'
import StudentGroupMenu from './components/Schedule/StudentGroupMenu'
import TheoryClassForm from './components/Schedule/TheoryClassForm'
import PracticalClassForm from './components/Schedule/PracticalClassForm '
import StudentGroupConstraint from './components/Schedule/StudentGroupConstraint'
import SignUpx from './pages/SignUpx'

import { instituteSignupType, instituteSigninType } from "@pratikndl/common-schedulizer-ems";


function App() {
	return (
		<>
    		<BrowserRouter>
      			<Routes>
					{/* <Route path='/signup' element={<Signup/>}/> */}
					<Route path='/signup' element={<SignUpx <instituteSignupType> variant='signUp'/>}/>
					<Route path='/signin' element={<SignUpx <instituteSigninType> variant='signIn'/>}/>
					<Route path='/' element={<Home/>}/>
					<Route path='/department' element={<Department/>}/>
					<Route path='/faculty' element={<Faculty/>}/>
					<Route path='/course' element={<Course/>}/>
					<Route path='/infrastructure' element={<Infrastructure/>}/>
					<Route path='/studentGroup' element={<StudentGroup/>}/>
        			<Route path='/schedule' element={<Schedules/>}>
						<Route path='' element={<ScheduleMenu/>}/>
          				<Route path=':scheduleId' element={<Schedule/>}> 
            				<Route path='room' element={<ManageRooms/>} />
            				<Route path='faculty' element={<ManageFaculties/>}/> 
							<Route path='faculty/:facultyId' element={<FacultyConstraint/>}/> 
            				<Route path='studentGroup' element={<ManageStudents/>}/>
							<Route path='studentGroup/:studentGroupId' element={<StudentGroupMenu/>} >
								<Route path='theory' element={<TheoryClassForm/>} />
								<Route path='practical' element={<PracticalClassForm/>} />
								<Route path='availability' element={<StudentGroupConstraint/>} />
							</Route>
          				</Route>
       				</Route>
			    </Routes>
    		</BrowserRouter>
  		</>
  )
}

export default App
