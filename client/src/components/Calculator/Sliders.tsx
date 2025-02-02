import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SlidersProps {
  brokersFee: number;
  attorneyFee: number;
  flipTax?: number;
  onBrokersFeeChange: (value: number) => void;
  onAttorneyFeeChange: (value: number) => void;
  onFlipTaxChange?: (value: number) => void;
}

export default function Sliders({
  brokersFee,
  attorneyFee,
  flipTax,
  onBrokersFeeChange,
  onAttorneyFeeChange,
  onFlipTaxChange,
}: SlidersProps) {
  const [brokersFeeInput, setBrokersFeeInput] = useState(`${brokersFee}%`);
  const [attorneyFeeInput, setAttorneyFeeInput] = useState(`$${attorneyFee.toLocaleString()}`);
  const [flipTaxInput, setFlipTaxInput] = useState(flipTax !== undefined ? `$${flipTax.toLocaleString()}` : "");

  const handleBrokersFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setBrokersFeeInput(input);

    const numericValue = parseFloat(input.replace(/[^0-9.]/g, ""));
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, 0), 6);
      onBrokersFeeChange(clampedValue);
    }
  };

  const handleBrokersFeeBlur = () => {
    setBrokersFeeInput(`${brokersFee}%`);
  };

  const handleAttorneyFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAttorneyFeeInput(input);

    const numericValue = parseInt(input.replace(/[^0-9]/g, ""));
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, 500), 5000);
      onAttorneyFeeChange(clampedValue);
    }
  };

  const handleAttorneyFeeBlur = () => {
    setAttorneyFeeInput(`$${attorneyFee.toLocaleString()}`);
  };

  const handleFlipTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onFlipTaxChange) return;
    const input = e.target.value;
    setFlipTaxInput(input);

    const numericValue = parseInt(input.replace(/[^0-9]/g, ""));
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, 0), 5000);
      onFlipTaxChange(clampedValue);
    }
  };

  const handleFlipTaxBlur = () => {
    setFlipTaxInput(flipTax !== undefined ? `$${flipTax.toLocaleString()}` : "");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Brokers Fee</Label>
          <Input
            type="text"
            value={brokersFeeInput}
            onChange={handleBrokersFeeChange}
            onBlur={handleBrokersFeeBlur}
            className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e]/50 border-[0.5px] cursor-text focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <Slider
          value={[brokersFee]}
          onValueChange={([value]) => {
            onBrokersFeeChange(value);
            setBrokersFeeInput(`${value}%`);
          }}
          min={0}
          max={6}
          step={0.1}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>6%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Attorney Fee</Label>
          <Input
            type="text"
            value={attorneyFeeInput}
            onChange={handleAttorneyFeeChange}
            onBlur={handleAttorneyFeeBlur}
            className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e]/50 border-[0.5px] cursor-text focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <Slider
          value={[attorneyFee]}
          onValueChange={([value]) => {
            onAttorneyFeeChange(value);
            setAttorneyFeeInput(`$${value.toLocaleString()}`);
          }}
          min={500}
          max={5000}
          step={100}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$500</span>
          <span>$5,000</span>
        </div>
      </div>

      {flipTax !== undefined && onFlipTaxChange && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Building Flip Tax</Label>
            <Input
              type="text"
              value={flipTaxInput}
              onChange={handleFlipTaxChange}
              onBlur={handleFlipTaxBlur}
              className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e]/50 border-[0.5px] cursor-text focus:outline-none focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <Slider
            value={[flipTax]}
            onValueChange={([value]) => {
              onFlipTaxChange(value);
              setFlipTaxInput(`$${value.toLocaleString()}`);
            }}
            min={0}
            max={5000}
            step={100}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$5,000</span>
          </div>
        </div>
      )}
    </div>
  );
}