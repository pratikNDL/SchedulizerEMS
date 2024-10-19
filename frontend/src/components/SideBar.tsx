import { useState } from "react"
import SideBarItem from "./SideBarItem"
import expandRight from "../assets/expand-right.svg"
import expandLeft from '../assets/expand-left.svg'

function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="h-screen px-4 py-2 w-fit border-r-2" >
        <div className={`p-1 flex ${isExpanded ? 'justify-end': 'justify-center'}`}onClick={() => setIsExpanded(!isExpanded)}>
            <img src={isExpanded? expandLeft: expandRight} width={25}/>
        </div>
        <SideBarItem title={'Departemnts'} path={'/department'} isExpanded={isExpanded}/>
        <SideBarItem title={'Faculties'} path={'/faculty'} isExpanded={isExpanded}/>
        <SideBarItem title={'Departemnts'} path={'/department'} isExpanded={isExpanded}/>
        <SideBarItem title={'Departemnts'} path={'/department'} isExpanded={isExpanded}/>
     
    </div>
  )
}

export default SideBar