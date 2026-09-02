import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleloginSubmit(e) {
    e.preventDefault();

    try {
        await axios.post(
            "/login",
            { email, password },
            { withCredentials: true }
        );

        const { data: profile } = await axios.get("/profile");

        setUser(profile);

        toast.success(`Welcome back, ${profile.fname}`);

        setredirect(true);

    } catch (err) {
        console.error(err);

        toast.error(
            err.response?.data?.error ||
            "Login failed."
        );
    }
  }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return(
    <>
    <div className="mt-4 grow flex items-center justify-around px-4 sm:py-4">                
        <div className="sm:mb-64 mb-32">
            <h1 className="text-3xl sm:text-4xl text-center mb-2">Login in to your account</h1>
            <h3 className="text-md font-semibold text-center mb-10 text-amber-700">Welcome back! Please enter your details</h3>
        <form className="max-w-2xl mx-auto w-full" onSubmit={handleloginSubmit}>
            <div className="form-group w-full sm:w-120">
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