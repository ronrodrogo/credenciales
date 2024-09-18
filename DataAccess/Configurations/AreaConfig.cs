using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class AreaConfig : IEntityTypeConfiguration<Area>
    {
        public void Configure(EntityTypeBuilder<Area> builder)
        {
            //Table Name
            builder.ToTable("Areas");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns

        }
    }
}