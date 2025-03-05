"use client"

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

// ----------------------------------------------------------------------

export default function GoToHome() {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <Button variant="default" onClick={handleGoBack}>
      <ArrowLeftIcon />
      Regresar a Inicio
    </Button>
  );
}
