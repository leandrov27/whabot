"use client";

import { useState } from "react";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { PenIcon, PlusIcon } from "lucide-react";

// core
import CreateUpdateServiceForm from "@/core/forms/create-update-service-form";

// [interfaces]
import { ICreateEditServiceProps } from "../interfaces/types";

// ----------------------------------------------------------------------

export default function CreateEditService({
  selectedService,
  isEdit = false,
  label
}: ICreateEditServiceProps) {
  const [createUpdateServiceFormIsOpen, setCreateUpdateServiceFormIsOpen] = useState<boolean>(false);
  const hasLabel = label != null && label.trim() !== "";

  return (
    <>
      <Button variant={!isEdit ? "default" : "ghost"} size={hasLabel ? "default" : "icon"}  onClick={() => setCreateUpdateServiceFormIsOpen(true)}>
        {!isEdit ?  <PlusIcon /> : <PenIcon /> } 
        {hasLabel && label}
      </Button>

      <CreateUpdateServiceForm 
        currentService={selectedService} 
        isEdit={isEdit} 
        open={createUpdateServiceFormIsOpen}
        onOpenChange={setCreateUpdateServiceFormIsOpen}
      />
    </>
  );
}
