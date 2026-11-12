import * as z from "zod";

export const Recipe = z.object({
  recipename: z
    .string()
    .trim()
    .min(1, { message: "Opskriftens titel skal udfyldes" })
    .regex(/^[\p{L} ]+$/u, { message: "Opskriftens titel må kun indeholde bogstaver og mellemrum" }),

  number: z.number({ error: "Antal portioner skal udfyldes" }).min(1, { message: "Antal portioner skal være mindst 1" }),

  time: z.string().trim().min(1, { message: "Tilberedningstid skal udfyldes" }),

  ingredients: z.string().trim().min(1, { message: "Ingredienser skal udfyldes" }),

  instructions: z.string().trim().min(1, { message: "Fremgangsmetode skal udfyldes" }),
});
