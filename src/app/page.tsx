// @shadcn-ui
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

// widgets
import WhabotCardFooter from "@/components/widgets/WhabotCardFooter";
import GoToLink from "@/components/widgets/GoToLink";

// categories[components]
import CreateEditCategory from "./categories/components/CreateEditCategory";

// services[components]
import CreateEditService from "./services/components/CreateEditService";
import { db } from "@/lib/prisma";

// ----------------------------------------------------------------------

export default async function HomePage() {
  const categories = await db.category.findMany()
  
  return (
    <div className="w-full max-w-sm px-4 mx-auto">
      <Card className="mt-3 w-full">
        <CardContent className="px-3">
          <div>
            <p className="text-sm font-medium leading-none mb-4">⚡Acciones Rápidas</p>
            <div className="flex flex-col gap-2">
              <CreateEditCategory label="Registrar Categorias"/>
              <CreateEditService categoriesList={categories} label="Registrar Servicios" />
            </div>
          </div>

          <Separator className="my-5" />

          <div>
            <p className="text-sm font-medium leading-none">🔍 Consultas</p>
            <p className="text-sm text-muted-foreground mb-4">
              Tus categorias & servicios disponibles.
            </p>
            <div className="flex flex-row justify-center gap-2">
              <GoToLink to="/categories" label="🏷 Ver mis Categorías" variant="outline" />
              <GoToLink to="/services" label="📦 Ver mis Servicios" variant="outline" />
            </div>
          </div>
        </CardContent>

        <Separator />

        <WhabotCardFooter />
      </Card>
    </div>
  );
}