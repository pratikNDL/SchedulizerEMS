import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='py-2 px-10 border-b  flex justify-between items-center '>
        <div className='font-bold text-3xl text-slate-500 hover:cursor-pointer'
            onClick={() => navigate('/')}>
            SchedulizerEMS
        </div>
        <div className={`text-lg font-bold cursor-pointer hover:text-slate-400 `} onClick={() => {localStorage.clear(); navigate('/signin')}}>
            LogOut
        </div>
    </div>
  )
}

export default Navbar