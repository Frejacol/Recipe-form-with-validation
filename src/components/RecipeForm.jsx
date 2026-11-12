"use client";
import postRecipe from "../actions/action";
import { useActionState, useEffect, useRef, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Recipe } from "../schemas/recipeSchema";

const initialState = {
  recipename: "",
  number: "",
  time: "",
  ingredients: "",
  instructions: "",
};

const RecipeForm = () => {
  const [state, postRecipeAction, isPending] = useActionState(postRecipe, {
    success: null,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Recipe),
    mode: "onBlur",
    defaultValues: initialState,
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) {
      reset();
    }
  }, [state]);

  function handleClientSubmit(event) {
    event.preventDefault();
    handleSubmit(() => {
      startTransition(() => {
        postRecipeAction(new FormData(formRef.current));
      });
    })(event);
  }

  return (
    <form ref={formRef} action={postRecipeAction} onSubmit={handleClientSubmit} className="flex flex-col gap-2 w-100">
      <input type="text" {...register("recipename")} placeholder="Opskriftens titel" className="border rounded-xl p-3 bg-white" />
      {(errors.recipename || state.fieldErrors?.recipename) && <p className="text-red-500">{errors.recipename?.message ?? state.fieldErrors.recipename[0]}</p>}
      <input type="number" {...register("number", { valueAsNumber: true })} placeholder="Antal portioner" className="border rounded-xl p-3 bg-white" />
      {(errors.number || state.fieldErrors?.number) && <p className="text-red-500">{errors.number?.message ?? state.fieldErrors.number[0]}</p>}
      <input type="text" {...register("time")} placeholder="Tilberedningstid" className="border rounded-xl p-3 bg-white" />
      {(errors.time || state.fieldErrors?.time) && <p className="text-red-500">{errors.time?.message ?? state.fieldErrors.time[0]}</p>}
      <textarea {...register("ingredients")} placeholder="Ingredienser" className="border rounded-xl p-3 bg-white" />
      {(errors.ingredients || state.fieldErrors?.ingredients) && <p className="text-red-500">{errors.ingredients?.message ?? state.fieldErrors.ingredients[0]}</p>}
      <textarea {...register("instructions")} placeholder="Fremgangsmetode" className="border rounded-xl p-3 bg-white" />
      {(errors.instructions || state.fieldErrors?.instructions) && <p className="text-red-500">{errors.instructions?.message ?? state.fieldErrors.instructions[0]}</p>}
      <button type="submit" className="bg-[#144873] text-white rounded-xl p-2 hover:bg-[#082945] transition-colors duration-300">
        {isPending ? "Opretter opskrift..." : "Opret opskrift"}
      </button>
      <p className={state.success ? "text-[#144873]" : "text-red-500"}>{state.message}</p>
    </form>
  );
};

export default RecipeForm;
