import Spinner from './Spinner'
import TableRow from './TableRow'

type TableType = {
    titels: Array<string>,
    rows: Array<Object>,
    isLoading?: boolean 
}

function Table({titels, rows, isLoading}: TableType) {
    return (
          
    <div>
          <table className="table-fixed  w-full rounded-lg border  border-separate border-spacing-0 bg-gray-300 border-slate-500 ">
            <thead>
              <tr>
                {titels.map((title, index) => <th className={`${index==titels.length-1 ? '': 'border-r'} border-slate-600`}>{title}</th>)}
              </tr>
          </thead>
            
            <tbody>
              {rows.map((row, index) => <TableRow  data={row} isDark={index%2 ? true: false}/>)} 
            </tbody>
   
         </table>
         
          {isLoading ? 
            <div className='flex justify-center  border p-2'>
              <Spinner/>
            </div>: "" }
    </div>
      )
}

export default Table