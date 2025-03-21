import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const CheckoutButton = () => {

   const {isAuthenticated,loginWithRedirect} = useAuth0();
   const {pathname} = useLocation();


   const onLogin = () =>{
         loginWithRedirect(
            {
                appState:{
                    returnTo:pathname
                }
            }
         );
   }
 
   if(!isAuthenticated){
    return <div>
        <button  onClick={onLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log In to Checkout
        </button>
    </div>
   }
    return <div>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Checkout
         </button>
         </div>
};

export default CheckoutButton;