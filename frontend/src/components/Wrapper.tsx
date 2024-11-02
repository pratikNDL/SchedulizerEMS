import { ReactNode } from 'react'

function Wrapper({children}: {children? : ReactNode}) {
  return (
    <div className="my-4 bg-white shadow-xl p-5 rounded flex flex-col gap-4">
        {children}
    </div>
  )
}

export default Wrapper