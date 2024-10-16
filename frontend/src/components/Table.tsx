import TableRow from './TableRow'

type TableType = {
    titels: Array<string>,
    rows: Array<Object>
}

function Table({titels, rows}: TableType) {
    return (
          
    
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
            
        
      )
}

export default Table