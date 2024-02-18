import PageTitle from "@/components/page-title";
import CreateServiceForm from "@/components/service-page/create-service-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreatePage = () => {
  return (
    <div>
      <div className='flex gap-2 mb-10 items-center'>
        <Link href={paths.SERVICES}>
          <Button variant={"outline"} className='h-full'>
            <ChevronLeft className='h-6 w-6' />
          </Button>
        </Link>
        <div>
          <p className='text-zinc-400 text-sm'>Назад ко всем услугам</p>
          <PageTitle>Создание услуги</PageTitle>
        </div>
      </div>
      <Separator className='mb-10' />

      <CreateServiceForm />
    </div>
  );
};

export default CreatePage;
