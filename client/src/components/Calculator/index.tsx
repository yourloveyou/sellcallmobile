import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Results from "./Results";
import Sliders from "./Sliders";
import { calculateFees } from "@/lib/calculator";

export default function Calculator() {
  const [salePrice, setSalePrice] = useState(600000);
  const [propertyType, setPropertyType] = useState("1-3 Family");
  const [existingMortgage, setExistingMortgage] = useState(true);
  const [brokersFee, setBrokersFee] = useState(4);
  const [attorneyFee, setAttorneyFee] = useState(1500);
  const [flipTax, setFlipTax] = useState(0);

  const fees = calculateFees({
    salePrice,
    brokersFee,
    attorneyFee,
    propertyType,
    existingMortgage,
    flipTax,
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,]/g, "");
    if (rawValue === "") {
      setSalePrice(150000);
    } else {
      const value = parseInt(rawValue);
      if (!isNaN(value)) {
        setSalePrice(Math.min(Math.max(value, 150000), 4000000));
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl bg-[rgba(17,17,17,0.05)] rounded-xl">
      <CardContent className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Sale Price</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={`$${salePrice.toLocaleString()}`}
              onChange={handlePriceChange}
              className="text-lg font-hanuman bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e] cursor-text focus:outline-none"
            />
            <input
              type="range"
              min={150000}
              max={4000000}
              value={salePrice}
              onChange={(e) => setSalePrice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-[rgba(255,255,255,0.05)] border-[#56585e] focus:outline-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3 Family">1-3 Family</SelectItem>
                <SelectItem value="4 Family+">4 Family+</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Co-op">Co-op</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Existing Mortgage</Label>
            <Switch
              checked={existingMortgage}
              onCheckedChange={setExistingMortgage}
            />
          </div>

          <Sliders
            brokersFee={brokersFee}
            attorneyFee={attorneyFee}
            flipTax={propertyType === "Co-op" ? flipTax : undefined}
            onBrokersFeeChange={setBrokersFee}
            onAttorneyFeeChange={setAttorneyFee}
            onFlipTaxChange={setFlipTax}
          />
        </div>

        <Results 
          fees={fees} 
          propertyType={propertyType} 
          existingMortgage={existingMortgage} 
        />
      </CardContent>
    </Card>
  );
}