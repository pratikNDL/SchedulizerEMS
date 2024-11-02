
import { ReactNode } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import useFetchMe from '../hooks/useFetchMe'

function PageWrapper({children}: {children?:ReactNode}) {
  useFetchMe();
  return (
    <div className='relative min-h-screen h-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:16px_16px]'>
      <Navbar/>
      <SideBar/>
      <div className='pl-[104px] pr-[30px] sm:pl-[140px] sm:pr-[66px] md:pl-[140px] md:pr-[66px] xl:pl-[188px] xl:pr-[124px] pt-24 pb-14'>
        {children}
      </div>
    
    </div>
  )
}
export default PageWrapper

{/* <div className='pl-20 pr-4 pt-5 md:pl-36 md:pr-20 min-h-screen h-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:16px_16px]'> */}
