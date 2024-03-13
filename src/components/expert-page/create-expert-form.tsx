"use client";

import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { IOverridedExpert } from "@/types/expert.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { servicesService } from "@/services/services.service";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExpertForm from "./expert-form";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  middleName: z.string().min(3).max(50).optional(),
  experienceInYears: z.coerce.number().optional(),
  rank: z.coerce.number().optional(),
  slug: z.string().min(2),
  tags: z.array(z.object({ number: z.string() })).optional(),
  specializations: z.array(z.object({ number: z.string() })).optional(),
  services: z.array(z.object({ label: z.string(), value: z.string() })),
  photo: z.any().optional(),
});

const CreateExpertForm = () => {
  const [photoPreview, setPhotoPreview] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      slug: "",
      services: [],
      tags: [],
      specializations: [],
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormData) => expertsService.create(values),
    onSuccess(data) {
      toast.success("New expert was created successfully");
      queryClient.setQueryData(["experts", data?.id], data);
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
    queryFn: () => servicesService.getAll(),
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
      onSubmit={onSubmit}
      services={
        services ? services.map(item => ({ label: item.name, value: item.id.toString() })) : []
      }
      tagsFieldArray={tagsFieldArray}
      specsFieldArray={specsFieldArray}
      isPending={isPending}
      photoPreview={photoPreview}
      setPhotoPreview={setPhotoPreview}
    />
  );
};

export default CreateExpertForm;
