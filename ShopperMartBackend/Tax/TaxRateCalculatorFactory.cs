namespace ShopperMartBackend.Tax
{
    public static class TaxRateCalculatorFactory
    {
        public static TaxRateCalculator GetTaxRate(bool isTaxExempted, bool isImported)
        {
            if (isTaxExempted)
            {
                if (isImported)
                {
                    return new TaxRateCalculatorForTaxExemptedAndImportedGoods();
                }
                else
                {
                    return new TaxRateCalculatorForTaxExemptedAndNonImportedGoods();
                }
            }
            else
            {
                if (isImported)
                {
                    return new TaxRateCalculatorForNonTaxExemptedAndImportedGoods();
                }
                else
                {
                    return new TaxRateCalculatorForNonTaxExemptedAndNonImportedGoods();
                }
            }
        }
    }
}
