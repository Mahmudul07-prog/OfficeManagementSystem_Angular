using Application.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OfficeManagement.Services;

namespace OfficeManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new AppUser { Email = dto.Email, UserName = dto.Email, FullName = dto.FullName };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new AuthResponseDto
            {
                Email = user.Email,
                FullName = user.FullName,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return Unauthorized("Invalid credentials");

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded) return Unauthorized("Invalid credentials");

            return Ok(new AuthResponseDto
            {
                Email = user.Email!,
                FullName = user.FullName,
                Token = _tokenService.CreateToken(user)
            });
        }
    }
}
