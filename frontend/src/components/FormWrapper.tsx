import { useState, ReactNode} from "react"
import add from "../assets/add.svg"
import collapse from '../assets/collapse.svg'


function RegisterWrapper({children} : {
    children: ReactNode
}) {
    const [showForm, setShowForm] = useState(true)
   
    return (
        <div className="w-full">

            <div className='p-1 bg-white border-2 border-gray-900  w-fit rounded mb-2' onClick={() => setShowForm((prev) => !prev)}>
                {<img src={showForm ? collapse : add} width={20}></img>}  
            </div>

            <div className={`${!showForm ? 'p-0 h-0 ': 'py-3 px-5'} overflow-hidden transition-none rounded-md bg-white shadow-xl w-full  `}>
                {children}
            </div>
        

        </div>
    
  )
}

export default RegisterWrapper