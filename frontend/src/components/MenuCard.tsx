import { Link } from "react-router-dom"

type MenuCardType = {
    title: string,
    to: string
}

function MenuCard({title, to}: MenuCardType) {
  return (
    <Link to={to}>
        <div className="bg-red-200  min-h-24 rounded-md flex flex-row overflow-hidden
                    p-3  hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl
                    m-1">

        <div className="font-extrabold text-3xl">
            {title}
        </div>
        
    </div>
    </Link>
    
  )
}

export default MenuCard