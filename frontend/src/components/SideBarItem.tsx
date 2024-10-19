import { useNavigate } from "react-router-dom"


type SideBarItemType = {
    isExpanded: boolean
    path: string,
    title: string,
}


function SideBarItem({isExpanded, path, title}: SideBarItemType) {
    const navigate = useNavigate();
  return (
    <div className='flex items-center rounded my-4 p-1 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all' onClick={() => navigate(path)}>
        <div className={`bg-green-300 w-7 h-7 font-bold flex justify-center items-center rounded-full`}>
            {title[0].toUpperCase()}
        </div>
        <div className={`${isExpanded ? 'ml-3': 'ml-0 w-0 -translate-x-5 opacity-0 '} overflow-hidden text-lg font-semibold  transition-all duration-500 text-slate-700 `}>
            {title}
        </div>
    </div>
  )
}

export default SideBarItem