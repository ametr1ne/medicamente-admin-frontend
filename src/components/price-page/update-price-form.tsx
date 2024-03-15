import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { IPrice } from "@/types/price.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PriceForm, { formSchema } from "./price-form";

const UpdatePriceForm = ({ prefetchedData }: { prefetchedData: IPrice }) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prefetchedData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<IPrice, "id">) => pricesService.update(values, prefetchedData.id),
    onSuccess(data) {
      toast.success("Price was updated successfully");
      queryClient.setQueryData(["prices", data.id], data);
      push(paths.PRICES);
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return <PriceForm form={form} onSubmit={onSubmit} isPending={isPending} submitText='Обновить' />;
};

export default UpdatePriceForm;
