import { Button } from "@/components/ui/button";
import Link from "next/link";

const PermissionDeniedPage = () => {
  return (
    <main className='min-h-screen w-full flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold mb-2'>You dont have access to the contents of this page</h1>
      <p className='mb-4'>You need to sign in for get access</p>

      <Button>
        <Link href={"/login"}>Sign in</Link>
      </Button>
    </main>
  );
};

export default PermissionDeniedPage;
