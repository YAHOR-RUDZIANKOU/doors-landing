import {
  Title as MantineTitle,
  type TitleProps as MantineTitleProps,
} from "@mantine/core";
import { textTones } from "../theme";

export interface TitleProps extends Omit<MantineTitleProps, "c"> {
  tone?: "default" | "inverse";
}

export function Title({ tone = "default", ...props }: TitleProps) {
  return <MantineTitle c={textTones[tone]} {...props} />;
}
