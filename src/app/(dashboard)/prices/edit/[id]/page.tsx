"use client";

import PageTitle from "@/components/page-title";
import UpdatePriceForm from "@/components/price-page/update-price-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["prices", params.id],
    queryFn: () => pricesService.getOneById(Number(params.id)),
  });

  return (
    <div>
      <div className='flex gap-2 mb-10 items-center'>
        <Link href={paths.PRICES}>
          <Button variant={"outline"} className='h-full'>
            <ChevronLeft className='h-6 w-6' />
          </Button>
        </Link>
        <div>
          <p className='text-zinc-400 text-sm'>Назад ко всем ценам</p>
          <PageTitle>Обновить цену</PageTitle>
        </div>
      </div>
      <Separator className='mb-10' />

      {data ? <UpdatePriceForm prefetchedData={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default UpdatePage;
