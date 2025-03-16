import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

const AuthCallback = () =>{

    const {user} = useAuth0();
    const {createUser} = useCreateUser();
    const navigate = useNavigate();

    const hasCreatedUser = useRef(false);

useEffect(()=>{
    if(user?.sub && user.email && !hasCreatedUser.current){
        createUser({auth0Id:user.sub,email:user.email});
        hasCreatedUser.current = true;
      }
      navigate("/");

},[user,createUser])

    return <>Loading....</>;
}

export default AuthCallback;