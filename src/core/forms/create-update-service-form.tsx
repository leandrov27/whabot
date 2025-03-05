"use client";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// widgets
import EmptyCategoriesAlert from "@/components/widgets/EmptyCategoriesAlert";

// core
import { useCreateUpdateServiceForm } from "../hooks";

// catergories~services[interfaces]
import { IService } from "@/app/services/interfaces/types";
import { ICategory } from "@/app/categories/interfaces/types";

// ----------------------------------------------------------------------

type CreateUpdateServiceFormProps = {
  isEdit?: boolean;
  currentService?: IService;
  categoriesList: ICategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateUpdateServiceForm({
  isEdit = false,
  currentService,
  categoriesList,
  open,
  onOpenChange,
}: CreateUpdateServiceFormProps) {
  const { methods, control, handleSubmit, onSubmit, isSubmitting } =
    useCreateUpdateServiceForm({ isEdit, currentService, onOpenChange });
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerHeader>
          <DrawerTitle>
            {!isEdit
              ? "Registrar Nuevo Servicio"
              : `Modificar Servicio #${currentService?.id}`}
          </DrawerTitle>
          <DrawerDescription>
            {!isEdit
              ? "Crea un nuevo servicio."
              : "Realiza cambios en el servicio seleccionado."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <Form {...methods}>
            <Card className="px-6">
              {categoriesList?.length > 0 ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese el nombre del servicio" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ingrese el precio de este servicio" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una categoría para este producto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoriesList.map((option) => (
                              <SelectItem key={option.id} value={option.id.toString()}>
                                {option.id} - {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isSubmitting}
                    className="w-full"
                    type="submit"
                  >
                    {isSubmitting && <Loader2Icon className="animate-spin" />}
                    {!isEdit ? "Guardar" : "Guardar Cambios"}
                  </Button>
                </form>
              ) : (
                <EmptyCategoriesAlert />                    
              )}
            </Card>
          </Form>
        </div>

        <DrawerFooter className="mb-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar Operación</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
