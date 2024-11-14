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
			<div className='mb-5 flex bg-background-secondary w-fit rounded-md cursor-pointer text-white'>
          		<div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-primary-purple/75 ${show=='theory' ? 'bg-primary-purple/75 ' : 'bg-transparent'}`} onClick={() => {setShow('theory')}}>Theory</div>
          		<div className={`py-1 px-3   border-2 border-primary-purple/75 border-l-0 ${show=='practical' ? 'bg-primary-purple/75 ' : 'bg-transparent'}`} onClick={() => {setShow('practical')}}>Practical</div>
          		<div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-primary-purple/75 border-l-0 ${show=='availability' ? 'bg-primary-purple/75 ': 'bg-transparent'}`} onClick={() => {setShow('availability')}}>Availability</div>
        	</div>
			<Outlet/>
    	</>
  )
}

export default StudentGroupMenu