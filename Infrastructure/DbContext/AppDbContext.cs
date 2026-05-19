using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContext
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Office> Offices { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Office>(e =>
            {
                e.Property(x => x.Name).IsRequired().HasMaxLength(100);
                e.Property(x => x.Location).HasMaxLength(200);
                e.Property(x => x.Phone).HasMaxLength(20);
                e.HasMany(x => x.Employees)
                 .WithOne(x => x.Office)
                 .HasForeignKey(x => x.OfficeId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Employee>(e =>
            {
                e.Property(x => x.FullName).IsRequired().HasMaxLength(100);
                e.Property(x => x.Email).IsRequired().HasMaxLength(100);
                e.Property(x => x.Position).HasMaxLength(50);
                e.Property(x => x.Salary).HasColumnType("decimal(18,2)");
            });
        }
    }
}