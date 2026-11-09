import RecipeForm from "@/components/RecipeForm";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-7 w-2/4 bg-[#dff2fe] m-auto rounded-xl py-15">
      <h1 className="text-3xl font-bold text-[#144873]">Opret en ny opskrift</h1>
      <RecipeForm />
    </div>
  );
}
