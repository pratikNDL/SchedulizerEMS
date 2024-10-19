import { useState } from "react"
import LabeledInput from "../components/LabeledInput"
import { instituteSigninType } from "@pratikndl/common-schedulizer-ems"
import axios from "axios"
import config from '../../config.json'
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"

const defaultInput = {  
    name: '', 
    email: '',
    password: ''
}

export const Signin = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<String>("");
    const [data, setData] = useState<instituteSigninType>(defaultInput);
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const sendRequesst = async() => {
        setIsDisabled(true);
        try {
            const response = await  axios.post(config.BACKEND_URl+`/institute/signin`, data);
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
            setData(defaultInput)
        }
        setIsDisabled(false);

    }
    return(
        
        <div className="h-screen flex justify-center items-center bg-gradient-to-t from-slate-500  to-white">
            
        <div className={`${isDisabled ? "animate-pulse": ""}  bg-white border-2 border-slate-200 rounded-md hover:shadow-lg p-5 flex flex-col justify-center items-center gap-4`}>

            <div className="flex flex-col items-center gap-1">
                <div className='font-bold text-4xl'>
                    Institute Signin
                </div>
                <div className='font-md text-sm text-gray-500'>
                    Create an account!! 
                    <Link to={'/signup'} className="ml-1 underline font-bold ">
                        Signup
                    </Link>
                </div>
            </div>
  

            <div className='flex flex-col  w-full gap-4'>
                <LabeledInput label={'Institute Email'} value={data.email} placeholder={'institute@engineering.com'}handler={(e) => setData((prevState) => ({...prevState, email: e.target.value}))}/>
                <LabeledInput label={'Password'} value={data.password} placeholder={'password'} type="password" handler={(e) => setData((prevState) => ({...prevState, password: e.target.value}))} />
            </div> 
             
            <Button isDisabled={isDisabled} value={'Signin'} handler={sendRequesst} addCSS="bg-red-400 "/>

            
            <div className="w-2/3  text-lg text-red-600 text-center" >
                    {error}
            </div> 
            
        
        </div>
    </div>

    )
}