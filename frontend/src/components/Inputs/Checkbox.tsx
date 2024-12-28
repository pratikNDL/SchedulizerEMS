import { ChangeEvent, } from "react";

type CheckBoxType = {
    label: string,
    handler: (e: ChangeEvent<HTMLInputElement>) => void,
}
function CheckBox({label, handler}: CheckBoxType) {
    
  return (
    <div className="flex items-center gap-2">
        <input type="checkbox" className="form-checkbox h-4 w-4 outline outline-1  outline-input-highlight "  onChange={(e) => handler(e)}/>
        <span className="text-primary-text">{label}</span>
    </div>

  )
}

export default CheckBox