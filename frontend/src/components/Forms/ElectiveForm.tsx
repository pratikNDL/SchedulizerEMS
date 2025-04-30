import { Dispatch, useState } from "react"
import LabeledInput from "../Inputs/LabeledInput"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper, { FormHandlerReturnType } from "../Wrappers/FormWrapper"
import SelectInput from "../Inputs/SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"
import { CourseInputType } from "./RegularCourseForm"


const ElectiveCourseType = ["THEORY",'PRACTICAL'];
type ElectiveBasket = {
    id: string
    name: string,
    code: string,
    credits: number,
    courseCount: number
    departmentId: string,
    courseType: (typeof ElectiveCourseType)[number]
}

type ElectiveBasketInput = Omit<ElectiveBasket, 'id'>



function ElectiveForm({triggerRefresh}: {triggerRefresh: () => void}) {
	
	const [electiveBasket, setElectiveBasket] = useState<ElectiveBasket | undefined>()

    return (
        <div>
            {
                !electiveBasket ?
                <ElectiveBasketForm triggerRefresh={triggerRefresh} setElectiveBasket={setElectiveBasket}/>:
                <ElectiveCourseForm triggerRefresh={triggerRefresh} electiveBasket={electiveBasket} setElectiveBasket={setElectiveBasket}/>
            }
        </div>
  )
}


type ElectiveBasketFormProp = {
    triggerRefresh: () => void,
	setElectiveBasket: Dispatch<React.SetStateAction<ElectiveBasket | undefined>>
}
function ElectiveBasketForm({triggerRefresh, setElectiveBasket}: ElectiveBasketFormProp) {
    const [data, setData] = useState<ElectiveBasketInput | {}>({})
    const departments = useFetchDepartments("");

    const handler = async(): Promise<FormHandlerReturnType>  => {  
        console.log(data)  
        if(!('credits' in data)) return {
            success: false,
            message: 'Invalid Inputs'
        };
        try {
            const response = await axios.post(config.BACKEND_URl+`/elective`, {...data, credits: Number(data.credits), courseCount: Number(data.courseCount)}, {headers: {Authorization: localStorage.getItem('token')}});
            setElectiveBasket(response.data.electiveBasket)
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Elective Basket Added"
        };

    }

    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ">
                <LabeledInput  label="Elective Basket Name"  placeholder="ElectiveBasket/V-Sem" handler={(e) => setData({...data, name: e.target.value})}/>
                <LabeledInput  label="Elective Basket Code"  placeholder="ECS300" handler={(e) => setData({...data, code: e.target.value})}/>
                <LabeledInput label="Credits"  placeholder="3" type="number" handler={(e) => setData({...data, credits: Number(e.target.value)})}/>
                <LabeledInput label="No. of Courses"  placeholder="3" type="number" handler={(e) => setData({...data, courseCount: Number(e.target.value)})}/>
                <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                    values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/> 

                <SelectInput handler={(e) => {setData({...data, courseType: e.target.value })}} label="Course Type"
                    values={ElectiveCourseType.map((course) => { return{displayValue: course, targetValue: course}})}/>
                
            </div>  
        </FormWrapper>    
  )
}

type ElectiveCourseFormProps = {
    electiveBasket: ElectiveBasket,
    triggerRefresh: () => void,
	setElectiveBasket: Dispatch<React.SetStateAction<ElectiveBasket | undefined>>
}
function ElectiveCourseForm({electiveBasket, triggerRefresh, setElectiveBasket} : ElectiveCourseFormProps) {
    const [courses, setCourses] = useState<Array<string>>(Array.from({length: electiveBasket.courseCount}, () => ""));

    function handler(value: string, index: number) {
        setCourses(courses => {
            if(!courses) return courses;
            const newCourses = [...courses];
            newCourses[index] = value
            return newCourses
        })
    }


    const submitHandler = async(): Promise<FormHandlerReturnType>  => {    

        if(courses.includes("")) {
            return {
                success: false,
                message: "Invalid Course Name"
            };
        }

        const body: Array<CourseInputType> = courses.map((course, i) => ({
                name: course,
                code: `${electiveBasket.code}-${i+1}`,
                electiveBasketId: electiveBasket.id,
                courseType: electiveBasket.courseType,
                credits: electiveBasket.credits,
                departmentId: electiveBasket.departmentId
            })) 

        try {
            await  axios.post(config.BACKEND_URl+`/course/multiple`, body, {headers: {Authorization: localStorage.getItem('token')}});
            setElectiveBasket(undefined);
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
            
        return {
            success: true,
            message: "New Elective Course Added"
        };

    }
    return (
        <FormWrapper handler={submitHandler} triggerRefresh={triggerRefresh} heading={`${electiveBasket.name} ${electiveBasket.code}`} subHeading="Add All Elective for the Basket">
            <div className="grid md:grid-cols-4 gap-8 w-full">
                {Array.from({length: electiveBasket.courseCount}, (_, i) => <LabeledInput key={i}  label={`Elective -${i+1}`}  placeholder="V sem Elective" handler={e => handler(e.target.value, i)}/>)}
            </div>
        </FormWrapper>    

    )
}

export default ElectiveForm