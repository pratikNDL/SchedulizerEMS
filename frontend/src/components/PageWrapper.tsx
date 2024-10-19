
import { ReactNode } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'

function PageWrapper({children}: {children:ReactNode}) {
  return (
    <>
    <Navbar/>
    <div className="flex relative bg-slate-200 " >
      <SideBar/>
      <div className='pl-40 pt-5 pr-20 min-h-screen h-full'>
        {children}
      </div>
    </div>
    

    </>
  )
}

export default PageWrapper