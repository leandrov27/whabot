"use client"

// next
import { useRouter } from "next/navigation";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

// ----------------------------------------------------------------------

type GoToLinkProps = { 
    label: string;
    link: string
}
// ----------------------------------------------------------------------

export default function GoToLink({ label, link }: GoToLinkProps) {
  const router = useRouter();

  const handleGoToLink = () => {
    router.replace(link);
  };

  return (
    <Button variant="default" onClick={handleGoToLink}>
      Ir a {label}
      <ArrowRightIcon />
    </Button>
  );
}