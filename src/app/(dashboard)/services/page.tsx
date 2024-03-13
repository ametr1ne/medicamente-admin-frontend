// "use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/routes";
import { servicesService } from "@/services/services.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const ServicesPage = async () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["services"],
  //   queryFn: () => servicesService.getAll(),
  // });

  const data = await servicesService.getAll();

  console.log(data);

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
      {/* {isLoading && <p>Loading...</p>} */}
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
};

export default ServicesPage;
