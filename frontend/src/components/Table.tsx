import { useState } from "react"
import Button from "./Button"
import Spinner from "./Spinner"

type TableType = {
    titles: Array<string>,
    rows: Array<{
      display: Record<string, unknown>,
      id: string
    }>,
    isLoading?: boolean
    deleteHandler?: (id: string) => void
    clickHandler?: (id: string) => void

}

type TableRowType = {
  data: Record<string, unknown>,
  id: string,
  cols: number
  index: number
  deleteHandler?: (id: string) => void
  clickHandler?: (id: string) => void
}

function Table({titles, rows, isLoading, deleteHandler=() => {} , clickHandler=() => {} }: TableType) {
    return (
      <div className='flex flex-col text-sm border-2 border-gray-400 border-r-0 rounded-sm'>

        <div className={`grid bg-blue-100 text-center font-semibold`} style={{ gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))`}}>
            {titles.map((title, index) => <div key={index} className='p-1 border-r-2 border-gray-400'>{title}</div>)}
        </div>

        {
          isLoading ? 
          <div className="border-t-2 border-r-2 border-gray-400 p-1">
            <Spinner/>
          </div>
           : 
            rows.length == 0 ?
            <div className="border-t-2 border-r-2 border-gray-400 p-1 text-center text-xl text-gray-00">
              No Records Found
            </div>
            :
            <div>
              {rows.map((row, index) => <TableRow  clickHandler={clickHandler} deleteHandler={deleteHandler} key={row.id} data={row.display} id={row.id} cols={titles.length} index={index}/>)}            
            </div>
        }

      </div>
      )
}


function TableRow({data, id, cols, index, deleteHandler=() => {} , clickHandler=() => {} }: TableRowType) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-col justify-center items-center" onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
        <div key={id} onClick={() => clickHandler(id)}  className={`grid w-full border-t-2 border-gray-400  ${index%2 ? 'bg-blue-100': ''} ${show ? 'border-b-2 ': ''} `} style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}}>    
            {Object.keys(data).map((key, index) => <div key={index} className={"p-1  border-r-2 border-gray-400 cursor-pointer break-words"}>{data[key] as string}</div>)}
        </div>
        
        <div className={`${show? "": 'h-0 -translate-y-2 opacity-0'} flex  justify-center overflow-hidden transition-all duration-300 border-r-2 border-gray-400 w-full`}>
          <Button  addCSS="bg-red-400 rounded-r-none mb-2 " isDisabled={loading} value='Delete' handler={async () => {
            setLoading(true);
            deleteHandler(id);
            setLoading(false);
            }}/>      
        </div>
    </div>
  )
} 


export default Table