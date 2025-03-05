"use client";

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ----------------------------------------------------------------------

export default function RefetchServices() {
  const router = useRouter();

  const handleRefetchServices = async () => {
    router.refresh();
    toast.success('⚡ Datos Refrescados ⚡', { richColors: true });
  };

  return (
    <Button variant="secondary" size="icon" onClick={handleRefetchServices}>
      ⚡
    </Button>
  );
}
