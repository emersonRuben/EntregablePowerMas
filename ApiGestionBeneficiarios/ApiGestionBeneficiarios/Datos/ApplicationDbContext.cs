using ApiGestionBeneficiarios.DTOs;
using ApiGestionBeneficiarios.Entidades;
using Microsoft.EntityFrameworkCore;

namespace ApiGestionBeneficiarios.Datos
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<DocumentoIdentidad> DocumentoIdentidad { get; set; }
        public DbSet<Beneficiario> Beneficiario { get; set; }
        public DbSet<BeneficiarioDTO> BeneficiariosReporte { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BeneficiarioDTO>().HasNoKey().ToView(null);
        }

    }
}
