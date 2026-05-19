using Application.Interfaces;
using Domain.Entities;
using Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{

    public class OfficeRepository : IOfficeRepository
    {
        private readonly AppDbContext _context;
        public OfficeRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Office>> GetAllAsync() =>
            await _context.Offices.Include(o => o.Employees).ToListAsync();

        public async Task<Office?> GetByIdAsync(int id) =>
            await _context.Offices.Include(o => o.Employees).FirstOrDefaultAsync(o => o.Id == id);

        public async Task<Office> AddAsync(Office office)
        {
            _context.Offices.Add(office);
            await _context.SaveChangesAsync();
            return office;
        }

        public async Task UpdateAsync(Office office)
        {
            _context.Offices.Update(office);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var office = await _context.Offices.FindAsync(id);
            if (office != null)
            {
                _context.Offices.Remove(office);
                await _context.SaveChangesAsync();
            }
        }
    }
}
