const CreateKoder = (() => {
  let _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename
  return (CreateKoder) => {
    CreateKoder = CreateKoder || {}

    let d
    d || (d = typeof CreateKoder !== 'undefined' ? CreateKoder : {})
    const aa = Object.assign
    let ba
    let n
    d.ready = new Promise((a, b) => {
      ba = a
      n = b
    })
    let ca = aa({}, d)
    let u = []
    let v = './this.program'
    let w = (a, b) => {
      throw b
    }
    const da = 'object' === typeof window
    const x = 'function' === typeof importScripts
    const ea =
      'object' === typeof process &&
      'object' === typeof process.versions &&
      'string' === typeof process.versions.node
    let y = ''
    let A
    let B
    let C
    let fs
    let D
    let F
    if (ea)
      (y = x ? `${require('node:path').dirname(y)}/` : `${__dirname}/`),
        (F = () => {
          D || ((fs = require('node:fs')), (D = require('node:path')))
        }),
        (A = (a, b) => {
          F()
          a = D.normalize(a)
          return fs.readFileSync(a, b ? null : 'utf8')
        }),
        (C = (a) => {
          a = A(a, !0)
          a.buffer || (a = new Uint8Array(a))
          return a
        }),
        (B = (a, b, e) => {
          F()
          a = D.normalize(a)
          fs.readFile(a, (f, h) => {
            f ? e(f) : b(h.buffer)
          })
        }),
        1 < process.argv.length && (v = process.argv[1].replace(/\\/g, '/')),
        (u = process.argv.slice(2)),
        process.on('uncaughtException', (a) => {
          if (!(a instanceof G)) throw a
        }),
        process.on('unhandledRejection', (a) => {
          throw a
        }),
        (w = (a, b) => {
          if (noExitRuntime || 0 < fa) throw ((process.exitCode = a), b)
          b instanceof G || H(`exiting due to exception: ${b}`)
          process.exit(a)
        }),
        (d.inspect = () => '[Emscripten Module object]')
    else if (da || x)
      x
        ? (y = self.location.href)
        : 'undefined' !== typeof document &&
          document.currentScript &&
          (y = document.currentScript.src),
        _scriptDir && (y = _scriptDir),
        0 !== y.indexOf('blob:')
          ? (y = y.substr(0, y.replace(/[?#].*/, '').lastIndexOf('/') + 1))
          : (y = ''),
        (A = (a) => {
          const b = new XMLHttpRequest()
          b.open('GET', a, !1)
          b.send(null)
          return b.responseText
        }),
        x &&
          (C = (a) => {
            const b = new XMLHttpRequest()
            b.open('GET', a, !1)
            b.responseType = 'arraybuffer'
            b.send(null)
            return new Uint8Array(b.response)
          }),
        (B = (a, b, e) => {
          const f = new XMLHttpRequest()
          f.open('GET', a, !0)
          f.responseType = 'arraybuffer'
          f.onload = () => {
            200 === f.status || (0 === f.status && f.response)
              ? b(f.response)
              : e()
          }
          f.onerror = e
          f.send(null)
        })
    const ha = d.print || console.log.bind(console)
    const H = d.printErr || console.warn.bind(console)
    aa(d, ca)
    ca = null
    d.arguments && (u = d.arguments)
    d.thisProgram && (v = d.thisProgram)
    d.quit && (w = d.quit)
    let I
    d.wasmBinary && (I = d.wasmBinary)
    const noExitRuntime = d.noExitRuntime || !0
    'object' !== typeof WebAssembly && J('no native wasm support detected')
    let K
    let L = !1
    function ia(a, b, e, f) {
      const h = {
        array: (l) => {
          const p = M(l.length)
          O.set(l, p)
          return p
        },
        string: (l) => {
          let p = 0
          if (null !== l && void 0 !== l && 0 !== l) {
            const E = (l.length << 2) + 1
            p = M(E)
            ja(l, N, p, E)
          }
          return p
        },
      }
      a = d[`_${a}`]
      const g = []
      let m = 0
      if (f)
        for (let r = 0; r < f.length; r++) {
          const t = h[e[r]]
          t ? (0 === m && (m = ka()), (g[r] = t(f[r]))) : (g[r] = f[r])
        }
      e = a.apply(null, g)
      return (e = ((l) => {
        0 !== m && la(m)
        return 'string' === b ? P(l) : 'boolean' === b ? !!l : l
      })(e))
    }
    const ma =
      'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0
    function na(a, b, e) {
      let f = b + e
      for (e = b; a[e] && !(e >= f); ) ++e
      if (16 < e - b && a.subarray && ma) return ma.decode(a.subarray(b, e))
      for (f = ''; b < e; ) {
        let h = a[b++]
        if (h & 128) {
          const g = a[b++] & 63
          if (192 === (h & 224)) f += String.fromCharCode(((h & 31) << 6) | g)
          else {
            const m = a[b++] & 63
            h =
              224 === (h & 240)
                ? ((h & 15) << 12) | (g << 6) | m
                : ((h & 7) << 18) | (g << 12) | (m << 6) | (a[b++] & 63)
            65536 > h
              ? (f += String.fromCharCode(h))
              : ((h -= 65536),
                (f += String.fromCharCode(
                  55296 | (h >> 10),
                  56320 | (h & 1023)
                )))
          }
        } else f += String.fromCharCode(h)
      }
      return f
    }
    function P(a, b) {
      return a ? na(N, a, b) : ''
    }
    function ja(a, b, e, f) {
      if (0 < f) {
        f = e + f - 1
        for (let h = 0; h < a.length; ++h) {
          let g = a.charCodeAt(h)
          if (55296 <= g && 57343 >= g) {
            const m = a.charCodeAt(++h)
            g = (65536 + ((g & 1023) << 10)) | (m & 1023)
          }
          if (127 >= g) {
            if (e >= f) break
            b[e++] = g
          } else {
            if (2047 >= g) {
              if (e + 1 >= f) break
              b[e++] = 192 | (g >> 6)
            } else {
              if (65535 >= g) {
                if (e + 2 >= f) break
                b[e++] = 224 | (g >> 12)
              } else {
                if (e + 3 >= f) break
                b[e++] = 240 | (g >> 18)
                b[e++] = 128 | ((g >> 12) & 63)
              }
              b[e++] = 128 | ((g >> 6) & 63)
            }
            b[e++] = 128 | (g & 63)
          }
        }
        b[e] = 0
      }
    }
    function oa(a) {
      for (let b = 0, e = 0; e < a.length; ++e) {
        let f = a.charCodeAt(e)
        55296 <= f &&
          57343 >= f &&
          (f = (65536 + ((f & 1023) << 10)) | (a.charCodeAt(++e) & 1023))
        127 >= f ? ++b : (b = 2047 >= f ? b + 2 : 65535 >= f ? b + 3 : b + 4)
      }
      return b
    }
    function pa(a) {
      const b = oa(a) + 1
      const e = M(b)
      ja(a, O, e, b)
      return e
    }
    let qa
    let O
    let N
    let Q
    function ra() {
      const a = K.buffer
      qa = a
      d.HEAP8 = O = new Int8Array(a)
      d.HEAP16 = new Int16Array(a)
      d.HEAP32 = Q = new Int32Array(a)
      d.HEAPU8 = N = new Uint8Array(a)
      d.HEAPU16 = new Uint16Array(a)
      d.HEAPU32 = new Uint32Array(a)
      d.HEAPF32 = new Float32Array(a)
      d.HEAPF64 = new Float64Array(a)
    }
    let sa
    const ta = []
    const ua = []
    const va = []
    const wa = []
    const fa = 0
    function xa() {
      const a = d.preRun.shift()
      ta.unshift(a)
    }
    let R = 0
    let ya = null
    let S = null
    d.preloadedImages = {}
    d.preloadedAudios = {}
    function J(a) {
      if (d.onAbort) d.onAbort(a)
      a = `Aborted(${a})`
      H(a)
      L = !0
      a = new WebAssembly.RuntimeError(
        `${a}. Build with -s ASSERTIONS=1 for more info.`
      )
      n(a)
      throw a
    }
    function za() {
      return T.startsWith('data:application/octet-stream;base64,')
    }
    let T
    T = 'zbar.wasm'
    if (!za()) {
      const Aa = T
      T = d.locateFile ? d.locateFile(Aa, y) : y + Aa
    }
    function Ba() {
      const a = T
      try {
        if (a === T && I) return new Uint8Array(I)
        if (C) return C(a)
        throw 'both async and sync fetching of the wasm failed'
      } catch (b) {
        J(b)
      }
    }
    function Ca() {
      if (!I && (da || x)) {
        if ('function' === typeof fetch && !T.startsWith('file://'))
          return fetch(T, { credentials: 'same-origin' })
            .then((a) => {
              if (!a.ok) throw `failed to load wasm binary file at '${T}'`
              return a.arrayBuffer()
            })
            .catch(() => Ba())
        if (B)
          return new Promise((a, b) => {
            B(
              T,
              (e) => {
                a(new Uint8Array(e))
              },
              b
            )
          })
      }
      return Promise.resolve().then(() => Ba())
    }
    function U(a) {
      while (0 < a.length) {
        const b = a.shift()
        if ('function' === typeof b) b(d)
        else {
          const e = b.N
          'number' === typeof e
            ? void 0 === b.H
              ? sa.get(e)()
              : sa.get(e)(b.H)
            : e(void 0 === b.H ? null : b.H)
        }
      }
    }
    let Da
    Da = ea
      ? () => {
          const a = process.hrtime()
          return 1e3 * a[0] + a[1] / 1e6
        }
      : () => performance.now()
    const Ea = {}
    function Ha() {
      if (!Ia) {
        const a = {
          _: v || './this.program',
          HOME: '/home/web_user',
          LANG: `${(
            ('object' === typeof navigator &&
              navigator.languages &&
              navigator.languages[0]) ||
              'C'
          ).replace('-', '_')}.UTF-8`,
          LOGNAME: 'web_user',
          PATH: '/',
          PWD: '/',
          USER: 'web_user',
        }
        let b
        for (b in Ea) void 0 === Ea[b] ? delete a[b] : (a[b] = Ea[b])
        const e = []
        for (b in a) e.push(`${b}=${a[b]}`)
        Ia = e
      }
      return Ia
    }
    let Ia
    const Ja = [null, [], []]
    const Ka = {}
    function V(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
    }
    function La(a, b) {
      for (let e = 0, f = 0; f <= b; e += a[f++]);
      return e
    }
    const W = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const X = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    function Y(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        const e = a.getMonth()
        const f = (V(a.getFullYear()) ? W : X)[e]
        if (b > f - a.getDate())
          (b -= f - a.getDate() + 1),
            a.setDate(1),
            11 > e
              ? a.setMonth(e + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1))
        else {
          a.setDate(a.getDate() + b)
          break
        }
      }
      return a
    }
    function Ma(a, b, e, f) {
      function h(c, k, q) {
        for (c = 'number' === typeof c ? c.toString() : c || ''; c.length < k; )
          c = q[0] + c
        return c
      }
      function g(c, k) {
        return h(c, k, '0')
      }
      function m(c, k) {
        function q(Fa) {
          return 0 > Fa ? -1 : 0 < Fa ? 1 : 0
        }
        let z
        0 === (z = q(c.getFullYear() - k.getFullYear())) &&
          0 === (z = q(c.getMonth() - k.getMonth())) &&
          (z = q(c.getDate() - k.getDate()))
        return z
      }
      function r(c) {
        switch (c.getDay()) {
          case 0:
            return new Date(c.getFullYear() - 1, 11, 29)
          case 1:
            return c
          case 2:
            return new Date(c.getFullYear(), 0, 3)
          case 3:
            return new Date(c.getFullYear(), 0, 2)
          case 4:
            return new Date(c.getFullYear(), 0, 1)
          case 5:
            return new Date(c.getFullYear() - 1, 11, 31)
          case 6:
            return new Date(c.getFullYear() - 1, 11, 30)
        }
      }
      function t(c) {
        c = Y(new Date(c.A + 1900, 0, 1), c.G)
        let k = new Date(c.getFullYear() + 1, 0, 4)
        const q = r(new Date(c.getFullYear(), 0, 4))
        k = r(k)
        return 0 >= m(q, c)
          ? 0 >= m(k, c)
            ? c.getFullYear() + 1
            : c.getFullYear()
          : c.getFullYear() - 1
      }
      let l = Q[(f + 40) >> 2]
      f = {
        A: Q[(f + 20) >> 2],
        B: Q[(f + 16) >> 2],
        C: Q[(f + 12) >> 2],
        D: Q[(f + 8) >> 2],
        F: Q[(f + 24) >> 2],
        G: Q[(f + 28) >> 2],
        I: Q[(f + 36) >> 2],
        J: Q[(f + 4) >> 2],
        K: Q[f >> 2],
        L: l ? P(l) : '',
        P: Q[(f + 32) >> 2],
      }
      e = P(e)
      l = {
        '%c': '%a %b %d %H:%M:%S %Y',
        '%D': '%m/%d/%y',
        '%Ec': '%c',
        '%EC': '%C',
        '%Ex': '%m/%d/%y',
        '%EX': '%H:%M:%S',
        '%Ey': '%y',
        '%EY': '%Y',
        '%F': '%Y-%m-%d',
        '%h': '%b',
        '%Od': '%d',
        '%Oe': '%e',
        '%OH': '%H',
        '%OI': '%I',
        '%Om': '%m',
        '%OM': '%M',
        '%OS': '%S',
        '%Ou': '%u',
        '%OU': '%U',
        '%OV': '%V',
        '%Ow': '%w',
        '%OW': '%W',
        '%Oy': '%y',
        '%r': '%I:%M:%S %p',
        '%R': '%H:%M',
        '%T': '%H:%M:%S',
        '%x': '%m/%d/%y',
        '%X': '%H:%M:%S',
      }
      for (const p in l) e = e.replace(new RegExp(p, 'g'), l[p])
      const E =
        'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ')
      const Ga =
        'January February March April May June July August September October November December'.split(
          ' '
        )
      l = {
        '%%': () => '%',
        '%a': (c) => E[c.F].substring(0, 3),
        '%A': (c) => E[c.F],
        '%b': (c) => Ga[c.B].substring(0, 3),
        '%B': (c) => Ga[c.B],
        '%C': (c) => g(((c.A + 1900) / 100) | 0, 2),
        '%d': (c) => g(c.C, 2),
        '%e': (c) => h(c.C, 2, ' '),
        '%g': (c) => t(c).toString().substring(2),
        '%G': (c) => t(c),
        '%H': (c) => g(c.D, 2),
        '%I': (c) => {
          c = c.D
          0 === c ? (c = 12) : 12 < c && (c -= 12)
          return g(c, 2)
        },
        '%j': (c) => g(c.C + La(V(c.A + 1900) ? W : X, c.B - 1), 3),
        '%m': (c) => g(c.B + 1, 2),
        '%M': (c) => g(c.J, 2),
        '%n': () => '\n',
        '%p': (c) => (0 <= c.D && 12 > c.D ? 'AM' : 'PM'),
        '%S': (c) => g(c.K, 2),
        '%t': () => '\t',
        '%u': (c) => c.F || 7,
        '%U': (c) => {
          const k = new Date(c.A + 1900, 0, 1)
          const q = 0 === k.getDay() ? k : Y(k, 7 - k.getDay())
          c = new Date(c.A + 1900, c.B, c.C)
          return 0 > m(q, c)
            ? g(
                Math.ceil(
                  (31 -
                    q.getDate() +
                    (La(V(c.getFullYear()) ? W : X, c.getMonth() - 1) - 31) +
                    c.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(q, k)
              ? '01'
              : '00'
        },
        '%V': (c) => {
          let k = new Date(c.A + 1901, 0, 4)
          const q = r(new Date(c.A + 1900, 0, 4))
          k = r(k)
          const z = Y(new Date(c.A + 1900, 0, 1), c.G)
          return 0 > m(z, q)
            ? '53'
            : 0 >= m(k, z)
              ? '01'
              : g(
                  Math.ceil(
                    (q.getFullYear() < c.A + 1900
                      ? c.G + 32 - q.getDate()
                      : c.G + 1 - q.getDate()) / 7
                  ),
                  2
                )
        },
        '%w': (c) => c.F,
        '%W': (c) => {
          const k = new Date(c.A, 0, 1)
          const q =
            1 === k.getDay()
              ? k
              : Y(k, 0 === k.getDay() ? 1 : 7 - k.getDay() + 1)
          c = new Date(c.A + 1900, c.B, c.C)
          return 0 > m(q, c)
            ? g(
                Math.ceil(
                  (31 -
                    q.getDate() +
                    (La(V(c.getFullYear()) ? W : X, c.getMonth() - 1) - 31) +
                    c.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(q, k)
              ? '01'
              : '00'
        },
        '%y': (c) => (c.A + 1900).toString().substring(2),
        '%Y': (c) => c.A + 1900,
        '%z': (c) => {
          c = c.I
          const k = 0 <= c
          c = Math.abs(c) / 60
          return (
            (k ? '+' : '-') +
            String(`0000${(c / 60) * 100 + (c % 60)}`).slice(-4)
          )
        },
        '%Z': (c) => c.L,
      }
      for (p in l) e.includes(p) && (e = e.replace(new RegExp(p, 'g'), l[p](f)))
      p = Na(e)
      if (p.length > b) return 0
      O.set(p, a)
      return p.length - 1
    }
    function Na(a) {
      const b = Array(oa(a) + 1)
      ja(a, b, 0, b.length)
      return b
    }
    const Pa = {
      a: () => {
        J('')
      },
      b: (a, b, e, f) => {
        for (let h = 0, g = 0; g < e; g++) {
          const m = Q[b >> 2]
          const r = Q[(b + 4) >> 2]
          b += 8
          for (let t = 0; t < r; t++) {
            const l = N[m + t]
            const p = Ja[a]
            0 === l || 10 === l
              ? ((1 === a ? ha : H)(na(p, 0)), (p.length = 0))
              : p.push(l)
          }
          h += r
        }
        Q[f >> 2] = h
        return 0
      },
      c: (a) => {
        const b = N.length
        a >>>= 0
        if (2147483648 < a) return !1
        for (let e = 1; 4 >= e; e *= 2) {
          let f = b * (1 + 0.2 / e)
          f = Math.min(f, a + 100663296)
          f = Math.max(a, f)
          0 < f % 65536 && (f += 65536 - (f % 65536))
          a: {
            try {
              K.grow((Math.min(2147483648, f) - qa.byteLength + 65535) >>> 16)
              ra()
              const h = 1
              break a
            } catch (g) {}
            h = void 0
          }
          if (h) return !0
        }
        return !1
      },
      d: (a, b, e, f) => Ma(a, b, e, f),
      e: (a, b) => {
        let e = 0
        Ha().forEach((f, h) => {
          let g = b + e
          h = Q[(a + 4 * h) >> 2] = g
          for (g = 0; g < f.length; ++g) O[h++ >> 0] = f.charCodeAt(g)
          O[h >> 0] = 0
          e += f.length + 1
        })
        return 0
      },
      f: (a, b) => {
        const e = Ha()
        Q[a >> 2] = e.length
        let f = 0
        e.forEach((h) => {
          f += h.length + 1
        })
        Q[b >> 2] = f
        return 0
      },
      g: (a, b, e, f) => {
        a = Ka.O(a)
        b = Ka.M(a, b, e)
        Q[f >> 2] = b
        return 0
      },
      h: () => 0,
      i: () => {},
      j: (a, b) => {
        if (0 === a) a = Date.now()
        else if (1 === a || 4 === a) a = Da()
        else return (Q[Oa() >> 2] = 28), -1
        Q[b >> 2] = (a / 1e3) | 0
        Q[(b + 4) >> 2] = ((a % 1e3) * 1e6) | 0
        return 0
      },
      k: (a, b, e, f) => {
        J(
          `Assertion failed: ${P(a)}, at: ${[b ? P(b) : 'unknown filename', e, f ? P(f) : 'unknown function']}`
        )
      },
    }
    ;(() => {
      function a(h) {
        d.asm = h.exports
        K = d.asm.l
        ra()
        sa = d.asm.s
        ua.unshift(d.asm.m)
        R--
        d.monitorRunDependencies?.(R)
        0 === R &&
          (null !== ya && (clearInterval(ya), (ya = null)),
          S && ((h = S), (S = null), h()))
      }
      function b(h) {
        a(h.instance)
      }
      function e(h) {
        return Ca()
          .then((g) => WebAssembly.instantiate(g, f))
          .then((g) => g)
          .then(h, (g) => {
            H(`failed to asynchronously prepare wasm: ${g}`)
            J(g)
          })
      }
      const f = { a: Pa }
      R++
      d.monitorRunDependencies?.(R)
      if (d.instantiateWasm)
        try {
          return d.instantiateWasm(f, a)
        } catch (h) {
          return (
            H(`Module.instantiateWasm callback failed with error: ${h}`), !1
          )
        }
      ;(() =>
        I ||
        'function' !== typeof WebAssembly.instantiateStreaming ||
        za() ||
        T.startsWith('file://') ||
        'function' !== typeof fetch
          ? e(b)
          : fetch(T, { credentials: 'same-origin' }).then((h) =>
              WebAssembly.instantiateStreaming(h, f).then(b, (g) => {
                H(`wasm streaming compile failed: ${g}`)
                H('falling back to ArrayBuffer instantiation')
                return e(b)
              })
            ))().catch(n)
      return {}
    })()
    d.___wasm_call_ctors = () =>
      (d.___wasm_call_ctors = d.asm.m).apply(null, arguments)
    d._createBuffer = () => (d._createBuffer = d.asm.n).apply(null, arguments)
    d._deleteBuffer = () => (d._deleteBuffer = d.asm.o).apply(null, arguments)
    d._triggerDecode = () => (d._triggerDecode = d.asm.p).apply(null, arguments)
    d._getScanResults = () =>
      (d._getScanResults = d.asm.q).apply(null, arguments)
    d._main = () => (d._main = d.asm.r).apply(null, arguments)
    let Oa = (d.___errno_location = () =>
      (Oa = d.___errno_location = d.asm.t).apply(null, arguments))
    let ka = (d.stackSave = () =>
      (ka = d.stackSave = d.asm.u).apply(null, arguments))
    let la = (d.stackRestore = () =>
      (la = d.stackRestore = d.asm.v).apply(null, arguments))
    let M = (d.stackAlloc = () =>
      (M = d.stackAlloc = d.asm.w).apply(null, arguments))
    d.cwrap = (a, b, e, f) => {
      e = e || []
      const h = e.every((g) => 'number' === g)
      return 'string' !== b && h && !f
        ? d[`_${a}`]
        : () => ia(a, b, e, arguments)
    }
    d.UTF8ToString = P
    let Z
    function G(a) {
      this.name = 'ExitStatus'
      this.message = `Program terminated with exit(${a})`
      this.status = a
    }
    S = function Qa() {
      Z || Ra()
      Z || (S = Qa)
    }
    function Ra(a) {
      function b() {
        if (!Z && ((Z = !0), (d.calledRun = !0), !L)) {
          U(ua)
          U(va)
          ba(d)
          if (d.onRuntimeInitialized) d.onRuntimeInitialized()
          if (Sa) {
            let e = a
            const f = d._main
            e = e || []
            const h = e.length + 1
            const g = M(4 * (h + 1))
            Q[g >> 2] = pa(v)
            for (let m = 1; m < h; m++) Q[(g >> 2) + m] = pa(e[m - 1])
            Q[(g >> 2) + h] = 0
            try {
              const r = f(h, g)
              if (!(noExitRuntime || 0 < fa)) {
                if (d.onExit) d.onExit(r)
                L = !0
              }
              w(r, new G(r))
            } catch (t) {
              t instanceof G || 'unwind' === t || w(1, t)
            } finally {
            }
          }
          if (d.postRun)
            for (
              'function' === typeof d.postRun && (d.postRun = [d.postRun]);
              d.postRun.length;
            )
              (e = d.postRun.shift()), wa.unshift(e)
          U(wa)
        }
      }
      a = a || u
      if (!(0 < R)) {
        if (d.preRun)
          for (
            'function' === typeof d.preRun && (d.preRun = [d.preRun]);
            d.preRun.length;
          )
            xa()
        U(ta)
        0 < R ||
          (d.setStatus
            ? (d.setStatus('Running...'),
              setTimeout(() => {
                setTimeout(() => {
                  d.setStatus('')
                }, 1)
                b()
              }, 1))
            : b())
      }
    }
    d.run = Ra
    if (d.preInit)
      for (
        'function' === typeof d.preInit && (d.preInit = [d.preInit]);
        0 < d.preInit.length;
      )
        d.preInit.pop()()
    let Sa = !0
    d.noInitialRun && (Sa = !1)
    Ra()

    return CreateKoder.ready
  }
})()
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = CreateKoder
else if (typeof define === 'function' && define.amd)
  define([], () => CreateKoder)
else if (typeof exports === 'object') exports.CreateKoder = CreateKoder
