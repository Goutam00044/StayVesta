import { useEffect, createContext, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});
 
export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setready] = useState(false);
    useEffect(() => {
        // Fetch current user once on mount. Rely on axios.defaults.withCredentials
        // being set early so the session cookie is sent.
        let mounted = true;
        axios.get('/profile')
            .then(({ data }) => {
                console.log('Profile fetch:', data);
                if (mounted){ 
                    setUser(data);
                    setready(true);
                }
                
            })
            .catch(() => {
                if (mounted) setUser(null);
            });
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        console.log('UserContext user changed:', user);
    }, [user]);
    
    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children} 
        </UserContext.Provider>
    )
}