namespace ShopperMartBackend.Tax
{
    public class TaxRateCalculatorForNonTaxExemptedAndNonImportedGoods : TaxRateCalculator
    {
        public override decimal CalculateTaxRate()
        {
            return Constants.BASIC_SALES_TAX_RATE;
        }
    }
}
