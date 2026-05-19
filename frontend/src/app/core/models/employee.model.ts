export interface EmployeeDto {
  id: number;
  fullName: string;
  email: string;
  position: string;
  salary: number;
  hireDate: Date;
  officeId: number;
  officeName: string;
}

export interface CreateEmployeeDto {
  fullName: string;
  email: string;
  position: string;
  salary: number;
  hireDate: Date;
  officeId: number;
}

export interface UpdateEmployeeDto extends CreateEmployeeDto {
  id: number;
}
