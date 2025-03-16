import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-900"/>
      </SheetTrigger>
     
      <SheetContent className="space-y-3">
      <SheetTitle><span>Welcome to ChowCart</span></SheetTitle>
      <Separator/>
       <SheetDescription className="flex px-5">
       <Button className="flex-1 bg-blue-900 font-bold">Log In</Button>
       </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
