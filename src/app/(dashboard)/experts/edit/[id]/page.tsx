"use client";

import UpdateExpertForm from "@/components/expert-page/update-expert-form";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const EditPage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["experts", params.id],
    queryFn: () => expertsService.getOneById(Number(params.id)),
  });

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
          <PageTitle>Обновить специалиста</PageTitle>
        </div>
      </div>
      <Separator className='mb-10' />

      {data ? (
        <UpdateExpertForm
          prefetchedData={{
            ...data,
            services: data.services.map(item => ({ label: item.name, value: item.id.toString() })),
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPage;
