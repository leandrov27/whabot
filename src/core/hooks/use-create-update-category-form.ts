import { useEffect } from "react";

// next
import { usePathname, useRouter } from "next/navigation";

// shadcn-ui
import { toast } from "sonner";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// lib
import ax from "@/lib/axios";

// core
import { CreateUpdateCategorySchema, ICreateUpdateCategorySchema } from "../schemas";
import { ICategory } from "../interfaces";
import { AxiosError } from "axios";

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
        const resp = await ax.post('/api/categories', data);
        router.refresh();

        toast.success(resp.data.message, { richColors: true });
        reset({name: ""});
        
        onOpenChange(false);
        if (pathname === "/") {
          router.replace('/categories');
        }
      }else {
        const resp = await ax.put(`/api/categories/${currentCategory?.id}`, data);
        router.refresh();

        toast.success(resp.data.message, { richColors: true });
        reset({name: data.name});
  
        onOpenChange(false);
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`, { richColors: true });
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
