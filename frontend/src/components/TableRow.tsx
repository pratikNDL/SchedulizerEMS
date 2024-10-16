
type TableRowType = {
    data: {},
    isDark?: boolean
    isSkeleton?: boolean
}

function TableRow({data, isDark=false, isSkeleton=false, }: TableRowType) {
  return (
    <tr>

        {Object.values(data).map((col, index, arr) => <td className={`border-t ${index==arr.length-1 ? "": "border-r"} border-slate-700 px-2 py-1 break-words ${isDark ?  "": "bg-white"} ${isSkeleton? 'py-4': '' }`}>{col as string}</td>)}
    </tr>
  )
} 

export default TableRow