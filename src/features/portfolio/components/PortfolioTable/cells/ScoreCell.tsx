import { memo } from "react";
import { useEditableField } from "../../../hooks/useEditableField";
import { button, textElement } from "@/styles";
import { cn } from "@/lib/cn";

interface ScoreCellProps {
  note: number;
  onChange: (n: number) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ScoreCell = ({ note, onChange }: ScoreCellProps) => {
  const { editing, draft, inputRef, startEditing, setDraft, commit, handleKeyDown } =
    useEditableField<number>({
      value: note,
      onCommit: onChange,

      parseDraft: (raw) => {
        const parsed = Number(raw);
        if (Number.isNaN(parsed)) return undefined;
        return clamp(parsed, 0, 10);
      },

      formatDraft: (value) => value.toString().padStart(2, "0"),

      validate: (value) => value >= 0 && value <= 10,
    });

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/\D/g, "");
          setDraft(onlyNumbers);
        }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={cn(button({ buttonSize: "box" }), "w-10")}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={cn(button({ buttonSize: "box" }), "bg-black")}
    >
      <span className={cn(textElement({ textColor: "white" }))}>
        {String(note).padStart(2, "0")}
      </span>
    </button>
  );
};

export default memo(ScoreCell);
