import { useState } from "react"
import LabeledInput from "../components/LabeledInput"
import { instituteSigninType } from "@pratikndl/common-schedulizer-ems"
import axios from "axios"
import config from '../../config.json'
import { Link, useNavigate } from "react-router-dom"

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
            navigate('/home');
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
        
        <div className="h-screen flex justify-center items-center bg-gradient-to-t from-black  to-white">
            
            <div className={`${isDisabled ? "animate-pulse": ""}  bg-white border-2 border-slate-200 rounded-md hover:shadow-lg p-5 flex flex-col justify-center items-center`}>
            
                <div className="flex flex-col items-center mb-5">
                    <div className='font-bold text-4xl mb-2 '>
                        Institute SignIn
                    </div>
                    <div className='font-md text-sm text-gray-500'>
                        Create an account?? 
                        <Link to={'/signup'} className="ml-1 underline font-bold ">
                            SignUp
                        </Link>
                    </div>
                </div>

                <div className='w-full'>
                
                    <LabeledInput 
                        label={'Institute Email'} value={data.email} placeholder={'institute@engineering.com'}
                        handler={(e) => setData((prevState) => ({
                            ...prevState,
                            email: e.target.value
                            }))}    
                    />
                    <LabeledInput 
                        label={'Password'} value={data.password} placeholder={'Minimum 8 charactors'}
                        type="password"
                        handler={(e) => setData((prevState) => ({
                            ...prevState,
                            password: e.target.value
                            }))}    
                    />
                </div>        

                <button className={`rounded-md bg-orange-500 py-2 px-4 w-2/3
                            text-sm text-white transition-all 
                            hover:bg-orange-700 hover:shadow-xl 
                            disabled:bg-gray-400 disabled:cursor-not-allowed`}

                        disabled={isDisabled}
                        type="button"
                        onClick={sendRequesst}>
                    Signup
                </button>   

                
                <div className="py-1 mt-5 w-2/3
                                rounded
                                text-lg text-red-600 text-center
                                " >
                        {error}
                </div> 
                
            
            </div>
        </div>

    )
}