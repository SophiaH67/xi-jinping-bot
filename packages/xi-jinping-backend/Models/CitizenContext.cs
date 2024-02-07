using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace xi_jinping_backend.Models;

public class CitizenContext : DbContext
{
  public DbSet<CitizenItem> CitizenItems { get; init; }
  public static CitizenContext Create(IMongoDatabase database) =>
      new(new DbContextOptionsBuilder<CitizenContext>()
          .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
          .Options);
  public CitizenContext(DbContextOptions options)
      : base(options)
  {
  }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<CitizenItem>().ToCollection("users");
  }
}