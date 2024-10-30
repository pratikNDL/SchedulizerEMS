import { useState } from "react"
import expandRight from "../assets/expand-right.svg"
import expandLeft from '../assets/expand-left.svg'
import facultyIcon from '../assets/faculty.svg'
import courseIcon from '../assets/course.svg'
import infrastructureIcon from '../assets/infrastructure.svg'
import departmentIcon from '../assets/department.svg'
import scheduleIcon from '../assets/schedule.svg'

import { Link } from "react-router-dom"

type SideBarItemType = {
    isExpanded: boolean
    path: string,
    title: string,
    icon: string,
}



function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="absolute z-10 bg-white h-full px-2  py-2 w-fit border-r-2 shadow-2xl" >
        <div className={`p-1 flex ${isExpanded ? 'justify-end': 'justify-center'}`}onClick={() => setIsExpanded(!isExpanded)}>
            <img src={isExpanded? expandLeft: expandRight} width={25}/>
        </div>
        <SideBarItem title={'Departments'} path={'/department'} isExpanded={isExpanded} icon={departmentIcon}/>
        <SideBarItem title={'Faculties'} path={'/faculty'} isExpanded={isExpanded} icon={facultyIcon}/>
        <SideBarItem title={'Courses'} path={'/course'} isExpanded={isExpanded} icon={courseIcon}/>
        <SideBarItem title={'Infrastructure'} path={'/infrastructure'} isExpanded={isExpanded} icon={infrastructureIcon}/>
        <SideBarItem title={'Schedule'} path={'/schedule'} isExpanded={isExpanded} icon={scheduleIcon}/>
    </div>
  )
}


function SideBarItem({isExpanded, path, title, icon}: SideBarItemType) {
  return (
    <Link to={path}>
        <div className='flex items-center rounded my-4 p-1 cursor-pointer'>
            <div className={`bg-blue-100  p-2 flex justify-center items-center rounded-full hover:shadow-xl hover:bg-gray-300 `}>
                <img src={icon} alt="" width={25} className='fill-red-200'/>
            </div>
            <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 -translate-x-5 opacity-0 '} overflow-hidden  font-semibold text-gray-600  transition-all duration-100 `}>
                {title}
            </div>
        </div>
    </Link>
  )
}

export default SideBar