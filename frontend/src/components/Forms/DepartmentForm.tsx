import { useState } from "react"
import LabeledInput from "../LabeledInput"
import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import Button from "../Button"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper from "../FormWrapper"


function DepartmentForm() {
    const [data, setData] = useState<departmentInputType | {}>({})
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false)

        
    const handler = async() => {
        setLoading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            await  axios.post(config.BACKEND_URl+`/department`, data, { headers});
            setPrompt("New department Added")
            setError(false)
        }
        catch(e: any){
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
        }
        setLoading(false);

    }

    return (
        <FormWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                    <LabeledInput  label="Department Name"  placeholder="Electronics And Computer Science Department" handler={(e) => setData({...data, name: e.target.value})}/>
                    <LabeledInput label="Department Code"  placeholder="ECS" handler={(e) => setData({...data, code: e.target.value})}/>
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={handler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </FormWrapper>
    
  )
}

export default DepartmentForm