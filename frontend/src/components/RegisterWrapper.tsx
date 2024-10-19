import { useState, ReactNode} from "react"
import add from "../assets/add.svg"
import collapse from '../assets/collapse.svg'


function RegisterWrapper({children} : {
    children: ReactNode
}) {
    const [showForm, setShowForm] = useState(false)
   
    return (
        <div className="">

            <div className='p-2 border w-fit rounded mb-2' onClick={() => setShowForm((prev) => !prev)}>
                {<img src={showForm ? collapse : add} width={20}></img>}  
            </div>

            <div className={`${!showForm ? 'p-0 h-0 border-0': 'p-5'}  overflow-hidden md:gap-x-2 transition-all  duration-300 border rounded` }>
                {children}
            </div>
                <div className="col-span-12 py-0.5 bg-slate-200 my-3 " />

        </div>
    
  )
}

export default RegisterWrapper