"use client";

import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { IExpert } from "@/types/expert.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { getAllServices } from "@/services/services.service";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { OptionType } from "../ui/multi-select";
import ExpertForm, { formSchema } from "./expert-form";

interface IFormattedExpertData extends Omit<IExpert, "services"> {
  services: OptionType[];
}

const UpdateExpertForm = ({ prefetchedData }: { prefetchedData: IFormattedExpertData }) => {
  const [photoPreview, setPhotoPreview] = useState<File | null>(null);

  const tagsObjectsArray: {}[] = prefetchedData.tags
    ? prefetchedData.tags.map(value => ({ number: value }))
    : [];
  const specsObjectsArray: {}[] = prefetchedData.specializations
    ? prefetchedData.specializations.map(value => ({ number: value }))
    : [];

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
      services: prefetchedData.services,
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormData) => expertsService.update(values, prefetchedData.id),
    onSuccess() {
      toast.success("Expert was updated successfully");
      queryClient.invalidateQueries({ queryKey: ["experts"] });
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

    const servicesArray = values.services.map(item => item.value);

    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    values.middleName && formData.append("middleName", values.middleName);
    formData.append("slug", values.slug);
    values.photo && formData.append("photo", values.photo[0]);
    values.experienceInYears &&
      formData.append("experienceInYears", values.experienceInYears.toString());
    values.rank && formData.append("rank", values.rank.toString());
    formData.append("services", JSON.stringify(servicesArray));
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("specializations", JSON.stringify(specsArray));

    mutate(formData);
  }

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
  });

  const tagsFieldArray = useFieldArray({
    control: form.control,
    name: "tags",
  });
  const specsFieldArray = useFieldArray({
    control: form.control,
    name: "specializations",
  });

  return (
    <ExpertForm
      form={form}
      services={
        services ? services.map(item => ({ label: item.name, value: item.id.toString() })) : []
      }
      onSubmit={onSubmit}
      isPending={isPending}
      tagsFieldArray={tagsFieldArray}
      specsFieldArray={specsFieldArray}
      photoPreview={photoPreview}
      setPhotoPreview={setPhotoPreview}
      prefetchedPhoto={prefetchedData.photo}
      submitText='Обновить'
    />
  );
};

export default UpdateExpertForm;
