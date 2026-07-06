import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const {setUser} = useContext(UserContext);
    
    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    async function handleloginSubmit(e){
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password }, {
                withCredentials: true,
            });
            console.log('Login response data:', data);
            if (data?.error) {
                alert(data.error);
                return;
            }
            // After login, fetch the canonical profile (ensures cookie/session applied)
            try {
                const { data: profile } = await axios.get('/profile');
                console.log('Profile after login:', profile);
                setUser(profile);
            } catch (err) {
                console.error('Failed to fetch profile after login', err);
            }
            alert('Login Successful');
            setredirect(true);
        }
        catch(err){
            console.error(err);
            alert('Login Failed');
        }
    }
    return(
        <>
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                <h1 className="text-4xl text-center mb-2">Login in to your account</h1>
                <h3 className="text-md font-semibold text-center mb-10 text-amber-700">Welcome back! Please enter your details</h3>
                <form className="max-w-2xl mx-auto" onSubmit={handleloginSubmit}>
                    <div className="form-group w-120">
                        <input type="text" 
                        placeholder=" "
                        value={email}
                        onChange={(e)=>{
                            setemail(e.target.value);
                        }}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" 
                        placeholder=" "
                        value={password}
                        onChange={(e)=>{
                            setpassword(e.target.value);
                        }}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="primary mb-6 mt-2">Login</button>
                    <div className="border-t border-gray-300 mb-2"></div>
                    <Link to={"/signup"} className="group">
                        <div className="text-center mt-6 font-semibold">Don't have an account? Sign Up</div>
                        <div className="border-t w-60 mx-auto mt-0.5 group-hover:opacity-0 transition-opacity duration-300"></div>
                    </Link>
                </form>
                </div>
               
            </div>
        </>
    )
}