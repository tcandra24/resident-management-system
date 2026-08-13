import { AccountSettings } from "./account-settings";

export default async function Me() {
  return (
    <div className="my-16 w-full px-4 md:w-1/2 md:mx-auto md:px-0">
      <div className="flex flex-col space-y-8 mx-auto">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-foreground font-bold">Preferences</h1>
          <p className="m-0">Manage your account profile</p>
        </div>

        <AccountSettings />
      </div>
    </div>
  );
}
