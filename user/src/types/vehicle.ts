

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalVehicles: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export type Vehicle = {
  _id: string;
  make: string;
  model: string;
  year: number;
  thumbUrl?: string;
  photos: {
    url: string;
  }[];
  price_usd?: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  engine_capacity?: number;
  drive_type?: string;
  color?: string;
};

export type PastImport = {
  _id: string;
  make: string;
  model: string;
  year: number;
  description?: string;
  imageUrl?: string;
  arrival?: string;
  status?: string;
};

export type AvailableMakes = Record<string, string[]>;