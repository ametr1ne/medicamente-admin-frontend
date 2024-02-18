export interface IExpert {
  id: number;

  firstName: string;
  lastName: string;
  middleName?: string;
  photo?: string;

  slug: string;
  experienceInYears?: number;
  rank?: number;

  tags?: string[];
  specializations?: string[];
}
