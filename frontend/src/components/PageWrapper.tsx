
import { ReactNode } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import useFetchMe from '../hooks/useFetchMe'

function PageWrapper({children}: {children?:ReactNode}) {
  useFetchMe();
  return (
    <>
    <Navbar/>
    <div className="flex flex-col relative bg-slate-700 " >
      <SideBar/>
      <div className='pl-20 pr-4 pt-5 md:pl-36 md:pr-20 min-h-screen h-full '>
        <div>
        {children}
        </div>
      </div>
    </div>
    

    </>
  )
}

export default PageWrapper