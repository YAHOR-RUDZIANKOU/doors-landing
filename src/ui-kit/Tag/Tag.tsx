"use client";

import { Pill } from "@mantine/core";

export type TagProps = {
  label: React.ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
};

/** Плашка с кнопкой удаления (например, активный фильтр). */
export function Tag({ label, onRemove, removeLabel = "Удалить фильтр" }: TagProps) {
  return (
    <Pill
      size="xl"
      radius="sm"
      bg="transparent"
      bd="1px solid ink.2"
      withRemoveButton={Boolean(onRemove)}
      onRemove={onRemove}
      removeButtonProps={{ "aria-label": removeLabel }}
    >
      {label}
    </Pill>
  );
}
