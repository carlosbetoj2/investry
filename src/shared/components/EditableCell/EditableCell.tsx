import { ReactNode } from "react";
import { FiEdit3 } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { button, iconStyle, input } from "@/styles";
import { useEditableField } from "@/features/portfolio/hooks/useEditableField";

interface EditableCellProps<T> {
  value: T;
  onCommit: (value: T) => void;

  parse: (raw: string) => T | undefined;
  format: (value: T) => string;
  validate?: (value: T) => boolean;

  renderValue: (value: T) => ReactNode;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function EditableCell<T>({
  value,
  onCommit,
  parse,
  format,
  validate,
  renderValue,
  className,
  inputProps,
}: EditableCellProps<T>) {
  const { editing, draft, inputRef, startEditing, setDraft, commit, handleKeyDown } =
    useEditableField<T>({
      value,
      onCommit,
      parseDraft: parse,
      formatDraft: format,
      validate,
    });

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={cn(input({ textColor: "slate", boxSize: "primaryPill" }), className)}
        {...inputProps}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={cn(button({ buttonType: "secondaryGhost", boxSize: "primaryPill" }), className)}
    >
      <span>{renderValue(value)}</span>
      <FiEdit3 className={iconStyle({ iconSize: "xl", iconColor: "primaryColor" })} />
    </button>
  );
}
