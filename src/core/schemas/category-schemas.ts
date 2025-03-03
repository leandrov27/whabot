// libs
import z from "zod";

// ----------------------------------------------------------------------

export type ICreateUpdateCategorySchema = z.infer<typeof CreateUpdateCategorySchema>;
export const CreateUpdateCategorySchema = z.object({
  name: z
    .string({ required_error: "La categoría es obligatoria." })
    .min(4, { message: "La categoría debe tener al menos 4 caracteres." })
    .max(30, { message: "La categoría no debe exceder los 30 caracteres." })
    .trim(),
});
