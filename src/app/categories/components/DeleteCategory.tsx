"use client";

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// [interfaces]
import { IDeleteCategoyProps } from "../interfaces/types";

// ----------------------------------------------------------------------

export default function DeleteCategoy({ selectedCategory }: IDeleteCategoyProps) {
  const router = useRouter();

  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${selectedCategory.id}`, { method: 'DELETE'});
      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.message, { richColors: true });
      } else {
        router.refresh();
        toast.success(resData.message, { richColors: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { richColors: true });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de esto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará la categoría
            seleccionada y todos los servicios que estén relacionados a ella.
          </AlertDialogDescription>

          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-row items-center">
              <p className="text-sm font-medium leading-none mx-2">ID:</p>
              <Badge variant="default">{selectedCategory.id}</Badge>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-sm font-medium leading-none mx-2">Categoría:</p>
              <Badge variant="default">{selectedCategory.name}</Badge>
            </div>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="flex flex-row items-center justify-center">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCategory}>
            Si, Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
