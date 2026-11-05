"use server";
const postRecipe = async (formData) => {
  const recipeName = formData.get("recipename");
  console.log("Recipename:", recipeName);

  const PostRecipe = async () => {
    const response = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: recipeName }),
    });
    const data = await response.json();
  };
};
export default postRecipe;
