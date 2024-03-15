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
import { servicesService } from "@/services/services.service";
import { IService } from "@/types/service.type";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const ServiceActionsCell = ({ service }: { service: IService }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => servicesService.delete(service.id),
    onSuccess() {
      toast.success("Service successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["services"] });
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
};

export default ServiceActionsCell;
