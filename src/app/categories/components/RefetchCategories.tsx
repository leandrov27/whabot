"use client";

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ----------------------------------------------------------------------

export default function RefetchCategories() {
  const router = useRouter();

  const handleRefetchCategories = async () => {
    router.refresh();
    toast.success('⚡ Datos Refrescados ⚡', { richColors: true });
  };

  return (
    <Button variant="secondary" size="icon" onClick={handleRefetchCategories}>
      ⚡
    </Button>
  );
}
