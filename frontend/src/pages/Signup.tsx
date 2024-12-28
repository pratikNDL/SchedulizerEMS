import { useState } from "react"
import LabeledInput from "../components/Inputs/LabeledInput"
import { instituteSignupType } from "@pratikndl/common-schedulizer-ems"
import axios from "axios"
import config from '../../config.json'
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Inputs/Button"

const defaultInput = {  
    name: '', 
    email: '',
    password: ''
}

export const Signup = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");
    const [data, setData] = useState<instituteSignupType>(defaultInput);
    const [isLoading, setisLoading] = useState<boolean>(false)

    const sendRequesst = async() => {
        setisLoading(true);
        try {
            const response = await  axios.post(config.BACKEND_URl+`/institute/signup`, data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        }
        catch(e: any){
            if(!e.response.data.message) {
                setError("Something went wrong... Try again later")
            }
            else {
                setError(e.response.data.message);
            }
        }
        setisLoading(false);

    }
    return(
        
        <div className="h-screen flex justify-center items-center bg-gradient-to-t from-slate-500  to-white">
            
            <div className={`${isLoading ? "animate-pulse": ""}  bg-white border-2 border-slate-200 rounded-md hover:shadow-lg p-5 flex flex-col justify-center items-center gap-4`}>

                <div className="flex flex-col items-center gap-1">
                    <div className='font-bold text-4xl'>
                        Institute Signup
                    </div>
                    <div className='font-md text-sm text-gray-500'>
                        Already have an account?? 
                        <Link to={'/signin'} className="ml-1 underline font-bold ">
                            Login
                        </Link>
                    </div>
                </div>
      

                <div className='flex flex-col  w-full gap-4'>
                    <LabeledInput label={'Institute Email'}  placeholder={'institute@engineering.com'}handler={(e) => setData((prevState) => ({...prevState, email: e.target.value}))}/>
                    <LabeledInput label={'Institute Name'} placeholder={'institute@engineering.com'}handler={(e) => setData((prevState) => ({...prevState, name: e.target.value}))}/>
                    <LabeledInput label={'Password'}  placeholder={'password'} type="password" handler={(e) => setData((prevState) => ({...prevState, password: e.target.value}))} />
                </div> 
                 
                <Button isDisabled={isLoading} value={'Signup'} handler={sendRequesst} addCSS="bg-red-400 "/>

                
                <div className="w-2/3  text-lg text-red-600 text-center" >
                        {error}
                </div> 
                
            
            </div>
        </div>

    )
}