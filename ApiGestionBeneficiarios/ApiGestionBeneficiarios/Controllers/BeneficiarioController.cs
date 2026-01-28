using ApiGestionBeneficiarios.Datos;
using ApiGestionBeneficiarios.DTOs;  
using ApiGestionBeneficiarios.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGestionBeneficiarios.Controllers
{
    [Route("api/beneficiario")]
    [ApiController]
    public class BeneficiarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BeneficiarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BeneficiarioDTO>>> Get()
        {
            return await _context.BeneficiariosReporte
                .FromSqlRaw("EXEC sp_ListarBeneficiarios")
                .ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Beneficiario ben)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_CrearBeneficiario {0}, {1}, {2}, {3}, {4}, {5}",
                ben.Nombres, ben.Apellidos, ben.DocumentoIdentidadId,
                ben.NumeroDocumento, ben.FechaNacimiento, ben.Sexo
            );
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Beneficiario ben)
        {
            if (id != ben.Id) return BadRequest();

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_EditarBeneficiario {0}, {1}, {2}, {3}, {4}, {5}, {6}",
                ben.Id, ben.Nombres, ben.Apellidos, ben.DocumentoIdentidadId,
                ben.NumeroDocumento, ben.FechaNacimiento, ben.Sexo
            );
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_EliminarBeneficiario {0}", id);
            return Ok();
        }
    }
}