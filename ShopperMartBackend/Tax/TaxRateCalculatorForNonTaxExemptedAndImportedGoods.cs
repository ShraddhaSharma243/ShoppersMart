namespace ShopperMartBackend.Tax
{
    public class TaxRateCalculatorForNonTaxExemptedAndImportedGoods : TaxRateCalculator
    {
        public override decimal CalculateTaxRate()
        {
            return Constants.BASIC_SALES_TAX_RATE + Constants.IMPORTED_GOODS_SALES_TAX_RATE;
        }
    }
}
