
type TableRowType = {
    name: string,
    code: string,
    isDark?: boolean
}

function TableRow({name, code, isDark=false}: TableRowType) {
  return (
    <tr>
        <td className={`border-b border-r border-slate-700 px-2 break-words ${isDark ?  "": "bg-white"}`}>{name}</td>
        <td className={`border-b border-slate-700 px-2 ${isDark ?  "": "bg-white"}`}>{code}</td>
    </tr>
  )
}

export default TableRow