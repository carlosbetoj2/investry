import { memo } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import EditableField from "../../EditableField";
import { cn } from "@/lib/utils";

import { quantityContainer, quantityDelta, quantityIcon } from "./styles";

interface QuantityCellProps {
  quantity: number;
  delta: number;
  onChange: (q: number) => void;
}

const QuantityCell = ({ quantity, delta, onChange }: QuantityCellProps) => {
  const trend = delta > 0 ? "up" : delta < 0 ? "down" : "neutral";

  return (
    <div className={quantityContainer()}>
      <EditableField
        value={quantity}
        onCommit={onChange}
        step={1}
        showPencil={false}
        format={(v) => v.toString()}
      />

      {delta !== 0 && (
        <span className={quantityDelta({ trend })}>
          {delta > 0 ? (
            <ArrowUp className={quantityIcon()} />
          ) : (
            <ArrowDown className={quantityIcon()} />
          )}
          {Math.abs(delta)}
        </span>
      )}
    </div>
  );
};

export default memo(QuantityCell);
