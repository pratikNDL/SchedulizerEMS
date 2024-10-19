import { useState } from "react"
import LabeledInput from "./LabeledInput"
import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import Button from "./Button"
import config from '../../config.json'
import axios from "axios"
import RegisterWrapper from "./RegisterWrapper"

const defaultData: departmentInputType = {
    name: "",
    code: "",
}
function RegisterDepartment() {
    const [data, setData] = useState<departmentInputType>(defaultData)
    const [prompt, setPrompt] = useState<String>("");
    const [error, setError] = useState(true);
    const [loading, setloading] = useState(false)

        
    const handler = async() => {
        setloading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            await  axios.post(config.BACKEND_URl+`/department`, data, { headers});
            setPrompt("New departmet Added")
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
        setloading(false);

    }

    console.log(error);
    return (
        <RegisterWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                    <LabeledInput  label="Deapartment Name"  placeholder="Electronics And Computer Science Department" handler={(e) => setData({...data, name: e.target.value})}/>
                    <LabeledInput label="Deapartment Code"  placeholder="ECS" handler={(e) => setData({...data, code: e.target.value})}/>
                </div>

                <Button addCSS="bg-slate-400" isDisabled={loading} value="Add Deaprtment"  handler={handler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </RegisterWrapper>
    
  )
}

export default RegisterDepartment