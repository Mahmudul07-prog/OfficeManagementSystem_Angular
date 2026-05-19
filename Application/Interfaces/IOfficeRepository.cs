using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOfficeRepository
    {
        Task<IEnumerable<Office>> GetAllAsync();
        Task<Office?> GetByIdAsync(int id);
        Task<Office> AddAsync(Office office);
        Task UpdateAsync(Office office);
        Task DeleteAsync(int id);
    }
}
