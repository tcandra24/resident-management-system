import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddNewForm } from "@/components/house/add-new-form";

export default async function NewHouse({ params }: { params: { id: string } }) {
  const { id: idResident } = await params;

  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mx-32 my-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Create a new House</CardTitle>
            <CardDescription>Your house will add & family in that house</CardDescription>
          </CardHeader>
          <CardContent>
            <AddNewForm idResident={idResident} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
