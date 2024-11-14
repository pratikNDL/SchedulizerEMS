import { useState, ReactNode} from "react"
import add from "../assets/add.svg"
import collapse from '../assets/collapse.svg'
import Button from "./Button"

export type FormHandlerReturnType = {
	success: boolean,
	message: string
}
export type FormProps = {
  	children: ReactNode,
	handler: () => (FormHandlerReturnType | Promise<FormHandlerReturnType>),
  	triggerRefresh?: () => void
}

function FormWrapper({children, handler, triggerRefresh} : FormProps) {
	const [showForm, setShowForm] = useState(true)
	const [prompt, setPrompt] = useState<String>("");
	const [error, setError] = useState(true);
	const [loading, setLoading] = useState(false)

	const enhancedHandler = async() => {
		setPrompt('');
		setLoading(true);
		const response = await handler();
		if(!response.success) setError(true)
		else setError(false)
		setPrompt(response.message);
		setLoading(false);
		if(triggerRefresh) triggerRefresh();
	}

   
	return (
		<div className="w-full">
			<div className='p-1 border-2 w-fit rounded mb-2 border-border-divider bg-background-secondary' onClick={() => setShowForm((prev) => !prev)}>
				{<img src={showForm ? collapse : add} width={20}></img>}  
			</div>
			<div className={`rounded-md bg-background-secondary shadow-2xl border-2 border-border-divider flex flex-col gap-5 items-center justify-evenly ${!showForm ? 'p-0 h-0 border-0': 'p-5'} overflow-hidden transition-none ${loading ? 'cursor-wait': ''}`}>
				{children}
				<Button addCSS="w-1/5 border border-input-highlight bg-transparent text-input-highlight  hover:bg-input-highlight hover:text-primary-text" isDisabled={loading} value="Add Record"  handler={enhancedHandler} /> 
				{prompt && <div className={`font-bold ${error ? 'text-red-500': 'text-primary-green'}`}>{prompt} </div>} 
			</div>
		</div>
    
  	)
}

export default FormWrapper