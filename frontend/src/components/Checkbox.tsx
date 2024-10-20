import { ChangeEvent, } from "react";

type Checkboxtype = {
    label: string,
    handler: (e: ChangeEvent<HTMLInputElement>) => void,
}
function Checkbox({label, handler}: Checkboxtype) {
    
  return (
    <div className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox h-4 w-4"  onChange={(e) => handler(e)}/>
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>

  )
}

export default Checkbox