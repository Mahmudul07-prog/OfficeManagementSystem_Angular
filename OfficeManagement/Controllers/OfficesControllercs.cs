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
    public class OfficesController : ControllerBase
    {
        private readonly IOfficeRepository _repo;
        private readonly IMapper _mapper;

        public OfficesController(IOfficeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var offices = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<OfficeDto>>(offices));
        }

        [HttpGet("{id}", Name = "GetOfficeById")]
        public async Task<IActionResult> GetById(int id)
        {
            var office = await _repo.GetByIdAsync(id);
            if (office == null) return NotFound();
            return Ok(_mapper.Map<OfficeDto>(office));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOfficeDto dto)
        {
            var office = _mapper.Map<Office>(dto);
            await _repo.AddAsync(office);
            var savedOffice = await _repo.GetByIdAsync(office.Id);
            return CreatedAtRoute("GetOfficeById", new { id = office.Id }, _mapper.Map<OfficeDto>(savedOffice));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateOfficeDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var office = _mapper.Map<Office>(dto);
            await _repo.UpdateAsync(office);
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
