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
    <div className="flex flex-col w-full">
        <label  className="text-primary-text "> {label}</label>
        <input className="border-b-2 border-input-highlight/70 outline-none bg-transparent text-primary-text focus:border-input-highlight"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handler(e)}
            type={type}
            />
    </div>
  )
}

export default LabeledInput