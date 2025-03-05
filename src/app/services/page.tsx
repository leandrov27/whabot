// next
import { notFound } from "next/navigation";

// shadcn-ui
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// config
import { BASE_API_URL } from "@/config/env";

// widgets
import WhabotCardFooter from "@/components/widgets/WhabotCardFooter";
import NoResultsFoundAlert from "@/components/widgets/NoResultsFoundAlert";
import Paginator from "@/components/widgets/Paginator";
import GoToHome from "@/components/widgets/GoToHome";
import GoToLink from "@/components/widgets/GoToLink";

// [components]
import RefetchServices from "./components/RefetchServices";
import CreateEditService from "./components/CreateEditService";
import DeleteService from "./components/DeleteService";

// [interfaces]
import { IServicesPageProps, IGetServicesResponse, IGetCategoriesResponse } from "./interfaces/types";

// ----------------------------------------------------------------------

async function getServices(page: number = 1): Promise<IGetServicesResponse> {
  const res = await fetch(`${BASE_API_URL}/api/services?page=${page}&limit=3`);
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return await res.json();
}

async function getCategories(): Promise<IGetCategoriesResponse> {
  const res = await fetch(`${BASE_API_URL}/api/categories/list`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories list");
  }
  return await res.json();
}

// ----------------------------------------------------------------------

export default async function CategoriesPage({ searchParams }: IServicesPageProps) {
  const { page } = await searchParams;
  if (page && isNaN(page)) {
    return notFound();
  }

  const { services, totalPages, currentPage, total } = await getServices(page);
  const { categories } = await getCategories();

  return (
    <div className="w-full max-w-sm px-4 mx-auto">
      <Card className="mt-3 w-full">
        <CardContent>
          <div className="flex flex-row items-center justify-between mb-2">
            <div>
              <p className="text-sm font-medium leading-none">
                📦 Lista de Servicios
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>{total}</strong> {total === 1 ? 'Servicio encontrado' : 'Servicios encontrados'}.
              </p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <RefetchServices />
              <CreateEditService categoriesList={categories} />
            </div>
          </div>

          {services.length > 0 ? (
            <>
              <Separator />
              <div className="h-[173px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Operaciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          {service.id}
                        </TableCell>
                      
                        <TableCell>  
                          <Badge variant="outline">
                            🏷 {service.category.name}
                          </Badge>
                        </TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.price}</TableCell>
                        <TableCell className="text-right gap-2 py-1">
                          <CreateEditService categoriesList={categories} selectedService={service} isEdit />
                          <DeleteService selectedService={service} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <p className="text-xs text-center text-muted-foreground mt-2 mb-2">
                Mostrando la página {currentPage} de {totalPages}.
              </p>
            
              <Paginator 
                currentPage={currentPage} 
                totalPages={totalPages} 
              />
            </>
          ) : (
            <NoResultsFoundAlert />
          )}

          <div className="flex justify-center mt-3 -mb-3 gap-3">
            <GoToHome />
            <GoToLink to="/categories" label="Ir a Categorías" variant="outline" rightIcon={<ArrowRight />}/>
          </div>
        </CardContent>

        <Separator />

        <WhabotCardFooter />
      </Card>
    </div>
  );
}