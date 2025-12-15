import { DataTable, type Member } from "@/components/member/data-table";
// import { getMembersByFamilyId } from "@/lib/actions/member.action";

// import data from "../../../../../data.json";

// type MemberProps = { id: string; name: string; birth_date: Date; job: string };

const data: Member[] = [
  {
    id: "m5gr84i9",
    name: "John Doe",
    birth_date: "1990-01-01",
    job: "Software Engineer",
  },
  {
    id: "3u1reuv4",
    name: "Jane Smith",
    birth_date: "1985-05-15",
    job: "Data Analyst",
  },
  {
    id: "derv1ws0",
    name: "Tito Smith",
    birth_date: "1985-05-15",
    job: "Data Science",
  },
];

export default async function House({ params }: { params: { id: string; family_id: string } }) {
  const { id, family_id } = await params;

  // const { data } = await getMembersByFamilyId(family_id);

  // console.log("Members Data: ", data);

  return (
    <>
      <p>
        Family Page {id} - {family_id}
      </p>
      <DataTable data={data} />
    </>
  );
}
