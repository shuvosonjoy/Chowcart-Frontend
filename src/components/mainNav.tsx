
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./userName";


const MainNav = () => {
  const { loginWithRedirect, isAuthenticated,error } = useAuth0();
  console.log(isAuthenticated);
  console.log(error);
  console.log()
  return (
    
    <span>
      {isAuthenticated ? (
       <UserNameMenu/>
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
