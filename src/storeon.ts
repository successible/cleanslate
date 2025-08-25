// License: https://github.com/storeon/storeon/blob/main/LICENSE
// Copied from the (deprecated) storeon library with a couple of modifications

/* 
The MIT License (MIT)
Copyright 2019 Andrey Sitnik <andrey@sitnik.ru>
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import {
  createContext,
  createElement,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

type DataTypes<Map, Key extends keyof Map> = Map extends never
  ? [any?]
  : Map[Key] extends never | undefined
    ? [never?]
    : [Map[Key]]

export interface StoreonStore<State = unknown, Events = any> {
  on<Event extends keyof (Events & StoreonEvents<State, Events>)>(
    event: Event,
    handler: createStoreon.EventHandler<State, Events, Event>
  ): () => void
  get(): State
  dispatch: StoreonDispatch<Events & createStoreon.DispatchableEvents<State>>
}

export type StoreonModule<State, Events = any> = (
  store: StoreonStore<State, Events>
) => void

export interface StoreonEvents<State, Events = any>
  extends createStoreon.DispatchableEvents<State> {
  '@dispatch': createStoreon.DispatchEvent<
    State,
    Events & createStoreon.DispatchableEvents<State>
  >
}

export type StoreonDispatch<Events> = (<Event extends keyof Events>(
  event: Event,
  ...data: DataTypes<Partial<Events>, Event>
) => void) & { ___events: Events }

export namespace createStoreon {
  export type DispatchEvent<
    State,
    Events,
    Event extends keyof Events = keyof Events,
  > = [Event, Events[Event], EventHandler<State, Events, Event>[]]

  export type EventHandler<
    State,
    Events,
    Event extends keyof (Events & StoreonEvents<State, Events>),
  > = (
    state: State extends object ? Readonly<State> : State,
    data: (Events & StoreonEvents<State, Events>)[Event],
    store: StoreonStore<State, Events>
  ) => Partial<State> | Promise<void> | null | void

  export interface DispatchableEvents<State> {
    '@init': never
    '@changed': State
  }
}

export const createStoreon = <State, Events = any>(
  modules: (StoreonModule<State, Events> | false)[]
): StoreonStore<State, Events> => {
  const events: Record<string, any> = {}
  let state: any = {}

  const store = {
    dispatch(event: any, data?: any) {
      if (event !== '@dispatch') {
        store.dispatch('@dispatch', [event, data, events[event]])
      }

      if (events[event]) {
        let changes: any
        events[event].forEach((i: any) => {
          const diff = events[event].includes(i) && i(state, data, store)
          if (diff && typeof diff.then !== 'function') {
            state = { ...state, ...diff }
            changes = { ...changes, ...diff }
          }
        })
        if (changes) store.dispatch('@changed', changes)
      }
    },

    get: () => state,

    on(event: any, cb: any) {
      // biome-ignore lint/suspicious/noAssignInExpressions: Required by the library
      ;(events[event] || (events[event] = [])).push(cb)

      return () => {
        events[event] = events[event].filter((i: any) => i !== cb)
      }
    },
  }

  modules.forEach((i) => {
    if (i) i(store as any)
  })

  store.dispatch('@init')

  return store as StoreonStore<State, Events>
}

// @ts-expect-error - The lack of default is required by the library
export const StoreContext = createContext()

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const customContext =
  (context: any) =>
  (...keys: any) => {
    const store: any = useContext(context)
    if (process.env.NODE_ENV !== 'production' && !store) {
      throw new Error(
        'Could not find storeon context value.' +
          'Please ensure the component is wrapped in a <StoreContext.Provider>'
      )
    }

    const rerender = useState({})

    useIsomorphicLayoutEffect(() => {
      return store.on('@changed', (_: any, changed: any) => {
        const changesInKeys = keys.some((key: any) => key in changed)
        if (changesInKeys) rerender[1]({})
      })
    }, [])

    return useMemo(() => {
      const state = store.get()
      const data: any = {}
      keys.forEach((key: any) => {
        data[key] = state[key]
      })
      data.dispatch = store.dispatch
      return data
    }, [rerender[0]])
  }

export const useStoreon = customContext(StoreContext)

export const connectStoreon = (...keys: any) => {
  const Component = keys.pop()
  return forwardRef((originProps, ref) => {
    const props = { ...originProps, ...useStoreon(...keys), ref }
    return createElement(Component, props)
  })
}
