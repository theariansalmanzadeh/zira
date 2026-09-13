import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@shared/components/ui/Card";
import { Badge } from "@shared/components/ui/Badge";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/libs/utils";

export interface PriceCardData {
  badge?: string;
  isButtonActive?: boolean;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  onSubscribe?: () => void;
}

export interface PriceCardProps {
  data: PriceCardData;
  className?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ data, className }) => {
  const {
    badge = "Starter",
    isButtonActive = false,
    price,
    period = "/month",
    description = "Perfect for small teams.",
    features = [],
    buttonText = "Subscribe",
    onSubscribe,
  } = data;
  return (
    <Card
      className={cn(
        "p-0!",
        "overflow-hidden",
        " bg-surface-container-high",
        "shadow-lg",
        className
      )}
    >
      <CardHeader className="bg-surface-container-lowest rounded-b-card-lg p-lg shadow-xl">
        <div className="flex-col-items-start gap-xl">
          <div className="w-full flex-col-items-start gap-layout p-lg rounded-card-lg bg-surface-container-high">
            <Badge
              variant="default"
              className="w-fit text-on-surface-variant text-sm border-0"
            >
              {badge}
            </Badge>
            <div>
              <span className="text-title-lg font-bold text-on-surface-variant">
                {price}
              </span>
              <span className="text-sm text-on-surface-variant">{period}</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">{description}</p>
          <Button
            variant={isButtonActive ? "primary" : "primary-outline"}
            className="w-full mt-2"
            onClick={onSubscribe}
          >
            {buttonText}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-lg pt-lg">
        <ul className="flex-col-items-start items-start gap-lg">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-lg text-on-surface-variant "
            >
              <Check className="h-5 w-5  shrink-0" />
              <span className="text-sm ">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PriceCard;
