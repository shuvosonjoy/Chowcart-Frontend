import { useGetRestaurant } from "@/api/restaurantAPI";
import MenuItem from "@/components/menuItem";
import RestaurantInfo from "@/components/restaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {MenuItem as MenuItemType} from "@/types";
import OrderSummary from "@/components/orderSummary";
import CheckoutButton from "@/components/checkoutButton";
import { UserFormData } from "@/components/forms/user-profile-form/userProfileForm";
import { useCreateCheckoutSession } from "@/api/orderAPI";




export type CartItems = {
    _id:string,
    name:string,
    price:number,
    quantity:number,
}
const DetailsViewPage = () => {
    const {restaurantId} = useParams();
    const {restaurant,isLoading} = useGetRestaurant(restaurantId);
    const {createCheckoutSession,isLoading:isCheckoutLoading} = useCreateCheckoutSession();

    const [cartItems,setCartItems] = useState<CartItems[]>(()=>
     { const storedItem = sessionStorage.getItem(`cartItems-${restaurantId}`);
     return storedItem ? JSON.parse(storedItem) : [];}
    );


    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
          const existingCartItem = prevCartItems.find(
            (cartItem) => cartItem._id === menuItem._id
          );
    
          let updatedCartItems;
    
          if (existingCartItem) {
            updatedCartItems = prevCartItems.map((cartItem) =>
              cartItem._id === menuItem._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            updatedCartItems = [
              ...prevCartItems,
              {
                _id: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
              },
            ];
          }
          sessionStorage.setItem(
            `cartItems-${restaurantId}`,
            JSON.stringify(updatedCartItems)
          )
          return updatedCartItems;
        });
      };


      
  const removeFromCart = (cartItem: CartItems) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

     

      return updatedCartItems;
    })
  }


  const onCheckout = async(userFormData: UserFormData) =>{
      console.log(userFormData);

      if(!restaurant){
        return;
      }

    
      const checkoutData = {
        cartItems: cartItems.map((cartItem) => ({
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity.toString(),
        })),
        restaurantId: restaurant._id,
        deliveryDetails: {
          name: userFormData.name,
          addressLine1: userFormData.addressLine1,
          city: userFormData.city,
          country: userFormData.country,
          email: userFormData.email as string,
        },
      };
     
  
      const data = await createCheckoutSession(checkoutData);
      window.location.href = data.url;

  }
      
    if(isLoading){
      return  <div className="flex justify-center items-center ">
      <img src="/Circles-menu-3.gif" alt="Loading..." />
    </div>
    }
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5} >
                <img src = {restaurant?.imageUrl} alt={restaurant?.imageUrl} className="rounded-md object-cover w-full h-full"/>
            </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
            <div className="flex flex-col gap-5">
                {restaurant && <RestaurantInfo restaurant={restaurant}/>}
                <span className="text-2xl font-bold tracking-tight">
                    Menu
                </span>
                {restaurant?.menuItems.map((menuItem)=>(
                     <MenuItem
                     menuItem={menuItem}
                     addToCart={() => addToCart(menuItem)}
                   />
                ))}
            </div>
            <div><Card>
              {restaurant && (
                <OrderSummary
                  restaurant={restaurant}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                />
              )}
              <CardFooter>
                <CheckoutButton disabled={cartItems.length===0} onCheckout={onCheckout} isLoading={isCheckoutLoading} />
              </CardFooter>
                </Card></div>

        </div>
            
        </div>
    );
};

export default DetailsViewPage;