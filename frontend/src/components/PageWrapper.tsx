
import { ReactNode } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'

function PageWrapper({children}: {children:ReactNode}) {
  return (
    <>
    <Navbar/>
    <div className="flex">
      <SideBar/>
      <div className='p-5'>
        {children}
      </div>
    </div>
    

    </>
  )
}

export default PageWrapper