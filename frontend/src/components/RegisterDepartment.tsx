import { useState } from "react"
import LabeledInput from "./LabeledInput"
import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import Button from "./Button"
import config from '../../config.json'
import axios from "axios"

const defaultData: departmentInputType = {
    name: "",
    code: "",
}
function RegisterDepartment() {
    const [data, setData] = useState<departmentInputType>(defaultData)
    const [prompt, setPrompt] = useState<String>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const handler = async() => {
        setIsDisabled(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            await  axios.post(config.BACKEND_URl+`/department`, data, { headers});
            setPrompt("New departmet Added")
        }
        catch(e: any){
            
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
            
        }
        setIsDisabled(false);

    }
    return (
    <div className="grid grid-cols-12 gap-x-3">

        <LabeledInput addCSS="col-span-12 " label="Deapartment Name" value={data?.name} placeholder="Electronics And Computer Science Department"
         handler={(e) => setData({...data, name: e.target.value})}/>

        <LabeledInput addCSS="col-span-6 "label="Deapartment Code" value={data?.code} placeholder="ECS"
         handler={(e) => setData({...data, code: e.target.value})}/>
         
        <Button addCSS="flex flex-col justify-center col-span-6" isDisabled={isDisabled} value="Add Department" color="red-400" handler={handler}/>
        
        <div>
            {prompt}
        </div>
    </div>
  )
}

export default RegisterDepartment