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
import Image from "next/image";
import ExpertActionsCell from "./actions-cell";

export const columns: ColumnDef<IExpert>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const expert = row.original;

      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/experts/${expert.photo}`}
          alt='photo'
          width={100}
          height={100}
          className='w-10 h-10 object-cover'
        />
      );
    },
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
      const expert = row.original;

      return <ExpertActionsCell expert={expert} />;
    },
  },
];
