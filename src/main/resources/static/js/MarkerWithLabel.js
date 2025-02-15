var MarkerWithLabel = function() {
    "use strict";
    var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function t(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var n = function(e) {
            return e && e.Math == Math && e
        },
        r = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || Function("return this")(),
        i = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        },
        o = !i((function() {
            return 7 != Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })),
        a = {}.propertyIsEnumerable,
        s = Object.getOwnPropertyDescriptor,
        l = {
            f: s && !a.call({
                1: 2
            }, 1) ? function(e) {
                var t = s(this, e);
                return !!t && t.enumerable
            } : a
        },
        c = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        u = {}.toString,
        f = function(e) {
            return u.call(e).slice(8, -1)
        },
        g = "".split,
        v = i((function() {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function(e) {
            return "String" == f(e) ? g.call(e, "") : Object(e)
        } : Object,
        h = function(e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e
        },
        p = function(e) {
            return v(h(e))
        },
        d = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        b = function(e, t) {
            if (!d(e)) return e;
            var n, r;
            if (t && "function" == typeof(n = e.toString) && !d(r = n.call(e))) return r;
            if ("function" == typeof(n = e.valueOf) && !d(r = n.call(e))) return r;
            if (!t && "function" == typeof(n = e.toString) && !d(r = n.call(e))) return r;
            throw TypeError("Can't convert object to primitive value")
        },
        y = {}.hasOwnProperty,
        m = function(e, t) {
            return y.call(e, t)
        },
        L = r.document,
        D = d(L) && d(L.createElement),
        O = !o && !i((function() {
            return 7 != Object.defineProperty((e = "div", D ? L.createElement(e) : {}), "a", {
                get: function() {
                    return 7
                }
            }).a;
            var e
        })),
        S = Object.getOwnPropertyDescriptor,
        w = {
            f: o ? S : function(e, t) {
                if (e = p(e), t = b(t, !0), O) try {
                    return S(e, t)
                } catch (e) {}
                if (m(e, t)) return c(!l.f.call(e, t), e[t])
            }
        },
        k = function(e) {
            if (!d(e)) throw TypeError(String(e) + " is not an object");
            return e
        },
        P = Object.defineProperty,
        T = {
            f: o ? P : function(e, t, n) {
                if (k(e), t = b(t, !0), k(n), O) try {
                	
                    return P(e, t, n)
                } catch (e) {}
               
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
                return "value" in n && (e[t] = n.value), e
            }
        },
        j = o ? function(e, t, n) {
            return T.f(e, t, c(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        },
        M = function(e, t) {
            try {
                j(r, e, t)
            } catch (n) {
                r[e] = t
            }
            return t
        },
        C = "__core-js_shared__",
        I = r[C] || M(C, {}),
        E = Function.toString;
    "function" != typeof I.inspectSource && (I.inspectSource = function(e) {
        return E.call(e)
    });
    var x, _, A, R, N = I.inspectSource,
        z = r.WeakMap,
        V = "function" == typeof z && /native code/.test(N(z)),
        G = t((function(e) {
            (e.exports = function(e, t) {
                return I[e] || (I[e] = void 0 !== t ? t : {})
            })("versions", []).push({
                version: "3.6.5",
                mode: "global",
                copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
            })
        })),
        H = 0,
        F = Math.random(),
        q = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++H + F).toString(36)
        },
        B = G("keys"),
        W = {},
        Z = r.WeakMap;
    if (V) {
        var K = new Z,
            Y = K.get,
            J = K.has,
            Q = K.set;
       ;
        x = function(e, t) {
            return Q.call(K, e, t), t
        }, _ = function(e) {
            return Y.call(K, e) || {}
        }, A = function(e) {
            return J.call(K, e)
        }
    } else {
        var U = B[R = "state"] || (B[R] = q(R));
        W[U] = !0, x = function(e, t) {
            return j(e, U, t), t
        }, _ = function(e) {
            return m(e, U) ? e[U] : {}
        }, A = function(e) {
            return m(e, U)
        }
    }
    var X, $, ee = {
            set: x,
            get: _,
            has: A,
            enforce: function(e) {
                return A(e) ? _(e) : x(e, {})
            },
            getterFor: function(e) {
                return function(t) {
                    var n;
                    if (!d(t) || (n = _(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        },
        te = t((function(e) {
            var t = ee.get,
                n = ee.enforce,
                i = String(String).split("String");
            
            (e.exports = function(e, t, o, a) {
                var s = !!a && !!a.unsafe,
                    l = !!a && !!a.enumerable,
                    c = !!a && !!a.noTargetGet;
                "function" == typeof o && ("string" != typeof t || m(o, "name") || j(o, "name", t), n(o).source = i.join("string" == typeof t ? t : "")), e !== r ? (s ? !c && e[t] && (l = !0) : delete e[t], l ? e[t] = o : j(e, t, o)) : l ? e[t] = o : M(t, o)
            })(Function.prototype, "toString", (function() {
                return "function" == typeof this && t(this).source || N(this)
            }))
        })),
        ne = r,
        re = function(e) {
            return "function" == typeof e ? e : void 0
        },
        ie = function(e, t) {
            return arguments.length < 2 ? re(ne[e]) || re(r[e]) : ne[e] && ne[e][t] || r[e] && r[e][t]
        },
        oe = Math.ceil,
        ae = Math.floor,
        se = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? ae : oe)(e)
        },
        le = Math.min,
        ce = function(e) {
            return e > 0 ? le(se(e), 9007199254740991) : 0
        },
        ue = Math.max,
        fe = Math.min,
        ge = function(e) {
            return function(t, n, r) {
                var i, o = p(t),
                    a = ce(o.length),
                    s = function(e, t) {
                        var n = se(e);
                        return n < 0 ? ue(n + t, 0) : fe(n, t)
                    }(r, a);
                if (e && n != n) {
                    for (; a > s;)
                        if ((i = o[s++]) != i) return !0
                } else
                    for (; a > s; s++)
                        if ((e || s in o) && o[s] === n) return e || s || 0;
                return !e && -1
            }
        },
        ve = {
            includes: ge(!0),
            indexOf: ge(!1)
        }.indexOf,
        he = function(e, t) {
            var n, r = p(e),
                i = 0,
                o = [];
            for (n in r) !m(W, n) && m(r, n) && o.push(n);
            for (; t.length > i;) m(r, n = t[i++]) && (~ve(o, n) || o.push(n));
            return o
        },
        
        pe = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        de = pe.concat("length", "prototype"),
        be = {
        	
            f: Object.getOwnPropertyNames || function(e) {
            	
                return he(e, de)
            }
        },
        ye = {
            f: Object.getOwnPropertySymbols
        },
        me = ie("Reflect", "ownKeys") || function(e) {
            var t = be.f(k(e)),
                n = ye.f;
            return n ? t.concat(n(e)) : t
        },
        Le = function(e, t) {
            for (var n = me(t), r = T.f, i = w.f, o = 0; o < n.length; o++) {
                var a = n[o];
                m(e, a) || r(e, a, i(t, a))
            }
        },
        De = /#|\.prototype\./,
        Oe = function(e, t) {
            var n = we[Se(e)];
            return n == Pe || n != ke && ("function" == typeof t ? i(t) : !!t)
        },
        Se = Oe.normalize = function(e) {
            return String(e).replace(De, ".").toLowerCase()
        },
        we = Oe.data = {},
        ke = Oe.NATIVE = "N",
        Pe = Oe.POLYFILL = "P",
        Te = Oe,
        je = w.f,
        Me = function(e, t) {
            var n, i, o, a, s, l = e.target,
                c = e.global,
                u = e.stat;
            if (n = c ? r : u ? r[l] || M(l, {}) : (r[l] || {}).prototype)
                for (i in t) {
                    if (a = t[i], o = e.noTargetGet ? (s = je(n, i)) && s.value : n[i], !Te(c ? i : l + (u ? "." : "#") + i, e.forced) && void 0 !== o) {
                        if (typeof a == typeof o) continue;
                        Le(a, o)
                    }(e.sham || o && o.sham) && j(a, "sham", !0), te(n, i, a, e)
                }
        },
        Ce = function(e, t, n) {
            if (function(e) {
                    if ("function" != typeof e) throw TypeError(String(e) + " is not a function")
                }(e), void 0 === t) return e;
            switch (n) {
                case 0:
                    return function() {
                        return e.call(t)
                    };
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function(n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        },
        Ie = function(e) {
            return Object(h(e))
        },
        Ee = Array.isArray || function(e) {
            return "Array" == f(e)
        },
        xe = !!Object.getOwnPropertySymbols && !i((function() {
            return !String(Symbol())
        })),
        _e = xe && !Symbol.sham && "symbol" == typeof Symbol.iterator,
        Ae = G("wks"),
        Re = r.Symbol,
        Ne = _e ? Re : Re && Re.withoutSetter || q,
        ze = function(e) {
            return m(Ae, e) || (xe && m(Re, e) ? Ae[e] = Re[e] : Ae[e] = Ne("Symbol." + e)), Ae[e]
        },
        Ve = ze("species"),
        Ge = function(e, t) {
            var n;
            return Ee(e) && ("function" != typeof(n = e.constructor) || n !== Array && !Ee(n.prototype) ? d(n) && null === (n = n[Ve]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
        },
        He = [].push,
        Fe = function(e) {
            var t = 1 == e,
                n = 2 == e,
                r = 3 == e,
                i = 4 == e,
                o = 6 == e,
                a = 5 == e || o;
            return function(s, l, c, u) {
                for (var f, g, h = Ie(s), p = v(h), d = Ce(l, c, 3), b = ce(p.length), y = 0, m = u || Ge, L = t ? m(s, b) : n ? m(s, 0) : void 0; b > y; y++)
                    if ((a || y in p) && (g = d(f = p[y], y, h), e))
                        if (t) L[y] = g;
                        else if (g) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return f;
                    case 6:
                        return y;
                    case 2:
                        He.call(L, f)
                } else if (i) return !1;
                return o ? -1 : r || i ? i : L
            }
        },
        qe = {
            forEach: Fe(0),
            map: Fe(1),
            filter: Fe(2),
            some: Fe(3),
            every: Fe(4),
            find: Fe(5),
            findIndex: Fe(6)
        },
        Be = Object.defineProperty,
        We = {},
        Ze = function(e) {
            throw e
        },
        Ke = function(e, t) {
            if (m(We, e)) return We[e];
            t || (t = {});
            var n = [][e],
                r = !!m(t, "ACCESSORS") && t.ACCESSORS,
                a = m(t, 0) ? t[0] : Ze,
                s = m(t, 1) ? t[1] : void 0;
            return We[e] = !!n && !i((function() {
                if (r && !o) return !0;
                var e = {
                    length: -1
                };
                r ? Be(e, 1, {
                    enumerable: !0,
                    get: Ze
                }) : e[1] = 1, n.call(e, a, s)
            }))
        },
        Ye = qe.forEach,
        Je = !!($ = []["forEach"]) && i((function() {
            $.call(null, X || function() {
                throw 1
            }, 1)
        })),
        Qe = Ke("forEach"),
        Ue = Je && Qe ? [].forEach : function(e) {
            return Ye(this, e, arguments.length > 1 ? arguments[1] : void 0)
        };
    Me({
        target: "Array",
        proto: !0,
        forced: [].forEach != Ue
    }, {
        forEach: Ue
    });
    var Xe = Object.keys || function(e) {
            return he(e, pe)
        },
        $e = Object.assign,
        et = Object.defineProperty,
        tt = !$e || i((function() {
            if (o && 1 !== $e({
                    b: 1
                }, $e(et({}, "a", {
                    enumerable: !0,
                    get: function() {
                        et(this, "b", {
                            value: 3,
                            enumerable: !1
                        })
                    }
                }), {
                    b: 2
                })).b) return !0;
            var e = {},
                t = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach((function(e) {
                t[e] = e
            })), 7 != $e({}, e)[n] || Xe($e({}, t)).join("") != r
        })) ? function(e, t) {
            for (var n = Ie(e), r = arguments.length, i = 1, a = ye.f, s = l.f; r > i;)
                for (var c, u = v(arguments[i++]), f = a ? Xe(u).concat(a(u)) : Xe(u), g = f.length, h = 0; g > h;) c = f[h++], o && !s.call(u, c) || (n[c] = u[c]);
            return n
        } : $e;
    Me({
        target: "Object",
        stat: !0,
        forced: Object.assign !== tt
    }, {
        assign: tt
    });
    for (var nt in {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }) {
        var rt = r[nt],
            it = rt && rt.prototype;
        if (it && it.forEach !== Ue) try {
            j(it, "forEach", Ue)
        } catch (e) {
            it.forEach = Ue
        }
    }

    function ot(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function at(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function st(e, t, n) {
        return t && at(e.prototype, t), n && at(e, n), e
    }

    function lt(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && ut(e, t)
    }

    function ct(e) {
    	
        return (ct = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        	c
        	
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function ut(e, t) {
    	
    	
        return (ut = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function ft(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function gt(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? ft(e) : t
    }

    function vt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var n, r = ct(e);
            if (t) {
                var i = ct(this).constructor;
                n = Reflect.construct(r, arguments, i)
            } else n = r.apply(this, arguments);
            return gt(this, n)
        }
    }

    function ht(e, t, n) {
        return (ht = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
            var r = function(e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ct(e)););
                return e
            }(e, t);
            if (r) {
                var i = Object.getOwnPropertyDescriptor(r, t);
                return i.get ? i.get.call(n) : i.value
            }
        })(e, t, n || e)
    }

    function pt(e, t) {
        for (var n in t.prototype) e.prototype[n] = t.prototype[n]
    }

    function dt(e) {
        (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function bt(e) {
        (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }
    var yt, mt, Lt = ie("navigator", "userAgent") || "",
        Dt = r.process,
        Ot = Dt && Dt.versions,
        St = Ot && Ot.v8;
    St ? mt = (yt = St.split("."))[0] + yt[1] : Lt && (!(yt = Lt.match(/Edge\/(\d+)/)) || yt[1] >= 74) && (yt = Lt.match(/Chrome\/(\d+)/)) && (mt = yt[1]);
    var wt = mt && +mt,
        kt = ze("species"),
        Pt = qe.map,
        Tt = function(e) {
            return wt >= 51 || !i((function() {
                var t = [];
                return (t.constructor = {})[kt] = function() {
                    return {
                        foo: 1
                    }
                }, 1 !== t[e](Boolean).foo
            }))
        }("map"),
        jt = Ke("map");
    Me({
        target: "Array",
        proto: !0,
        forced: !Tt || !jt
    }, {
        map: function(e) {
            return Pt(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    });
    var Mt = /"/g;
    Me({
        target: "String",
        proto: !0,
        forced: function(e) {
            return i((function() {
                var t = "" [e]('"');
                return t !== t.toLowerCase() || t.split('"').length > 3
            }))
        }("anchor")
    }, {
        anchor: function(e) {
            return t = "a", n = "name", r = e, i = String(h(this)), o = "<" + t, "" !== n && (o += " " + n + '="' + String(r).replace(Mt, "&quot;") + '"'), o + ">" + i + "</" + t + ">";
            var t, n, r, i, o
        }
    });
    
    var Ct = "block",
        It = "none",
        Et = "absolute",
        xt = "marker-label",
        _t = "marker-label-event",
        Pt = "disabled",
        At = function(e) {
    	
            lt(n, e);
            var t = vt(n);
//생성 시 값 넣는 곳
            function n(e) {
            	
                var r, i = e.clickable,
                    o = void 0 === i || i,
                    a = e.cursor,
                    s = void 0 === a ? "pointer" : a,
                    l = e.draggable,
                    c = void 0 === l || l,
                    u = e.labelAnchor,
                    f = void 0 === u ? new google.maps.Point(0, 0) : u,
                    g = e.labelClass,
                    v = void 0 === g ? xt : g,
                    h = e.labelContent,
                    z = e.labelVisible,
                    p = e.position,
                    d = e.opacity,
                    b = void 0 === d ? 1 : d,
                    y = e.map,
                    m = e.labelZIndexOffset,
                    L = void 0 === m ? 1 : m,
                    D = e.visible,
                    O = void 0 === D || D,
                    S = e.zIndex,
                    w = void 0 === S ? 0 : S;  
                   // console.log(ot(this, n), (r = t.call(this)).createElements(), r.anchor = f, r.content = h, r.labelVisible = z, r.className = v, r.clickable = o, r.cursor = s, r.draggable = c, p instanceof google.maps.LatLng ? r.position = p : r.position = new google.maps.LatLng(p), r.opacity = b, r.visible = O, r.zIndex = w, r.zIndexOffset = L, y && r.setMap(y), r);
                return ot(this, n), (r = t.call(this)).createElements(), r.anchor = f, r.content = h, r.labelVisible = z, r.className = v, r.clickable = o, r.cursor = s, r.draggable = c, p instanceof google.maps.LatLng ? r.position = p : r.position = new google.maps.LatLng(p), r.opacity = b, r.visible = O, r.zIndex = w, r.zIndexOffset = L, y && r.setMap(y), r
            }
            return st(n, [{
                key: "onAdd",
                value: function() {
                	
                    this.getPanes().markerLayer.appendChild(this.labelDiv), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv)
                }
            }, {
                key: "draw",
                value: function() {
                    var e = this.getProjection().fromLatLngToDivPixel(this.position),
                        t = Math.round(e.x + this.anchor.x),
                        n = Math.round(e.y + this.anchor.y);
                    this.labelDiv.style.left = "".concat(t, "px"), this.labelDiv.style.top = "".concat(n, "px"), this.eventDiv.style.left = this.labelDiv.style.left, this.eventDiv.style.top = this.labelDiv.style.top;
                    var r = (this.zIndex || Math.ceil(e.y)) + this.zIndexOffset;
                    this.labelDiv.style.zIndex = String(r), this.eventDiv.style.zIndex = String(r), this.eventDiv.style.display = this.isInteractive ? this.eventDiv.style.display : It, this.eventDiv.style.cursor = this.cursor;
                    
                }
            }, {
                key: "addDomListener",
                value: function(e, t) {
                    return google.maps.event.addDomListener(this.eventDiv, e, t)
                }
            }, {
                key: "onRemove",
                value: function() {
                    this.labelDiv.parentNode.removeChild(this.labelDiv), this.eventDiv.parentNode.removeChild(this.eventDiv)
                }
            }, {
                key: "createElements",
                value: function() {
                	
                    this.labelDiv = document.createElement("div"), this.eventDiv = document.createElement("div"),this.labelDiv.disabled=true,  this.labelDiv.classList.add(_t),this.labelDiv.style.position = Et, this.eventDiv.style.position = Et, this.eventDiv.style.opacity = "0.01"
                    	
                    	
                    	
                }
            }, {
                key: "content",
                set: function(e) {
                	
                    "string" == typeof e ? (this.labelDiv.innerHTML = e, this.eventDiv.innerHTML = e) : (this.labelDiv.innerHTML = "", this.labelDiv.appendChild(e), this.eventDiv.innerHTML = "", this.eventDiv.appendChild(e.cloneNode(!0)))
                }
            }, {
                key: "className",
                set: function(e) {
                	
                    this.labelDiv.className = e, this.eventDiv.className = e, this.eventDiv.classList.add(_t),this.labelDiv.disabled=true
                }
            }, {
                key: "cursor",
                set: function(e) {
                    this.hoverCursor = e, this.isInteractive && (this.eventDiv.style.cursor = e)
                },
                get: function() {
                    return this.isInteractive ? this.hoverCursor : "inherit"
                }
            }, {
                key: "isInteractive",
                get: function() {
                    return this.draggable || this.clickable
                }
            }, {
                key: "opacity",
                set: function(e) {
                    this.labelDiv.style.opacity = String(e)
                }
            }, {
                key: "title",
                set: function(e) {
                    this.eventDiv.title = e
                }
            }, {
                key: "labelVisible",
                set: function(e) {
                	           			
                	e ? (this.labelDiv.style.display = Ct) : (this.labelDiv.style.display = It)
                			
                                       		
                }
            }, {
                key: "visible",
                set: function(e) {
                	
                    e ? (this.eventDiv.style.display = Ct) : ( this.eventDiv.style.display = It)
                    //,e ? (this.labelDiv.style.display = Ct) : (this.labelDiv.style.display = It)
                }
            }]), n
        }((function e() {
            ot(this, e), pt(e, google.maps.OverlayView)
        })),
        Rt = "click",
        Nt = "dblclick",
        zt = "drag",
        Vt = "dragend",
        Gt = "dragstart",
        Ht = "mousedown",
        Ft = "mouseover",
        qt = "mouseout",
        Bt = "mouseup";
    return function(e) {
        lt(n, e);
        var t = vt(n);

        function n(e) {
            var r;
            return ot(this, n), (r = t.call(this, Object.assign({}, e))).isTouchScreen = !1, r.isDraggingLabel = !1, r.isMouseDownOnLabel = !1, r.shouldIgnoreClick = !1, r.label = new At(Object.assign({}, e)), r.propertyListeners = [google.maps.event.addListener(ft(r), "clickable_changed", r.handleClickableOrDraggableChange), google.maps.event.addListener(ft(r), "cursor_changed", (function() {
                r.label.cursor = r.getCursor()
            })), google.maps.event.addListener(ft(r), "draggable_changed", r.handleClickableOrDraggableChange), google.maps.event.addListener(ft(r), "position_changed", (function() {
                r.label.position = r.getPosition()
            })), google.maps.event.addListener(ft(r), "opacity_changed", (function() {
                r.label.opacity = r.getOpacity()
            })), google.maps.event.addListener(ft(r), "title_changed", (function() {
                r.label.title = r.getTitle()
            })), google.maps.event.addListener(ft(r), "visible_changed", (function() {
            	
                r.label.visible = r.getVisible()
                //r.label.labelVisible = r.labelVisible()
            })), google.maps.event.addListener(ft(r), "labelVisible_changed", (function() {
            	
                r.label.labelVisible = r.labelVisible()
            })), google.maps.event.addListener(ft(r), "zindex_changed", (function() {
                r.label.zIndex = r.getZIndex(), r.label.draw()
            }))], r
        }
        return st(n, [{
            key: "setMap",
            value: function(e) {
                var t = this;
                ht(ct(n.prototype), "setMap", this).call(this, e), setTimeout((function() {
                    t.label.setMap(e), t.removeInteractiveListeners(), e && t.addInteractiveListeners()
                }))
            }
        },{
            key: "setLabelVisible",
            value: function(e) {
                var t = this;
                

            }
        }, {
            key: "handleClickableOrDraggableChange",
            value: function() {
                this.label.clickable = this.getClickable(), this.label.draggable = this.getDraggable(), this.isInteractive ? this.addInteractiveListeners() : this.removeInteractiveListeners()
            }
        }, {
            key: "removeInteractiveListeners",
            value: function() {
                this.interactiveListeners && (this.interactiveListeners.forEach((function(e) {
                    return google.maps.event.removeListener(e)
                })), this.interactiveListeners = null)
            }
        }, {
            key: "addInteractiveListeners",
            value: function() {
                var e = this;
                if (!this.interactiveListeners) {
                    if (!this.getMap()) return;
                    this.interactiveListeners = [this.label.addDomListener(Ft, (function(t) {
                        e.isTouchScreen || (google.maps.event.trigger(e, Ft, {
                            latLng: e.getPosition()
                        }), dt(t))
                    })), this.label.addDomListener(qt, (function(t) {
                        e.isTouchScreen || (e.mouseOutTimeout && clearTimeout(e.mouseOutTimeout), e.mouseOutTimeout = setTimeout((function() {
                            e.isMouseDownOnLabel && (e.isMouseDownOnLabel = !1, google.maps.event.trigger(e, Bt, {
                                latLng: e.getPosition()
                            }), e.isDraggingLabel && (e.isDraggingLabel = !1, e.shouldIgnoreClick = !0, google.maps.event.trigger(e, Vt, {
                                latLng: e.getPosition()
                            }))), google.maps.event.trigger(e, qt, {
                                latLng: e.getPosition()
                            })
                        }), 200), dt(t))
                    })), this.label.addDomListener(Ht, (function(t) {
                        e.isDraggingLabel = !1, e.isMouseDownOnLabel = !0, google.maps.event.trigger(e, Ht, {
                            latLng: e.getPosition()
                        }), e.isTouchScreen || dt(t)
                    })), this.label.addDomListener(Bt, (function(t) {
                        var n = {
                            latLng: e.getPosition()
                        };
                        e.isMouseDownOnLabel && (e.isMouseDownOnLabel = !1, google.maps.event.trigger(e, Bt, n), e.isDraggingLabel && (e.isDraggingLabel = !1, e.shouldIgnoreClick = !0, google.maps.event.trigger(e, Vt, n)), e.getDraggable() || dt(t))
                    })), this.label.addDomListener(Rt, (function(t) {
                        e.shouldIgnoreClick ? e.shouldIgnoreClick = !1 : google.maps.event.trigger(e, Rt, {
                            latLng: e.getPosition()
                        }), dt(t)
                    })), this.label.addDomListener(Nt, (function(t) {
                        google.maps.event.trigger(e, Nt, {
                            latLng: e.getPosition()
                        }), dt(t)
                    })), google.maps.event.addListener(this.getMap(), "mousemove", (function(t) {
                        if (e.isMouseDownOnLabel && e.getDraggable())
                            if (e.isDraggingLabel) {
                                var n = new google.maps.LatLng(t.latLng.lat() - e.eventOffset.y, t.latLng.lng() - e.eventOffset.x);
                                google.maps.event.trigger(e, zt, Object.assign(Object.assign({}, t), {
                                    latLng: n
                                }))
                            } else e.isDraggingLabel = !0, e.eventOffset = new google.maps.Point(t.latLng.lng() - e.getPosition().lng(), t.latLng.lat() - e.getPosition().lat()), google.maps.event.trigger(e, Gt, Object.assign(Object.assign({}, t), {
                                latLng: e.getPosition()
                            }))
                    })), google.maps.event.addListener(this, Gt, (function() {
                        e.label.zIndex = 1e6
                    })), google.maps.event.addListener(this, zt, (function(t) {
                        var n = t.latLng;
                        e.setPosition(n)
                    })), google.maps.event.addListener(this, Vt, (function() {
                        e.label.zIndex = e.getZIndex(), e.label.draw()
                    })), this.label.addDomListener("touchstart", (function(t) {
                        e.isTouchScreen = !0, bt(t)
                    })), this.label.addDomListener("touchmove", (function(e) {
                        bt(e)
                    })), this.label.addDomListener("touchend", (function(e) {
                        bt(e)
                    }))]
                }
            }
        }, {
            key: "isInteractive",
            get: function() {
                return this.getClickable() || this.getDraggable()
            }
        }]), n
    }((function e(t) {
        ot(this, e), pt(e, google.maps.Marker), google.maps.Marker.call(this, t)
    }))
}();
//# sourceMappingURL=index.min.js.map