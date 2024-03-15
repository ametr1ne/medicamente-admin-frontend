"use client";

import { Upload } from "lucide-react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
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
import { OptionType, MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
  modificatedPrices: OptionType[];
  modificatedSpecs: OptionType[];
  iconPreview: File | null;
  setIconPreview: Dispatch<SetStateAction<File | null>>;
  prefetchedIcon?: string;
  bannerPreview: File | null;
  setBannerPreview: Dispatch<SetStateAction<File | null>>;
  prefetchedBannerImage?: string;
  submitText?: string;
};

export const formSchema = z.object({
  name: z.string().min(3).max(50),
  shortDescription: z.string().max(150),
  longDescription: z.string(),
  slug: z.string().min(2),
  prices: z.array(z.object({ label: z.string(), value: z.string() })),
  specialists: z.array(z.object({ label: z.string(), value: z.string() })),
  icon: z.any().optional(),
  bannerImage: z.any().optional(),
  bannerText: z.string().optional(),
});

const ServiceForm = ({
  form,
  onSubmit,
  isPending,
  modificatedSpecs,
  modificatedPrices,
  iconPreview,
  setIconPreview,
  prefetchedIcon,
  bannerPreview,
  setBannerPreview,
  prefetchedBannerImage,
  submitText = "Создать",
}: Props) => {
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

          <FormItem className='max-w-sm w-full mx-auto overflow-hidden items-center'>
            <FormLabel>Иконка</FormLabel>
            <div
              id='image-preview'
              className='relative max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer'>
              <Input
                id='iconUpload'
                type='file'
                className='hidden'
                accept='image/*'
                {...form.register("icon", {
                  onChange: event => {
                    setIconPreview(event.target.files[0]);
                  },
                })}
              />
              <label htmlFor='iconUpload' className='cursor-pointer'>
                {iconPreview ? (
                  <Image
                    className='w-16 h-16 object-contain mx-auto mb-2 z-10'
                    width='30'
                    height='30'
                    src={URL.createObjectURL(iconPreview)}
                    alt='icon'
                  />
                ) : prefetchedIcon ? (
                  <Image
                    className='w-16 h-16 object-contain mx-auto mb-2 z-10'
                    width='30'
                    height='30'
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${prefetchedIcon}`}
                    alt='icon'
                  />
                ) : (
                  <>
                    <Upload className='mx-auto mb-2' />
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>
                      Upload picture
                    </h5>
                  </>
                )}

                {iconPreview && (
                  <span id='filename' className='text-gray-500 bg-gray-200 z-50'>
                    {iconPreview.name}
                  </span>
                )}
              </label>
            </div>
          </FormItem>
        </div>

        <div className='flex gap-4'>
          <FormItem className='max-w-sm w-full mx-auto overflow-hidden items-center'>
            <FormLabel>Баннер</FormLabel>
            <div
              id='image-preview'
              className='relative max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer'>
              <Input
                id='bannerUpload'
                type='file'
                className='hidden'
                accept='image/*'
                {...form.register("bannerImage", {
                  onChange: event => {
                    setBannerPreview(event.target.files[0]);
                  },
                })}
              />
              <label htmlFor='bannerUpload' className='cursor-pointer'>
                {bannerPreview ? (
                  <Image
                    className='w-52 h-32 object-contain mx-auto mb-2 z-10'
                    width='500'
                    height='500'
                    src={URL.createObjectURL(bannerPreview)}
                    alt='icon'
                  />
                ) : prefetchedBannerImage ? (
                  <Image
                    className='w-52 h-32 object-contain mx-auto mb-2 z-10'
                    width='500'
                    height='500'
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${prefetchedBannerImage}`}
                    alt='icon'
                  />
                ) : (
                  <>
                    <Upload className='mx-auto mb-2' />
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>
                      Upload picture
                    </h5>
                  </>
                )}

                {bannerPreview && (
                  <span id='filename' className='text-gray-500 bg-gray-200 z-50'>
                    {bannerPreview.name}
                  </span>
                )}
              </label>
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name='bannerText'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Текст в баннере</FormLabel>
                <FormControl>
                  <Input placeholder='Введите текст...' {...field} />
                </FormControl>
                <FormMessage />
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

        <FormField
          control={form.control}
          name='prices'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выбрать цены</FormLabel>
              <MultiSelect
                selected={field.value}
                options={modificatedPrices}
                {...field}
                className='sm:w-[510px]'
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='specialists'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выбрать специалистов</FormLabel>
              <MultiSelect
                selected={field.value}
                options={modificatedSpecs}
                {...field}
                className='sm:w-[510px]'
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className='mt-3' type='submit'>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
