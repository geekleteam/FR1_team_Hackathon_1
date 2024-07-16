import {createContext, useState,useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react'


const AuthContext = createContext({});


export const AuthProvider:React.FC<any> = ({children}) => {
    const {user,isAuthenticated} = useAuth0();
    const [auth,setAuth] = useState({});

    useEffect(()=>{

        if(isAuthenticated){
            setAuth({...user});
        } 



    },[isAuthenticated])

    return <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>

}


export default AuthContext;