"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/routes";
import { servicesService } from "@/services/services.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { expertsService } from "@/services/experts.service";
import { DataTable } from "@/components/ui/data-table";

const ExpertsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["experts"],
    queryFn: () => expertsService.getAll(),
  });

  return (
    <div>
      <PageHeader>
        <PageTitle>Специалисты</PageTitle>

        <Link href={paths.EXPERTS + "/create"}>
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

export default ExpertsPage;
