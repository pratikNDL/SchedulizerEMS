import { useState } from "react"
import SideBarItem from "./SideBarItem"
import expandRight from "../assets/expand-right.svg"
import expandLeft from '../assets/expand-left.svg'
import facultyIcon from '../assets/faculty.svg'

import departmentIcon from '../assets/department.svg'


function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="absolute z-10 bg-white h-full px-2  py-2 w-fit border-r-2" >
        <div className={`p-1 flex ${isExpanded ? 'justify-end': 'justify-center'}`}onClick={() => setIsExpanded(!isExpanded)}>
            <img src={isExpanded? expandLeft: expandRight} width={25}/>
        </div>
        <SideBarItem title={'Departemnts'} path={'/department'} isExpanded={isExpanded} icon={departmentIcon}/>
        <SideBarItem title={'Faculties'} path={'/faculty'} isExpanded={isExpanded} icon={facultyIcon}/>
        <SideBarItem title={'Courses'} path={'/course'} isExpanded={isExpanded} icon={facultyIcon}/>
        <SideBarItem title={'Infrastructure'} path={'/infrastructure'} isExpanded={isExpanded} icon={facultyIcon}/>
    </div>
  )
}

export default SideBar