"use client";

import { paths } from "@/lib/routes";
import { servicesService } from "@/services/services.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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
import { IService } from "@/types/service.type";
import { Upload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  shortDescription: z.string().max(150),
  longDescription: z.string(),
  slug: z.string().min(2),
  icon: z.any(),
});

const CreateServiceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<IService, "id" | "published">) => servicesService.create(values),
    onSuccess(data) {
      toast.success("New service was created successfully");
      queryClient.setQueryData(["services", data?.id], data);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 sm:w-full sm:max-w-3xl'>
        <div className='flex gap-3'>
          <div className='w-full'>
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
          </div>

          <FormField
            control={form.control}
            name='icon'
            render={({ field }) => (
              <FormItem className='max-w-sm w-full mx-auto overflow-hidden items-center'>
                <FormLabel>Иконка</FormLabel>
                <div
                  id='image-preview'
                  className='max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer'>
                  <Input id='upload' type='file' className='hidden' accept='image/*' {...field} />
                  <label htmlFor='upload' className='cursor-pointer'>
                    <Upload className='mx-auto mb-2' />
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>
                      Upload picture
                    </h5>

                    <span id='filename' className='text-gray-500 bg-gray-200 z-50'></span>
                  </label>
                </div>
              </FormItem>
            )}
          />
        </div>

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
          Создать
        </Button>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
