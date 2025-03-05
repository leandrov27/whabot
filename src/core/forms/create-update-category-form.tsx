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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// core
import { useCreateUpdateCategoryForm } from "../hooks";

// categories[interfaces]
import { ICategory } from "@/app/categories/interfaces/types";

// ----------------------------------------------------------------------

type CreateUpdateCategoryFormProps = {
  isEdit?: boolean;
  currentCategory?: ICategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateUpdateCategoryForm({
  isEdit = false,
  currentCategory,
  open,
  onOpenChange,
}: CreateUpdateCategoryFormProps) {
  const { methods, control, handleSubmit, onSubmit, isSubmitting } =
    useCreateUpdateCategoryForm({ isEdit, currentCategory, onOpenChange });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent >
        <DrawerHeader>
          <DrawerTitle className="-mb-2">
            {!isEdit
              ? "Registrar Nueva Categoría"
              : `Modificar Categoría #${currentCategory?.id}`}
          </DrawerTitle>
          <DrawerDescription>
            {!isEdit
              ? "Crea una nueva categoría."
              : "Realiza cambios en la categoría seleccionada."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <Form {...methods}>
            <Card className="px-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese una categoría" {...field} />
                      </FormControl>
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
