"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const PricesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["prices"],
    queryFn: () => pricesService.getAll(),
  });

  return (
    <div>
      <PageHeader>
        <PageTitle>Цены</PageTitle>

        <Link href={paths.PRICES + "/create"}>
          <Button className='gap-2'>
            <Plus />
            Создать
          </Button>
        </Link>
      </PageHeader>
      {isLoading && <p>Loading...</p>}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default PricesPage;
