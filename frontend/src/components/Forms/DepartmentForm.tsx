import { useState } from "react"
import LabeledInput from "../LabeledInput"
import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper from "../FormWrapper"


function DepartmentForm({triggerRefresh}: {triggerRefresh: () => void}) {
    const [data, setData] = useState<departmentInputType | {}>({})
        
    const handler = async() => {
        try {
            await  axios.post(config.BACKEND_URl+`/department`, data, { headers: {Authorization: localStorage.getItem('token')}});
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Department Added"
        };

    }

    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                <LabeledInput  label="Department Name"  placeholder="Electronics And Computer Science Department" handler={(e) => setData({...data, name: e.target.value})}/>
                <LabeledInput label="Department Code"  placeholder="ECS" handler={(e) => setData({...data, code: e.target.value})}/>
            </div>             
        </FormWrapper>
  )
}

export default DepartmentForm