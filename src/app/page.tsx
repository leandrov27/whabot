"use client";

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

// widgets
import WhabotCardFooter from "@/components/widgets/WhabotCardFooter";

// categories[components]
import CreateEditCategory from "./categories/components/CreateEditCategory";

// services[components]
import CreateEditService from "./services/components/CreateEditService";

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  const handleViewCategories = () => {
    router.push("/categories");
  };

  const handleViewServices = () => {
    router.push("/services");
  };

  return (
    <div className="w-full max-w-sm px-4 mx-auto">
      <Card className="mt-3 w-full">
        <CardContent className="px-3">
          <div>
            <p className="text-sm font-medium leading-none mb-4">⚡Acciones Rápidas</p>
            <div className="flex flex-col gap-2">
              <CreateEditCategory label="Registrar Categorias"/>
              <CreateEditService label="Registrar Servicios"/>
            </div>
          </div>

          <Separator className="my-5" />

          <div>
            <p className="text-sm font-medium leading-none">🔍 Consultas</p>
            <p className="text-sm text-muted-foreground mb-4">
              Tus categorias & servicios disponibles.
            </p>
            <div className="flex flex-row justify-center gap-2">
              <Button className="p-2" variant="outline" onClick={handleViewCategories}>
                🏷 Ver mis Categorías
              </Button>
              <Button className="p-2" variant="outline" onClick={handleViewServices}>
                📦 Ver mis Servicios
              </Button>
            </div>
          </div>
        </CardContent>

        <Separator />

        <WhabotCardFooter />
      </Card>
    </div>
  );
}