import { database } from "@/lib/Database";
import { Button } from "@/lib/components/Button";
import { TextInput } from "@/lib/components/TextInput";
import { redirect } from "next/navigation";
import Construction from "@/lib/components/Construction";

export default async function Home({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const constructions = await database.findConstructions(searchParams.key);

  const search = async (formData: FormData) => {
    "use server";

    const key = formData.get("key") as string;

    if (key) {
      redirect(`?key=${encodeURIComponent(key)}`);
    }
    redirect(`/`);
  };

  return (
    <>
      <div className="flex justify-center py-4">
        <form action={search} className="flex gap-2">
          <TextInput
            name="key"
            placeholder="Search a Construction"
            defaultValue={searchParams.key}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="flex flex-col gap-2 max-w-lg m-auto">
        {constructions.length === 0 && <p>No constructions found</p>}
        {constructions.map((feature) => (
          <Construction feature={feature} key={feature.properties?.["@id"]} />
        ))}
      </div>
    </>
  );
}
