import { IService } from "@/types/service.type";
import { host, protectedHost } from ".";

export const getAllServices = async () => {
  try {
    const { data } = await host.get<IService[]>(`/service`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const servicesService = {
  async create(body: FormData) {
    try {
      const { data } = await protectedHost.post<IService>(`/service`, body, {
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
      const { data } = await protectedHost.patch<IService>(`/service/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (e) {
      throw e;
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
