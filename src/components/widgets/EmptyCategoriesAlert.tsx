// shadcn-ui
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// components[categories]
import CreateEditCategory from "@/app/categories/components/CreateEditCategory";

// ----------------------------------------------------------------------

export default function EmptyCategoriesAlert() {
  return (
    <Alert>
      <AlertTitle>🍃 Sin Categorías</AlertTitle>
      <AlertDescription className="flex flex-col items-center">
        <p className="mb-2">Para continuar, primero debes agregar una categoría.</p>

        <CreateEditCategory label="Registrar una Categoria" />
      </AlertDescription>
    </Alert>
  );
}
