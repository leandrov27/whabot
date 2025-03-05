// libs
import z from "zod";

// ----------------------------------------------------------------------

export type ICreateUpdateServiceSchema = z.infer<typeof CreateUpdateServiceSchema>;
export const CreateUpdateServiceSchema = z.object({
  name: z
    .string({ required_error: "El nombre del servicio es obligatorio." })
    .min(4, { message: "El nombre del servicio debe tener al menos 4 caracteres." })
    .max(50, { message: "El nombre del servicio no debe exceder los 50 caracteres." })
    .trim(),
  price: z
    .coerce
    .number({ required_error: "El precio del servicio es obligatorio." })
    .min(1, { message: "El precio del servicio es obligatorio." }),
  category_id: z
    .coerce
    .number({ required_error: "La categoría del servicio servicio es obligatoria."})
    .min(1, { message: "La categoría del servicio servicio es obligatoria." })
});
