import { FiEdit3 } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { buttonType, iconStyle, inputType } from "@/styles";
import { brl } from "@/shared/utils/format";
import { useEditableField } from "../../../hooks/useEditableField";

interface AveragePriceCellProps {
  value: number;
  onCommit: (value: number) => void;
}

const AveragePriceCell = ({ value, onCommit }: AveragePriceCellProps) => {
  const { editing, draft, inputRef, startEditing, setDraft, commit, handleKeyDown } =
    useEditableField<number>({
      value,
      onCommit,
      parseDraft: (raw) => {
        const parsed = parseFloat(raw.replace(",", "."));
        return Number.isNaN(parsed) ? undefined : parsed;
      },
      formatDraft: (nextValue) => nextValue.toString(),
      validate: (nextValue) => nextValue >= 0,
    });

  if (editing) {
    return (
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>

        <input
          ref={inputRef}
          type="number"
          step={0.01}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className={cn(
            inputType({ textColor: "blackSlate", boxSize: "primaryPill" }),
            "pl-7 w-23",
          )}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={cn(buttonType({ ghostType: "secondaryGhost", boxSize: "primaryPill" }))}
    >
      <span>{brl(value)}</span>
      <FiEdit3 className={iconStyle({ width: "xl", iconColor: "primaryColor" })} />
    </button>
  );
};

export default AveragePriceCell;
