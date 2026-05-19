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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;
        public EmployeeRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Employee>> GetAllAsync() =>
            await _context.Employees.Include(e => e.Office).ToListAsync();

        public async Task<IEnumerable<Employee>> GetByOfficeIdAsync(int officeId) =>
            await _context.Employees.Include(e => e.Office)
                .Where(e => e.OfficeId == officeId).ToListAsync();

        public async Task<Employee?> GetByIdAsync(int id) =>
            await _context.Employees.Include(e => e.Office).FirstOrDefaultAsync(e => e.Id == id);

        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp != null)
            {
                _context.Employees.Remove(emp);
                await _context.SaveChangesAsync();
            }
        }
    }
}
