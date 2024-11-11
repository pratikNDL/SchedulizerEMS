import { useState } from "react"
import LabeledInput from "../LabeledInput"
import { facultyInputType} from "@pratikndl/common-schedulizer-ems"
import config from '../../../config.json'
import axios from "axios"
import SelectInput from "../SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"
import FormWrapper from "../FormWrapper"




function FacultyForm({triggerRefresh}: {triggerRefresh: () => void}) {
    const departments = useFetchDepartments("");
    const [data, setData] = useState<facultyInputType | {}>({})
    

        
    const handler = async() => {
        
        console.log(data)
        try {
            await  axios.post(config.BACKEND_URl+`/faculty`, data, {headers: {Authorization: localStorage.getItem('token')}});
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Faculty Added"
        };
    }


    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    <LabeledInput label="Name"  placeholder="Pratik" handler={(e) => {setData({...data, name: e.target.value})}}/>
                    <LabeledInput label="Email"  placeholder="pratik@yadav.in" handler={(e) => {setData({...data, email: e.target.value})}}/>
                    <SelectInput handler={(e) => {setData({...data, rank: e.target.value })}} label="Designation"
                        values={[
                            {displayValue: "Assistant Profresor", targetValue: "ASSISTANT_PROFESSOR"},
                            {displayValue: "Associate Profresor", targetValue: "ASSOCIATE_PROFESSOR"},
                            {displayValue: "Professor", targetValue: "PROFESSOR"},
                        ]} />
                    <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                        values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/>
                </div>

        </FormWrapper>
    
  )
}

export default FacultyForm