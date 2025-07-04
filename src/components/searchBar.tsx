import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";


const formSchema = z.object({
    searchQuery:z.string({
        required_error:"Search Query is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>;

type Props ={
    onSubmit: (formData:SearchForm)=>void;
    placeholder: string;
    onReset?: ()=>void;
    searchQuery?:string;
 
 }

const SearchBar = ({onSubmit,onReset,placeholder,searchQuery}:Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            searchQuery
        }
    });
    useEffect(()=>{
        form.reset({
            searchQuery
        });


    },[form, searchQuery]);

    const handleReset = ()=>{
        form.reset({
            searchQuery:""
        }); 
        if(onReset){
            onReset();
        }
    }
   return(
    <Form {...form} >
   <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-1  ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
            <Search strokeWidth={2.5} size={30} className="ml-1 text-blue-900 hidden md:block"/>
            <FormField control={form.control} name="searchQuery" render={({field})=>(<FormItem className="flex-1">
                <FormControl >
                    <Input {...field} placeholder={placeholder} className="border-0 shadow-none focus-visible:ring-0 text-1xl "/>
                </FormControl>
            </FormItem>)} />
            {form.formState.isDirty && <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">Clear</Button>}
                
        <Button type="submit" className="rounded-full bg-blue-900 mr-2 ">Search</Button>

        </form>

    </Form>
   )
  
};


export default SearchBar;