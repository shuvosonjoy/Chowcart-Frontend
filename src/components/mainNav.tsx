
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./userNameMenu";
import { Link } from "react-router-dom";


const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
       <>
       <Link to ="/order-status" className="font-bold font-sans hover:text-blue-900 ">
       Order Status  
       </Link>
       <UserNameMenu/>
       </>
      ) : (
        <div>
          <Button
            variant="ghost"
            className="hover:text-blue-900 hover:bg-white font-bold text-xl font-sans"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
        </div>
      )}
     </span>
  );
};

export default MainNav;
