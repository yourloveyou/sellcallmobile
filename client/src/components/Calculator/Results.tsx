import { Button } from "@/components/ui/button";
import { CalculatedFees } from "@/lib/calculator";
import { useEffect, useRef, useState } from "react";

interface ResultsProps {
  fees: CalculatedFees;
  propertyType: string;
  existingMortgage: boolean;
}

function AnimatedValue({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const steps = 20;
    const increment = (value - previousValue.current) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        setDisplayValue(prev => prev + increment);
        currentStep++;
      } else {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, 50);

    previousValue.current = value;
    return () => clearInterval(interval);
  }, [value]);

  return <span>${Math.round(displayValue).toLocaleString()}</span>;
}

function ResultGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="result-group mt-4">
      <div className="space-y-2 border-t border-gray-600/70 pt-4">{children}</div>
    </div>
  );
}

export default function Results({ fees, propertyType, existingMortgage }: ResultsProps) {
  const isCoopOrCondo = propertyType === "Co-op" || propertyType === "Condo";

  return (
    <div className="bg-[#2b2b2b] rounded-lg p-6 text-white font-hanuman">
      <div className="text-3xl font-bold mb-6">
        <AnimatedValue value={fees.totalCost} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Brokers Fee</span>
            <AnimatedValue value={fees.brokersFee} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Attorney Fee</span>
            <AnimatedValue value={fees.attorneyFee} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">NYC Transfer Tax</span>
            <AnimatedValue value={fees.nycTransferTax} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">NYS Transfer Tax</span>
            <AnimatedValue value={fees.nysTransferTax} />
          </div>
        </div>

        {propertyType === "Co-op" && (
          <ResultGroup>
            {fees.flipTax !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-300">Building Flip Tax</span>
                <AnimatedValue value={fees.flipTax} />
              </div>
            )}
            {fees.coopTransferTaxFiling !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-300">Co-op Transfer Tax Filing Fee</span>
                <AnimatedValue value={fees.coopTransferTaxFiling} />
              </div>
            )}
            {fees.coopStockTransferTax !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-300">Co-op Stock Transfer Tax</span>
                <AnimatedValue value={fees.coopStockTransferTax} />
              </div>
            )}
          </ResultGroup>
        )}

        {isCoopOrCondo && (
          <ResultGroup>
            {fees.managingAgentFee !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-300">Managing Agent Fee</span>
                <AnimatedValue value={fees.managingAgentFee} />
              </div>
            )}
            {fees.moveOutFee !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-300">Move Out Fee</span>
                <AnimatedValue value={fees.moveOutFee} />
              </div>
            )}
          </ResultGroup>
        )}

        {existingMortgage && (
          <ResultGroup>
            <div className="flex justify-between">
              <span className="text-gray-300">Payoff Recording Fee</span>
              <AnimatedValue value={fees.payoffRecordingFee} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bank Satisfaction Fee</span>
              <AnimatedValue value={fees.bankSatisfactionFee} />
            </div>
          </ResultGroup>
        )}

        <div className="border-t border-gray-600/70 pt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Net Proceed</span>
            <AnimatedValue value={fees.netProceed} />
          </div>
        </div>

        <div className="mt-6">
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