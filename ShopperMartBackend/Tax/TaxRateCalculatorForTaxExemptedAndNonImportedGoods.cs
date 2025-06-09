namespace ShopperMartBackend.Tax
{
    public class TaxRateCalculatorForTaxExemptedAndNonImportedGoods : TaxRateCalculator
    {
        public override decimal CalculateTaxRate()
        {
            return Constants.NO_TAX;
        }
    }
}
