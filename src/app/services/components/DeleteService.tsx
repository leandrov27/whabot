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
import { IDeleteServiceProps } from "../interfaces/types";

// ----------------------------------------------------------------------

export default function DeleteService({ selectedService }: IDeleteServiceProps) {
  const router = useRouter();

  const handleDeleteService = async () => {
    try {
      const res = await fetch(`/api/services/${selectedService.id}`, { method: 'DELETE'});
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
            Esta acción no se puede deshacer. Esto eliminará el servicio
            seleccionado.
          </AlertDialogDescription>

          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-row items-center">
              <p className="text-sm font-medium leading-none mx-2">ID:</p>
              <Badge variant="default">{selectedService.id}</Badge>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-sm font-medium leading-none mx-2">Servicio:</p>
              <Badge variant="default">{selectedService.name}</Badge>
            </div>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="flex flex-row items-center justify-center">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-transparent text-red-500 border-1 hover:bg-secondary"
            onClick={handleDeleteService}
          >
            Si, Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
