import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import config from '../../config.json'
import LabeledInput from "../components/Inputs/LabeledInput";
import Button from "../components/Inputs/Button";

function SignUpx<T>({variant} : {variant: 'signIn' | 'signUp'}) {
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState<string>("");
    const [data, setData] = useState<T | {}>({});
    const [loading, setLoading] = useState<boolean>(false)

    const handler = async() => {
        setLoading(true);
        setPrompt('')
        try {
            const url =  config.BACKEND_URl+`/institute/${variant=='signIn' ? 'signin': 'signup'}`
            const response = await  axios.post(url, data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        }
        catch(e: any){
            e.response.data.message ? setPrompt(e.response.data.message) :setPrompt("Something went wrong... Try again later") 
        }
        setLoading(false);

    }
    return (
        <div className={`bg-background-primary min-h-screen flex items-center justify-center `}>
            <div className={`p-5 bg-background-secondary flex flex-col justify-center gap-6 border-2 border-border-divider rounded-md ${loading ? 'animate-pulse cursor-wait': ''}`}>
                <div className={`font-semibold text-secondary-text text-center `}>
                    <div className="text-4xl font-bold text-primary-text">{variant=='signIn' ? 'SignIn': 'SignUp'}</div>
                    <span>{variant=='signIn' ? 'Create An New Account ': 'Already Have An account ?? '}</span>
                    <Link to={variant=='signUp' ? '/signin': '/signup'}><span className="underline">{variant=='signIn' ? 'SignUp': 'SignIn'}</span></Link>
                </div>

                <div className='flex flex-col gap-4 font-medium'>
                    <LabeledInput label={'Institute Email'}  placeholder={'institute@engineering.com'} handler={(e) => setData((prevState) => ({...prevState, email: e.target.value}))}/>
                    {variant=='signUp' && <LabeledInput label={'Institute Name'} placeholder={'institute of engineering'} handler={(e) => setData((prevState) => ({...prevState, name: e.target.value}))}/>}
                    <LabeledInput label={'Password'}  placeholder={'password'} type="password" handler={(e) => setData((prevState) => ({...prevState, password: e.target.value}))} />
                </div> 

                <Button handler={handler} isDisabled={loading} value={variant=='signIn' ? 'SignIn': 'SignUp'} color={'primary-green'} addCSS="hover:bg-primary-green"/>

                {prompt && <div className="text-center text-red font-medium ">{prompt}</div>}
                
            </div>
        </div>
    )
}

export default SignUpx