"use server";
import * as z from "zod";
import { Recipe } from "../schemas/recipeSchema";

const postRecipe = async (previousState, formData) => {
  const validation = Recipe.safeParse({
    recipename: formData.get("recipename"),
    number: Number(formData.get("number")),
    time: formData.get("time"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Kontrollér felterne ovenfor og prøv igen",
      fieldErrors: z.flattenError(validation.error).fieldErrors,
    };
  }

  try {
    const response = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: validation.data.recipename, time: validation.data.time, ingredients: validation.data.ingredients, instructions: validation.data.instructions }),
    });
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    console.log(`Response status ${response.status}`);
    return {
      success: true,
      message: "Opskriften blev oprettet",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "",
        fieldErrors: z.flattenError(error).fieldErrors,
      };
    }
    return {
      success: false,
      message: "Der opstod en fejl ved oprettelsen af opskriften",
      fieldErrors: {},
    };
  }
};
export default postRecipe;
