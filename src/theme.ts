import { css } from "@emotion/react";

export const colors = {
  background: "#f7f7f7",
  black: "#333333",
  blue: "#ecf9f9",
  danger: "#ff5470",
  darkblue: "#c5ecec",
  darkgrey: "#666666",
  darkpurple: "#7341c7",
  green: "#ecf9ed",
  lightgrey: "#ededed",
  mediumgrey: "#cccccc",
  pink: "#ffe8e8",
  purple: "#ad90de",
  seashell: "#fff6ed",
  success: "#2cb67d",
  text: "#606c76",
  white: "#ffffff",
  yellow: "#fff6c2",
};

export const layout = {
  lg: 992,
  md: 768,
  sm: 576,
  xlg: 1024,
  xs: 320,
  xxlg: 1500,
};

export const { lg, md, sm, xlg, xs, xxlg } = layout;

export type Colors = keyof typeof colors;

export const green = css`
  background-color: ${colors.green};
  color: ${colors.text};
`;
export const blue = css`
  background-color: ${colors.blue};
  color: ${colors.text};
`;
export const pink = css`
  background-color: ${colors.pink};
  color: ${colors.black};
`;
