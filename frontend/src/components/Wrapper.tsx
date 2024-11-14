import { ReactNode } from 'react'

function Wrapper({children, addCSS}: {children? : ReactNode, addCSS?:string}) {
  return (
    <div className={`my-4 bg-background-secondary shadow-2xl p-5 rounded-md flex flex-col gap-2 border-2 border-border-divider ${addCSS}`}>
        {children}
    </div>
  )
}

export default Wrapper