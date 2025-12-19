import { DataTable } from "@/components/member/data-table";
// import { getMembersByFamilyId } from "@/lib/actions/member.action";
//{ params }: { params: { id: string; family_id: string } }
export default async function House() {
  // const { family_id } = await params;

  // const { data: members } = await getMembersByFamilyId(family_id);

  return (
    <>
      <DataTable />
    </>
  );
}
