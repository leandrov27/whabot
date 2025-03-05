// categories [interfaces]
import { ICategory} from "@/app/categories/interfaces/types";

// ----------------------------------------------------------------------

export interface IService {
    id: number;
    name: string;
    price: number;
    category: ICategory
  }
  
  export interface IGetServicesResponse {
    services: IService[];
    total: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface ICreateEditServiceProps {
    selectedService?: IService;
    isEdit?: boolean;
    label?: string | null;
  }
  
  export interface IServicesPageProps {
    searchParams: Promise<{ page: number }>;
  }
  
  export interface IDeleteServiceProps {
    selectedService: IService;
  }
  