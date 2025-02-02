import { Button } from "@/components/ui/button";
import { CalculatedFees } from "@/lib/calculator";

interface ResultsProps {
  fees: CalculatedFees;
}

export default function Results({ fees }: ResultsProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Total Cost</h2>
      <div className="text-3xl font-bold mb-6">
        ${fees.totalCost.toLocaleString()}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-300">Brokers Fee</span>
          <span>${fees.brokersFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Attorney Fee</span>
          <span>${fees.attorneyFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">NYC Transfer Tax</span>
          <span>${fees.nycTransferTax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">NYS Transfer Tax</span>
          <span>${fees.nysTransferTax.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Payoff Recording Fee</span>
            <span>${fees.payoffRecordingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-300">Bank Satisfaction Fee</span>
            <span>${fees.bankSatisfactionFee.toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Net Proceed</span>
            <span>${fees.netProceed.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-400">
            These Estimates are close to absolute accuracy but does not include
            prorated costs such as Utilities (water), unpaid taxes, fines and
            violations or encumbrances.
          </p>
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Consult
        </Button>
      </div>
    </div>
  );
}
