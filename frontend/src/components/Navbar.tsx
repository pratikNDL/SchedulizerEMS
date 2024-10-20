import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='py-2 px-10 border-b  flex justify-between items-center shadow-2xl '>
        <Link to="/">
          <div className='font-bold text-3xl text-blue-400 hover:cursor-pointer'>
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