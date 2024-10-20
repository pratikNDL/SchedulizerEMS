
import { ReactNode } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'

function PageWrapper({children}: {children?:ReactNode}) {
  return (
    <>
    <Navbar/>
    <div className="flex relative bg-blue-100 " >
      <SideBar/>
      <div className='pl-20 pr-4 pt-5 md:pl-36 md:pr-20 min-h-screen h-full '>
        {children}
      </div>
    </div>
    

    </>
  )
}

export default PageWrapper