"use client";

import { OptionType } from "@/components/ui/multi-select";
import { paths } from "@/lib/routes";
import { expertsService } from "@/services/experts.service";
import { pricesService } from "@/services/prices.service";
import { servicesService } from "@/services/services.service";
import { IService } from "@/types/service.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ServiceForm, { formSchema } from "./service-form";

interface IFormattedServiceData extends Omit<IService, "prices" | "specialists"> {
  prices: OptionType[];
  specialists: OptionType[];
}

const UpdateServiceForm = ({ prefetchedData }: { prefetchedData: IFormattedServiceData }) => {
  const [modificatedPrices, setModificatedPrices] = useState<OptionType[]>([]);
  const [modificatedSpecs, setModificatedSpecs] = useState<OptionType[]>([]);

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prefetchedData,
  });

  const { data: prices, isSuccess } = useQuery({
    queryKey: ["prices"],
    queryFn: () => pricesService.getAll(),
  });

  const { data: specialists, isSuccess: specsIsSuccess } = useQuery({
    queryKey: ["specialists"],
    queryFn: () => expertsService.getAll(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormData) => servicesService.update(values, prefetchedData.id),
    onSuccess(data) {
      toast.success(`Service ${data.name} was updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      push(paths.SERVICES);
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedPrices: string[] = values.prices.map(item => item.value);
    const formattedSpecs: string[] = values.specialists.map(item => item.value);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shortDescription", values.shortDescription);
    formData.append("longDescription", values.longDescription);
    formData.append("slug", values.slug);
    values.icon && formData.append("icon", values.icon[0]);
    values.bannerImage && formData.append("bannerImage", values.bannerImage[0]);
    values.bannerText && formData.append("bannerText", values.bannerText);
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
      iconPreview={previewImage}
      setIconPreview={setPreviewImage}
      onSubmit={onSubmit}
      isPending={isPending}
      prefetchedIcon={prefetchedData.icon}
      prefetchedBannerImage={prefetchedData.bannerImage}
      bannerPreview={bannerPreview}
      setBannerPreview={setBannerPreview}
      submitText={"Обновить"}
    />
  );
};

export default UpdateServiceForm;
