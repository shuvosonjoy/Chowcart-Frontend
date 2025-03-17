import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./details-section";
import ImageSection from "./ImageSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisineSection";
import LoadingButton from "@/components/loading-button";
import MenuSection from "./MenuSection";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restuarant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

  type RestaurantFormData = z.infer<typeof formSchema>;

const ManageRestaurantForms= ({onSave,isLoading}: Props)=> {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        cuisines: [],
        menuItems: [{ name: "", price: 0 }],
      },
  });
  const onSubmit = (formDataJson: RestaurantFormData) => {

  }
  return(
   <Form {...form}>
    <form
    onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-lg p-6 bg-gray-50"
    >
      <DetailsSection/>
      <Separator/>
      <ImageSection/>
      <CuisinesSection />
      <Separator />
      <MenuSection />
      <Separator />
      <ImageSection/>
      {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      
      </form>
    
    </Form>
  )
}

type Props = {
    onSave: (restaurantFromData:FormData) => void;
    isLoading: boolean;
}

export default ManageRestaurantForms;

