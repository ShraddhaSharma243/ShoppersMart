namespace ShopperMartBackend.Tax
{
    public class TaxRateCalculatorForTaxExemptedAndImportedGoods : TaxRateCalculator
    {
        public override decimal CalculateTaxRate()
        {
            return Constants.IMPORTED_GOODS_SALES_TAX_RATE;
        }
    }
}
