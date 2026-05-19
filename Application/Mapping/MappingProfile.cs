using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Office, OfficeDto>()
                .ForMember(d => d.EmployeeCount, o => o.MapFrom(s => s.Employees.Count));
            CreateMap<CreateOfficeDto, Office>();
            CreateMap<UpdateOfficeDto, Office>();

            CreateMap<Employee, EmployeeDto>()
                .ForMember(d => d.OfficeName, o => o.MapFrom(s => s.Office!.Name));
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>();
        }
    }
}
