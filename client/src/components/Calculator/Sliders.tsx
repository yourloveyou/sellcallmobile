import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SlidersProps {
  brokersFee: number;
  attorneyFee: number;
  onBrokersFeeChange: (value: number) => void;
  onAttorneyFeeChange: (value: number) => void;
}

export default function Sliders({
  brokersFee,
  attorneyFee,
  onBrokersFeeChange,
  onAttorneyFeeChange,
}: SlidersProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Brokers Fee</Label>
          <div className="text-sm font-medium">{brokersFee}%</div>
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
          <div className="text-sm font-medium">${attorneyFee.toLocaleString()}</div>
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
    </div>
  );
}
