import { useState } from "react"
import LabeledInput from "../components/LabeledInput"
import { instituteSignupType } from "@pratikndl/common-schedulizer-ems"
import axios from "axios"
import config from '../../config.json'
import { Link, useNavigate } from "react-router-dom"

const defaultInput = {  
    name: '', 
    email: '',
    password: ''
}

export const Signup = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<String>("");
    const [data, setData] = useState<instituteSignupType>(defaultInput);
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const sendRequesst = async() => {
        setIsDisabled(true);
        try {
            const response = await  axios.post(config.BACKEND_URl+`/institute/signup`, data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/home');
        }
        catch(e: any){
            setError(e.response.data.message);
            setData(defaultInput)
        }
        setIsDisabled(false);

    }
    return(
        
        <div className="h-screen flex justify-center items-center bg-gradient-to-t from-gray-600  to-gray-300">
            
            <div className="bg-white border-2 border-slate-200 rounded-md hover:shadow-lg p-5 flex flex-col justify-center items-center">

                <div className="flex flex-col items-center mb-5">
                    <div className='font-bold text-4xl mb-2 '>
                        Institute Signup
                    </div>
                    <div className='font-md text-sm text-gray-500'>
                        Already have an account?? 
                        <Link to={'/sigin'} className="ml-1 underline font-bold ">
                            Login
                        </Link>
                    </div>
                </div>

                <div className='w-full'>
                    <LabeledInput 
                        label={'Institute Name'} value={data.name} placeholder={'Institute of Engineering'}
                        handler={(e) => setData((prevState) => ({
                            ...prevState,
                            name: e.target.value
                            }))}    
                    />
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

                
                <div className="py-1 mt-5 w-full
                                rounded
                                text-lg text-red-600 text-center
                                " >
                        {error}
                </div> 
                
            
            </div>
        </div>

    )
}