export interface ICategory {
  id: number;
  name: string;
}

export interface IGetCategoriesResponse {
  categories: ICategory[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface ICreateEditCategoyProps {
  selectedCategory?: ICategory;
  isEdit?: boolean;
  label?: string | null;
}

export interface ICategoriesPageProps {
  searchParams: Promise<{ page: number }>;
}

export interface IDeleteCategoyProps {
  selectedCategory: ICategory;
}
