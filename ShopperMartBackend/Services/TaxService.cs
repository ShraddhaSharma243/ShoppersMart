using ShopperMartBackend.Entities;
using ShopperMartBackend.Misc;
using ShopperMartBackend.Tax;

namespace ShopperMartBackend.Services
{
    public class TaxService : ITaxService
    {
        public decimal CalculateTax(Product product, int quantity)
        {
            decimal applicableTaxRate = GetTaxRate(product.Category.ToString(), product.IsImported);
            return ((product.Price * quantity) * applicableTaxRate / 100);
        }
        private decimal GetTaxRate(string category, bool isImported)
        {
            var isTaxExempted = Enum.IsDefined(typeof(TaxExemptedProducts), category.ToUpper());
            var calculator = TaxRateCalculatorFactory.GetTaxRate(isTaxExempted, isImported);
            return calculator.CalculateTaxRate();
        }
    }
}
