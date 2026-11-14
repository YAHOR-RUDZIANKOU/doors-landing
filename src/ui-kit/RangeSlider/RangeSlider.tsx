"use client";

import {
  RangeSlider as MantineRangeSlider,
  type RangeSliderProps,
} from "@mantine/core";

export type { RangeSliderProps };

export function RangeSlider(props: RangeSliderProps) {
  return <MantineRangeSlider size={4} thumbSize={20} label={null} {...props} />;
}
