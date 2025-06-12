using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopperMartBackend.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedProductTableChangedColumnnameQuantityToQuantityInStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Products",
                newName: "QuantityInStock");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantityInStock",
                table: "Products",
                newName: "Quantity");
        }
    }
}
