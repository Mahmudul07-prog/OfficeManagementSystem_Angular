using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OfficeManagement.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(data));
        }

        [HttpGet("by-office/{officeId}")]
        public async Task<IActionResult> GetByOffice(int officeId)
        {
            var data = await _repo.GetByOfficeIdAsync(officeId);
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(data));
        }

        [HttpGet("{id}", Name = "GetEmployeeById")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _repo.GetByIdAsync(id);
            if (emp == null) return NotFound();
            return Ok(_mapper.Map<EmployeeDto>(emp));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeDto dto)
        {
            var emp = _mapper.Map<Employee>(dto);
            await _repo.AddAsync(emp);
            var savedEmp = await _repo.GetByIdAsync(emp.Id);
            return CreatedAtRoute("GetEmployeeById", new { id = emp.Id }, _mapper.Map<EmployeeDto>(savedEmp));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateEmployeeDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var emp = _mapper.Map<Employee>(dto);
            await _repo.UpdateAsync(emp);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
