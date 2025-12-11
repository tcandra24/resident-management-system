import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddNewForm } from "@/components/house/add-new-form";

export default async function NewHouse({ params }: { params: { id: string } }) {
  const { id: idResident } = await params;

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create a new House</CardTitle>
          <CardDescription>Your house will add & family in that house</CardDescription>
        </CardHeader>
        <CardContent>
          <AddNewForm idResident={idResident} />
        </CardContent>
      </Card>
    </>
  );
}
