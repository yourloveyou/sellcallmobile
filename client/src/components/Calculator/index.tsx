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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [salePrice, setSalePrice] = useState(600000);
  const [salePriceInput, setSalePriceInput] = useState(`$${salePrice.toLocaleString()}`);
  const [propertyType, setPropertyType] = useState("1-3 Family");
  const [existingMortgage, setExistingMortgage] = useState(true);
  const [brokersFee, setBrokersFee] = useState(4);
  const [attorneyFee, setAttorneyFee] = useState(1500);
  const [flipTax, setFlipTax] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const fees = calculateFees({
    salePrice,
    brokersFee,
    attorneyFee,
    propertyType,
    existingMortgage,
    flipTax,
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSalePriceInput(input);

    const numericValue = parseInt(input.replace(/[^0-9]/g, ""));
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, 150000), 4000000);
      setSalePrice(clampedValue);
    }
  };

  const handlePriceBlur = () => {
    setSalePriceInput(`$${salePrice.toLocaleString()}`);
  };

  return (
    <Card className="w-full max-w-3xl bg-[rgba(17,17,17,0.05)] rounded-xl">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Sale Price</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={salePriceInput}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              className="text-lg font-hanuman bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e]/50 border-[0.5px] focus:border-0 cursor-text focus:outline-none focus:ring-0 focus:ring-offset-0"
            />
            <input
              type="range"
              min={150000}
              max={4000000}
              value={salePrice}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setSalePrice(value);
                setSalePriceInput(`$${value.toLocaleString()}`);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.1)] border border-[#56585e]/50 border-[0.5px] focus:outline-none focus:ring-0 focus:ring-offset-0">
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

          <Button 
            onClick={() => setShowResults(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Calculate
          </Button>
        </div>

        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent className="max-w-xl p-0 bg-transparent border-0">
            <Results
              fees={fees}
              propertyType={propertyType}
              existingMortgage={existingMortgage}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}