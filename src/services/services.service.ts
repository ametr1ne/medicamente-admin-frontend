import { IService, TOverridedService } from "@/types/service.type";
import { host, protectedHost } from ".";
import { unstable_noStore as noStore } from "next/cache";

export const servicesService = {
  async create(body: FormData) {
    try {
      const { data } = await protectedHost.post<IService>(`/service`, body);

      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(body: FormData, id: number) {
    try {
      const { data } = await protectedHost.patch<IService>(`/service/${id}`, body);
      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAll() {
    // noStore();
    try {
      // const { data } = await host.get<IService[]>(`/service`);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/service", {
        cache: "no-store",
      });
      const data = await response.json();
      return data as IService[];
    } catch (e) {
      console.error(e);
    }
  },
  async getOneById(id: number) {
    try {
      const { data } = await host.get<IService>(`/service/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneBySlug(slug: string) {
    try {
      const { data } = await host.get<IService>(`/service/slug/${slug}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/service/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};
