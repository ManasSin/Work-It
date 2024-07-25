import { SignInActon } from "@/actions/auth-action";
import { Button } from "../ui/button";

export async function ReuseSignBtn() {
  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    SignInActon();
  }
  return (
    <form onSubmit={(e) => handleSignIn(e)}>
      <Button variant={"default"}>Sign In</Button>
    </form>
  );
}
