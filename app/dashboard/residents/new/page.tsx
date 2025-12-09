import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Create() {
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Create a new Resident</CardTitle>
          <CardDescription>Your residents will add & you can add houses with family in that resident</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </>
  );
}
