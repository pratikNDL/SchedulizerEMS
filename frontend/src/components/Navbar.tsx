import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
	const navigate = useNavigate();
	return (
    	<div className='py-2 px-10 border-b-2 border-border-divider flex justify-between items-center  absolute top-0 z-20 bg-background-secondary w-screen font-bold'>
        	<Link to="/">
				<div className='text-3xl text-primary-text cursor-pointer hover:text-secondary-text'>
              		SchedulizerEMS
          		</div>
        	</Link>
        	<div className={`text-lg  text-primary-orange cursor-pointer hover:text-secondary-text`} onClick={() => {localStorage.clear(); navigate('/signin')}}>
            	LogOut
        	</div>
    </div>
  )
}

export default Navbar