import { ReactNode, useState } from "react"
import Button from "./Button"

type TableType = {
    titles: Array<string>,
    rows: Array<{
      display: Record<string, unknown>,
      id: string
    }>,
    isLoading?: boolean
    deleteHandler?: (id: string) => Promise<void> | void,
    clickHandler?: (id: string) => Promise<void>  | void
}

type TableRowType = {
  data: Record<string, unknown>,
  id: string,
  cols: number
  index: number
  deleteHandler?: (id: string) => Promise<void> | void,
  clickHandler?: (id: string) => Promise<void> | void
}

function Table({titles, rows, isLoading, deleteHandler, clickHandler }: TableType) {
  return (
    <div className='flex flex-col text-sm border-2 border-gray-400 border-r-0 rounded-sm bac'>
        <div className={`grid bg-blue-100 text-center font-semibold`} style={{ gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))`}}>
            {titles.map((title, index) => <div key={index} className='p-1 border-r-2 border-gray-400 break-words'>{title}</div>)}
        </div>
        {isLoading ? 
            <TableBlock><div className="animate-pulse">Fetching Records....</div></TableBlock>: 
            rows.length == 0 ?
              <TableBlock>No Records Found</TableBlock> :
            <div>
              {rows.map((row, index) => <TableRow  clickHandler={clickHandler} deleteHandler={deleteHandler} key={row.id} data={row.display} id={row.id} cols={titles.length} index={index}/>)}            
            </div>
        }
    </div>
    )
}


function TableRow({data, id, cols, index, deleteHandler , clickHandler= async () => {} }: TableRowType) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const enhancedDeleteHandler = async () => {
    setLoading(true);
    if(deleteHandler) await deleteHandler(id);
    setLoading(false);
  }

  return (
    <div className="relative flex"  onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
        <div key={id} onClick={() => clickHandler(id)}  className={`grid w-full   ${show ? ' bg-green-200 ': `${index%2 ? 'bg-blue-100': 'bg-white'}`} `} style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}}>    
            {Object.keys(data).map((key, index) => <TableBlock key={index}>{data[key] as string}</TableBlock>)}
        </div>
        
        { deleteHandler ?
          <div className={`absolute -left-14 rounded-sm overflow-hidden  pr-10 ${show ? "": "h-0 translate-x-2"} transition-all`}>
            <Button  addCSS="bg-red-400 hover:bg-red-500" isDisabled={loading} value='X' handler={enhancedDeleteHandler}/>      
          </div> : null
        }

    </div>
  )
} 


function TableBlock({children} : {children: ReactNode})  {
  return (
  <div className={"p-1 border-t-2 border-r-2 border-gray-400 cursor-pointer break-words font-medium text-gray-700 text-center"}>
    {children}
  </div>)
}


export default Table