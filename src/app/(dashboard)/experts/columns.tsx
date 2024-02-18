"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { IExpert } from "@/types/expert.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<IExpert>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "experienceInYears",
    header: "Experience",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: () => expertsService.delete(service.id),
        onSuccess(data) {
          toast.success("Expert successfully deleted");
          queryClient.setQueryData(["experts"], data);
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

            <Link href={paths.EXPERTS + "/edit/" + service.id}>
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
