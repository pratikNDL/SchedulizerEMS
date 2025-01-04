
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Signup } from './pages/Signup'
// import { Signin } from './pages/Signin'
import Home from './pages/Home'
import Department from './pages/Department'
import Faculty from './pages/Faculty'
import Course, { ElectiveBasket, RegularCourse } from './pages/Course'
import Infrastructure from './pages/Infrastructure'
import Schedules from './pages/Schedules'
import ScheduleMenu from './components/Schedule/ScheduleMenu'
import StudentGroup from './pages/StudentGroup'
import ManageFaculties from './components/Schedule/ManageFaculties'
import Schedule from './components/Schedule/Schedule'
import ManageRooms from './components/Schedule/ManageRooms'
import ManageStudents from './components/Schedule/ManageStudents'
import FacultyConstraint from './components/Schedule/Availability/FacultyAvailability'
import StudentGroupMenu from './components/Schedule/StudentGroupMenu'
import RegularPracticalClassForm from './components/Schedule/ClassForms/RegularPracticalClassForm '
import RegularTheoryClassForm from './components/Schedule/ClassForms/RegularTheoryClassForm'
import StudentGroupConstraint from './components/Schedule/Availability/StudentGroupAvailability'
import SignUpx from './pages/SignUpx'

import { instituteSignupType, instituteSigninType } from "@pratikndl/common-schedulizer-ems";
import ElectiveClassFormTheory from './components/Schedule/ClassForms/ElectiveClassFormTheory'
import ElectiveClassFormPractical from './components/Schedule/ClassForms/ElectiveClassFormPractical'


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
					<Route path='/course' element={<Course/>}>
							<Route path='regular' element={<RegularCourse/>} />
							<Route path='elective' element={<ElectiveBasket/>} />
					</Route>
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
								<Route path='regularTheory' element={<RegularTheoryClassForm/>} />
								<Route path='regularPractical' element={<RegularPracticalClassForm/>} />
								<Route path='programTheory' element={<ElectiveClassFormTheory />} />
								<Route path='programPractical' element={<ElectiveClassFormPractical/>} />
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
