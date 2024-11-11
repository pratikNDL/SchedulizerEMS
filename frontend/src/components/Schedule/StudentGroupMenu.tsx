import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


function StudentGroupMenu() {
    
	const [show , setShow] = useState<'theory'|'practical'|'availability'>('theory');
	const navigate = useNavigate();

	useEffect(() => {
		navigate(show);
  	}, [show])

	return (
    	<>
			<div className='mb-5 flex bg-gray-400 w-fit rounded-md text-sm text-gray-600 font-medium cursor-pointer '>
          		<div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-gray-400 ${show=='theory' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('theory')}}>Theory</div>
          		<div className={`py-1 px-3  border-2 border-gray-400 border-l-0 ${show=='practical' ? 'bg-blue-400 text-white' : 'bg-white'}`} onClick={() => {setShow('practical')}}>Practical</div>
          		<div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-gray-400 border-l-0 ${show=='availability' ? 'bg-blue-400 text-white': 'bg-white'}`} onClick={() => {setShow('availability')}}>Availability</div>
      		</div>
			<Outlet/>
    	</>
  )
}

export default StudentGroupMenu