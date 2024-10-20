import { ChangeEvent } from "react"

type LabeledInputType = {
    label: string,
    value?: string,
    placeholder: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "email" | 'password' | 'number'
}

function LabeledInput({label, value, placeholder, handler, type='text'}: LabeledInputType) {
  
  return (
    <div className="flex flex-col">
        <label  className="text-sm font-medium text-gray-700 "> {label}</label>
        <input className="border-b-2 border-blue-300 outline-none text-sm text-ellipsis font-medium bg-transparent  focus:border-b-4 focus:border-b-blue-400  "
            placeholder={placeholder}
            value={value}
            onChange={(e) => handler(e)}
            type={type}
            />
    </div>
  )
}

export default LabeledInput