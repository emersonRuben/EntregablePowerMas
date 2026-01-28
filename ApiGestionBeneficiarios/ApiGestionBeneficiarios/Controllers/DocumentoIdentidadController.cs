using ApiGestionBeneficiarios.Datos;
using ApiGestionBeneficiarios.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGestionBeneficiarios.Controllers
{
    [Route("api/documento-identidad")]
    [ApiController]
    public class DocumentoIdentidadController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DocumentoIdentidadController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentoIdentidad>>> Get()
        {
            return await _context.DocumentoIdentidad
                .FromSqlRaw("EXEC sp_ListarDocumentosIdentidad")
                .ToListAsync();
        }
    }
}