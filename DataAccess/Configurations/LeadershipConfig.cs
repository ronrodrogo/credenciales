using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class LeadershipConfig : IEntityTypeConfiguration<Leadership>
    {
        public void Configure(EntityTypeBuilder<Leadership> builder)
        {
            //Table Name
            builder.ToTable("Leadership");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
         

        }
    }
}