import { useState, ReactNode} from "react"
import add from "../../assets/add.svg"
import collapse from '../../assets/collapse.svg'
import Button from "../Inputs/Button"

export type FormHandlerReturnType = {
	success: boolean,
	message: string
}
export type FormProps = {
  	children: ReactNode,
	handler: () => (FormHandlerReturnType | Promise<FormHandlerReturnType>),
  	triggerRefresh?: () => void,
	heading?: string, 
	subHeading?: string, 
}

function FormWrapper({children, handler, triggerRefresh, heading, subHeading} : FormProps) {
	const [showForm, setShowForm] = useState(true)
	const [prompt, setPrompt] = useState<string>("");
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
				
				{
					heading &&
					<div className="w-full">
						<div className='font-extrabold text-primary-text text-2xl mb-0'>{heading}</div>
						{subHeading && <div className='font-semibold text-primary-text/50 leading-none '>{subHeading}</div>}
						<div className=' border-b-2  border-input-highlight mb-1 mt-1'></div>
					</div> 
					
				}
				
				{children}
				<Button className="w-1/5 border-input-highlight bg-transparent  text-input-highlight  hover:bg-input-highlight/10 hover:border-input-highlight/60" isDisabled={loading}  handler={enhancedHandler}>
					Add Record
				</Button> 
				{prompt && <div className={`font-bold ${error ? 'text-red-500': 'text-primary-green'}`}>{prompt} </div>} 
			</div>
		</div>
    
  	)
}

export default FormWrapper