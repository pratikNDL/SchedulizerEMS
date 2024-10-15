import { ChangeEvent,  useRef, useState } from "react"
import TableRow from "./TableRow"
import LabeledInput from "./LabeledInput";
import useFetchDepartments from "../hooks/useFetchDepartments";
import SkeletonTable from "./SkeletonTable";

function TableDepartment() {
  const [query, setQuery] = useState("");
  const {loading, data} = useFetchDepartments(query)

  const timeoutRef = useRef<number | null>(null); 

  const handler = (e: ChangeEvent<HTMLInputElement>): void => {
    // const value = e.target.value

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setQuery(e.target.value); 
    }, 300);
  };

  console.log(data)

  return (
    <div>
      
      <LabeledInput label="" placeholder="search" handler={handler} />

      <table className="table-fixed w-full rounded-lg border  border-separate border-spacing-0 bg-gray-300 border-slate-500 ">
        <thead>
          <tr>
            <th className="w-3/4  border-r border-slate-600">Depatment Name</th>
            <th className="w-1/4  border-slate-600 ...">Code</th>
          </tr>
      </thead>

      {loading ?  <SkeletonTable/>:
        <tbody>
          {data.map((row, index) => <TableRow key={row.departmentId} name={row.name} code={row.code} isDark={index%2 ? true: false}/>)} 
        </tbody>
      }
    </table>
    </div>
    

    
  )
}

export default TableDepartment