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
    <aside className="h-full w-fit p-2 pt-16 flex flex-col gap-2 bg-background-secondary border-2 border-border-divider font-semibold text-primary-text absolute top-0 z-10 " >
        <div className='flex items-center p-1 bg-background-primary/50 border-2 border-border-divider cursor-pointer rounded-sm' onClick={() => setIsExpanded(!isExpanded)}>
            <div className={`p-2 flex justify-center items-center `}>
                <img src={isExpanded? expandLeft: expandRight} alt="" width={30} />
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
        <NavLink to={path} className={({ isActive }: { isActive: boolean }) => `${isActive ? 'bg-background-primary/50 border-border-divider ' : ''} relative flex  items-center rounded-sm p-1 hover:bg-primary-gray/20 hover:border-border-divider border-2 border-background-secondary`}>
            <div className={`p-2 flex justify-center items-center `}>
                <img src={icon} alt="" width={35} />
            </div>
            <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 h-0 -translate-x-5 opacity-0 '} overflow-hidden transition-all duration-100 text-white `}>
                {title}
            </div>

        </NavLink>
  )
}

export default SideBar