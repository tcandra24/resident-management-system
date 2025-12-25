export default function General() {
  return (
    <div className="my-16 w-full">
      <div className="flex flex-col space-y-8">
        <h3 className="text-lg text-foreground">Resident Details</h3>
        <div className="w-full border rounded-lg flex flex-col">
          <div className="flex justify-between items-center py-3 border-b">
            <label htmlFor="resident_name" className="grow font-bold p-3">
              Resident Name
            </label>
            <input type="text" className="grow p-2 m-3 border rounded-lg" id="resident_name" />
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <label htmlFor="resident_name" className="grow font-bold p-3">
              Description
            </label>
            <textarea className="grow p-2 m-3 border rounded-lg" id="resident_name"></textarea>
          </div>
          <div className="flex w-full justify-end">
            <div className="m-3">
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
