(function(config) {
  !function(e) {
      function t(n) {
          if (r[n])
              return r[n].exports;
          var o = r[n] = {
              exports: {},
              id: n,
              loaded: !1
          };
          return e[n].call(o.exports, o, o.exports, t),
          o.loaded = !0,
          o.exports
      }
      var r = {};
      return t.m = e,
      t.c = r,
      t.p = "/",
      t(0)
  }([function(e, t, r) {
      e.exports = r(1)
  }
  , function(e, t, r) {
      config = config || {};
      var n = "1.0.11"
        , o = document.createElement("script");
      o.type = "text/javascript",
      o.src = "/static/metro/js/mainv.js?v=" + config.v + "&version=" + n;
      var a = document.querySelectorAll("script");
      a = Array.prototype.slice.apply(a);
      for (var c = 0; c < a.length; c++) {
          if (a[c].src.match(/\/subway?/)) {
              var i = a[c];
              break
          }
          i = a[c]
      }
      var l = i && i.parentNode
        , p = i && i.nextSibling;
      o.addEventListener("load", function() {
          var e = window[config.callback] || function() {}
          ;
          e()
      }),
      i ? l.insertBefore(o, p) : document.getElementsByTagName("head")[0].appendChild(o)
  }
  ]);
}
)({
  "key": "4bffd72c66f25b3d49991395113beca7",
  "city": [115.423411, 39.442758, 117.514625, 41.060816, 116.405285, 39.904989],
  "client": "http://tcc:9002",
  "v": "1.0",
  "callback": "cbk",
  "adcode": "110000"
})
