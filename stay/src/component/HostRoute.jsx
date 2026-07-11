import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";


export default function HostRoute({children}){

    const {user} = useContext(UserContext);


    if(!user?.isHost){
        return <Navigate to="/" />;
    }


    return children;
}