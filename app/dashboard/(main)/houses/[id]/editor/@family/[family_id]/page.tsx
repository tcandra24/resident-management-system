import { DataTable } from "@/components/member/data-table";

// DataTable fetches its own member data client-side based on the
// `id` / `family_id` route params (see components/member/data-table.tsx),
// so no server-side data fetching is needed here.
export default function FamilyMembers() {
  return <DataTable />;
}
