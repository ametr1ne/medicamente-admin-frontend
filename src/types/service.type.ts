export interface IService {
  id: number;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  icon?: string;
  slug: string;
  published: boolean;
}
