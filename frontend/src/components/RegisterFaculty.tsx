import { useState } from "react"
import LabeledInput from "./LabeledInput"
import { facultyInputType,} from "@pratikndl/common-schedulizer-ems"
import Button from "./Button"
import config from '../../config.json'
import axios from "axios"
import SelectInput from "./SelectInput"
import useFetchDepartments from "../hooks/useFetchDepartments"
import RegisterWrapper from "./RegisterWrapper"

const defaultData: facultyInputType = {
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
    rank: "ASSISTANT_PROFESSOR"
}

enum rankEnum {
    Option1 = 'ASSISTANT_PROFESSOR',
    Option2 = 'ASSOCIATE_PROFESSOR',
    Option3 = 'PROFESSOR',
  }

function RegisterFaculty() {
    const departments = useFetchDepartments("");
    const [data, setData] = useState<facultyInputType>(defaultData)
    
    const [prompt, setPrompt] = useState<String>("");
    const [error, setError] = useState(true);
    const [loading, setloading] = useState(false)
        
    const handler = async() => {
        console.log(data)
        setloading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            await  axios.post(config.BACKEND_URl+`/faculty`, data, { headers});
            setPrompt("New Faculty Added")
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
                <LabeledInput addCSS="" label="First Name"  placeholder="Pratik" handler={(e) => {setData({...data, firstName: e.target.value})}}/>
                <LabeledInput addCSS="" label="Last Name"  placeholder="Yadav" handler={(e) => {setData({...data, lastName: e.target.value})}}/>
                <LabeledInput addCSS="" label="Email"  placeholder="pratik@yadav.in" handler={(e) => {setData({...data, email: e.target.value})}}/>

                
                <SelectInput handler={(e) => {setData({...data, rank: e.target.value as rankEnum })}} label="Designation"
                    values={[
                        
                        {displayValue: "Assistant Profresor", targetValue: "ASSISTANT_PROFESSOR"},
                        {displayValue: "Associate Profresor", targetValue: "ASSOCIATE_PROFESSOR"},
                        {displayValue: "Professor", targetValue: "PROFESSOR"},
                    ]}
                />

                <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                    values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}
                />

                
                
                <div className="flex  justify-center md:col-span-12 ">
                    <Button addCSS="bg-red-400" isDisabled={loading} value="Add Faculty"  handler={handler}/>
                </div>
                
                <div className={`flex justify-center mt-3 text-center font-bold ${error ? 'text-red-500': 'text-green-400'} md:col-span-12`}>
                    {prompt}
                </div>
        </RegisterWrapper>
    
  )
}

export default RegisterFaculty