
type TableRowType = {
    name: string,
    code: string,
    isDark?: boolean
    isSkeleton?: boolean
}

function TableRow({name, code, isDark=false, isSkeleton=false}: TableRowType) {
  return (
    <tr>
        <td className={`border-t border-r border-slate-700 px-2 py-1 break-words ${isDark ?  "": "bg-white"} ${isSkeleton? 'py-4': '' }`}>{name}</td>
        <td className={`border-t border-slate-700 px-2 ${isDark ?  "": "bg-white"} ${isSkeleton? '': '' }`}>{code}</td>
    </tr>
  )
}

export default TableRow