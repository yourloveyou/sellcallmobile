import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
  const handleBrokersFeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    const value = parseFloat(rawValue);
    if (!isNaN(value)) {
      onBrokersFeeChange(Math.min(Math.max(value, 0), 6));
    }
  };

  const handleAttorneyFeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const value = parseInt(rawValue);
    if (!isNaN(value)) {
      onAttorneyFeeChange(Math.min(Math.max(value, 500), 5000));
    }
  };

  const handleFlipTaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onFlipTaxChange) return;
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const value = parseInt(rawValue);
    if (!isNaN(value)) {
      onFlipTaxChange(Math.min(Math.max(value, 0), 5000));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Brokers Fee</Label>
          <Input
            type="text"
            value={`${brokersFee}%`}
            onChange={handleBrokersFeeInput}
            className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.15)] border border-[#56585e] cursor-text"
          />
        </div>
        <Slider
          value={[brokersFee]}
          onValueChange={([value]) => onBrokersFeeChange(value)}
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
            value={`$${attorneyFee.toLocaleString()}`}
            onChange={handleAttorneyFeeInput}
            className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.15)] border border-[#56585e] cursor-text"
          />
        </div>
        <Slider
          value={[attorneyFee]}
          onValueChange={([value]) => onAttorneyFeeChange(value)}
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
              value={`$${flipTax.toLocaleString()}`}
              onChange={handleFlipTaxInput}
              className="w-24 text-right font-hanuman bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.15)] border border-[#56585e] cursor-text"
            />
          </div>
          <Slider
            value={[flipTax]}
            onValueChange={([value]) => onFlipTaxChange(value)}
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