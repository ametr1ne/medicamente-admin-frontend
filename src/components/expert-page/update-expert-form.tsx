"use client";

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
import { expertsService } from "@/services/experts.service";
import { IExpert } from "@/types/expert.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  middleName: z.string().min(3).max(50).optional(),
  experienceInYears: z.coerce.number().optional(),
  rank: z.coerce.number().optional(),
  slug: z.string().min(2),
  tags: z.array(z.object({ number: z.string() })).optional(),
  specializations: z.array(z.object({ number: z.string() })).optional(),
});

const UpdateExpertForm = ({ prefetchedData }: { prefetchedData: IExpert }) => {
  const tagsObjectsArray: {}[] = [];
  prefetchedData.tags?.map(value => tagsObjectsArray.push({ number: value }));

  const specsObjectsArray: {}[] = [];
  prefetchedData.specializations?.map(value => specsObjectsArray.push({ number: value }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: prefetchedData.firstName,
      lastName: prefetchedData.lastName,
      middleName: prefetchedData.middleName,
      slug: prefetchedData.slug,
      experienceInYears: prefetchedData.experienceInYears,
      rank: prefetchedData.rank,
      tags: tagsObjectsArray,
      specializations: specsObjectsArray,
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<IExpert, "id">) => expertsService.update(values, prefetchedData.id),
    onSuccess(data) {
      toast.success("Expert was updated successfully");
      queryClient.setQueryData(["experts", prefetchedData.id], data);
      push(paths.EXPERTS);
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tagsArray: string[] = [];
    const specsArray: string[] = [];

    values.tags?.map(item => tagsArray.push(item.number));
    values.specializations?.map(item => specsArray.push(item.number));

    mutate({ ...values, tags: tagsArray, specializations: specsArray });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });
  const {
    fields: specsFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control: form.control,
    name: "specializations",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-3 sm:w-full sm:max-w-xl'>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder='Имя' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder='Фамилия' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='middleName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder='Отчество' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className='my-4' />

        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
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
            name='experienceInYears'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Опыт, в годах</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='Опыт, в годах' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rank'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Rank</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className='my-4' />

        <FormLabel>Теги</FormLabel>

        <div>
          <div className='flex flex-col gap-2'>
            {fields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`tags.${index}.number`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex gap-2'>
                        <Input placeholder='Название тега...' {...field} />
                        <Button type='button' variant={"outline"} onClick={() => remove(index)}>
                          <Trash2 className='h-5 w-5 text-red-300' />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type='button'
            onClick={() => append({ number: "" })}
            className='mt-2'
            variant={"outline"}>
            Добавить
          </Button>
        </div>

        <Separator className='my-4' />

        <FormLabel>Специализации</FormLabel>

        <div>
          <div className='flex flex-col gap-2'>
            {specsFields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`specializations.${index}.number`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex gap-2'>
                        <Input placeholder='Название специализации...' {...field} />
                        <Button type='button' variant={"outline"} onClick={() => removeSpec(index)}>
                          <Trash2 className='h-5 w-5 text-red-300' />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type='button'
            onClick={() => appendSpec({ number: "" })}
            className='mt-2'
            variant={"outline"}>
            Добавить
          </Button>
        </div>

        <Separator className='my-4' />

        <Button disabled={isPending} className='mt-3' type='submit'>
          Обновить
        </Button>
      </form>
    </Form>
  );
};

export default UpdateExpertForm;
