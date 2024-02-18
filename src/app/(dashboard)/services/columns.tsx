"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/lib/routes";
import { servicesService } from "@/services/services.service";
import { IService } from "@/types/service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "id",
    header: "ID",
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

      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: () => servicesService.delete(service.id),
        onSuccess(data) {
          toast.success("Service successfully deleted");
          queryClient.setQueryData(["services"], data);
        },
        onError(e) {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data.message);
          }
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link href={paths.SERVICES + "/edit/" + service.id}>
              <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
            </Link>

            <DropdownMenuItem className='cursor-pointer' onClick={() => mutate()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
