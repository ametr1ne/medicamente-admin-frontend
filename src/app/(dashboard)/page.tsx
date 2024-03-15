"use client";

import StatsCard from "@/components/home-page/stats-card";
import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { pricesService } from "@/services/prices.service";
import { getAllServices } from "@/services/services.service";
import { useQueries } from "@tanstack/react-query";
import { DollarSign, Syringe, Users } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["services"],
        queryFn: () => getAllServices(),
      },
      {
        queryKey: ["prices"],
        queryFn: () => pricesService.getAll(),
      },
      {
        queryKey: ["experts"],
        queryFn: () => expertsService.getAll(),
      },
    ],
  });

  return (
    <div className='flex h-full flex-col justify-center items-center'>
      <Image
        src={"/Logo-dark.svg"}
        className='w-50 h-auto mb-12'
        alt={"logo"}
        width={154}
        height={51}
      />
      <h1 className='text-4xl font-semibold'>Welcome to MedicaMente Dashboard</h1>
      <div className='grid grid-cols-3 gap-5 mt-16 w-full'>
        <StatsCard
          title='Услуг'
          value={queries[0].data?.length}
          href={paths.SERVICES}
          isLoading={queries[0].isLoading}
          icon={<Syringe className='w-4 h-4' />}
        />
        <StatsCard
          title='Цен'
          value={queries[1].data?.length}
          href={paths.PRICES}
          isLoading={queries[1].isLoading}
          icon={<DollarSign className='w-4 h-4' />}
        />
        <StatsCard
          title='Специалистов'
          value={queries[2].data?.length}
          href={paths.EXPERTS}
          isLoading={queries[2].isLoading}
          icon={<Users className='w-4 h-4' />}
        />
      </div>
    </div>
  );
}
