import { DataTable } from "@/components/member/data-table";
// import { getMembersByFamilyId } from "@/lib/actions/member.action";

// import data from "../../../../../data.json";

// type MemberProps = { id: string; name: string; birth_date: Date; job: string };

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
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
