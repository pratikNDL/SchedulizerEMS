import { ChangeEvent } from "react"

type LabeledInputType = {
    label: string,
    value?: string,
    placeholder: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "email" | 'password'
    addCSS?: string
}

function LabeledInput({label, value, placeholder, handler, type='text', addCSS}: LabeledInputType) {
  
  return (
    <div className={`mb-5 ${addCSS}`}>
        <label  className="text-md font-medium text-gray-700 "> {label}</label>
        <input className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handler(e)}
            type={type}
            />
    </div>
  )
}

export default LabeledInput