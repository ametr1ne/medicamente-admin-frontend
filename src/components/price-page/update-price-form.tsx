import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  name: z.string().min(3).max(150),
  price: z.coerce.number(),
  oldPrice: z.coerce.number().optional(),
});

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 sm:w-full sm:max-w-xl'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Название' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-3 w-full'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Стоимость</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='Стоимость' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='oldPrice'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Старая цена</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='Старая цена' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending} className='mt-3' type='submit'>
          Обновить
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePriceForm;
