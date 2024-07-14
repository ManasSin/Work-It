import { SignInActon } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import Tasks from "@/components/workIt/tasks";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Work-It</h1>
      <form action={SignInActon}>
        <Button variant={"default"}>Sign In</Button>
      </form>
    </main>
  );
}
