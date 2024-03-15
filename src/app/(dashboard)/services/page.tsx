"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { paths } from "@/lib/routes";
import { getAllServices } from "@/services/services.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const ServicesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  return (
    <>
      <PageHeader>
        <PageTitle>Услуги</PageTitle>

        <Link href={paths.SERVICES + "/create"}>
          <Button className='gap-2'>
            <Plus />
            Создать
          </Button>
        </Link>
      </PageHeader>
      {isLoading && <p>Loading...</p>}
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
};

export default ServicesPage;
