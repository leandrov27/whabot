import { useEffect } from "react";

// next
import { usePathname, useRouter } from "next/navigation";

// shadcn-ui
import { toast } from "sonner";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// core
import { CreateUpdateCategorySchema, ICreateUpdateCategorySchema } from "../schemas";
import { ICategory } from "../interfaces";

// ----------------------------------------------------------------------

type useCreateCategoryFormProps = {
  isEdit?: boolean;
  currentCategory?: ICategory;
  onOpenChange: (open: boolean) => void;
};

// ----------------------------------------------------------------------

export const useCreateUpdateCategoryForm = ({ isEdit = false, currentCategory, onOpenChange }: useCreateCategoryFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<ICreateUpdateCategorySchema>({
    resolver: zodResolver(CreateUpdateCategorySchema),
    defaultValues: {
      name: currentCategory?.name || ""
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset({name: currentCategory.name});
    }
    
    if (!isEdit) {
      reset({name: ""});
    }
  }, [isEdit, currentCategory, reset]);

  const onSubmit = async (data: ICreateUpdateCategorySchema) => {
    try {
      if(!isEdit) {
        const resp = await fetch(`/api/categories`, {method: 'POST', body: JSON.stringify(data)});
        const respData = await resp.json();
        router.refresh();

        toast.success(respData.message, { richColors: true });
        reset({name: ""});
        
        onOpenChange(false);
        if (pathname === "/") {
          router.replace('/categories');
        }
      }else {
        const resp = await fetch(`/api/categories/${currentCategory?.id}`, {
          
          method: 'PUT', 
          body: JSON.stringify(data),
          
        });
        const respData = await resp.json();
        router.refresh();

        toast.success(respData.message, { richColors: true });
        reset({name: data.name});
  
        onOpenChange(false);
      }
    } catch (error) {
      if(error instanceof Error) {
        toast.error(`${error.message}`, { richColors: true });
      }

    }
  };

  return {
    methods,
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
  };
};
