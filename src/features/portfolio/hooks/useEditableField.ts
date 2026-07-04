import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

interface UseEditableFieldProps<T> {
  value: T;
  onCommit: (value: T) => void;
  parseDraft: (draft: string) => T | undefined;
  formatDraft: (value: T) => string;
  validate?: (value: T) => boolean;
}

export const useEditableField = <T>({
  value,
  onCommit,
  parseDraft,
  formatDraft,
  validate,
}: UseEditableFieldProps<T>) => {
  const [editing, setEditing] = useState(false);

  const [draft, setDraft] = useState<string>(() => formatDraft(value));

  const inputRef = useRef<HTMLInputElement>(null);

  const parseDraftRef = useRef(parseDraft);
  const formatDraftRef = useRef(formatDraft);
  const validateRef = useRef(validate);
  const valueRef = useRef(value);

  // mantém refs atualizados
  useEffect(() => {
    parseDraftRef.current = parseDraft;
  }, [parseDraft]);

  useEffect(() => {
    formatDraftRef.current = formatDraft;
  }, [formatDraft]);

  useEffect(() => {
    validateRef.current = validate;
  }, [validate]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // sincroniza draft quando valor externo muda
  useEffect(() => {
    if (!editing) {
      setDraft(formatDraftRef.current(value));
    }
  }, [value, editing]);

  // seleção automática ao entrar em edição
  useEffect(() => {
    if (editing) {
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = useCallback(() => {
    const nextValue = parseDraftRef.current(draft);

    if (
      nextValue !== undefined &&
      (validateRef.current?.(nextValue) ?? true) &&
      nextValue !== valueRef.current
    ) {
      onCommit(nextValue);
    }

    setEditing(false);
  }, [draft, onCommit]);

  const cancel = useCallback(() => {
    setDraft(formatDraftRef.current(valueRef.current));
    setEditing(false);
  }, []);

  const startEditing = useCallback(() => {
    setDraft(formatDraftRef.current(valueRef.current));
    setEditing(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        commit();
      }

      if (event.key === "Escape") {
        cancel();
      }
    },
    [commit, cancel],
  );

  return {
    editing,
    draft,
    inputRef,
    startEditing,
    setDraft,
    commit,
    cancel,
    handleKeyDown,
  };
};
