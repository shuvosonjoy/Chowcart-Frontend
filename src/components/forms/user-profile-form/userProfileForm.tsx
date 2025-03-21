import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";



const formSchema = z.object({
  email: z.string().optional(),
  name: z
    .string()
    .min(2)
    .max(255, { message: "Name must be between 2 and 255 characters" }),
  addressLine1: z
    .string()
    .min(1)
    .max(255, { message: "Address must be between 1 and 255 characters" }),
  city: z
    .string()
    .min(1)
    .max(255, { message: "City must be between 1 and 255 characters" }),
  country: z
    .string()
    .min(1)
    .max(255, { message: "Country must be between 1 and 255 characters" }),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser:User;
  onSave: (data: UserFormData) => void;
  isLoading: boolean;
  title?:string;
  buttonText?:string;
};

const UserProfileForm = ({ onSave, isLoading,currentUser,title=" User Profile From",buttonText="Submit" }: Props) => {

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues:currentUser,
  });

  useEffect(()=>{
    form.reset(currentUser);
  },[currentUser,form]);

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 md:p-10 rounded-lg p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>Update your user profile</FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field}  className="bg-white" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>AddressLine 1</FormLabel>
              <FormControl>
                <Input {...field}  className="bg-white" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field}  className="bg-white" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field}  className="bg-white" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        </div>
     <div className="flex justify-center md:justify-start">
      
     {isLoading ? <LoadingButton/> : <Button type="submit" className=" bg-blue-900 ">{buttonText}</Button>}
     </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
