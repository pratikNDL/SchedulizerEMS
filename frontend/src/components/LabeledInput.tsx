import { ChangeEvent } from "react"

type LabeledInputType = {
    label: string,
    value?: string,
    placeholder: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "email" | 'password'
}

function LabeledInput({label, value, placeholder, handler, type='text'}: LabeledInputType) {
  return (
    <div className=" mb-5 ">
        <label  className="text-md font-medium text-gray-900 "> {label}</label>
        <input className="bg-gray-50 border border-gray-300
            text-gray-900 text-sm rounded-md
            focus:ring-orange-500 focus:border-orange-500
            w-full p-1.5 " 
            placeholder={placeholder}
            value={value}
            onChange={(e) => handler(e)}
            type={type}
            />
    </div>
  )
}

export default LabeledInput