import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
// import UsernameMenu from "./userNameMenu";
import MobileNavLinks from "./mobileNavLinks";
const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated,user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-900 pr-1" />
      </SheetTrigger>

      <SheetContent className="p-5">
        <SheetTitle>
        {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-blue-900" />
              {user?.email}
            </span>
          ) : (
            <span> Welcome to ChowCart.com!</span>
          )}
        </SheetTitle>
        <Separator />
        {isAuthenticated ? (
         
      <MobileNavLinks/>
        
        ) : (
        <Button
          onClick={() => loginWithRedirect()}
                  className="mt-4 px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-md w-fit">
          Log In
        </Button>

        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
