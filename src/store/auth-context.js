import React,{useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLogin:false,
    login:(token) =>{},
    logout:()=>{}
})

export  const AuthContextProvider = (props) =>
{
    const initailToken = localStorage.getItem("token")
    const [token,setToken]=useState(initailToken);
    const userIsLoggedin = !!token;
    function loginHandler(token)
    {
        setToken(token);
        localStorage.setItem("token",token)
        setTimeout(()=>{
            localStorage.removeItem('token')
            setToken(initailToken)
        },5000)
        console.log("timer will expire in 5 second")
    }
    function logoutHandler()
    {
        setToken(null);
        localStorage.removeItem("token")
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