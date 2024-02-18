import { servicesService } from "@/services/services.service";
import { IService } from "@/types/service.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  shortDescription: z.string().max(150),
  longDescription: z.string(),
  slug: z.string().min(2),
  //   icon: z.string(),
});

const UpdateServiceForm = ({ prefetchedData }: { prefetchedData: IService }) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prefetchedData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<IService, "id" | "published">) =>
      servicesService.update(values, prefetchedData.id),
    onSuccess(data) {
      toast.success("Service was updated successfully");
      queryClient.setQueryData(["services", data.id], data);
      push(paths.SERVICES);
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
              <FormLabel>Название услуги</FormLabel>
              <FormControl>
                <Input placeholder='Название услуги' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder='slug' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='shortDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткое описание</FormLabel>
              <FormControl>
                <Textarea placeholder='Краткое описание...' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='longDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder='Описание...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className='mt-3' type='submit'>
          Обновить
        </Button>
      </form>
    </Form>
  );
};

export default UpdateServiceForm;
