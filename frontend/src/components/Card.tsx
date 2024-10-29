import { Link } from "react-router-dom"


type CardPropsType = {
    title: string,
    id: string
} 

function Card({title, id}: CardPropsType) {
    
  return (
    <Link to={`/schedule/${id}`}>
        <div className="p-1 text-sm bg-blue-100 border rounded-sm hover:bg-blue-200 hover:shadow">
            {title}
        </div>
    </Link>
  )
}

export default Card