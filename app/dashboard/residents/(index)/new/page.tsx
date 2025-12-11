import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddNewForm } from "@/components/resident/add-new-form";

export default function Create() {
  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create a new Resident</CardTitle>
          <CardDescription>Your residents will add & you can add houses with family in that resident</CardDescription>
        </CardHeader>
        <CardContent>
          <AddNewForm />
        </CardContent>
      </Card>
    </>
  );
}
