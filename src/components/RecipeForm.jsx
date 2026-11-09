"use client";
import postRecipe from "../actions/action";
import { useActionState, useState, useEffect } from "react";

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
  const [formFields, setFormFields] = useState(initialState);

  useEffect(() => {
    if (state.success) {
      setFormFields(initialState);
    }
  }, [state]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormFields((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));
  }

  return (
    <form action={postRecipeAction} className="flex flex-col gap-2 w-100">
      <input type="text" name="recipename" placeholder="Opskriftens titel" className="border rounded-xl p-3 bg-white" value={formFields.recipename} onChange={handleChange} />
      {state.fieldErrors?.recipename && <p className="text-red-500">{state.fieldErrors.recipename[0]}</p>}
      <input type="number" name="number" placeholder="Antal postioner" className="border rounded-xl p-3 bg-white" value={formFields.number} onChange={handleChange} />
      {state.fieldErrors?.number && <p className="text-red-500">{state.fieldErrors.number[0]}</p>}
      <input type="text" name="time" placeholder="Tilberedningstid" className="border rounded-xl p-3 bg-white" value={formFields.time} onChange={handleChange} />
      {state.fieldErrors?.time && <p className="text-red-500">{state.fieldErrors.time[0]}</p>}
      <textarea name="ingredients" placeholder="Ingredienser" className="border rounded-xl p-3 bg-white" value={formFields.ingredients} onChange={handleChange} />
      {state.fieldErrors?.ingredients && <p className="text-red-500">{state.fieldErrors.ingredients[0]}</p>}
      <textarea name="instructions" placeholder="Fremgangsmetode" className="border rounded-xl p-3 bg-white" value={formFields.instructions} onChange={handleChange} />
      {state.fieldErrors?.instructions && <p className="text-red-500">{state.fieldErrors.instructions[0]}</p>}
      <button type="submit" className="bg-[#144873] text-white rounded-xl p-2 hover:bg-[#082945] transition-colors duration-300">
        {isPending ? "Opretter opskrift..." : "Opret opskrift"}
      </button>
      <p className={state.success ? "text-[#144873]" : "text-red-500"}>{state.message}</p>
    </form>
  );
};

export default RecipeForm;
