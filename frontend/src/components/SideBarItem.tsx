import { Link } from "react-router-dom"

type SideBarItemType = {
    isExpanded: boolean
    path: string,
    title: string,
    icon: string,
}


function SideBarItem({isExpanded, path, title, icon}: SideBarItemType) {
  return (
    <Link to={path}>
        <div className='flex items-center rounded my-4 p-1 cursor-pointer'>
            <div className={`bg-blue-200  p-2 flex justify-center items-center rounded-full hover:shadow-xl hover:bg-blue-300`}>
                <img src={icon} alt="" width={25} className='fill-red-200'/>
            </div>
            <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 -translate-x-5 opacity-0 '} overflow-hidden  font-semibold text-gray-600  transition-all duration-100 `}>
                {title}
            </div>
        </div>
    </Link>
  )
}

export default SideBarItem