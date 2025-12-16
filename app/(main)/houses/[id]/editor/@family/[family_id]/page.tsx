import { DataTable, type Member } from "@/components/member/data-table";
import { getMembersByFamilyId } from "@/lib/actions/member.action";

export default async function House({ params }: { params: { id: string; family_id: string } }) {
  const { id, family_id } = await params;

  const { data } = await getMembersByFamilyId(family_id);

  return (
    <>
      <p>
        Family Page {id} - {family_id}
      </p>
      <DataTable data={data} familyId={family_id} />
    </>
  );
}
