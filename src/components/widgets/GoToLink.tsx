"use client";

import { ReactElement } from "react";

// next
import { useRouter } from "next/navigation";

// shadcn-ui
import { Button } from "../ui/button";

// ----------------------------------------------------------------------

type GoToLinkProps = { 
  to: string;
  label: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  leftIcon?: ReactElement
  rightIcon?: ReactElement
};

// ----------------------------------------------------------------------

export default function GoToLink({ to, label, variant = "default", leftIcon, rightIcon }: GoToLinkProps) {
  const router = useRouter();

  const handleGoToLink = () => {
    router.replace(to);
  };

  return (
    <Button className="px-3" variant={variant} onClick={handleGoToLink}>
      {leftIcon}
      {label}
      {rightIcon}
    </Button>
  );
}