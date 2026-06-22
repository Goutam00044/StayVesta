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
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-2xl mx-auto" onSubmit={handleloginSubmit}>
                    <input type="text" 
                    placeholder="Enter your email Id "
                    value={email}
                    onChange={(e)=>{
                        setemail(e.target.value);
                    }}
                    />
                    <input type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>{
                        setpassword(e.target.value);
                    }
                    }
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-800">
                    Don't Have Account Yet? <Link className="underline text-black" to={"/register"}>Register</Link>
                    </div>
                </form>
                </div>
               
            </div>
        </>
    )
}