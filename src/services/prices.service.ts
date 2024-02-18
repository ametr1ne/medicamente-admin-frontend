import { IPrice } from "@/types/price.type";
import { host, protectedHost } from ".";

export const pricesService = {
  async create(body: Omit<IPrice, "id">): Promise<IPrice | undefined> {
    try {
      const { data } = await protectedHost.post<IPrice>(`/price`, body);
      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(body: Partial<Omit<IPrice, "id">>, id: number) {
    try {
      const { data } = await protectedHost.patch<IPrice>(`/price/${id}`, body);
      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAll() {
    try {
      const { data } = await host.get<IPrice[]>(`/price`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneById(id: number) {
    try {
      const { data } = await host.get<IPrice>(`/price/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/price/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};
