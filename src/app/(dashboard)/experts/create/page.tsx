import CreateExpertForm from "@/components/expert-page/create-expert-form";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreatePage = () => {
  return (
    <div>
      <div className='flex gap-2 mb-10 items-center'>
        <Link href={paths.EXPERTS}>
          <Button variant={"outline"} className='h-full'>
            <ChevronLeft className='h-6 w-6' />
          </Button>
        </Link>
        <div>
          <p className='text-zinc-400 text-sm'>Назад ко всем специалистам</p>
          <PageTitle>Добавить специалиста</PageTitle>
        </div>
      </div>
      <Separator className='mb-10' />

      <CreateExpertForm />
    </div>
  );
};

export default CreatePage;
