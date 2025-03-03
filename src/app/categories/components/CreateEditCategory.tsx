"use client";

import { useState } from "react";

// @shadcn-ui
import { Button } from "@/components/ui/button";
import { PenIcon, PlusIcon } from "lucide-react";

// core
import CreateUpdateCategoryForm from "@/core/forms/create-update-category-form";

// [interfaces]
import { ICreateEditCategoyProps } from "../interfaces/types";

// ----------------------------------------------------------------------

export default function CreateEditCategory({
  selectedCategory,
  isEdit = false,
  label
}: ICreateEditCategoyProps) {
  const [createUpdateCategoryFormIsOpen, setCreateUpdateCategoryFormIsOpen] = useState<boolean>(false);
  const hasLabel = label != null && label.trim() !== "";

  return (
    <>
      <Button variant={!isEdit ? "default" : "ghost"} size={hasLabel ? "default" : "icon"}  onClick={() => setCreateUpdateCategoryFormIsOpen(true)}>
        {!isEdit ?  <PlusIcon /> : <PenIcon /> } 
        {hasLabel && label}
      </Button>

      <CreateUpdateCategoryForm 
        currentCategory={selectedCategory} 
        isEdit={isEdit} 
        open={createUpdateCategoryFormIsOpen}
        onOpenChange={setCreateUpdateCategoryFormIsOpen}
      />
    </>
  );
}
