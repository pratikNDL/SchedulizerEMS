import { ReactNode } from 'react'

function Wrapper({children}: {children? : ReactNode}) {
  return (
    <div className="my-4 bg-white shadow-2xl p-5 rounded flex flex-col gap-2 border-2 border-gray-400">
        {children}
    </div>
  )
}

export default Wrapper