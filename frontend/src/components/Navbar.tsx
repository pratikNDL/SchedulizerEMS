import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='py-2 px-10 border-b-2  flex justify-between items-center  absolute top-0 z-20 bg-white w-screen'>
        <Link to="/">
          <div className='font-bold text-3xl text-gray-600 hover:cursor-pointer'>
              SchedulizerEMS
          </div>
        </Link>
        
        <div className={`text-lg font-bold cursor-pointer text-slate-600 hover:text-slate-400 `} onClick={() => {localStorage.clear(); navigate('/signin')}}>
            LogOut
        </div>
    </div>
  )
}

export default Navbar