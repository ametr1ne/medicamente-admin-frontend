"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MultiSelect, OptionType } from "@/components/ui/multi-select";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { formSchema } from "./update-expert-form";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  services: OptionType[];
  isPending: boolean;
  tagsFieldArray: UseFieldArrayReturn<z.infer<typeof formSchema>, "tags">;
  specsFieldArray: UseFieldArrayReturn<z.infer<typeof formSchema>, "specializations">;
  photoPreview: File | null;
  setPhotoPreview: Dispatch<SetStateAction<File | null>>;
  prefetchedPhoto?: string;
  submitText?: string;
};

const ExpertForm = ({
  form,
  onSubmit,
  services,
  isPending,
  tagsFieldArray,
  specsFieldArray,
  photoPreview,
  setPhotoPreview,
  prefetchedPhoto,
  submitText = "Создать",
}: Props) => {
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

        <FormItem className='max-w-full w-full mx-auto overflow-hidden items-center'>
          <FormLabel>Фото</FormLabel>
          <div
            id='image-preview'
            className='relative p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer'>
            <Input
              id='photoUpload'
              type='file'
              className='hidden'
              accept='image/*'
              {...form.register("photo", {
                onChange: event => {
                  setPhotoPreview(event.target.files[0]);
                },
              })}
            />
            <label htmlFor='photoUpload' className='cursor-pointer'>
              {photoPreview ? (
                <Image
                  className='w-24 h-24 object-contain mx-auto mb-2 z-10'
                  width='70'
                  height='70'
                  src={URL.createObjectURL(photoPreview)}
                  alt='photo'
                />
              ) : prefetchedPhoto ? (
                <Image
                  className='w-24 h-24 object-contain mx-auto mb-2 z-10'
                  width='70'
                  height='70'
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/experts/${prefetchedPhoto}`}
                  alt='photo'
                />
              ) : (
                <>
                  <Upload className='mx-auto mb-2' />
                  <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-700'>
                    Upload picture
                  </h5>
                </>
              )}

              {photoPreview && (
                <span id='filename' className='text-gray-500 bg-gray-200 z-50'>
                  {photoPreview.name}
                </span>
              )}
            </label>
          </div>
        </FormItem>

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

        <FormField
          control={form.control}
          name='services'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Услуги</FormLabel>
              <MultiSelect
                selected={field.value}
                options={services}
                {...field}
                className='sm:w-[510px]'
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className='my-4' />

        <FormLabel>Профиль</FormLabel>

        <div>
          <div className='flex flex-col gap-2'>
            {tagsFieldArray.fields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`tags.${index}.number`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex gap-2'>
                        <Input placeholder='Название тега...' {...field} />
                        <Button
                          type='button'
                          variant={"outline"}
                          onClick={() => tagsFieldArray.remove(index)}>
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
            onClick={() => tagsFieldArray.append({ number: "" })}
            className='mt-2'
            variant={"outline"}>
            Добавить
          </Button>
        </div>

        <Separator className='my-4' />

        <FormLabel>Специализации</FormLabel>

        <div>
          <div className='flex flex-col gap-2'>
            {specsFieldArray.fields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`specializations.${index}.number`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex gap-2'>
                        <Input placeholder='Название специализации...' {...field} />
                        <Button
                          type='button'
                          variant={"outline"}
                          onClick={() => specsFieldArray.remove(index)}>
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
            onClick={() => specsFieldArray.append({ number: "" })}
            className='mt-2'
            variant={"outline"}>
            Добавить
          </Button>
        </div>

        <Separator className='my-4' />

        <Button disabled={isPending} className='mt-3' type='submit'>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default ExpertForm;
