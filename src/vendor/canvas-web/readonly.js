class Ae {
  __destroy_into_raw() {
    const e = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ce.unregister(this), e;
  }
  free() {
    const e = this.__destroy_into_raw();
    r.__wbg_session_free(e, 0);
  }
  /**
   * Número de análises completas feitas por esta sessão (diagnóstico/testes).
   * @returns {number}
   */
  get analysis_count() {
    return r.session_analysis_count(this.__wbg_ptr) >>> 0;
  }
  /**
   * Mesmo retorno de `parse_and_analyze(source)`; reanalisa só se `source` mudou.
   *
   * # Errors
   *
   * Returns a [`JsValue`] error if JSON serialization fails.
   * @param {string} source
   * @returns {any}
   */
  analyze(e) {
    const a = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = r.session_analyze(this.__wbg_ptr, a, n);
    if (o[2])
      throw M(o[1]);
    return M(o[0]);
  }
  /**
   * Mesmo retorno de `compute_scene(source, positions)`, reaproveitando a análise da versão.
   *
   * # Errors
   *
   * Returns a [`JsValue`] error if JSON serialization fails.
   * @param {string} source
   * @param {any} positions_js
   * @returns {any}
   */
  compute_scene(e, a) {
    const n = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), o = _, s = r.session_compute_scene(this.__wbg_ptr, n, o, a);
    if (s[2])
      throw M(s[1]);
    return M(s[0]);
  }
  /**
   * Cria uma sessão vazia.
   */
  constructor() {
    const e = r.session_new();
    return this.__wbg_ptr = e, Ce.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Arestas roteadas (`RoutedEdge[]`) para `positions`, sem reanalisar. Barato o bastante
   * para rodar a cada quadro do arrasto. Exige `analyze`/`compute_scene` prévio.
   *
   * # Errors
   *
   * Returns a [`JsValue`] error if there is no analysed document yet, `positions_js` is not
   * a `{name: {x, y}}` object, or JSON serialization fails.
   * @param {any} positions_js
   * @returns {any}
   */
  route_edges(e) {
    const a = r.session_route_edges(this.__wbg_ptr, e);
    if (a[2])
      throw M(a[1]);
    return M(a[0]);
  }
}
Symbol.dispose && (Ae.prototype[Symbol.dispose] = Ae.prototype.free);
function Pe(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = r.apply_command(a, n, e);
  if (o[2])
    throw M(o[1]);
  return M(o[0]);
}
function Ue(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = r.compute_layout(a, n, e);
  if (o[2])
    throw M(o[1]);
  return M(o[0]);
}
function Ve(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = r.compute_scene(a, n, e);
  if (o[2])
    throw M(o[1]);
  return M(o[0]);
}
function ze(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _, d = r.diff_dbml(a, n, o, s);
  if (d[2])
    throw M(d[1]);
  return M(d[0]);
}
function Ge(t, e, a) {
  let n, o;
  try {
    const s = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), d = _, l = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), p = _, x = b(a, r.__wbindgen_malloc, r.__wbindgen_realloc), w = _, y = r.export_docs_html(s, d, l, p, x, w);
    return n = y[0], o = y[1], P(y[0], y[1]);
  } finally {
    r.__wbindgen_free(n, o, 1);
  }
}
function je(t, e) {
  let a, n;
  try {
    const o = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _, d = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), l = _, p = r.export_docs_markdown(o, s, d, l);
    return a = p[0], n = p[1], P(p[0], p[1]);
  } finally {
    r.__wbindgen_free(a, n, 1);
  }
}
function We(t, e) {
  let a, n;
  try {
    const d = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), l = _, p = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), x = _, w = r.export_sql_ddl(d, l, p, x);
    var o = w[0], s = w[1];
    if (w[3])
      throw o = 0, s = 0, M(w[2]);
    return a = o, n = s, P(o, s);
  } finally {
    r.__wbindgen_free(a, n, 1);
  }
}
function Ye(t) {
  let e, a;
  try {
    const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = _, s = r.format_dbml(n, o);
    return e = s[0], a = s[1], P(s[0], s[1]);
  } finally {
    r.__wbindgen_free(e, a, 1);
  }
}
function Ze(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _, d = r.import_conflicts(a, n, o, s);
  var l = ot(d[0], d[1]);
  return r.__wbindgen_free(d[0], d[1] * 4, 4), l;
}
function Qe(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _, d = r.import_sql_ddl(a, n, o, s);
  if (d[2])
    throw M(d[1]);
  return M(d[0]);
}
function Ke() {
  r.install_panic_hook();
}
function Xe(t) {
  const e = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), a = _, n = r.parse_and_analyze(e, a);
  if (n[2])
    throw M(n[1]);
  return M(n[0]);
}
function Je(t) {
  const e = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), a = _, n = r.parse_connection_url(e, a);
  if (n[2])
    throw M(n[1]);
  return M(n[0]);
}
function et(t, e) {
  const a = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), n = _, o = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _, d = r.search_schema(a, n, o, s);
  if (d[2])
    throw M(d[1]);
  return M(d[0]);
}
function tt(t, e, a) {
  let n, o;
  try {
    const s = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), d = _, l = b(e, r.__wbindgen_malloc, r.__wbindgen_realloc), p = _, x = b(a, r.__wbindgen_malloc, r.__wbindgen_realloc), w = _, y = r.suggest_junction_name(s, d, l, p, x, w);
    return n = y[0], o = y[1], P(y[0], y[1]);
  } finally {
    r.__wbindgen_free(n, o, 1);
  }
}
function at(t, e, a) {
  const n = b(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = _, s = r.swap_dbml_lines(n, o, e, a);
  if (s[2])
    throw M(s[1]);
  return M(s[0]);
}
function $e() {
  return {
    __proto__: null,
    "./dbml_wasm_bg.js": {
      __proto__: null,
      __wbg_Error_30c8987f7c2ed4e2: function(e, a) {
        return Error(P(e, a));
      },
      __wbg_Number_14af1003b8dd5ead: function(e) {
        return Number(e);
      },
      __wbg_String_8564e559799eccda: function(e, a) {
        const n = String(a), o = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _;
        k().setInt32(e + 4, s, !0), k().setInt32(e + 0, o, !0);
      },
      __wbg___wbindgen_bigint_get_as_i64_a2383202b9353e4c: function(e, a) {
        const n = a, o = typeof n == "bigint" ? n : void 0;
        k().setBigInt64(e + 8, ae(o) ? BigInt(0) : o, !0), k().setInt32(e + 0, !ae(o), !0);
      },
      __wbg___wbindgen_boolean_get_5b446f51afd21013: function(e) {
        const a = e, n = typeof a == "boolean" ? a : void 0;
        return ae(n) ? 16777215 : n ? 1 : 0;
      },
      __wbg___wbindgen_debug_string_4687d8d8c2017d52: function(e, a) {
        const n = Se(a), o = b(n, r.__wbindgen_malloc, r.__wbindgen_realloc), s = _;
        k().setInt32(e + 4, s, !0), k().setInt32(e + 0, o, !0);
      },
      __wbg___wbindgen_in_92f62ee1427d9e49: function(e, a) {
        return e in a;
      },
      __wbg___wbindgen_is_bigint_b123553bed3bb382: function(e) {
        return typeof e == "bigint";
      },
      __wbg___wbindgen_is_function_1f9d30630b8b1d3d: function(e) {
        return typeof e == "function";
      },
      __wbg___wbindgen_is_null_e343b7d08827ba72: function(e) {
        return e === null;
      },
      __wbg___wbindgen_is_object_3c45d4f2dde4e749: function(e) {
        const a = e;
        return typeof a == "object" && a !== null;
      },
      __wbg___wbindgen_is_string_90b56bc79aad6f6c: function(e) {
        return typeof e == "string";
      },
      __wbg___wbindgen_is_undefined_8865fb403f8fe9d8: function(e) {
        return e === void 0;
      },
      __wbg___wbindgen_jsval_eq_02babf21faa37971: function(e, a) {
        return e === a;
      },
      __wbg___wbindgen_jsval_loose_eq_677f21e468d6b461: function(e, a) {
        return e == a;
      },
      __wbg___wbindgen_number_get_2e0e7dee9f701a71: function(e, a) {
        const n = a, o = typeof n == "number" ? n : void 0;
        k().setFloat64(e + 8, ae(o) ? 0 : o, !0), k().setInt32(e + 0, !ae(o), !0);
      },
      __wbg___wbindgen_string_get_0380ccaa2f57f0d9: function(e, a) {
        const n = a, o = typeof n == "string" ? n : void 0;
        var s = ae(o) ? 0 : b(o, r.__wbindgen_malloc, r.__wbindgen_realloc), d = _;
        k().setInt32(e + 4, d, !0), k().setInt32(e + 0, s, !0);
      },
      __wbg___wbindgen_throw_41e9ee4f547fc59a: function(e, a) {
        throw new Error(P(e, a));
      },
      __wbg_call_6137034ef55c9d0f: function() {
        return we(function(e, a) {
          return e.call(a);
        }, arguments);
      },
      __wbg_done_b41a1d26cdb37fb6: function(e) {
        return e.done;
      },
      __wbg_entries_fb6397112b1de25f: function(e) {
        return Object.entries(e);
      },
      __wbg_error_2348296f1f87ca32: function(e, a) {
        console.error(P(e, a));
      },
      __wbg_get_658f6698067d9515: function() {
        return we(function(e, a) {
          return Reflect.get(e, a);
        }, arguments);
      },
      __wbg_get_6c896e0571ddae51: function(e, a) {
        return e[a >>> 0];
      },
      __wbg_get_unchecked_288889d017702237: function(e, a) {
        return e[a >>> 0];
      },
      __wbg_get_with_ref_key_6412cf3094599694: function(e, a) {
        return e[a];
      },
      __wbg_instanceof_ArrayBuffer_a99f175873e5d9b8: function(e) {
        let a;
        try {
          a = e instanceof ArrayBuffer;
        } catch {
          a = !1;
        }
        return a;
      },
      __wbg_instanceof_Map_b2611749102d7ba3: function(e) {
        let a;
        try {
          a = e instanceof Map;
        } catch {
          a = !1;
        }
        return a;
      },
      __wbg_instanceof_Uint8Array_828cef2aaacafc31: function(e) {
        let a;
        try {
          a = e instanceof Uint8Array;
        } catch {
          a = !1;
        }
        return a;
      },
      __wbg_isArray_e15a2ff68ffdbef2: function(e) {
        return Array.isArray(e);
      },
      __wbg_isSafeInteger_717808ad6a54bd9e: function(e) {
        return Number.isSafeInteger(e);
      },
      __wbg_iterator_e3c31c892080e444: function() {
        return Symbol.iterator;
      },
      __wbg_length_7f3c00c40364105e: function(e) {
        return e.length;
      },
      __wbg_length_d4bdea10311bd9cf: function(e) {
        return e.length;
      },
      __wbg_new_1dbf7428bba60a42: function(e) {
        return new Uint8Array(e);
      },
      __wbg_new_28744009d011f847: function() {
        return /* @__PURE__ */ new Map();
      },
      __wbg_new_617a8cdb8bb1130e: function() {
        return new Object();
      },
      __wbg_new_ee2291f50781bf1d: function() {
        return new Array();
      },
      __wbg_next_33784799010f1bbe: function(e) {
        return e.next;
      },
      __wbg_next_f4aac29c42af995c: function() {
        return we(function(e) {
          return e.next();
        }, arguments);
      },
      __wbg_prototypesetcall_bc27214492979395: function(e, a, n) {
        Uint8Array.prototype.set.call(rt(e, a), n);
      },
      __wbg_set_6ae97e73113c4f0b: function(e, a, n) {
        return e.set(a, n);
      },
      __wbg_set_6be42768c690e380: function(e, a, n) {
        e[a] = n;
      },
      __wbg_set_bea140a88be9b277: function(e, a, n) {
        e[a >>> 0] = n;
      },
      __wbg_value_f3c585ee8f5ba40c: function(e) {
        return e.value;
      },
      __wbindgen_generic_0000000000000001: function(e) {
        return e;
      },
      __wbindgen_generic_0000000000000002: function(e) {
        return e;
      },
      __wbindgen_generic_0000000000000003: function(e, a) {
        return P(e, a);
      },
      __wbindgen_generic_0000000000000004: function(e) {
        return BigInt.asUintN(64, e);
      },
      __wbindgen_init_externref_table: function() {
        const e = r.__wbindgen_externrefs, a = e.grow(4);
        e.set(0, void 0), e.set(a + 0, void 0), e.set(a + 1, null), e.set(a + 2, !0), e.set(a + 3, !1);
      }
    }
  };
}
const Ce = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((t) => r.__wbg_session_free(t, 1));
function nt(t) {
  const e = r.__externref_table_alloc();
  return r.__wbindgen_externrefs.set(e, t), e;
}
function Se(t) {
  const e = typeof t;
  if (e == "number" || e == "boolean" || t == null)
    return `${t}`;
  if (e == "string")
    return `"${t}"`;
  if (e == "symbol") {
    const o = t.description;
    return o == null ? "Symbol" : `Symbol(${o})`;
  }
  if (e == "function") {
    const o = t.name;
    return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
  }
  if (Array.isArray(t)) {
    const o = t.length;
    let s = "[";
    o > 0 && (s += Se(t[0]));
    for (let d = 1; d < o; d++)
      s += ", " + Se(t[d]);
    return s += "]", s;
  }
  const a = /\[object ([^\]]+)\]/.exec(toString.call(t));
  let n;
  if (a && a.length > 1)
    n = a[1];
  else
    return toString.call(t);
  if (n == "Object")
    try {
      return "Object(" + JSON.stringify(t) + ")";
    } catch {
      return "Object";
    }
  return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : n;
}
function ot(t, e) {
  t = t >>> 0;
  const a = k(), n = [];
  for (let o = t; o < t + 4 * e; o += 4)
    n.push(r.__wbindgen_externrefs.get(a.getUint32(o, !0)));
  return r.__externref_drop_slice(t, e), n;
}
function rt(t, e) {
  return t = t >>> 0, de().subarray(t / 1, t / 1 + e);
}
let X = null;
function k() {
  return (X === null || X.buffer.detached === !0 || X.buffer.detached === void 0 && X.buffer !== r.memory.buffer) && (X = new DataView(r.memory.buffer)), X;
}
function P(t, e) {
  return st(t >>> 0, e);
}
let le = null;
function de() {
  return (le === null || le.byteLength === 0) && (le = new Uint8Array(r.memory.buffer)), le;
}
function we(t, e) {
  try {
    return t.apply(this, e);
  } catch (a) {
    const n = nt(a);
    r.__wbindgen_exn_store(n);
  }
}
function ae(t) {
  return t == null;
}
function b(t, e, a) {
  if (a === void 0) {
    const l = ue.encode(t), p = e(l.length, 1) >>> 0;
    return de().subarray(p, p + l.length).set(l), _ = l.length, p;
  }
  let n = t.length, o = e(n, 1) >>> 0;
  const s = de();
  let d = 0;
  for (; d < n; d++) {
    const l = t.charCodeAt(d);
    if (l > 127) break;
    s[o + d] = l;
  }
  if (d !== n) {
    d !== 0 && (t = t.slice(d)), o = a(o, n, n = d + t.length * 3, 1) >>> 0;
    const l = de().subarray(o + d, o + n), p = ue.encodeInto(t, l);
    d += p.written, o = a(o, n, d, 1) >>> 0;
  }
  return _ = d, o;
}
function M(t) {
  const e = r.__wbindgen_externrefs.get(t);
  return r.__externref_table_dealloc(t), e;
}
let ge = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
ge.decode();
const it = 2146435072;
let ye = 0;
function st(t, e) {
  return ye += e, ye >= it && (ge = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }), ge.decode(), ye = e), ge.decode(de().subarray(t, t + e));
}
const ue = new TextEncoder();
"encodeInto" in ue || (ue.encodeInto = function(t, e) {
  const a = ue.encode(t);
  return e.set(a), {
    read: t.length,
    written: a.length
  };
});
let _ = 0, r;
function Re(t, e) {
  return r = t.exports, X = null, le = null, r.__wbindgen_start(), r;
}
async function ct(t, e) {
  if (typeof Response == "function" && t instanceof Response) {
    if (!t.ok)
      throw new Error(`failed to fetch Wasm: ${t.status} ${t.statusText} fetching '${t.url}'`);
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(t, e);
      } catch (o) {
        if (a(t.type) && t.headers.get("Content-Type") !== "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", o);
        else
          throw o;
      }
    const n = await t.arrayBuffer();
    return await WebAssembly.instantiate(n, e);
  } else {
    const n = await WebAssembly.instantiate(t, e);
    return n instanceof WebAssembly.Instance ? { instance: n, module: t } : n;
  }
  function a(n) {
    switch (n) {
      case "basic":
      case "cors":
      case "default":
        return !0;
    }
    return !1;
  }
}
function lt(t) {
  if (r !== void 0) return r;
  t !== void 0 && (Object.getPrototypeOf(t) === Object.prototype ? { module: t } = t : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const e = $e();
  t instanceof WebAssembly.Module || (t = new WebAssembly.Module(t));
  const a = new WebAssembly.Instance(t, e);
  return Re(a);
}
async function Ne(t) {
  if (r !== void 0) return r;
  t !== void 0 && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), t === void 0 && (t = new URL(
    /* @vite-ignore */
    "dbml_wasm_bg.wasm",
    import.meta.url
  ));
  const e = $e();
  (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
  const { instance: a, module: n } = await ct(await t, e);
  return Re(a);
}
const dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Session: Ae,
  apply_command: Pe,
  compute_layout: Ue,
  compute_scene: Ve,
  default: Ne,
  diff_dbml: ze,
  export_docs_html: Ge,
  export_docs_markdown: je,
  export_sql_ddl: We,
  format_dbml: Ye,
  import_conflicts: Ze,
  import_sql_ddl: Qe,
  initSync: lt,
  install_panic_hook: Ke,
  parse_and_analyze: Xe,
  parse_connection_url: Je,
  search_schema: et,
  suggest_junction_name: tt,
  swap_dbml_lines: at
}, Symbol.toStringTag, { value: "Module" })), ke = "dbml", Oe = "deflate-raw", ut = 1024 * 1024, ht = 360, pt = 0.92, mt = 1, ft = 15e-4, gt = "modifier", _t = "always", Le = 1.2, me = 48, bt = "pan-x pan-y", xe = 2, wt = "dbm-readonly", yt = "→", xt = [
  ["O motor de análise falhou. Exporte o DBML e recarregue a página para continuar.", "The analysis engine failed. Export the DBML and reload the page to continue."],
  ["Motor de análise parado. Recarregue a página.", "Analysis engine stopped. Reload the page."],
  ["Barra de título", "Title bar"],
  ["O link do exemplo está inválido ou corrompido e foi ignorado.", "The example link is invalid or corrupted and was ignored."],
  ["Documento não salvo", "Unsaved document"],
  ["Diagrama com {} tabelas: {}.", "Diagram with {} tables: {}."],
  ["Diagrama com 1 tabela: {}.", "Diagram with 1 table: {}."],
  ["Diagrama vazio.", "Empty diagram."],
  ["Relações: {}.", "Relationships: {}."],
  ["Sem relações.", "No relationships."],
  ["Painéis", "Panels"],
  ["Painel lateral", "Side panel"],
  ["Editor DBML", "DBML editor"],
  ["Diagrama", "Diagram"],
  ["Ferramentas", "Tools"],
  ["Inspetor", "Inspector"],
  ["chave primária", "primary key"],
  ["chave estrangeira", "foreign key"],
  ["obrigatória", "required"],
  ["única", "unique"],
  ["Tabela {}, 1 coluna", "Table {}, 1 column"],
  ["Tabela {}, {} colunas", "Table {}, {} columns"],
  ["selecionada", "selected"],
  ["Grupo {}", "Group {}"],
  ["Enum {}, 1 valor", "Enum {}, 1 value"],
  ["Enum {}, {} valores", "Enum {}, {} values"],
  ["{} selecionada", "{} selected"],
  ["{} itens selecionados", "{} items selected"],
  ["{} movida para x {}, y {}", "{} moved to x {}, y {}"],
  ["{} itens", "{} items"],
  ["Nome do enum", "Enum name"],
  ["Nome da tabela", "Table name"],
  ["Nome da coluna", "Column name"],
  ["A conexão demorou mais de {} s e foi cancelada. Confira o host e a porta.", "The connection took longer than {} s and was cancelled. Check the host and port."],
  ["Sem conexão com o servidor. Edições não serão salvas.", "Disconnected from the server. Edits will not be saved."],
  ["Reconectando ao servidor…", "Reconnecting to the server…"],
  ["Suas alterações continuam abertas. Tente salvar novamente ou exporte uma cópia em DBML.", "Your changes are still open. Try saving again or export a DBML copy."],
  ["O DBML foi salvo, mas o layout do diagrama não foi gravado. Tente salvar novamente.", "The DBML was saved, but the diagram layout was not. Try saving again."],
  ["O layout do diagrama não foi gravado. Tente salvar novamente.", "The diagram layout was not saved. Try saving again."],
  ["O arquivo foi movido ou removido. Escolha o arquivo novamente.", "The file was moved or removed. Choose the file again."],
  ["Sem acesso ao arquivo. Verifique as permissões ou abra uma cópia.", "The file could not be accessed. Check permissions or open a copy."],
  ["Não foi possível abrir o arquivo. Selecione-o novamente.", "Could not open the file. Select it again."],
  ["Não foi possível gerar {}. Tente exportar em SVG.", "Could not generate {}. Try exporting as SVG."],
  ["Não foi possível exportar {}. Tente outro nome ou outra pasta.", "Could not export {}. Try a different name or folder."],
  ["Revise o DBML antes de exportar SQL: {}", "Check the DBML before exporting SQL: {}"],
  ["O SQLite não aceita o schema {} nesta exportação. Escolha outro dialeto.", "SQLite does not support the schema {} in this export. Choose another dialect."],
  ["O banco recusou a autenticação. Confira o usuário e a senha.", "The database rejected authentication. Check the user and password."],
  ["O banco não respondeu. Confira o host, a porta e se o serviço está rodando.", "The database did not respond. Check the host, port, and whether the service is running."],
  ["Não foi possível ler o esquema. Verifique as permissões de leitura do catálogo.", "Could not read the schema. Check permissions to read the catalog."],
  ["O certificado TLS do servidor não pôde ser verificado (comum em AWS RDS, GCP Cloud SQL, Azure e Supabase). Mude TLS para Exigir e tente novamente.", "The server's TLS certificate could not be verified (common on AWS RDS, GCP Cloud SQL, Azure, and Supabase). Switch TLS to Require and try again."],
  ["Detalhes", "Details"],
  ["Ocultar detalhes", "Hide details"],
  ["Usar TLS: Exigir", "Use TLS: Require"],
  ["Usar SSL", "Use SSL"],
  ["Verificar certificado", "Verify certificate"],
  ["Auto (TLS verificado em hosts remotos)", "Auto (verified TLS on remote hosts)"],
  ["Verificar certificado (TLS)", "Verify certificate (TLS)"],
  ["Exigir TLS (autoassinado)", "Require TLS (self-signed)"],
  ["Desativar TLS (texto claro)", "Disable TLS (cleartext)"],
  ["Não foi possível abrir o banco SQLite. Confira o caminho e as permissões do arquivo.", "Could not open the SQLite database. Check the file path and permissions."],
  ["Não foi possível conectar. Confira os dados da conexão e tente novamente.", "Could not connect. Check the connection details and try again."],
  ["Arquivo", "File"],
  ["Mais ações", "More actions"],
  ["Verificando CLI dbml…", "Checking the dbml CLI…"],
  ["CLI dbml indisponível. Instale-a ou configure dbmodeling.cliPath.", "The dbml CLI is unavailable. Install it or set dbmodeling.cliPath."],
  ["{} erro", "{} error"],
  ["{} erros", "{} errors"],
  ["sincronizado", "synced"],
  ["O documento mudou fora desta tela. Exporte suas alterações antes de recarregar.", "The document changed outside this view. Export your changes before reloading."],
  ["DBML salvo. Falha ao salvar o layout: {}", "DBML saved. Could not save the layout: {}"],
  ["Redimensionar painel esquerdo", "Resize left panel"],
  ["Redimensionar inspetor", "Resize inspector"],
  ["Tabela", "Table"],
  ["Excluir FK", "Delete FK"],
  ["Já existem no modelo: {}.", "Already in the model: {}."],
  ["Obrigatório", "Required"],
  ["Único", "Unique"],
  ["Editar", "Edit"],
  ["Exibir", "View"],
  ["Canvas", "Canvas"],
  ["Relação", "Relationship"],
  ["Aparência", "Appearance"],
  ["Editor", "Editor"],
  ["Ajuda", "Help"],
  ["Exportar código", "Export code"],
  ["Exportar imagem", "Export image"],
  ["Tabelas", "Tables"],
  ["Colunas", "Columns"],
  ["Novo arquivo", "New file"],
  ["Salvar", "Save"],
  ["Exportar DBML (.dbml)", "Export DBML (.dbml)"],
  ["Importar SQL DDL…", "Import SQL DDL…"],
  ["Conectar ao banco…", "Connect to database…"],
  ["Desfazer", "Undo"],
  ["Refazer", "Redo"],
  ["Mostrar arquivos do projeto", "Show project files"],
  ["Mostrar esquema (tabelas)", "Show schema (tables)"],
  ["Mostrar problemas", "Show problems"],
  ["Tema: Claro", "Theme: Light"],
  ["Tema: Escuro", "Theme: Dark"],
  ["Alternar translúcido", "Toggle translucency"],
  ["Alternar tema claro/escuro", "Toggle light/dark theme"],
  ["Visão Diagrama", "Diagram view"],
  ["Visão Dividido · DBML", "Split view · DBML"],
  ["Filtrar tabelas no Explorador", "Filter tables in Explorer"],
  ["Alternar editor DBML", "Toggle DBML editor"],
  ["Alternar barra lateral", "Toggle sidebar"],
  ["Alternar inspetor", "Toggle inspector"],
  ["Alternar legenda", "Toggle legend"],
  ["Ferramenta Selecionar", "Select tool"],
  ["Ferramenta Mão (mover a vista)", "Hand tool (pan view)"],
  ["Ajustar à tela", "Fit to screen"],
  ["Auto-layout", "Auto-layout"],
  ["Aumentar zoom", "Zoom in"],
  ["Diminuir zoom", "Zoom out"],
  ["Relação: reta/curva", "Relationship: straight/curved"],
  ["Relação: restaurar curva automática", "Relationship: reset automatic curve"],
  ["Limpar seleção", "Clear selection"],
  ["Nova tabela", "New table"],
  ["Novo enum", "New enum"],
  ["Excluir tabelas selecionadas", "Delete selected tables"],
  ["Renomear tabela", "Rename table"],
  ["Agrupar tabelas selecionadas", "Group selected tables"],
  ["Desagrupar tabela", "Ungroup table"],
  ["Aumentar escala da interface (fontes e ícones)", "Increase interface scale (fonts and icons)"],
  ["Diminuir escala da interface (fontes e ícones)", "Decrease interface scale (fonts and icons)"],
  ["Redefinir escala da interface", "Reset interface scale"],
  ["Recolher inspetor automaticamente sem seleção", "Auto-collapse inspector when nothing is selected"],
  ["Formatar documento", "Format document"],
  ["Mover linha para cima", "Move line up"],
  ["Mover linha para baixo", "Move line down"],
  ["Paleta de comandos", "Command palette"],
  ["Atalhos de teclado", "Keyboard shortcuts"],
  ["Tour guiado", "Guided tour"],
  ["O que há de novo", "What's new"],
  ["Ver novidades desta versão", "See what's new in this version"],
  ["Novidades da versão {}", "What's new in v{}"],
  ["Histórico de atualizações", "Release history"],
  ["Passo {} de {}", "Step {} of {}"],
  ["Anterior", "Back"],
  ["Próximo", "Next"],
  ["Concluir", "Finish"],
  ["Pular", "Skip"],
  ["Entendi", "Got it"],
  ["Experimentar", "Try it"],
  ["Novo", "New"],
  ["Melhorado", "Improved"],
  ["Corrigido", "Fixed"],
  ["TEMA", "THEME"],
  ["IDIOMA", "LANGUAGE"],
  ["ESCALA DA UI", "UI SCALE"],
  ["PAINÉIS", "PANELS"],
  ["Claro", "Light"],
  ["Escuro", "Dark"],
  ["Translúcido", "Translucent"],
  ["A janela deixa ver o que está atrás, desfocado", "The window shows a blurred view of what is behind it"],
  ["Recolher inspetor automaticamente", "Auto-collapse inspector"],
  ["Oculta quando nada está selecionado", "Hidden when nothing is selected"],
  ["Adicionar predefinição de coluna: {}", "Add column preset: {}"],
  ["Exportar código: PostgreSQL (.sql)", "Export code: PostgreSQL (.sql)"],
  ["Exportar código: MySQL (.sql)", "Export code: MySQL (.sql)"],
  ["Exportar código: SQLite (.sql)", "Export code: SQLite (.sql)"],
  ["Exportar código: SQL Server (.sql)", "Export code: SQL Server (.sql)"],
  ["Exportar código: Oracle (.sql)", "Export code: Oracle (.sql)"],
  ["Exportar código: Mermaid erDiagram (.mmd)", "Export code: Mermaid erDiagram (.mmd)"],
  ["Exportar imagem: PNG", "Export image: PNG"],
  ["Exportar imagem: JPEG", "Export image: JPEG"],
  ["Exportar imagem: SVG vetorial", "Export image: Vector SVG"],
  ["Nenhuma tabela ainda", "No tables yet"],
  ["Escreva seu esquema DBML no editor ou crie uma nova tabela.", "Write your DBML schema in the editor or create a new table."],
  ["Abrir editor DBML", "Open DBML editor"],
  ["Importar SQL DDL", "Import SQL DDL"],
  ["Conectar ao banco", "Connect to database"],
  ["Alternar painel lateral · Ctrl+B", "Toggle sidebar · Ctrl+B"],
  ["Novo arquivo · Ctrl+N", "New file · Ctrl+N"],
  ["Exportar DBML", "Export DBML"],
  ["Alternar tema · Ctrl+T", "Toggle theme · Ctrl+T"],
  ["Arquivos · Ctrl+Shift+E", "Files · Ctrl+Shift+E"],
  ["Tabelas · Ctrl+Shift+D", "Tables · Ctrl+Shift+D"],
  ["Problemas · Ctrl+Shift+M", "Problems · Ctrl+Shift+M"],
  ["Editor DBML · Ctrl+E", "DBML editor · Ctrl+E"],
  ["Atalhos de teclado · Ctrl+/", "Keyboard shortcuts · Ctrl+/"],
  ["Paleta de comandos · Ctrl+K", "Command palette · Ctrl+K"],
  ["Selecionar · V", "Select · V"],
  ["Mão: mover a vista · H", "Hand: pan view · H"],
  ["Nova tabela · T", "New table · T"],
  ["Novo enum · E", "New enum · E"],
  ["Agrupar seleção · Ctrl+G", "Group selection · Ctrl+G"],
  ["Auto-layout · Ctrl+L", "Auto-layout · Ctrl+L"],
  ["LEGENDA", "LEGEND"],
  ["Fechar", "Close"],
  ["Chave primária", "Primary key"],
  ["Chave estrangeira", "Foreign key"],
  ["Obrigatório (NN) · Único (UQ)", "Required (NN) · Unique (UQ)"],
  ["Relação (coluna → coluna)", "Relationship (column → column)"],
  ["Cardinalidade: muitos · um", "Cardinality: many · one"],
  ["Tabela selecionada e relações", "Selected table and relationships"],
  ["Problemas", "Problems"],
  ["Modelo válido", "Valid model"],
  ["problema", "problem"],
  ["problemas", "problems"],
  ["aviso", "warning"],
  ["avisos", "warnings"],
  ["{} tabelas · {} relações", "{} tables · {} relationships"],
  ["Buscar tabelas, colunas, comandos…", "Search tables, columns, commands…"],
  ["Buscar tabelas, colunas, comandos · Ctrl+K", "Search tables, columns, commands · Ctrl+K"],
  ["Diagrama · Ctrl+1", "Diagram · Ctrl+1"],
  ["Dividido · DBML · Ctrl+2", "Split · DBML · Ctrl+2"],
  ["Alternar inspector · Ctrl+I", "Toggle inspector · Ctrl+I"],
  ["Alterações não salvas", "Unsaved changes"],
  ["Diminuir zoom · Ctrl+-", "Zoom out · Ctrl+-"],
  ["Ajustar à tela · Shift+1", "Fit to screen · Shift+1"],
  ["Aumentar zoom · Ctrl+=", "Zoom in · Ctrl+="],
  ["Legenda · Ctrl+Shift+L", "Legend · Ctrl+Shift+L"],
  ["Nenhum arquivo .dbml encontrado no workspace.", "No .dbml files found in the workspace."],
  ["Projeto", "Project"],
  ["Fechar painel · Ctrl+B", "Close panel · Ctrl+B"],
  ["GRUPOS", "GROUPS"],
  ["SEM GRUPO", "UNGROUPED"],
  ["TABELAS", "TABLES"],
  ["RELAÇÕES", "RELATIONSHIPS"],
  ["Filtrar esquema…", "Filter schema…"],
  ["Esquema", "Schema"],
  ["Filtrar esquema · Ctrl+Shift+F", "Filter schema · Ctrl+Shift+F"],
  ["Nenhum problema neste arquivo", "No problems in this file"],
  ["linha", "line"],
  ["{} resultados", "{} results"],
  ["Indexada", "Indexed"],
  ["Adicionar coluna", "Add column"],
  ["(vazio)", "(empty)"],
  ["Formatar documento · Alt+Shift+F", "Format document · Alt+Shift+F"],
  ["Fechar editor · Ctrl+E", "Close editor · Ctrl+E"],
  ["Propriedades", "Properties"],
  ["Ocultar inspector · Ctrl+I", "Hide inspector · Ctrl+I"],
  ["sem grupo", "ungrouped"],
  ["Shift+clique adiciona ou remove", "Shift+click adds or removes"],
  ["Agrupar seleção", "Group selection"],
  ["Mover para cima", "Move up"],
  ["Mover para baixo", "Move down"],
  ["Excluir valor", "Delete value"],
  ["Nenhuma coluna referencia este enum", "No columns reference this enum"],
  ["Adicionar valor", "Add value"],
  ["Excluir enum", "Delete enum"],
  ["Nenhuma", "None"],
  ["sem ação", "no action"],
  ["restringir", "restrict"],
  ["cascata", "cascade"],
  ["definir nulo", "set null"],
  ["definir padrão", "set default"],
  ["Excluir relação", "Delete relationship"],
  ["Clique em uma tabela para ver colunas, cor, grupo e relações. Shift+clique seleciona várias.", "Click a table to view columns, color, group and relationships. Shift+click selects multiple tables."],
  ["Sem cor", "No color"],
  ["Tipo", "Type"],
  ["Padrão", "Default"],
  ["nenhum", "none"],
  ["expressão…", "expression…"],
  ["Excluir coluna", "Delete column"],
  ["padrão", "default"],
  ["nome do índice (opcional)", "index name (optional)"],
  ["Excluir índice", "Delete index"],
  ["Modo", "Mode"],
  ["Índice único", "Unique index"],
  ["único", "unique"],
  ["Chave primária composta", "Composite primary key"],
  ["primário", "primary"],
  ["Excluir relação e coluna FK", "Delete relationship and FK column"],
  ["Alterar ou remover grupo", "Change or remove group"],
  ["Escolher grupo", "Choose group"],
  ["Sem grupo", "No group"],
  ["GERAL", "GENERAL"],
  ["Grupo", "Group"],
  ["Cor", "Color"],
  ["COLUNAS", "COLUMNS"],
  ["ÍNDICES", "INDEXES"],
  ["Adicionar índice", "Add index"],
  ["Sem índices · a chave primária é indexada automaticamente", "No indexes · the primary key is indexed automatically"],
  ["Sem relações · arraste de uma coluna para outra tabela", "No relationships · drag from a column to another table"],
  ["Excluir tabela", "Delete table"],
  ["Selecione uma tabela para adicionar a predefinição de coluna", "Select a table to add the column preset"],
  ["Criar grupo", "Create group"],
  ["Conectar ao banco precisa do servidor `dbml run` ou da CLI dbml no PATH.", "Connecting to a database requires the `dbml run` server or the dbml CLI on PATH."],
  ["Faça engenharia reversa de um esquema existente para DBML.", "Reverse engineer an existing schema into DBML."],
  ["Suporte a Oracle em breve", "Oracle support coming soon"],
  ["Oracle (em breve)", "Oracle (coming soon)"],
  ["Tipo de banco", "Database type"],
  ["em breve", "coming soon"],
  ["Connection string", "Connection string"],
  ["Copiar string", "Copy string"],
  ["Copiado", "Copied"],
  ["Copia a string com a senha mascarada (***)", "Copies the string with the password masked (***)"],
  ["Copia a string completa, com a senha", "Copies the full string, including the password"],
  ["Não foi possível copiar a string.", "Could not copy the string."],
  ["Mostrar senha", "Show password"],
  ["Ocultar senha", "Hide password"],
  ["Mostrar/ocultar senha da conexão", "Show/hide connection password"],
  ["Informe a connection string.", "Enter a connection string."],
  ["Esquema desconhecido. Use postgres://, mysql://, sqlserver:// ou um arquivo SQLite.", "Unknown scheme. Use postgres://, mysql://, sqlserver:// or a SQLite file."],
  ["Este banco ainda não é suportado.", "This database is not supported yet."],
  ["Informe o host na connection string.", "Enter the host in the connection string."],
  ["Porta inválida. Use um número de 1 a 65535.", "Invalid port. Use a number from 1 to 65535."],
  ["Connection string malformada. Formato: esquema://usuário:senha@host:porta/banco.", "Malformed connection string. Format: scheme://user:password@host:port/database."],
  ["Porta", "Port"],
  ["porta padrão", "default port"],
  ["Banco", "Database"],
  ["nome do banco", "database name"],
  ["Usuário", "User"],
  ["usuário", "user"],
  ["Senha", "Password"],
  ["senha", "password"],
  ["todos os schemas (ou: public, sales)", "all schemas (or: public, sales)"],
  ["/caminho/para/banco.sqlite", "/path/to/database.sqlite"],
  ["Confiar no certificado do servidor (autoassinado, ex.: Docker)", "Trust server certificate (self-signed, e.g. Docker)"],
  ["Testar conexão", "Test connection"],
  ["Cancelar", "Cancel"],
  ["Substituir", "Replace"],
  ["Inserir", "Insert"],
  ["Conectar", "Connect"],
  ["Conectando…", "Connecting…"],
  ["Confirmar substituição?", "Confirm replacement?"],
  ["Conectando e lendo o esquema…", "Connecting and reading schema…"],
  ["Somente leitura: apenas o catálogo é lido, nunca os seus dados.", "Read-only: only the catalog is read, never your data."],
  ["O importador SQL (Wasm) ainda não foi carregado.", "The SQL importer (Wasm) has not loaded yet."],
  ["Cole instruções CREATE TABLE. A prévia do DBML atualiza enquanto você digita.", "Paste CREATE TABLE statements. The DBML preview updates as you type."],
  ["Escolher arquivo .sql…", "Choose .sql file…"],
  ["cole ou solte um arquivo .sql", "paste or drop a .sql file"],
  ["Prévia do DBML", "DBML preview"],
  ["somente leitura", "read-only"],
  ["Substituir o esquema atual", "Replace the current schema"],
  ["Acrescentar ao esquema atual", "Append to the current schema"],
  ["A entrada excede o limite de 5 MB; divida o dump em arquivos menores.", "Input exceeds the 5 MB limit; split the dump into smaller files."],
  ["Descartar alterações", "Discard changes"],
  ["↑↓ navegar", "↑↓ navigate"],
  ["↵ executar", "↵ run"],
  ["Esc fechar", "Esc close"],
  ["Filtrar atalhos", "Filter shortcuts"],
  ["Nome inválido: use letras, números e _.", "Invalid name: use letters, numbers and _."],
  ["enumeração", "enumeration"],
  ["Sugestões", "Suggestions"],
  ["VALORES", "VALUES"],
  ["REFERENCIADO POR", "REFERENCED BY"],
  ["RELAÇÃO", "RELATIONSHIP"],
  ["CARDINALIDADE", "CARDINALITY"],
  ["AO EXCLUIR", "ON DELETE"],
  ["AO ATUALIZAR", "ON UPDATE"],
  ["NADA SELECIONADO", "NOTHING SELECTED"],
  ["Selecionar", "Select"],
  ["Mover a vista", "Pan view"],
  ["Todos os comandos", "All commands"],
  ["Raster · resolução 2×", "Raster · 2× resolution"],
  ["Raster · fundo sólido", "Raster · solid background"],
  ["SVG vetorial", "Vector SVG"],
  ["Escalável, editável", "Scalable, editable"],
  ["{} tabelas", "{} tables"],
  ["Excluir {} tabelas", "Delete {} tables"],
  ["Enum · {} valores · F2 para renomear", "Enum · {} values · F2 to rename"],
  ["Tabela · {} · F2 para renomear", "Table · {} · F2 to rename"],
  ["Adicionar colunas {}", "Add {} columns"],
  ["Movendo {}", "Moving {}"],
  ["Movendo grupo {}", "Moving group {}"],
  ["Relação de {}.{}: solte na tabela de destino", "Relationship from {}.{}: drop on the target table"],
  ["Selecionando: solte para selecionar as tabelas tocadas", "Selecting: release to select touched tables"],
  ["Enum selecionado · edite os valores no inspetor · Delete exclui o enum · Esc limpa a seleção", "Enum selected · edit values in the inspector · Delete removes the enum · Esc clears selection"],
  ["Relação selecionada · Delete remove a linha e a coluna FK · Esc limpa a seleção", "Relationship selected · Delete removes the line and FK column · Esc clears selection"],
  ["{} tabelas selecionadas · Ctrl+G agrupa", "{} tables selected · Ctrl+G groups them"],
  ["Arraste para mover a tabela · Esc limpa a seleção", "Drag to move the table · Esc clears selection"],
  ["Clique em uma tabela para inspecionar · arraste o fundo para selecionar · role para mover · Ctrl+role para zoom", "Click a table to inspect · drag the background to select · scroll to pan · Ctrl+scroll to zoom"],
  ["{}: as colunas já existem", "{}: the columns already exist"],
  ["Salvo {}", "Saved {}"],
  ["Falha ao exportar: {}", "Export failed: {}"],
  ["Falha ao exportar SQL: {}", "SQL export failed: {}"],
  ["{} tabela encontrada. Substitua o documento ou insira-a.", "{} table found. Replace the document or insert it."],
  ["{} tabelas encontradas. Substitua o documento ou insira-as.", "{} tables found. Replace the document or insert them."],
  ["tabela", "table"],
  ["tabelas", "tables"],
  ["relação detectada", "relationship detected"],
  ["relações detectadas", "relationships detected"],
  ['Deseja salvar as alterações feitas em "{}"?', 'Save changes made to "{}"?'],
  ["Conectado a {}.", "Connected to {}."],
  ["Conectado a {}. Schemas: {} (+{} a mais).", "Connected to {}. Schemas: {} (+{} more)."],
  ["Conectado a {}. Schemas: {}.", "Connected to {}. Schemas: {}."],
  ["Conectado, mas nenhuma tabela foi encontrada. Verifique o banco e o schema.", "Connected, but no tables were found. Check the database and schema."],
  ["Não foi possível criar contexto 2D para rasterização.", "Could not create a 2D context for rasterization."],
  ["inteiro de 4 bytes", "4-byte integer"],
  ["inteiro de 8 bytes", "8-byte integer"],
  ["inteiro de 2 bytes", "2-byte integer"],
  ["autoincremento", "auto-increment"],
  ["texto de tamanho variável", "variable-length text"],
  ["texto longo", "long text"],
  ["booleano", "boolean"],
  ["identificador único", "unique identifier"],
  ["data e hora", "date and time"],
  ["data/hora com fuso", "date/time with time zone"],
  ["data", "date"],
  ["hora", "time"],
  ["decimal exato", "exact decimal"],
  ["ponto flutuante", "floating point"],
  ["precisão dupla", "double precision"],
  ["JSON binário", "binary JSON"],
  ["binário", "binary"],
  ["Azul", "Blue"],
  ["Ciano", "Cyan"],
  ["Verde", "Green"],
  ["Lima", "Lime"],
  ["Âmbar", "Amber"],
  ["Laranja", "Orange"],
  ["Rosa", "Pink"],
  ["Violeta", "Violet"],
  ["Criar tabela associativa", "Create junction table"],
  ["TABELA ASSOCIATIVA", "JUNCTION TABLE"],
  ["Criar", "Create"],
  // Modo Comparar (diff com o git HEAD)
  ["Comparar com o git HEAD", "Compare with git HEAD"],
  ["Comparar com o git HEAD · D", "Compare with git HEAD · D"],
  ["Sair do modo Comparar", "Exit Compare mode"],
  ["Carregando a versão do git HEAD…", "Loading the git HEAD version…"],
  ["Sem diferenças em relação ao git HEAD.", "No differences from git HEAD."],
  ["Tentar novamente", "Try again"],
  ["{} adicionados", "{} added"],
  ["{} modificados", "{} modified"],
  ["{} removidos", "{} removed"],
  ["adicionado", "added"],
  ["modificado", "modified"],
  ["removido", "removed"],
  ["Tabela removida {}", "Removed table {}"],
  ["Enum removido {}", "Removed enum {}"],
  ["Coluna removida {}", "Removed column {}"],
  ["Comparando com o git HEAD · somente leitura", "Comparing with git HEAD · read-only"],
  ["Não foi possível comparar: o git não está instalado ou não está no PATH.", "Cannot compare: git is not installed or not on PATH."],
  ["Não foi possível comparar: o arquivo não está em um repositório git.", "Cannot compare: the file is not in a git repository."],
  ["Não foi possível comparar: o repositório ainda não tem commits.", "Cannot compare: the repository has no commits yet."],
  ["Arquivo novo: ele ainda não existe no git HEAD, então não há versão anterior para comparar.", "New file: it does not exist in git HEAD yet, so there is no earlier version to compare."],
  ["Não foi possível comparar: a versão do git HEAD não é texto UTF-8.", "Cannot compare: the git HEAD version is not UTF-8 text."],
  ["Não foi possível obter a versão do git HEAD.", "Could not get the git HEAD version."],
  ["A versão do git HEAD tem erros de DBML e não pode ser comparada.", "The git HEAD version has DBML errors and cannot be compared."],
  ["O documento atual tem erros de DBML. Corrija-os para comparar.", "The current document has DBML errors. Fix them to compare."],
  ["Este ambiente não suporta o modo Comparar.", "This environment does not support Compare mode."]
], vt = new Map(xt);
let Mt = "pt-BR";
function At(t, ...e) {
  return oe(Mt, t, ...e);
}
function oe(t, e, ...a) {
  let n = t === "en" ? vt.get(e) ?? e : e;
  for (const o of a) n = n.replace("{}", String(o));
  return n;
}
function be(t) {
  return t.schema ? `${t.schema}.${t.name}` : t.name;
}
function re(t) {
  return t.schema ? `${t.schema}.${t.table}` : t.table;
}
function St(t) {
  return `${t.from_table}.${t.from_col}->${t.to_table}.${t.to_col}`;
}
const F = 260, _e = 44, Ee = 30, Et = 0.2, Ct = 2.5, Lt = 32;
function Ie(t) {
  return _e + Ee * t + 8;
}
function Fe(t, e = 1, a = !1) {
  const n = "#e56731";
  return t === "dark" ? {
    mode: "dark",
    uiScale: e,
    wall: "radial-gradient(55% 55% at 15% 20%,#1a2a35,transparent),radial-gradient(45% 50% at 85% 80%,#3a2216,transparent),radial-gradient(40% 40% at 60% 10%,#1d2a1c,transparent),#08090a",
    blur: a ? "blur(48px) saturate(170%)" : "none",
    chrome: a ? "rgba(14,15,17,.62)" : "#0e0f11",
    sidebar: a ? "rgba(18,19,22,.55)" : "#121316",
    surface: a ? "rgba(6,7,8,.5)" : "#0a0b0c",
    grid: "rgba(255, 255, 255, 0.085)",
    card: a ? "rgba(24,25,28,.96)" : "#17181b",
    cardTranslucent: "rgba(30, 31, 35, 0.8)",
    island: "rgba(28, 29, 32, 0.86)",
    islandSheen: "rgba(255, 255, 255, 0.14)",
    edge: "rgba(255, 255, 255, 0.10)",
    edgeSoft: "rgba(255, 255, 255, 0.07)",
    hover: "rgba(255, 255, 255, 0.06)",
    active: "rgba(255, 255, 255, 0.09)",
    selected: "rgba(229, 103, 49, 0.18)",
    text: "#ececee",
    textMuted: "#a3a5ab",
    textFaint: "#858890",
    accent: n,
    danger: "#ed4a49",
    warning: "#eba941",
    ok: "#3eab5e",
    cardShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
    cardShadowSelected: "0 0 0 3px rgba(229, 103, 49, 0.18), 0 10px 30px rgba(0, 0, 0, 0.35)",
    islandShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    rail: a ? "rgba(11,12,14,.55)" : "#0b0c0e",
    editor: a ? "rgba(6,7,8,.6)" : "#0a0b0c",
    gutter: "rgba(255, 255, 255, 0.02)",
    lnum: "#41444a",
    sel: "rgba(255, 255, 255, 0.09)",
    selShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    input: "rgba(255, 255, 255, 0.05)",
    inputSolid: "rgba(0, 0, 0, 0.3)",
    edgeStrong: "rgba(255, 255, 255, 0.12)",
    pop: "rgba(30, 31, 35, 0.94)",
    modal: "rgba(24, 25, 28, 0.94)",
    scrim: "rgba(0, 0, 0, 0.4)",
    popShadow: "0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    relLine: "rgba(220, 225, 235, 0.42)",
    relStroke: "rgba(220, 225, 235, 0.32)",
    relLabel: "#858890",
    link: "#589aed",
    idx: "#00b1ba",
    swatchRing: "#121316",
    synKw: "#7cb4fc",
    synType: "#64d1d7",
    synAttr: "#e39bdc",
    synNum: "#f6b669",
    synComment: "#5d6067",
    synPunct: "#8b8e95"
  } : {
    mode: "light",
    uiScale: e,
    wall: "radial-gradient(60% 60% at 15% 15%,#c9dce6,transparent),radial-gradient(50% 55% at 85% 85%,#d6e2c2,transparent),radial-gradient(40% 40% at 80% 15%,#efd9c4,transparent),#e8e5dc",
    blur: a ? "blur(48px) saturate(170%)" : "none",
    chrome: a ? "rgba(246,246,244,.62)" : "#f3f3f1",
    sidebar: a ? "rgba(247,247,245,.55)" : "#f7f7f5",
    surface: a ? "rgba(255,255,255,.55)" : "#fbfbfa",
    grid: "rgba(0, 0, 0, 0.12)",
    card: "#ffffff",
    cardTranslucent: "rgba(255, 255, 255, 0.8)",
    island: "rgba(255, 255, 255, 0.86)",
    islandSheen: "#ffffff",
    edge: "rgba(20, 20, 30, 0.12)",
    edgeSoft: "rgba(20, 20, 30, 0.08)",
    hover: "rgba(0, 0, 0, 0.05)",
    active: "rgba(0, 0, 0, 0.09)",
    selected: "rgba(229, 103, 49, 0.12)",
    text: "#17181b",
    textMuted: "#55585f",
    textFaint: "#6b6e75",
    accent: n,
    danger: "#ed4a49",
    warning: "#b97a12",
    ok: "#3eab5e",
    cardShadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 6px 18px rgba(0, 0, 0, 0.05)",
    cardShadowSelected: "0 0 0 3px rgba(229, 103, 49, 0.18), 0 1px 2px rgba(0, 0, 0, 0.05), 0 6px 18px rgba(0, 0, 0, 0.05)",
    islandShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    rail: a ? "rgba(236,236,234,.55)" : "#ececea",
    editor: a ? "rgba(255,255,255,.6)" : "#ffffff",
    gutter: "rgba(0, 0, 0, 0.025)",
    lnum: "#b9bbc0",
    sel: "#ffffff",
    selShadow: "0 1px 0 rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.1)",
    input: a ? "rgba(0, 0, 0, 0.045)" : "#ebebe8",
    inputSolid: "#ffffff",
    edgeStrong: "rgba(20, 20, 30, 0.13)",
    pop: "rgba(255, 255, 255, 0.92)",
    modal: "rgba(252, 252, 251, 0.94)",
    scrim: "rgba(30, 30, 40, 0.14)",
    popShadow: "0 24px 60px rgba(30, 30, 40, 0.2), 0 2px 6px rgba(0, 0, 0, 0.06)",
    relLine: "rgba(30, 30, 40, 0.42)",
    relStroke: "rgba(30, 30, 40, 0.3)",
    relLabel: "#6b6e75",
    link: "#589aed",
    idx: "#00b1ba",
    swatchRing: "#f6f6f4",
    synKw: "#2663c9",
    synType: "#007d86",
    synAttr: "#a04c9a",
    synNum: "#ab5900",
    synComment: "#9a9ca2",
    synPunct: "#6b6e75"
  };
}
function ve(t, e) {
  const a = t.trim().replace(/^#/, "");
  if (a.length !== 6) return t;
  const n = parseInt(a, 16);
  if (Number.isNaN(n)) return t;
  const o = n >> 16 & 255, s = n >> 8 & 255, d = n & 255;
  return `rgba(${o}, ${s}, ${d}, ${e})`;
}
const Dt = {
  Table2: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
  KeyRound: '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
  Link2: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>',
  MousePointer2: '<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>',
  Hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  LayoutGrid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  Scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
  Braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
  ZoomIn: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  ZoomOut: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
  Info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  SlidersHorizontal: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  TriangleAlert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  CircleX: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  CircleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  Trash: '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  Sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  Palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  Keyboard: '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>',
  Command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  Database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  Folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  FolderOpen: '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
  PanelRightClose: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/>',
  Download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  Upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  Menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
  FileCode: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/>',
  FilePlus: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/>',
  FolderInput: '<path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"/><path d="M2 13h10"/><path d="m9 16 3-3-3-3"/>',
  FileDown: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
  Image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  Link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  WandSparkles: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  ChevronRight: '<path d="m9 18 6-6-6-6"/>',
  ChevronsUpDown: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  RefreshCw: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  List: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
  Group: '<path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><rect width="7" height="5" x="10" y="12" rx="1"/>',
  ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  PlugZap: '<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/>',
  FileUp: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/>',
  Eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  FileInput: '<path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/>',
  FolderTree: '<path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/>',
  Save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  Undo2: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  Redo2: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>',
  PanelLeft: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  PanelRight: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
  Pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  SquarePlus: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  SquareDashed: '<path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/>',
  SunMoon: '<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>',
  GitFork: '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',
  GitCompare: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>',
  PenTool: '<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>',
  Fingerprint: '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>',
  Clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  Archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  Frame: '<line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/>',
  PanelsTopLeft: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  File: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ArrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  Workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  Columns2: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>',
  DatabaseZap: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V8"/><path d="M21 12L18 17H22L19 22"/><path d="M3 12A9 3 0 0 0 14.59 14.87"/>',
  ImageDown: '<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19 3 3v-5.5"/><path d="m17 22 3-3"/><circle cx="9" cy="9" r="2"/>',
  ListFilter: '<path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/>',
  ChevronsLeft: '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
  ChevronsRight: '<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>',
  Layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  ArrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  ArrowDownLeft: '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
  Dot: '<circle cx="12.1" cy="12.1" r="1"/>',
  ListPlus: '<path d="M11 12H3"/><path d="M16 6H3"/><path d="M16 18H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>',
  Minus: '<path d="M5 12h14"/>',
  Ellipsis: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  GripVertical: '<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
  Copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  EyeOff: '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>'
};
function Tt(t, e = 16, a = "currentColor") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${a}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;display:block;pointer-events:none;">${Dt[t]}</svg>`;
}
function $t(t, e, a, n, o) {
  const s = a >= t + F, d = a + F <= t, l = s ? t + F : t, p = d ? a + F : a, x = Math.max(50, Math.abs(p - l) / 2), w = s ? x : d ? -x : -70, y = s ? -x : d ? x : -70, L = o != null && o.straight ? { x: l + (p - l) / 3, y: e + (n - e) / 3 } : { x: l + w + ((o == null ? void 0 : o.dx) ?? 0), y: e + ((o == null ? void 0 : o.dy) ?? 0) }, S = o != null && o.straight ? { x: l + 2 * (p - l) / 3, y: e + 2 * (n - e) / 3 } : { x: p + y + ((o == null ? void 0 : o.dx) ?? 0), y: n + ((o == null ? void 0 : o.dy) ?? 0) }, q = { x: (l + 3 * L.x + 3 * S.x + p) / 8, y: (e + 3 * L.y + 3 * S.y + n) / 8 };
  return { x1: l, x2: p, d1: w, d2: y, c1: L, c2: S, midpoint: q, path: `M${l} ${e} C${L.x} ${L.y} ${S.x} ${S.y} ${p} ${n}` };
}
function Rt(t, e, a) {
  return !a && t.auto_path ? { path: t.auto_path, midpoint: t.auto_mid ?? e.midpoint } : { path: e.path, midpoint: e.midpoint };
}
function Nt(t) {
  if (!Number.isFinite(t) || t <= 0) return 24;
  let e = 24 * t;
  for (; e < 20; ) e *= 2;
  return e;
}
function kt(t, e, a) {
  const n = new Map(e.tables.map((o) => [be(o), o]));
  return t.flatMap((o) => {
    let s = 1 / 0, d = 1 / 0, l = -1 / 0, p = -1 / 0, x = 0;
    for (const y of o.tables) {
      const L = a[y], S = n.get(y);
      !L || !S || (s = Math.min(s, L.x), d = Math.min(d, L.y), l = Math.max(l, L.x + F), p = Math.max(p, L.y + Ie(S.columns.length)), x++);
    }
    if (!x) return [];
    const w = Lt - 8;
    return [{ ...o, x: s - w, y: d - w - 8, w: l - s + 2 * w, h: p - d + 2 * w + 8, count: x }];
  });
}
function Ot(t) {
  switch (t) {
    case "ManyToOne":
      return "}o--||";
    case "OneToMany":
      return "||--o{";
    case "OneToOne":
      return "||--||";
    case "ManyToMany":
      return "}o--o{";
  }
}
function It(t) {
  var a;
  const e = ["erDiagram"];
  for (const n of t.tables) {
    const o = n.name.replace(/[^a-zA-Z0-9_]/g, "_");
    e.push(`    ${o} {`);
    for (const s of n.columns) {
      const d = (s.ty || "string").replace(/[^a-zA-Z0-9_]/g, "_"), l = s.name.replace(/[^a-zA-Z0-9_]/g, "_"), p = [];
      s.pk && p.push("PK"), s.unique && !s.pk && p.push("UK");
      const x = p.length > 0 ? ` ${p.join(",")}` : "", w = (a = s.note) == null ? void 0 : a.trim(), y = w ? ` "${w.replace(/[\r\n]+/g, " ").replace(/"/g, "'")}"` : "";
      e.push(`        ${d} ${l}${x}${y}`);
    }
    e.push("    }");
  }
  for (const n of t.refs) {
    const o = re(n.from).replace(/[^a-zA-Z0-9_]/g, "_"), s = re(n.to).replace(/[^a-zA-Z0-9_]/g, "_"), d = Ot(n.kind), l = `"${n.from.column} to ${n.to.column}"`;
    e.push(`    ${o} ${d} ${s} : ${l}`);
  }
  return e.join(`
`);
}
function fe(t, e, a, n, o) {
  return Tt(t, n, J(o)).replace("<svg ", `<svg x="${e}" y="${a}" `);
}
function J(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const ne = "Geist, system-ui, sans-serif", ce = "'Geist Mono', ui-monospace, monospace";
function Ft(t, e, a, n = "dark", o = {}, s = {}, d = "") {
  var N;
  const l = Fe(n, 1), p = n === "dark", x = new Set(s.selection), w = s.zoom && Number.isFinite(s.zoom) && s.zoom > 0 ? s.zoom : 1, y = Nt(w) / w, L = typeof document > "u" ? null : document.createElement("canvas").getContext("2d"), S = (c, h, f = ce, i = 400) => L ? (L.font = `${i} ${h}px ${f}`, L.measureText(c).width) : Array.from(c).length * h * 0.6, q = (c, h, f, i, u) => {
    if (S(c, f, i, u) <= h) return c;
    if (S("…", f, i, u) > h) return "";
    const m = Array.from(c);
    let v = 0, E = m.length;
    for (; v < E; ) {
      const g = Math.ceil((v + E) / 2);
      S(m.slice(0, g).join("") + "…", f, i, u) <= h ? v = g : E = g - 1;
    }
    return m.slice(0, v).join("") + "…";
  };
  let H = 1 / 0, U = 1 / 0, T = -1 / 0, R = -1 / 0;
  const D = (c, h, f = 0, i = 0) => {
    H = Math.min(H, c), U = Math.min(U, h), T = Math.max(T, c + f), R = Math.max(R, h + i);
  }, A = (c, h, f, i, u = "") => `<text x="${c}" y="${h}" class="${i}" ${u}>${J(String(f))}</text>`, j = (c, h, f, i = l.edgeSoft) => `${f ? `<rect x="-2" y="-2" width="${c + 4}" height="${h + 4}" rx="14" fill="none" stroke="${l.accent}" stroke-opacity=".18" stroke-width="2"/>` : ""}<rect x=".5" y=".5" width="${c - 1}" height="${h - 1}" rx="12" class="table-box" stroke="${f ? l.accent : i}"/>`, V = (c, h, f, i) => `<path d="M1 ${h + 0.5}H${c - 1}" stroke="${l.edgeSoft}"/>${fe(f, 13, 1 + (h - 14) / 2, 14, i)}`, C = [], z = new Map(t.tables.map((c) => [be(c), c])), G = new Map(a == null ? void 0 : a.tables.map((c) => [c.name, c])), B = (c, h, f) => {
    var i;
    return f + _e + 4 + (Math.max(0, ((i = z.get(c)) == null ? void 0 : i.columns.findIndex((u) => u.name === h)) ?? 0) + 0.5) * Ee;
  }, W = a ? a.edges : t.refs.flatMap((c) => {
    const h = re(c.from), f = re(c.to), i = e[h], u = e[f];
    return !i || !u || !z.has(h) || !z.has(f) ? [] : [{
      from_table: h,
      to_table: f,
      from_col: c.from.column,
      to_col: c.to.column,
      ay: B(h, c.from.column, i.y),
      by: B(f, c.to.column, u.y),
      svg_path: "",
      start_label: c.kind === "OneToMany" || c.kind === "OneToOne" ? "1" : "N",
      end_label: c.kind === "ManyToOne" || c.kind === "OneToOne" ? "1" : "N"
    }];
  });
  for (const c of W) {
    const h = e[c.from_table], f = e[c.to_table];
    if (!h || !f) continue;
    const i = St(c), u = o[i], m = $t(h.x, c.ay, f.x, c.by, u), v = J(Rt(c, m, u).path), E = !u && c.auto_path ? c.auto_path.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi) : null;
    if (E)
      for (let K = 0; K + 1 < E.length; K += 2) D(Number(E[K]), Number(E[K + 1]));
    else
      D(m.c1.x, m.c1.y), D(m.c2.x, m.c2.y);
    const g = s.selectedRef === i || x.has(c.from_table) || x.has(c.to_table), $ = g ? l.accent : l.relStroke;
    g && C.push(`<path d="${v}" fill="none" stroke="${$}" stroke-opacity=".16" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`), C.push(
      `<path d="${v}" class="ref-edge" stroke="${$}" stroke-width="${g ? 1.8 : 1.4}"/>`,
      `<circle cx="${m.x1}" cy="${c.ay}" r="3" fill="${$}"/>`,
      `<circle cx="${m.x2}" cy="${c.by}" r="3.5" fill="${l.card}" stroke="${$}" stroke-width="1.5"/>`
    );
    const I = `text-anchor="middle" fill="${g ? l.accent : l.textFaint}"`;
    C.push(
      A(m.x1 + Math.sign(m.d1) * 11, c.ay - 6, c.start_label, "ref-label", I),
      A(m.x2 + Math.sign(m.d2) * 11, c.by - 6, c.end_label, "ref-label", I)
    );
  }
  for (const c of kt((a == null ? void 0 : a.groups) ?? [], t, e)) {
    const { x: h, y: f, w: i, h: u, name: m, count: v, color: E } = c;
    D(h, f, i, u);
    const g = J(E), $ = h + 44 + S(m, 12, ne, 600), I = S(String(v), 10.5, ce, 500) + 12;
    C.push(
      `<g><rect x="${h + 0.5}" y="${f + 0.5}" width="${i - 1}" height="${u - 1}" rx="20" fill="${J(ve(E, p ? 0.06 : 0.07))}" stroke="${J(ve(E, p ? 0.18 : 0.22))}"/>`,
      fe("Layers", h + 17, f + 14.5, 13, E),
      A(h + 37, f + 21, m, "group-label middle", `fill="${g}"`),
      `<rect x="${$}" y="${f + 13}" width="${I}" height="16" rx="8" fill="${J(ve(E, 0.14))}"/>`,
      A($ + I / 2, f + 21, v, "group-count middle", `fill="${g}" text-anchor="middle"`),
      "</g>"
    );
  }
  const ie = [...(a == null ? void 0 : a.tables.map((c) => c.name)) ?? z.keys()].sort((c, h) => +(c === s.top) - +(h === s.top)), he = new Set(W.map((c) => `${c.from_table}.${c.from_col}`));
  for (const c of ie) {
    const h = z.get(c), f = e[c];
    if (!h || !f) continue;
    const i = G.get(c), u = Ie(h.columns.length);
    D(f.x, f.y, F, u), C.push(
      `<g transform="translate(${f.x} ${f.y})">`,
      j(F, u, x.has(c)),
      V(F, _e, "Table2", (i == null ? void 0 : i.tint) || !a && h.color || l.accent)
    );
    const m = F - 13;
    let v = m - S(String(h.columns.length), 10.5) - 9;
    if (h.schema) {
      const g = S(h.schema, 10, ce, 500) + 10;
      C.push(
        `<rect x="${v - g}" y="15" width="${g}" height="16" rx="4" fill="${l.input}"/>`,
        A(v - g / 2, 23, h.schema, "schema middle", 'text-anchor="middle"')
      ), v -= g + 9;
    }
    C.push(
      A(36, 23, q(h.name, v - 36, 13, ne, 600), "header-title middle"),
      A(m, 23, h.columns.length, "count middle", 'text-anchor="end"')
    );
    const E = new Set((N = h.indexes) == null ? void 0 : N.flatMap((g) => g.columns.filter(($) => $.kind === "column").map(($) => $.value)));
    h.columns.forEach((g, $) => {
      const I = 1 + _e + 4 + ($ + 0.5) * Ee, K = g.fk || (i ? i.fk_columns.includes(g.name) : he.has(`${c}.${g.name}`)), qe = g.pk ? "KeyRound" : K ? "Link" : "Dot";
      C.push(fe(qe, 14, I - 6, 12, g.pk ? l.accent : K ? l.link : l.textFaint));
      let se = F - 13;
      C.push(A(se, I, g.ty, "col-type middle", 'text-anchor="end"')), se -= S(g.ty, 11) + 8;
      const He = [g.unique && "UQ", g.not_null && "NN", E.has(g.name) && "IDX"];
      for (const pe of He)
        pe && (C.push(A(se, I, pe, "column-badge middle", `text-anchor="end" fill="${pe === "IDX" ? l.idx : l.textFaint}"`)), se -= S(pe, 9, ce, 600) + 8);
      const Be = q(g.name, se - 35, 12.5, ne, g.pk ? 500 : 400);
      C.push(A(35, I, Be, g.pk ? "col-name pk middle" : "col-name middle"));
    }), C.push("</g>");
  }
  for (const c of (a == null ? void 0 : a.enums) ?? []) {
    const h = e[`enum:${c.name}`] || c, f = 52 + Math.max(1, c.values.length) * 26, i = s.selectedEnum === c.name, u = c.referenced_by.some((m) => x.has(m)) ? l.accent : l.edge;
    D(h.x, h.y, c.w, f), C.push(
      `<g transform="translate(${h.x} ${h.y})">`,
      j(c.w, f, i, u),
      V(c.w, 40, "List", l.accent),
      A(36, 21, q(c.name, c.w - 80, 13, ne, 600), "header-title middle"),
      A(c.w - 13, 21, "ENUM", "column-badge middle", `text-anchor="end" fill="${l.textFaint}"`)
    ), c.values.forEach((m, v) => {
      const E = 58 + v * 26;
      C.push(
        fe("Dot", 14, E - 6, 12, l.accent),
        A(36, E, m, "enum-value middle")
      );
    }), c.values.length || C.push(A(13, 58, At("(vazio)"), "enum-value middle", 'opacity=".7"')), C.push("</g>");
  }
  Number.isFinite(H) || D(0, 0, 800, 600);
  const te = 40, O = Math.floor(H - te), Y = Math.floor(U - te), Z = Math.ceil(T + te - O), Q = Math.ceil(R + te - Y);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${O} ${Y} ${Z} ${Q}" width="${Z}" height="${Q}">
<defs>
<style>
${d}
.middle { dominant-baseline: central; }
.table-box { fill: ${l.card}; filter: url(#card-shadow); }
.header-title,.col-name { fill: ${l.text}; font-family: ${ne}; }
.header-title { font-size: 13px; font-weight: 600; }
.col-name { font-size: 12.5px; }
.col-name.pk { font-weight: 500; }
.col-type,.count,.schema,.enum-value,.column-badge,.group-count,.ref-label { font-family: ${ce}; }
.col-type,.count { fill: ${l.textFaint}; }
.col-type { font-size: 11px; }
.count,.group-count { font-size: 10.5px; }
.schema,.ref-label { font-weight: 500; font-size: 10px; }
.schema,.enum-value { fill: ${l.textMuted}; }
.enum-value { font-size: 12px; }
.column-badge { font-size: 9px; font-weight: 600; letter-spacing: .02em; }
.ref-edge { fill: none; stroke-linejoin: round; }
.group-label { font: 600 12px ${ne}; }
.group-count { font-weight: 500; }
</style>
<pattern id="dot-grid" width="${y}" height="${y}" patternUnits="userSpaceOnUse"><circle cx="${y / 2}" cy="${y / 2}" r="${1 / w}" fill="${l.grid}"/></pattern>
<filter id="card-shadow" x="-25%" y="-40%" width="150%" height="180%"><feDropShadow dx="0" dy="${p ? 10 : 6}" stdDeviation="${p ? 15 : 9}" flood-opacity="${p ? 0.35 : 0.05}"/></filter>
</defs>
<rect x="${O}" y="${Y}" width="${Z}" height="${Q}" fill="${l.surface}"/>
<rect x="${O}" y="${Y}" width="${Z}" height="${Q}" fill="url(#dot-grid)"/>
${C.join(`
`)}
</svg>`;
}
class ee extends Error {
  constructor(e) {
    super(e), this.name = "FragmentError";
  }
}
const qt = /^[A-Za-z0-9_-]+$/, De = 4;
function Ht(t) {
  let e = "";
  for (const a of t) e += String.fromCharCode(a);
  return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function Bt(t) {
  if (!qt.test(t)) throw new ee("invalid base64url");
  const e = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(t.length / De) * De, "=");
  let a;
  try {
    a = atob(e);
  } catch {
    throw new ee("invalid base64url");
  }
  return Uint8Array.from(a, (n) => n.charCodeAt(0));
}
async function Pt(t, e) {
  const a = t.getReader(), n = [];
  let o = 0;
  try {
    for (; ; ) {
      const { done: l, value: p } = await a.read();
      if (l) break;
      if (o += p.byteLength, o > e)
        throw a.cancel().catch(() => {
        }), new ee("payload too large");
      n.push(p);
    }
  } catch (l) {
    throw l instanceof ee ? l : new ee("invalid deflate-raw data");
  }
  const s = new Uint8Array(o);
  let d = 0;
  for (const l of n)
    s.set(l, d), d += l.byteLength;
  return s;
}
async function zt(t) {
  const e = new Response(new TextEncoder().encode(t)).body.pipeThrough(new CompressionStream(Oe)), a = new Uint8Array(await new Response(e).arrayBuffer());
  return `#${ke}=${Ht(a)}`;
}
async function Gt(t) {
  const a = new URLSearchParams(t.startsWith("#") ? t.slice(1) : t).get(ke);
  if (a === null) return null;
  if (!a) throw new ee("empty payload");
  const n = Bt(a), o = new Response(n).body.pipeThrough(new DecompressionStream(Oe)), s = await Pt(o, ut);
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(s);
  } catch {
    throw new ee("payload is not UTF-8");
  }
}
let Me = null;
function Ut(t) {
  return Me ?? (Me = Ne(t === void 0 ? void 0 : { module_or_path: t }).then(() => dt).catch((e) => {
    throw Me = null, e;
  })), Me;
}
function Vt(t, e = "pt-BR") {
  const a = t.tables.map(be), n = a.length === 0 ? oe(e, "Diagrama vazio.") : a.length === 1 ? oe(e, "Diagrama com 1 tabela: {}.", a[0]) : oe(e, "Diagrama com {} tabelas: {}.", a.length, a.join(", ")), o = t.refs.map((d) => `${re(d.from)}.${d.from.column} ${yt} ${re(d.to)}.${d.to.column}`), s = o.length ? oe(e, "Relações: {}.", o.join(", ")) : oe(e, "Sem relações.");
  return a.length ? `${n} ${s}` : n;
}
const Te = (t) => Math.min(Ct, Math.max(Et, t));
async function jt(t, e, a = {}) {
  const n = a.wasm ?? await Ut(a.wasmUrl), o = a.lang ?? "pt-BR", s = t.getAttribute("style"), d = ["role", "aria-label", "tabindex"].map((i) => [i, t.getAttribute(i)]), l = new AbortController(), { signal: p } = l;
  let x = e, w = a.theme ?? "light", y = { tables: [], refs: [] }, L = [], S = {}, q = null, H = 0, U = 0, T = 1, R = 0, D = 0, A = !1;
  t.innerHTML = "", t.setAttribute("role", "img"), t.tabIndex = 0, getComputedStyle(t).position === "static" && (t.style.position = "relative"), t.style.overflow = "hidden", t.style.touchAction = bt, t.style.cursor = "grab";
  const j = a.height ?? ht;
  j !== "auto" && (t.style.height = typeof j == "number" ? `${j}px` : j);
  const V = document.createElement("div");
  V.className = wt, V.style.cssText = "position:absolute;inset:0;", V.setAttribute("aria-hidden", "true"), t.appendChild(V);
  const C = V.attachShadow({ mode: "open" }), z = () => {
    const i = t.getBoundingClientRect();
    return { w: i.width || t.clientWidth, h: i.height || t.clientHeight };
  }, G = () => {
    const i = C.querySelector("svg");
    i && (i.style.transform = `translate(${R}px, ${D}px) scale(${T})`);
  }, B = () => {
    const { w: i, h: u } = z();
    !H || !U || !i || !u || (T = Te(Math.min(mt, Math.min(i / H, u / U) * pt)), R = (i - H * T) / 2, D = (u - U * T) / 2, G());
  }, W = (i, u, m) => {
    const v = Te(T * i);
    R = u - (u - R) * v / T, D = m - (m - D) * v / T, T = v, A = !0, G();
  }, ie = () => {
    var v;
    const i = Fe(w, 1);
    t.style.background = i.surface;
    const u = Ft(y, S, q, w, ((v = a.layout) == null ? void 0 : v.edges) ?? {});
    C.innerHTML = `<style>:host{display:block}svg{position:absolute;left:0;top:0;transform-origin:0 0;user-select:none}</style>${u}`;
    const m = C.querySelector("svg");
    H = Number(m == null ? void 0 : m.getAttribute("width")) || 0, U = Number(m == null ? void 0 : m.getAttribute("height")) || 0, G();
  }, he = () => {
    var E;
    const i = n.parse_and_analyze(x);
    y = i.schema, L = i.diagnostics;
    const u = ((E = a.layout) == null ? void 0 : E.tables) ?? {};
    S = { ...y.tables.map(be).every((g) => u[g]) ? {} : n.compute_layout(x, {}).positions, ...u };
    try {
      q = n.compute_scene(x, S) ?? null;
    } catch {
      q = null;
    }
    t.setAttribute("aria-label", Vt(y, o));
  };
  he(), ie(), B();
  const te = a.wheelZoom ?? gt;
  t.addEventListener("wheel", (i) => {
    if (te !== _t && !(i.ctrlKey || i.metaKey)) return;
    i.preventDefault();
    const u = t.getBoundingClientRect();
    W(Math.exp(-i.deltaY * ft), i.clientX - u.left, i.clientY - u.top);
  }, { signal: p, passive: !1 });
  const O = /* @__PURE__ */ new Map(), Y = (i) => i.pointerType === "touch";
  t.addEventListener("pointerdown", (i) => {
    var u;
    Y(i) || ((u = t.setPointerCapture) == null || u.call(t, i.pointerId), O.set(i.pointerId, { x: i.clientX, y: i.clientY }), t.style.cursor = "grabbing");
  }, { signal: p }), t.addEventListener("pointermove", (i) => {
    const u = O.get(i.pointerId);
    if (!u || Y(i)) return;
    const m = { x: i.clientX, y: i.clientY };
    O.set(i.pointerId, m), A = !0, R += m.x - u.x, D += m.y - u.y, G();
  }, { signal: p });
  const Z = (i) => {
    O.delete(i.pointerId), O.size || (t.style.cursor = "grab");
  };
  t.addEventListener("pointerup", Z, { signal: p }), t.addEventListener("pointercancel", Z, { signal: p });
  const Q = (i) => {
    const [u, m] = [i.touches[0], i.touches[1]];
    return { dist: Math.hypot(u.clientX - m.clientX, u.clientY - m.clientY), cx: (u.clientX + m.clientX) / 2, cy: (u.clientY + m.clientY) / 2 };
  };
  let N = null;
  t.addEventListener("touchstart", (i) => {
    N = i.touches.length === xe ? Q(i) : null;
  }, { signal: p, passive: !0 }), t.addEventListener("touchmove", (i) => {
    if (i.touches.length !== xe) {
      N = null;
      return;
    }
    if (!i.cancelable) return;
    i.preventDefault();
    const u = Q(i);
    if (N) {
      const m = t.getBoundingClientRect();
      R += u.cx - N.cx, D += u.cy - N.cy, N.dist > 0 ? W(u.dist / N.dist, u.cx - m.left, u.cy - m.top) : G(), A = !0;
    }
    N = u;
  }, { signal: p, passive: !1 });
  const c = (i) => {
    i.touches.length < xe && (N = null);
  };
  t.addEventListener("touchend", c, { signal: p }), t.addEventListener("touchcancel", c, { signal: p }), t.addEventListener("dblclick", () => {
    A = !1, B();
  }, { signal: p }), t.addEventListener("keydown", (i) => {
    const { w: u, h: m } = z();
    switch (i.key) {
      case "+":
      case "=":
        W(Le, u / 2, m / 2);
        break;
      case "-":
      case "_":
        W(1 / Le, u / 2, m / 2);
        break;
      case "0":
        A = !1, B();
        break;
      case "ArrowLeft":
        R += me;
        break;
      case "ArrowRight":
        R -= me;
        break;
      case "ArrowUp":
        D += me;
        break;
      case "ArrowDown":
        D -= me;
        break;
      default:
        return;
    }
    i.preventDefault(), G();
  }, { signal: p });
  const h = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => {
    A || B();
  });
  h == null || h.observe(t);
  let f = !1;
  return {
    update(i) {
      f || (x = i, he(), ie(), A = !1, B());
    },
    setTheme(i) {
      f || i === w || (w = i, ie());
    },
    fit() {
      A = !1, B();
    },
    get zoom() {
      return T;
    },
    get diagnostics() {
      return L;
    },
    toSql(i) {
      if (!n.export_sql_ddl) throw new Error("export_sql_ddl unavailable");
      return n.export_sql_ddl(x, i);
    },
    toMermaid() {
      return It(y);
    },
    destroy() {
      if (!f) {
        f = !0, l.abort(), h == null || h.disconnect(), t.innerHTML = "", s === null ? t.removeAttribute("style") : t.setAttribute("style", s);
        for (const [i, u] of d)
          u === null ? t.removeAttribute(i) : t.setAttribute(i, u);
      }
    }
  };
}
export {
  ee as FragmentError,
  Gt as decodeDbmlFragment,
  Vt as describeSchema,
  zt as encodeDbmlFragment,
  Ut as loadReadonlyEngine,
  jt as mountReadonly
};
