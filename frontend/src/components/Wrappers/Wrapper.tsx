import { ReactNode } from 'react'

interface WrapperProps {
  children?: ReactNode,
  className?: string,
  heading?: string,
  subHeading?: string,
}

function Wrapper({children, className, heading, subHeading}: WrapperProps) {
  return (
    <div className={`my-4 bg-background-secondary shadow-2xl p-5 rounded-md flex flex-col gap-2 border-2 border-border-divider ${className}`}>
      {
        heading &&
        <div>
          <div className='font-extrabold text-primary-text/80 text-2xl '>{heading}</div>
          {subHeading && <div className='font-semibold text-primary-text/70 leading-none '> {subHeading}</div>}
          <div className=' border-b-2  border-input-highlight/70 mb-1 mt-1'></div>
        </div> 
        
      }
        
        {children}
    </div>
  )
}

export default Wrapper