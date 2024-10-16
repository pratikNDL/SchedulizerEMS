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
            <LabeledInput addCSS="md:col-span-8" label="Deapartment Name"  placeholder="Electronics And Computer Science Department"
                handler={(e) => setData({...data, name: e.target.value})}/>

                <LabeledInput addCSS="md:col-span-4" label="Deapartment Code"  placeholder="ECS"
                handler={(e) => setData({...data, code: e.target.value})}/>
                
                <div className="flex  justify-center md:col-span-12 ">
                    <Button addCSS="bg-red-400" isDisabled={loading} value="Add Department"  handler={handler}/>
                </div>
                
                <div className={`flex justify-center mt-3 text-center font-bold ${error ? 'text-red-500': 'text-green-400'} md:col-span-12`}>
                    {prompt}
                </div>
        </RegisterWrapper>
    
  )
}

export default RegisterDepartment