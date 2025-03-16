
import MobileNav from "./mobileNav";
import { Link } from "react-router-dom";
import MainNav from "./mainNav";
const Header = () => {
  return (
    <div className="border-b-2 border-b-blue-900 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={"/"}
          className=" font-bold text-3xl tracking-tight text-blue-900"
        >
          ChowCart.com
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
