import { useState } from "react"
import expandRight from "../assets/expand-right.svg"
import expandLeft from '../assets/expand-left.svg'
import facultyIcon from '../assets/faculty.svg'
import courseIcon from '../assets/course.svg'
import infrastructureIcon from '../assets/infrastructure.svg'
import departmentIcon from '../assets/department.svg'
import scheduleIcon from '../assets/schedule.svg'
import studentIcon from '../assets/student.svg'
import { NavLink } from "react-router-dom"

type SideBarItemType = {
    isExpanded: boolean
    path: string,
    title: string,
    icon: string,
}

function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <aside className="h-full w-fit p-2 pt-16 flex flex-col gap-2  z-10 bg-white shadow-2xl font-semibold text-gray-600 absolute top-0 " >
       
        <div className='flex items-center p-1 bg-blue-300 cursor-pointer rounded-sm shadow-xl' onClick={() => setIsExpanded(!isExpanded)}>
            <div className={`p-2 flex justify-center items-center `}>
                <img src={isExpanded? expandLeft: expandRight} alt="" width={25} className='fill-red-200'/>
            </div>
            <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 h-0 -translate-x-5 opacity-0 '} overflow-hidden transition-all duration-100 `}>
                Menu
            </div>
        </div>
        <SideBarItem title={'Departments'} path={'/department'} isExpanded={isExpanded} icon={departmentIcon}/>
        <SideBarItem title={'Faculties'} path={'/faculty'} isExpanded={isExpanded} icon={facultyIcon}/>
        <SideBarItem title={'Courses'} path={'/course'} isExpanded={isExpanded} icon={courseIcon}/>
        <SideBarItem title={'Infrastructure'} path={'/infrastructure'} isExpanded={isExpanded} icon={infrastructureIcon}/>
        <SideBarItem title={'Student Groups'} path={'/studentGroup'} isExpanded={isExpanded} icon={studentIcon}/>
        <SideBarItem title={'Schedule'} path={'/schedule'} isExpanded={isExpanded} icon={scheduleIcon}/>
    </aside>
  )
}

function SideBarItem({isExpanded, path, title, icon}: SideBarItemType) {
  return (
        <NavLink to={path} className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-blue-300 shadow-xl' : ''} flex  items-center rounded-sm p-1 hover:bg-blue-300 hover:shadow-xl`}>
            <div className={`p-2 flex justify-center items-center `}>
                <img src={icon} alt="" width={25} className='fill-red-200'/>
            </div>
            <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 h-0 -translate-x-5 opacity-0 '} overflow-hidden transition-all duration-100 `}>
                {title}
            </div>
        </NavLink>
  )
}

export default SideBar