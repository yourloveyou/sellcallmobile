export interface CalculatedFees {
  totalCost: number;
  brokersFee: number;
  attorneyFee: number;
  nycTransferTax: number;
  nysTransferTax: number;
  payoffRecordingFee: number;
  bankSatisfactionFee: number;
  flipTax?: number;
  coopTransferTaxFiling?: number;
  coopStockTransferTax?: number;
  managingAgentFee?: number;
  moveOutFee?: number;
  netProceed: number;
}

interface CalculateFeesParams {
  salePrice: number;
  brokersFee: number;
  attorneyFee: number;
  propertyType: string;
  existingMortgage: boolean;
  flipTax?: number;
}

export function calculateFees({
  salePrice,
  brokersFee,
  attorneyFee,
  propertyType,
  existingMortgage,
  flipTax = 0,
}: CalculateFeesParams): CalculatedFees {
  const brokersFeeAmount = (salePrice * brokersFee) / 100;

  // NYC Transfer Tax Logic
  let nycTransferTaxRate;
  const isResidential = ['1-3 Family', 'Condo', 'Co-op'].includes(propertyType);
  if (salePrice <= 500000 && isResidential) {
    nycTransferTaxRate = 0.01;
  } else if (salePrice > 500000 && isResidential) {
    nycTransferTaxRate = 0.01425;
  } else if (salePrice <= 500000) {
    nycTransferTaxRate = 0.01425;
  } else {
    nycTransferTaxRate = 0.02625;
  }
  const nycTransferTax = salePrice * nycTransferTaxRate;

  // NYS Transfer Tax Logic
  let nysTransferTaxRate;
  if (isResidential) {
    nysTransferTaxRate = salePrice >= 3000000 ? 0.0065 : 0.004;
  } else {
    nysTransferTaxRate = salePrice >= 2000000 ? 0.0065 : 0.004;
  }
  const nysTransferTax = salePrice * nysTransferTaxRate;

  // Conditional fees
  const payoffRecordingFee = existingMortgage ? 100 : 0;
  const bankSatisfactionFee = existingMortgage ? 50 : 0;

  // Co-op specific fees
  const coopTransferTaxFiling = propertyType === 'Co-op' ? 100 : undefined;
  const coopStockTransferTax = propertyType === 'Co-op' ? 50 : undefined;
  const actualFlipTax = propertyType === 'Co-op' ? flipTax : undefined;

  // Condo/Co-op specific fees
  const managingAgentFee = ['Condo', 'Co-op'].includes(propertyType) ? 500 : undefined;
  const moveOutFee = ['Condo', 'Co-op'].includes(propertyType) ? 500 : undefined;

  const totalCost =
    brokersFeeAmount +
    attorneyFee +
    nycTransferTax +
    nysTransferTax +
    (payoffRecordingFee || 0) +
    (bankSatisfactionFee || 0) +
    (actualFlipTax || 0) +
    (coopTransferTaxFiling || 0) +
    (coopStockTransferTax || 0) +
    (managingAgentFee || 0) +
    (moveOutFee || 0);

  const netProceed = salePrice - totalCost;

  return {
    totalCost,
    brokersFee: brokersFeeAmount,
    attorneyFee,
    nycTransferTax,
    nysTransferTax,
    payoffRecordingFee,
    bankSatisfactionFee,
    ...(actualFlipTax !== undefined && { flipTax: actualFlipTax }),
    ...(coopTransferTaxFiling !== undefined && { coopTransferTaxFiling }),
    ...(coopStockTransferTax !== undefined && { coopStockTransferTax }),
    ...(managingAgentFee !== undefined && { managingAgentFee }),
    ...(moveOutFee !== undefined && { moveOutFee }),
    netProceed,
  };
}