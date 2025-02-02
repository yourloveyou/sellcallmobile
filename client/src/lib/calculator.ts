export interface CalculatedFees {
  totalCost: number;
  brokersFee: number;
  attorneyFee: number;
  nycTransferTax: number;
  nysTransferTax: number;
  payoffRecordingFee: number;
  bankSatisfactionFee: number;
  netProceed: number;
}

interface CalculateFeesParams {
  salePrice: number;
  brokersFee: number;
  attorneyFee: number;
}

export function calculateFees({
  salePrice,
  brokersFee,
  attorneyFee,
}: CalculateFeesParams): CalculatedFees {
  const brokersFeeAmount = (salePrice * brokersFee) / 100;
  const nycTransferTax = (salePrice * 1.425) / 100;
  const nysTransferTax = (salePrice * 0.4) / 100;
  const payoffRecordingFee = 100;
  const bankSatisfactionFee = 50;

  const totalCost =
    brokersFeeAmount +
    attorneyFee +
    nycTransferTax +
    nysTransferTax +
    payoffRecordingFee +
    bankSatisfactionFee;

  const netProceed = salePrice - totalCost;

  return {
    totalCost,
    brokersFee: brokersFeeAmount,
    attorneyFee,
    nycTransferTax,
    nysTransferTax,
    payoffRecordingFee,
    bankSatisfactionFee,
    netProceed,
  };
}
