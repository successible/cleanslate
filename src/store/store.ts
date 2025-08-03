import {
  createStoreon,
  type StoreonDispatch,
  type StoreonStore,
} from '../storeon'
import { data } from './data/module'
import type { DataEvents, DataSlice } from './data/types'
import { editor } from './editor/module'
import type { EditorEvents, EditorSlice } from './editor/types'
import { navbar } from './navbar/module'
import type { NavbarEvents, NavbarSlice } from './navbar/types'

export type CleanslateEvents = DataEvents & NavbarEvents & EditorEvents

export type CleanslateSlices = DataSlice & NavbarSlice & EditorSlice

export type AllEvents =
  | keyof DataEvents
  | keyof NavbarEvents
  | keyof EditorEvents

export const store = createStoreon<CleanslateSlices, CleanslateEvents>([
  navbar,
  data,
  editor,
])

export type CleanslateStore = StoreonStore<CleanslateSlices, CleanslateEvents>

export type Dispatch = StoreonDispatch<
  DataEvents &
    NavbarEvents &
    EditorEvents &
    createStoreon.DispatchableEvents<CleanslateSlices>
>
