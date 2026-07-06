import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function SignupPage()
{   
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState(''); 

    const registerUser= async(ev)=>{
        ev.preventDefault();
        try{
            await axios.post('/signup',{
            name,email,password,
        });
        alert('Registration Successful. Now You can Login')
        } 
        catch(e){
            console.error(e);
            alert('Registration Failed Try Later')
        }
    }
    return(
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                <h1 className="text-4xl text-center mb-2">Sign Up</h1>
                <h3 className="text-md font-semibold text-center mb-10 text-amber-700">Let's join Stay Vesta Today</h3>
                <form className="max-w-full mx-auto" onSubmit={registerUser}>
                    <div className="form-group w-120">
                        <input type="text"
                        id="fname"
                        placeholder=" "
                        value={fname}
                        onChange={
                            (e)=>{
                                 setfname(e.target.value);   
                            }
                        }
                        />
                        <label htmlFor="fname">First Name</label>
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="lname"
                        placeholder=" "
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        />
                        <label htmlFor="lname">Last Name</label>
                    </div>

                    <div className="form-group">
                        <input 
                        type="email" 
                        id="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        />
                        <label htmlFor="email">Email Address</label>
                    </div>

                    <div className="form-group">
                        <input 
                        type="password" 
                        id="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="primary mb-6 mt-2">Create your account</button>
                    <div className="border-t border-gray-300 mb-2"></div>

                    <Link to={"/login"} className="group">
                        <div className="text-center mt-6 font-semibold">Already have an account? Login</div>
                        <div className="border-t w-60 mx-auto mt-0.5 group-hover:opacity-0 transition-opacity duration-300"></div>
                    </Link>
                </form>
                </div>
            </div>
           
    )
}