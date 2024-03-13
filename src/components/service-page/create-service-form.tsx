"use client";

import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { pricesService } from "@/services/prices.service";
import { servicesService } from "@/services/services.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { OptionType } from "../ui/multi-select";
import ServiceForm from "./service-form";

export const formSchema = z.object({
  name: z.string().min(3).max(50),
  shortDescription: z.string().max(150),
  longDescription: z.string(),
  slug: z.string().min(2),
  prices: z.array(z.object({ label: z.string(), value: z.string() })),
  specialists: z.array(z.object({ label: z.string(), value: z.string() })),
  icon: z.any().optional(),
  bannerImage: z.any().optional(),
  bannerText: z.string(),
});

const CreateServiceForm = () => {
  const [modificatedPrices, setModificatedPrices] = useState<OptionType[]>([]);
  const [modificatedSpecs, setModificatedSpecs] = useState<OptionType[]>([]);

  const [iconPreview, setIconPreview] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      prices: [],
      specialists: [],
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormData) => servicesService.create(values),
    onSuccess(data) {
      console.log(data);

      toast.success("New service was created successfully");
      queryClient.setQueryData(["services", data?.id], data);
      push(paths.SERVICES);
    },
    onError(e) {
      console.log(e);

      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  const { data: prices, isSuccess } = useQuery({
    queryKey: ["prices"],
    queryFn: () => pricesService.getAll(),
  });

  const { data: specialists, isSuccess: specsIsSuccess } = useQuery({
    queryKey: ["specialists"],
    queryFn: () => expertsService.getAll(),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedPrices: string[] = values.prices.map(item => item.value);
    const formattedSpecs: string[] = values.specialists.map(item => item.value);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shortDescription", values.shortDescription);
    formData.append("longDescription", values.longDescription);
    formData.append("slug", values.slug);
    formData.append("icon", values.icon[0]);
    formData.append("bannerImage", values.bannerImage[0]);
    formData.append("bannerText", values.bannerText);
    formData.append("prices", JSON.stringify(formattedPrices));
    formData.append("specialists", JSON.stringify(formattedSpecs));

    mutate(formData);
  }

  useEffect(() => {
    if (isSuccess && prices) {
      const array: OptionType[] = prices.map(item => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setModificatedPrices(array);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && specialists) {
      const array: OptionType[] = specialists.map(item => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.id.toString(),
      }));

      setModificatedSpecs(array);
    }
  }, [specsIsSuccess]);

  return (
    <ServiceForm
      form={form}
      modificatedPrices={modificatedPrices}
      modificatedSpecs={modificatedSpecs}
      iconPreview={iconPreview}
      setIconPreview={setIconPreview}
      onSubmit={onSubmit}
      isPending={isPending}
      bannerPreview={bannerPreview}
      setBannerPreview={setBannerPreview}
    />
  );
};

export default CreateServiceForm;
