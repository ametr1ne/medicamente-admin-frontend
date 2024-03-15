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
import { pricesService } from "@/services/prices.service";
import { IPrice } from "@/types/price.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import PriceActionsCell from "./actions-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IPrice>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "oldPrice",
    header: "Old Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const priceItem = row.original;

      return (
        <PriceActionsCell price={priceItem} />
      );
    },
  },
];
