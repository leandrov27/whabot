// next
import { notFound } from "next/navigation";

// shadcn-ui
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// config
//import { BASE_URL } from "@/config/env";

// widgets
import WhabotInfoCard from "@/components/widgets/WhabotInfoCard";
import WhabotCardFooter from "@/components/widgets/WhabotCardFooter";
import NoResultsFoundAlert from "@/components/widgets/NoResultsFoundAlert";
import Paginator from "@/components/widgets/Paginator";
import GoToHome from "@/components/widgets/GoToHome";

// [components]
import CreateEditCategory from "./components/CreateEditCategory";
import DeleteCategoy from "./components/DeleteCategory";

// [interfaces]
import { ICategoriesPageProps, IGetCategoriesResponse } from "./interfaces/types";

// ----------------------------------------------------------------------

async function getCategories(page: number = 1): Promise<IGetCategoriesResponse> {
  const res = await fetch(`https://whabot-gilt.vercel.app/api/categories?page=${page}&limit=3`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

// ----------------------------------------------------------------------

export default async function CategoriesPage({ searchParams }: ICategoriesPageProps) {
  const { page } = await searchParams;
  if (page && isNaN(page)) {
    return notFound();
  }

  const { categories, totalPages, currentPage, total } = await getCategories(page);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <WhabotInfoCard />

      <div className="w-full max-w-sm px-4 mx-auto">
        <Card className="mt-3 w-full">
          <CardContent>
            <div className="flex flex-row items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium leading-none">
                  🚀 Lista de Categorías
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>{total}</strong> {total === 1 ? 'Categoría encontrada' : 'Categorías encontradas'}.
                </p>
              </div>

              <CreateEditCategory />
            </div>

            {categories.length > 0 ? (
              <>
                <Separator />
                <div className="h-[173px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Operaciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.id}
                          </TableCell>
                          <TableCell>{category.name}</TableCell>
                          <TableCell className="text-right gap-2 py-1">
                            <CreateEditCategory selectedCategory={category} isEdit />
                            <DeleteCategoy selectedCategory={category} />
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

            <div className="flex justify-center mt-3 -mb-3">
              <GoToHome />
            </div>
          </CardContent>

          <Separator />

          <WhabotCardFooter />
        </Card>
      </div>
    </div>
  );
}