import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import LoadingButton from "./loading-button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

import UserProfileForm, { UserFormData } from "./forms/user-profile-form/userProfileForm";
import { useGetUser } from "@/api/userAPI";



type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
    // isLoading: boolean;
  };
  
const CheckoutButton = ({onCheckout,disabled}:Props) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading: isAuthLoading,
  } = useAuth0();
  const { pathname } = useLocation();

  const {currentUser, isLoading: isGetUserLoading} = useGetUser();

  const onLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div>
        <button
          onClick={onLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In to Checkout
        </button>
      </div>
    );
  }
  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-blue-900 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
   
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 ">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
      
    </Dialog>

);
};

export default CheckoutButton;
