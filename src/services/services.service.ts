import { IService } from "@/types/service.type";
import { host, protectedHost } from ".";

export const servicesService = {
  async create(body: Omit<IService, "id" | "published">) {
    try {
      const { data } = await protectedHost.post<IService>(`/service`, body);

      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(body: Partial<Omit<IService, "id" | "published">>, id: number) {
    try {
      const { data } = await protectedHost.patch<IService>(`/service/${id}`, body);
      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAll() {
    try {
      const { data } = await host.get<IService[]>(`/service`);
      return data;
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
