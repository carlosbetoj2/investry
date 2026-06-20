import { memo, useState } from "react";

interface NoteCellProps {
  note: number;
  onChange: (n: number) => void;
}

const NoteCell = ({ note, onChange }: NoteCellProps) => {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <input
        type="number"
        min={0}
        max={10}
        autoFocus
        defaultValue={note}
        onBlur={(e) => {
          const v = Math.min(10, Math.max(0, Number(e.target.value)));
          onChange(v);
          setEditing(false);
        }}
        className="h-9 w-12 rounded-lg bg-foreground text-center text-sm font-bold text-background outline-none"
      />
    );
  }
  return (
    <button
      onClick={() => setEditing(true)}
      className="flex h-9 w-12 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background hover:bg-foreground/90"
    >
      {note.toString().padStart(2, "0")}
    </button>
  );
};

export default memo(NoteCell);