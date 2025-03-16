import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./userName";
const MobileNav = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-900 pr-1"/>
      </SheetTrigger>
     
      <SheetContent className="p-5">
      <SheetTitle><span className="text-blue-900 font-bold font-sans">Welcome to ChowCart</span></SheetTitle>
      <Separator/>
    {isAuthenticated? ( <SheetDescription className="flex px-5">
      <UsernameMenu/>
      </SheetDescription>):(   <SheetDescription className="flex px-5">
       <Button className="flex-1 bg-blue-900 font-bold" onClick={async()=>await loginWithRedirect()}>Log In</Button>
       </SheetDescription>)}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
