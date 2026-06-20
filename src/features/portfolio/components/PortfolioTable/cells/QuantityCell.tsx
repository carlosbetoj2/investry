import { memo } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import EditableField from "../../EditableField";

interface QuantityCellProps {
  quantity: number;
  delta: number;
  onChange: (q: number) => void;
}

const QuantityCell = ({ quantity, delta, onChange }: QuantityCellProps) => {
  const positive = delta >= 0;
  return (
    <div className="flex items-center gap-2">
      <EditableField
        value={quantity}
        onCommit={onChange}
        step={1}
        showPencil={false}
        format={(v) => v.toString()}
      />
      {delta !== 0 && (
        <span
          className={cn(
            "inline-flex items-center text-xs font-semibold",
            positive ? "text-success" : "text-destructive",
          )}
        >
          {positive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          {Math.abs(delta)}
        </span>
      )}
    </div>
  );
};

export default memo(QuantityCell);