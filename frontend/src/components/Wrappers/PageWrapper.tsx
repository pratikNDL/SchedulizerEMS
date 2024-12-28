
import { ReactNode } from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import useFetchMe from '../../hooks/useFetchMe'

function PageWrapper({children}: {children?:ReactNode}) {
  useFetchMe();
  return (
    <div className='relative min-h-screen h-full bg-background-primary  [background-size:16px_16px] text-sm font-medium text-primary-text'>
      <Navbar/>
      <SideBar/>
      <div className='pl-[104px] pr-[30px] sm:pl-[140px] sm:pr-[66px] md:pl-[140px] md:pr-[66px] xl:pl-[188px] xl:pr-[124px] pt-24 pb-14 text-gray-500 font-medium'>
        {children}
      </div>
    
    </div>
  )
}
export default PageWrapper

// bg-[radial-gradient(#e5e7eb_2px,transparent_2px)]

