import { useEffect } from "react";

// next
import { usePathname, useRouter } from "next/navigation";

// shadcn-ui
import { toast } from "sonner";

// form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// core
import { CreateUpdateServiceSchema, ICreateUpdateServiceSchema } from "../schemas";

// services[interfaces]
import { IService } from "@/app/services/interfaces/types";

// ----------------------------------------------------------------------

type useCreateServiceFormProps = {
  isEdit?: boolean;
  currentService?: IService;
  onOpenChange: (open: boolean) => void;
};

// ----------------------------------------------------------------------

export const useCreateUpdateServiceForm = ({ isEdit = false, currentService, onOpenChange }: useCreateServiceFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<ICreateUpdateServiceSchema>({
    resolver: zodResolver(CreateUpdateServiceSchema),
    defaultValues: {
      name: currentService?.name || "",
      price: currentService?.price || 0,
      category_id: currentService?.category.id || 0
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isEdit && currentService) {
      reset({
        name: currentService.name,
        price: currentService.price,
        category_id: currentService.category.id
      });
    }
    
    if (!isEdit) {
      reset({
        name: "",
        price: 0,
        category_id: 0
      });
    }
  }, [isEdit, currentService, reset]);

  const onSubmit = async (data: ICreateUpdateServiceSchema) => {
    try {
      if(!isEdit) {
        const resp = await fetch(`/api/services`, {method: 'POST', body: JSON.stringify(data)});
        const respData = await resp.json();
        router.refresh();

        toast.success(respData.message, { richColors: true });
        reset({
          name: "",
          price: 0,
          category_id: 0
        });
        
        onOpenChange(false);
        if (pathname === "/") {
          router.replace('/services');
        }
      }else {
        const resp = await fetch(`/api/services/${currentService?.id}`, {
          
          method: 'PUT', 
          body: JSON.stringify(data),
          
        });
        const respData = await resp.json();
        router.refresh();

        toast.success(respData.message, { richColors: true });
        reset({
          name: data.name,
          price: data.price,
          category_id: data.category_id
        });
  
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
