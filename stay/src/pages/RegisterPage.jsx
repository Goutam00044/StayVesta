import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage()
{   
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState(''); 

    const registerUser= async(ev)=>{
        ev.preventDefault();
        try{
            await axios.post('/register',{
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
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-2xl mx-auto" onSubmit={registerUser}>
                    <input type="text" 
                        placeholder="Enter your Name"
                        value={name}
                        onChange={
                            (e)=>{
                                 setname(e.target.value);   
                            }
                        }
                    />
                    <input type="email" 
                        placeholder="Enter your email Id "
                        value={email}
                        onChange={
                            (e)=>{
                                setemail(e.target.value);
                            }
                        }
                    />
                    <input type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={
                            (e)=>{
                                setpassword(e.target.value);
                            }
                        }
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-800">
                    Already Have Account? <Link className="underline text-black" to={"/login"}>Login</Link>
                    </div>
                </form>
                </div>
            </div>
           
    )
}