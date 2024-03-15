import { host, protectedHost } from ".";
import { IExpert, IOverridedExpert } from "@/types/expert.type";

export const expertsService = {
  async create(body: FormData) {
    try {
      const { data } = await protectedHost.post<IExpert>(`/expert`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(body: FormData, id: number) {
    try {
      const { data } = await protectedHost.patch<IExpert>(`/expert/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAll() {
    try {
      const { data } = await host.get<IExpert[]>(`/expert`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneById(id: number) {
    try {
      const { data } = await host.get<IExpert>(`/expert/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneBySlug(slug: string) {
    try {
      const { data } = await host.get<IExpert>(`/expert/slug/${slug}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/expert/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};
