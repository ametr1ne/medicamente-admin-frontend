"use client";

import { Badge } from "@/components/ui/badge";
import { IService } from "@/types/service.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ServiceActionsCell from "./actions-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const service = row.original;

      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${service.icon}`}
          alt='icon'
          width={30}
          height={30}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "shortDescription",
    header: "Short Description",
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      const service = row.original;

      return <Badge>{service.published ? "Опубликована" : "Черновик"}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

      return <ServiceActionsCell service={service} />;
    },
  },
];
