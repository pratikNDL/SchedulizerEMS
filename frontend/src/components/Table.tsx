import { ChangeEvent, ReactNode, useRef, useState } from "react"
import Button from "./Button"
import Wrapper from "./Wrapper";
import LabeledInput from "./LabeledInput";

type TableType<T> = {
  titles: Array<string>,
  keysToDisplay: Array<keyof T>,
  fetchHandler :  {loading: boolean, data: Array<T>} | ((query: string)=> {loading: boolean,data: Array<T>})
  deleteHandler?: (id: string) => Promise<void> | void,
  clickHandler?: (id: string) => Promise<void>  | void
} 

type TableRowType<T> = {
  data: T,
  keysToDisplay: Array<keyof T>,
  index: number
  deleteHandler?: (id: string) => Promise<void> | void,
  clickHandler?: (id: string) => Promise<void> | void
}

function Table<T extends {id: string},>({titles, fetchHandler, keysToDisplay, deleteHandler, clickHandler  }: TableType<T>) {

  // Fetching Data for Table
  const [query, setQuery] = useState("") 
  const {loading, data} = typeof fetchHandler === 'function' ? fetchHandler(query): fetchHandler
  
  // Debouncing The Search
  const timeoutRef = useRef<number | null>(null); 
  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setQuery(e.target.value); 
    }, 300);
  }

  // re-rendering after delete
  const enhancedDeleteHandler = deleteHandler ? async(id: string) => {
    await deleteHandler(id);
    // changing state to something else before empty string , so that react thinks state actually changed
    setQuery(" ")
    // seTtimeout , to stop batching the state change request 
    setTimeout(() => {
      setQuery("");
    }, 0);
  } : undefined

  return (
    <Wrapper>
      { 
        typeof fetchHandler === 'function' ? 
          <LabeledInput label="" placeholder="Start Typing To search A record..." handler={searchHandler}/>
        :
        null
      }

      <div className='flex flex-col text-sm border-2 border-gray-400 border-r-0 rounded-sm bac'>
        <div className={`grid bg-blue-100 text-center font-semibold text-gray-800`} style={{ gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))`}}>
            {titles.map((title, index) => <div key={index} className='p-1 border-r-2 border-gray-400 break-words'>{title}</div>)}
        </div>
        {loading ? 
            <TableBlock><div className="animate-pulse">Fetching Records....</div></TableBlock>: 
            data.length == 0 ?
              <TableBlock>No Records Found</TableBlock> :
            <div>
              {data.map((row, index) => <TableRow <T> keysToDisplay={keysToDisplay} clickHandler={clickHandler} deleteHandler={enhancedDeleteHandler} key={row.id} data={row}  index={index}/>)}            
            </div>
        }
      </div>
    </Wrapper>
    
    )
}


function TableRow<T extends {id: string}, >({data, keysToDisplay, index, deleteHandler , clickHandler= async () => {} }: TableRowType<T>) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const enhancedDeleteHandler = async () => {
    setLoading(true);
    if(deleteHandler) await deleteHandler(data.id);
    setLoading(false);
  }

  return (
    <div className="relative flex"  onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
        <div key={data.id} onClick={() => clickHandler(data.id)}  className={`grid w-full   ${show ? ' bg-green-200 ': `${index%2 ? 'bg-blue-100': 'bg-white'}`} `} style={{gridTemplateColumns: `repeat(${keysToDisplay.length}, minmax(0, 1fr))`}}>    
            {keysToDisplay.map((key, index) => <TableBlock key={index}>{data[key] as string}</TableBlock>)}
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