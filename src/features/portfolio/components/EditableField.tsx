import { memo, useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  value: number;
  onCommit: (value: number) => void;
  format?: (v: number) => string;
  step?: number;
  className?: string;
  showPencil?: boolean;
}

const EditableField = ({
  value,
  onCommit,
  format,
  step = 0.01,
  className,
  showPencil = true,
}: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  useEffect(() => {
    setDraft(value.toString());
  }, [value]);

  const commit = () => {
    const n = parseFloat(draft.replace(",", "."));
    if (!Number.isNaN(n) && n !== value) onCommit(n);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="number"
        step={step}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        className={cn(
          "w-24 rounded-md border border-ring bg-card px-2 py-1 text-sm font-medium text-foreground outline-none",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
        className,
      )}
    >
      <span>{format ? format(value) : value}</span>
      {showPencil && (
        <Pencil className="h-3 w-3 text-muted-foreground opacity-60" />
      )}
    </button>
  );
};

export default memo(EditableField);