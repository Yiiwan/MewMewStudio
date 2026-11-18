(function () {
  var M = window.MEWKEY, P = M.PRODUCTS;
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return '$' + n.toFixed(2); }
  function byId(id) { return P.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- artwork (swap for real photos by adding p.img) ---------- */
  function art(p) {
    if (p.img) return '<div class="art"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + ' keychain" style="width:100%;display:block;border-radius:22px"></div>';
    var a = p.art, s = '<div class="art"><svg viewBox="0 0 120 120" role="img" aria-label="' + esc(p.name) + ' keychain">' +
      '<rect x="4" y="4" width="112" height="112" rx="26" fill="' + a.b + '" stroke="#2A1304" stroke-width="4"/>';
    if (a.f) s += '<g transform="translate(18,20) scale(.84)" style="color:' + a.c + '"><use href="#body"/><use href="#f-' + a.f + '"/></g>';
    if (a.e) s += a.f ? '<text x="94" y="32" font-size="26" text-anchor="middle">' + a.e + '</text>'
                      : '<text x="60" y="82" font-size="62" text-anchor="middle">' + a.e + '</text>';
    return s + '</svg></div>';
  }
  function stars(p) { return '<span class="stars">★ ' + p.rating.toFixed(1) + ' (' + p.n + ')</span>'; }

  /* ---------- home: hero, tape, categories ---------- */
  $('#heroArt').innerHTML = art(byId('loaf-mode')) + art(byId('crying-thumbs-up-cat')) + art(byId('sir-chonk'));
  var tw = ['meow?!', '100% unhinged ✨', 'Loaf mode 😹', 'Free shipping over $' + M.FREE_SHIP + ' 🐟', 'Add a name for $' + M.ENGRAVE + ' 🔑', 'Glitter acrylic 🙀', 'Soft enamel 🧡'].join('  ★  ') + '  ★  ';
  $('#tape').textContent = tw + tw + tw + tw;
  $('#catCards').innerHTML = Object.keys(M.CATS).map(function (k) {
    var n = P.filter(function (p) { return p.cat === k; }).length;
    return '<a class="catc" href="?cat=' + k + '#shop"><h3>' + M.CATS[k][0] + '</h3>' + M.CATS[k][1] + '<small>' + n + ' designs →</small></a>';
  }).join('');

  /* ---------- shop ---------- */
  var st = { q: '', sort: 'feat', cat: 'all', price: 'all' };
  var PR = [['all', 'Any price'], ['u11', 'Under $11'], ['m', '$11 – $12'], ['h', '$13+']];
  var qc = new URLSearchParams(location.search).get('cat');
  if (qc && M.CATS[qc]) st.cat = qc;

  function chips() {
    $('#chipsCat').innerHTML = [['all', 'All']].concat(Object.keys(M.CATS).map(function (k) { return [k, M.CATS[k][0]]; }))
      .map(function (c) { return '<button type="button" data-c="' + c[0] + '" aria-pressed="' + (st.cat === c[0]) + '">' + c[1] + '</button>'; }).join('');
    $('#chipsPrice').innerHTML = PR.map(function (c) { return '<button type="button" data-p="' + c[0] + '" aria-pressed="' + (st.price === c[0]) + '">' + c[1] + '</button>'; }).join('');
  }
  function inPrice(p) { return st.price === 'all' || (st.price === 'u11' && p.price < 11) || (st.price === 'm' && p.price >= 11 && p.price <= 12) || (st.price === 'h' && p.price >= 13); }
  function shop() {
    var q = st.q.toLowerCase();
    var L = P.map(function (p, i) { return { p: p, i: i }; }).filter(function (x) {
      return (st.cat === 'all' || x.p.cat === st.cat) && inPrice(x.p) && (!q || (x.p.name + ' ' + x.p.tag).toLowerCase().indexOf(q) > -1);
    });
    var S = { feat: function (a, b) { return a.i - b.i; }, 'new': function (a, b) { return (b.p.badge === 'New') - (a.p.badge === 'New') || b.i - a.i; },
      rate: function (a, b) { return b.p.rating - a.p.rating || b.p.n - a.p.n; }, lo: function (a, b) { return a.p.price - b.p.price; }, hi: function (a, b) { return b.p.price - a.p.price; } };
    L.sort(S[st.sort]);
    $('#count').textContent = L.length + ' keychain' + (L.length === 1 ? '' : 's');
    $('#grid').innerHTML = L.length ? L.map(function (x) {
      var p = x.p;
      return '<a class="card" href="#/products/' + p.id + '">' + (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') + art(p) +
        '<h3>' + esc(p.name) + '</h3><span class="price">' + money(p.price) + '</span><small>' + esc(p.tag) + '</small>' + stars(p) + '</a>';
    }).join('') : '<div class="empty">No keychains found. Try another search 🙀</div>';
    chips();
  }
  $('#q').addEventListener('input', function (e) { st.q = e.target.value; shop(); });
  $('#sort').addEventListener('change', function (e) { st.sort = e.target.value; shop(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('#chipsCat button,#chipsPrice button'); if (!b) return;
    if (b.dataset.c) st.cat = b.dataset.c; else st.price = b.dataset.p; shop();
  });

  /* ---------- product page ---------- */
  var cur;
  function unit() {
    var p = cur.p; return p.price + M.MATERIALS[cur.m][1] + M.SIZES[cur.s][1] + (cur.eng ? M.ENGRAVE : 0);
  }
  function pdp(id) {
    var p = byId(id);
    if (!p) { location.hash = '#shop'; return; }
    cur = { p: p, m: 0, s: 1, r: 0, eng: false, name: '', q: 1 };
    $('#pdp').innerHTML = '<a class="back" href="#shop">← Back to the zoo</a><div class="pdp">' + art(p) + '<div>' +
      '<h2>' + esc(p.name) + '</h2><p class="lead" style="margin:10px 0">' + esc(p.tag) + '</p>' + stars(p) +
      '<p class="big" id="pp" style="margin:12px 0 0"></p>' +
      '<div class="opt">' +
      '<div><b>Material</b><div class="pills" data-k="m">' + M.MATERIALS.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + x[0] + (x[1] ? ' +$' + x[1] : '') + '</button>'; }).join('') + '</div></div>' +
      '<div><b>Size</b><div class="pills" data-k="s">' + M.SIZES.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + x[0] + (x[1] ? (x[1] > 0 ? ' +$' : ' −$') + Math.abs(x[1]) : '') + '</button>'; }).join('') + '</div></div>' +
      '<div><b>Ring colour</b><div class="pills" data-k="r">' + M.RINGS.map(function (x, i) { return '<button type="button" class="sw" data-i="' + i + '" style="background:' + x[1] + '" aria-label="' + x[0] + '"></button>'; }).join('') + '</div></div>' +
      '<label><span><input type="checkbox" id="eng"> Engrave a name on the back (+$' + M.ENGRAVE + ')</span></label>' +
      '<label id="engL" hidden>Name or inside joke<input type="text" id="engT" maxlength="20"></label>' +
      '<label>Quantity<select id="qty">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return '<option>' + n + '</option>'; }).join('') + '</select></label>' +
      '</div><button class="btn" id="add" type="button">Add to bag</button></div></div>';
    paint(); window.scrollTo(0, 0);
  }
  function paint() {
    document.querySelectorAll('#pdp .pills').forEach(function (g) {
      var v = cur[g.dataset.k];
      g.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.i === v); });
    });
    $('#pp').textContent = money(unit());
  }
  $('#pdp').addEventListener('click', function (e) {
    var b = e.target.closest('.pills button');
    if (b) { cur[b.parentNode.dataset.k] = +b.dataset.i; paint(); return; }
    if (e.target.id === 'add') {
      var o = [M.MATERIALS[cur.m][0], M.SIZES[cur.s][0], M.RINGS[cur.r][0] + ' ring'];
      if (cur.eng && cur.name.trim()) o.push('Engraved: “' + cur.name.trim() + '”');
      add({ key: cur.p.id + o.join('|'), name: cur.p.name, opts: o.join(' · '), price: unit(), q: cur.q });
    }
  });
  $('#pdp').addEventListener('input', function (e) {
    if (e.target.id === 'eng') { cur.eng = e.target.checked; $('#engL').hidden = !cur.eng; paint(); }
    if (e.target.id === 'engT') cur.name = e.target.value;
    if (e.target.id === 'qty') cur.q = +e.target.value;
  });

  /* ---------- cart ---------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('mewkey_cart') || '[]'); } catch (e) { cart = []; }
  function save() { try { localStorage.setItem('mewkey_cart', JSON.stringify(cart)); } catch (e) {} }
  function add(it) {
    var f = cart.filter(function (c) { return c.key === it.key; })[0];
    if (f) f.q += it.q; else cart.push(it);
    save(); drawCart(); document.body.classList.add('bag');
  }
  function drawCart() {
    var tot = 0, n = 0;
    cart.forEach(function (c) { tot += c.price * c.q; n += c.q; });
    $('#items').innerHTML = cart.length ? cart.map(function (c, i) {
      return '<div class="it"><b>' + esc(c.name) + '</b><span>' + money(c.price * c.q) + '</span><small>' + esc(c.opts) + '</small>' +
        '<span><button type="button" data-d="-1" data-i="' + i + '" aria-label="Fewer">−</button> ' + c.q + ' <button type="button" data-d="1" data-i="' + i + '" aria-label="More">+</button> <button type="button" class="rm" data-d="x" data-i="' + i + '">Remove</button></span></div>';
    }).join('') : '<div class="emptyc">🙀<br>Your bag is empty<br><small>Even the void cat has more stuff in it.</small></div>';
    $('#cnt').textContent = n; $('#dc').textContent = n; $('#sub').textContent = money(tot);
    $('#meter').style.width = Math.min(100, tot / M.FREE_SHIP * 100) + '%';
    $('#free').textContent = tot >= M.FREE_SHIP ? 'Free shipping unlocked! 🚚' : 'Add ' + money(M.FREE_SHIP - tot) + ' more for free shipping 🚚';
    var co = $('#checkout');
    if (n) {
      var body = 'Hi Mewkey! I’d like to order:\n' + cart.map(function (c) { return '• ' + c.name + ' (' + c.opts + ') x' + c.q + ' — ' + money(c.price * c.q); }).join('\n') + '\nSubtotal: ' + money(tot);
      co.href = 'mailto:' + M.EMAIL + '?subject=' + encodeURIComponent('Mewkey order') + '&body=' + encodeURIComponent(body); co.removeAttribute('aria-disabled');
    } else { co.href = '#'; co.setAttribute('aria-disabled', 'true'); }
  }
  $('#items').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var i = +b.dataset.i, c = cart[i];
    if (b.dataset.d === 'x') cart.splice(i, 1); else { c.q += +b.dataset.d; if (c.q < 1) cart.splice(i, 1); }
    save(); drawCart();
  });
  $('#bagBtn').onclick = function () { document.body.classList.add('bag'); };
  $('#close').onclick = $('#shade').onclick = function () { document.body.classList.remove('bag'); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.body.classList.remove('bag'); });

  /* ---------- pitch form (no server on GitHub Pages: opens an email) ---------- */
  $('#pitch').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(e.target);
    var body = 'Name: ' + f.get('name') + '\nEmail: ' + f.get('email') + '\nTheme: ' + f.get('theme') + '\nHow many: ' + f.get('qty') + '\n\n' + (f.get('msg') || '');
    location.href = 'mailto:' + M.EMAIL + '?subject=' + encodeURIComponent('Keychain idea: ' + f.get('theme')) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- routing ---------- */
  function route() {
    var m = location.hash.match(/^#\/products\/(.+)$/);
    $('#pdp').hidden = !m; $('#home').hidden = !!m;
    if (m) { pdp(decodeURIComponent(m[1])); }
    else {
      var el = location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null;
      if (el) el.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', route);
  shop(); drawCart(); route();
})();
