import { memo } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { button, iconStyle, input, layout } from "@/styles";
import { useEditableField } from "../../../hooks/useEditableField";

interface QuantityCellProps {
  quantity: number;
  delta: number;
  onChange: (q: number) => void;
}

const QuantityCell = ({ quantity, delta, onChange }: QuantityCellProps) => {
  const { editing, draft, inputRef, startEditing, setDraft, commit, handleKeyDown } =
    useEditableField<number>({
      value: quantity,
      onCommit: onChange,
      parseDraft: (raw) => {
        const parsed = parseFloat(raw.replace(",", "."));
        return Number.isNaN(parsed) ? undefined : parsed;
      },
      formatDraft: (value) => value.toString(),
      validate: (value) => Number.isInteger(value) && value >= 0,
    });

  const trend = delta > 0 ? "up" : delta < 0 ? "down" : "neutral";

  return (
    <div>
      {editing ? (
        <input
          ref={inputRef}
          type="number"
          step={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className={cn(input({ textColor: "slate", boxSize: "primaryPill" }), "w-20")}
        />
      ) : (
        <button
          type="button"
          onClick={startEditing}
          className={cn(button({ buttonType: "secondaryGhost", boxSize: "primaryPill" }))}
        >
          <span>{draft}</span>
          <FiEdit3
            className={iconStyle({
              iconSize: "xl",
              iconColor: "primaryColor",
            })}
          />
        </button>
      )}

      {delta !== 0 && (
        <span className={cn("text-xs", trend, "flex items-center gap-1")}>
          {delta > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(delta)}
        </span>
      )}
    </div>
  );
};

export default memo(QuantityCell);
