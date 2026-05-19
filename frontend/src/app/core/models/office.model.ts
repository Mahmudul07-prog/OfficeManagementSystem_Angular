export interface OfficeDto {
  id: number;
  name: string;
  location: string;
  phone: string;
  employeeCount: number;
}

export interface CreateOfficeDto {
  name: string;
  location: string;
  phone: string;
}

export interface UpdateOfficeDto extends CreateOfficeDto {
  id: number;
}
