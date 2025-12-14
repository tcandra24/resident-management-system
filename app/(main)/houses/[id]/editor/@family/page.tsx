export default async function House({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <p>Default Page {id}</p>
    </>
  );
}
