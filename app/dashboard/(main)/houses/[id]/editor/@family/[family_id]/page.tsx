import { DataTable } from "@/components/member/data-table";
import { getMembersByFamilyId } from "@/lib/actions/member.action";

export default async function House({ params }: { params: { id: string; family_id: string } }) {
  const { id, family_id } = await params;

  const { data: members } = await getMembersByFamilyId(family_id);

  return (
    <>
      <DataTable data={members} familyId={family_id} />
    </>
  );
}
