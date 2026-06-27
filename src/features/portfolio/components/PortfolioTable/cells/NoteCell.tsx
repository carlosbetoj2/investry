import { memo, useState } from "react";
import { noteCellButton, noteCellInput } from "./styles";

interface NoteCellProps {
  note: number;
  onChange: (n: number) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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
        className={noteCellInput()}
        onBlur={(e) => {
          const v = clamp(Number(e.target.value), 0, 10);
          onChange(v);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <button onClick={() => setEditing(true)} className={noteCellButton()}>
      {note.toString().padStart(2, "0")}
    </button>
  );
};

export default memo(NoteCell);
