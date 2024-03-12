import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {

    const { control } = useFormContext();
    
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2lx font-bold">Image</h2>
                <FormDescription>
                    Upload an image for your restaurant
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 w-[50%]">
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    className="bg-white" 
                                    type="file" 
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => {
                                        field.onChange(e.target.files?.[0]);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export default ImageSection;