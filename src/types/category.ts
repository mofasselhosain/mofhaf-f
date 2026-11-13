
export type CategoryType =
  | "PRODUCT"
  | "SERVICE";

export type CategoryStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

export interface ICreateCategory {
  name: string;
  slug: string;
  categoryType?: CategoryType;
  description?: string;
  categoryImage?: File;
  bannerImage?: File;
  status?: CategoryStatus;
  isActive?: boolean;
  sortOrder?: number;
  isFeatured?: boolean;
  userId?: string;
}

export interface ICategory extends ICreateCategory {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
