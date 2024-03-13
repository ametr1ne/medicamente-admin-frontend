import { IExpert } from "./expert.type";
import { IPrice } from "./price.type";

export interface IService {
  id: number;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  icon?: string;
  slug: string;
  published: boolean;
  prices: IPrice[];
  specialists: IExpert[];
  bannerImage?: string;
  bannerText?: string
}

export type TOverridedService = Omit<IService, "id" | "published" | "prices" | "specialists"> & {
  prices: string[];
  specialists: string[];
};
