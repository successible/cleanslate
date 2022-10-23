import { css } from '@emotion/react'
import * as chagall from '../node_modules/chagall/src/chagall'

export const { colors, layout } = chagall
export const { lg, md, sm, xlg, xs, xxlg } = layout

export type Colors = keyof typeof colors

export const green = css`
  background-color: ${colors.green};
  color: ${colors.text};
`
export const blue = css`
  background-color: ${colors.blue};
  color: ${colors.text};
`
export const pink = css`
  background-color: ${colors.pink};
  color: ${colors.black};
`
