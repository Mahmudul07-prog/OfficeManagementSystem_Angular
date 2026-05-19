using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class OfficeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int EmployeeCount { get; set; }
    }

    public class CreateOfficeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class UpdateOfficeDto : CreateOfficeDto
    {
        public int Id { get; set; }
    }
}
