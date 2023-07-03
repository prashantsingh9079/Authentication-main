import React,{useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLogin:false,
    login:(token) =>{},
    logout:()=>{}
})

export  const AuthContextProvider = (props) =>
{
    const [token,setToken]=useState(null);
    const userIsLoggedin = !!token;
    function loginHandler(token)
    {
        setToken(token);
    }
    function logoutHandler()
    {
        setToken(null);
    }

    const authValue = {
        token:token,
        isLogin:userIsLoggedin,
        login:loginHandler,
        logout:logoutHandler
    }
    return(
        <AuthContext.Provider value={authValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;