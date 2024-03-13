"use client";

import PageTitle from "@/components/page-title";
import UpdateServiceForm from "@/components/service-page/update-service-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { servicesService } from "@/services/services.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["services", params.id],
    queryFn: () => servicesService.getOneById(Number(params.id)),
  });

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
          <PageTitle>Обновить услугу</PageTitle>
        </div>
      </div>
      <Separator className='mb-10' />

      {data ? (
        <UpdateServiceForm
          prefetchedData={{
            ...data,
            prices: data.prices.map(item => ({ label: item.name, value: item.id.toString() })),
            specialists: data.specialists.map(item => ({
              label: `${item.firstName} ${item.lastName}`,
              value: item.id.toString(),
            })),
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePage;
