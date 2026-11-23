/* FakeChar · 页面填充器：字段识别 + 原生 setter 写入 + 事件派发（穿透 Vue/React） */
(function (g) {
  'use strict';
  if (g.__fakecharFiller) return;
  const U = g.FakeCharUtil;

  const norm = (s) => U.norm(s);
  const CJK = /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/;

  const MATCHERS = new Map();
  function tokenRe(token) {
    let re = MATCHERS.get(token);
    if (!re) {
      const esc = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp('(^|[^a-z0-9])' + esc + '([^a-z0-9]|$)', 'i');
      MATCHERS.set(token, re);
    }
    return re;
  }
  function hasToken(text, token) {
    if (!text) return false;
    if (CJK.test(token)) return text.includes(token);
    return tokenRe(token).test(text);
  }
  function anyToken(text, tokens) {
    for (const t of tokens || []) if (hasToken(text, t)) return true;
    return false;
  }

  /* ---------------- 字段规则 ---------------- */
  const RULES = [
    {
      key: 'person.firstName',
      tokens: ['first name', 'firstname', 'given name', 'givenname', 'fname', 'first', 'vorname', 'prénom', 'prenom', 'nombre', 'nome', '名前', '이름'],
      ac: ['given-name'], exact: ['名', 'first'], neg: ['last', 'family', 'surname', 'user', '公司', '姓']
    },
    {
      key: 'person.lastName',
      tokens: ['last name', 'lastname', 'surname', 'family name', 'familyname', 'lname', 'nachname', 'nom de famille', 'apellido', 'cognome', '姓氏', '苗字', '성'],
      ac: ['family-name', 'lname'], exact: ['姓'], neg: ['first', 'given', 'user']
    },
    {
      key: 'person.fullName',
      tokens: ['full name', 'fullname', 'your name', 'name', '姓名', '名字', '氏名', 'お名前', 'フルネーム', 'nom complet', 'nombre completo', 'nome completo', 'vollständiger name', 'voor en achternaam'],
      ac: ['name'], exact: ['name', '姓名', '名字', 'お名前'],
      neg: ['user', 'company', 'organization', 'organisation', 'card', 'product', 'file', 'search', 'domain', 'site', 'account', '用户名', '账号', '公司', '单位', '搜索', 'first', 'last', 'family', 'middle']
    },
    {
      key: 'contact.email',
      tokens: ['email', 'e mail', 'mail', '邮箱', '电子邮件', 'メール', '이메일', 'correo', 'courriel', 'emailadresse', 'email address'],
      ac: ['email'], types: ['email'],
      neg: ['mailing address', 'street', 'city', 'zip', 'postal']
    },
    {
      key: 'contact.mobile',
      tokens: ['mobile', 'cell', 'mobile phone', '手机', '手机号', '手机号码', '携帯電話', '휴대폰', 'handy', 'portable'],
      ac: ['tel'], types: ['tel'],
      neg: ['card', 'credit', 'account', 'order', 'fax', 'ext', '卡号', '订单']
    },
    {
      key: 'contact.phone',
      tokens: ['phone', 'telephone', 'tel', 'mobile', 'cell', '手机', '电话', '联系电话', '携帯', '電話', 'telefon', 'téléphone', 'telefono', 'teléfono', 'mobiel', 'telefoon', '핸드폰', '휴대폰'],
      ac: ['tel', 'tel-national', 'tel-local', 'tel-area-code', 'tel-country-code'], types: ['tel'],
      neg: ['card', 'credit', 'account', 'order', 'fax', 'ext', '卡号', '订单']
    },
    {
      key: 'address.line1',
      tokens: ['address', 'street', 'addr', '地址', '街道', '住址', '住所', '番地', 'straße', 'strasse', 'rue', 'calle', 'via', 'straat', 'gata', 'endereço', 'dirección', 'address line 1'],
      ac: ['street-address', 'address-line1'], exact: ['address'],
      neg: ['line 2', 'line2', 'apt', 'apartment', 'suite', 'unit', 'floor', 'email', 'e mail', 'ip', 'mac', 'room', '室', '单元', 'wohnung', 'appartement', 'piso', 'appartamento']
    },
    {
      key: 'address.line2',
      tokens: ['line 2', 'line2', 'apt', 'apartment', 'suite', 'unit', 'floor', 'room', '室', '单元', '房号', 'wohnung', 'appartement', 'piso', 'appartamento', 'etage'],
      ac: ['address-line2'], neg: ['email']
    },
    {
      key: 'address.city',
      tokens: ['city', 'town', '城市', '市区町村', 'stadt', 'ville', 'ciudad', 'città', 'citta', 'plaats', 'stad', 'cidade', 'suburb'],
      ac: ['address-level2'], neg: ['state', 'province', 'country', 'zip', 'postal', 'county']
    },
    {
      key: 'address.region',
      tokens: ['state', 'province', 'region', 'county', '州', '省', '都道府県', 'bundesland', 'région', 'provincia', 'regione', 'provincie', 'län', 'estado', 'prefecture'],
      ac: ['address-level1'], neg: ['country', 'city', 'zip', 'postal', 'status']
    },
    {
      key: 'address.postalCode',
      tokens: ['zip', 'postal', 'postcode', 'post code', '邮编', '邮政编码', '郵便番号', 'plz', 'postleitzahl', 'code postal', 'código postal', 'codigo postal', '우편번호', 'cep', 'pincode', 'pin code', 'zip code'],
      ac: ['postal-code'], neg: ['city', 'country']
    },
    {
      key: 'address.country',
      tokens: ['country', 'nation', '国家', '国', 'land', 'pays', 'país', 'pais', 'paese', 'country name'],
      ac: ['country', 'country-name'], neg: ['city', 'state', 'code']
    },
    {
      key: 'person.dob',
      tokens: ['birth', 'dob', 'birthday', 'date of birth', '出生', '生日', '出生日期', 'geburtsdatum', 'naissance', 'fecha de nacimiento', 'data di nascita', '生年月日', '생년월일', 'geboortedatum', 'birth date', 'birthdate'],
      ac: ['bday', 'bday-day', 'bday-month', 'bday-year'], types: ['date'], neg: ['city', 'place of birth']
    },
    {
      key: 'person.age',
      tokens: ['age', '年龄', 'alter', 'âge', 'edad', 'età', '年齢', '나이'],
      ac: [], types: ['number'], neg: ['page', 'image', 'usage', 'language', 'message']
    },
    {
      key: 'person.gender',
      tokens: ['gender', 'sex', '性别', 'geschlecht', 'sexe', 'sexo', 'sesso', '性別', '성별'],
      ac: [], exact: ['sex']
    },
    {
      key: 'company.name',
      tokens: ['company', 'organization', 'organisation', 'employer', '公司', '单位', '公司名称', 'firma', 'unternehmen', 'entreprise', 'empresa', 'azienda', 'bedrijf', '회사', 'corporate', 'business name'],
      ac: ['organization'], neg: ['job', 'title', 'position', 'contact', 'person']
    },
    {
      key: 'company.jobTitle',
      tokens: ['job title', 'jobtitle', 'position', 'occupation', '职位', '职务', '岗位', 'beruf', 'poste', 'puesto', 'profession', '役職', '직책', 'designation'],
      ac: ['organization-title'], neg: ['company', 'name']
    },
    {
      key: 'contact.username',
      tokens: ['username', 'user name', 'login', 'userid', 'user id', '用户名', '账号', '帳號', 'benutzername', 'usuario', 'nome utente', 'gebruikersnaam', '아이디', 'login name'],
      ac: ['username'], neg: ['email', 'company']
    },
    {
      key: 'contact.website',
      tokens: ['website', 'web site', 'homepage', 'url', '网站', '网址', 'webseite', 'site web', 'sitio web', 'sito web', 'home page'],
      ac: ['url'], types: ['url']
    },
    {
      key: 'ids.primary.value',
      tokens: ['ssn', 'social security', 'national id', 'id number', 'identity number', '身份证', '身份证号', '证件号', '身份证号码', 'document number', 'passport number', '税号', 'aadhaar', 'cpf', 'curp', 'rfc', 'rrn', '주민등록번호', 'マイナンバー', 'my number', 'personnummer', 'bsn', 'dni', 'nie', 'nino', 'sin', 'tfn', 'steuer id', 'steuer-id', 'codice fiscale', 'insee', 'tax id', 'taxid', 'id card number'],
      ac: [], neg: ['issue', 'expiry', 'expiration', 'valid', 'type']
    },
    {
      key: 'finance.cardNumber',
      tokens: ['card number', 'credit card', 'cc number', 'ccnumber', '卡号', '银行卡号', 'kartennummer', 'numéro de carte', 'numero de carta', 'card no'],
      ac: ['cc-number'], neg: ['gift', 'loyalty', 'id card', 'phone']
    },
    {
      key: 'finance.expiry',
      tokens: ['expiry', 'expiration', 'exp date', 'valid thru', 'valid through', '有效期', 'cc exp', 'mm yy', 'mm/yy', 'expires'],
      ac: ['cc-exp', 'cc-exp-month', 'cc-exp-year'], neg: ['card number']
    },
    {
      key: 'finance.cvv',
      tokens: ['cvv', 'cvc', 'cvv2', 'security code', '安全码', 'prüfnummer', 'card code', 'card verification'],
      ac: ['cc-csc']
    },
    {
      key: 'online.password',
      tokens: ['password', 'passwd', 'pwd', '密码', '密碼', 'passwort', 'mot de passe', 'contraseña', 'contrasena', 'wachtwoord', '비밀번호', 'パスワード'],
      ac: ['current-password', 'new-password'], types: ['password']
    },
    {
      key: 'note',
      tokens: ['message', 'comment', 'comments', 'note', 'notes', 'description', '备注', '留言', '内容', 'nachricht', 'mensaje', 'messaggio'],
      types: ['textarea'], neg: ['search']
    }
  ];

  /* ---------------- 取值 ---------------- */
  function getValue(profile, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), profile);
  }

  function labelText(el) {
    const parts = [];
    if (el.id) {
      try {
        const l = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
        if (l) parts.push(l.textContent || '');
      } catch (e) { /* ignore */ }
    }
    const wrap = el.closest('label');
    if (wrap) parts.push(wrap.textContent || '');
    const labelled = el.getAttribute('aria-labelledby');
    if (labelled) {
      labelled.split(/\s+/).forEach((id) => {
        const n = document.getElementById(id);
        if (n) parts.push(n.textContent || '');
      });
    }
    parts.push(el.getAttribute('aria-label') || '');
    parts.push(el.getAttribute('title') || '');
    // 常见表单组件：label 兄弟/父级
    const parent = el.parentElement;
    if (parent) {
      const cand = parent.querySelector('label, .label, [class*="label"]');
      if (cand && cand !== el) parts.push(cand.textContent || '');
      const prev = el.previousElementSibling;
      if (prev && prev.textContent && prev.textContent.length < 40) parts.push(prev.textContent);
    }
    return parts.join(' ');
  }

  function fieldText(el) {
    return norm([
      el.name, el.id, el.placeholder, el.getAttribute('autocomplete'), labelText(el),
      el.getAttribute('aria-label'), el.getAttribute('data-testid'), el.className
    ].filter(Boolean).join(' '));
  }

  /* autocomplete 属性按原样切词：'given-name' 是一个 token，不能被 norm 拆成 'given name' */
  function acTokens(el) {
    return (el.getAttribute('autocomplete') || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  }
  function hasAc(el, rule) {
    if (!rule.ac) return false;
    const list = acTokens(el);
    return rule.ac.some((t) => list.includes(String(t).toLowerCase()));
  }

  function ruleScore(el, rule) {
    const text = fieldText(el);
    if (rule.neg && anyToken(text, rule.neg)) {
      // 负向词只压制弱信号，autocomplete/type 强信号仍然保留
      if (!hasAc(el, rule)) return -1;
    }
    let score = 0;
    if (hasAc(el, rule)) score += 120;
    const type = (el.getAttribute('type') || el.tagName).toLowerCase();
    if (rule.types && rule.types.includes(type)) score += 80;

    const nameId = norm(`${el.name || ''} ${el.id || ''}`);
    if (rule.tokens && anyToken(nameId, rule.tokens)) score += 60;
    const ph = norm(el.placeholder || '');
    if (rule.tokens && anyToken(ph, rule.tokens)) score += 45;
    const label = norm(labelText(el));
    if (rule.tokens && anyToken(label, rule.tokens)) score += 50;
    if (rule.exact && label && rule.exact.some((t) => label === norm(t))) score += 50;
    const aria = norm(el.getAttribute('aria-label') || '');
    if (rule.tokens && anyToken(aria, rule.tokens)) score += 40;
    return score;
  }

  function pickRule(el) {
    let best = { key: null, score: 0 };
    for (const rule of RULES) {
      const s = ruleScore(el, rule);
      if (s > best.score) best = { key: rule.key, score: s };
    }
    return best.score >= 45 ? best : { key: null, score: 0 };
  }

  /* ---------------- 可见性 / 跳过 ---------------- */
  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    if (el.getClientRects().length === 0) return false;
    return true;
  }

  function shouldSkip(el) {
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    if (tag === 'input' && ['hidden', 'submit', 'button', 'reset', 'file', 'image', 'range', 'color', 'search'].includes(type)) return true;
    if (el.disabled || el.readOnly) return true;
    if (el.getAttribute('aria-hidden') === 'true') return true;
    const text = norm(`${el.name || ''} ${el.id || ''} ${el.placeholder || ''} ${labelText(el)}`);
    if (anyToken(text, ['search', 'query', '搜索', '検索', '关键词', 'keyword', 'filter'])) return true;
    if (!isVisible(el)) return true;
    return false;
  }

  /* ---------------- 原生 setter + 事件 ---------------- */
  function setNativeValue(el, value) {
    const proto =
      el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype
        : el instanceof HTMLSelectElement ? HTMLSelectElement.prototype
          : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.set) desc.set.call(el, value);
    else el.value = value;
  }

  function fire(el, type) {
    el.dispatchEvent(new Event(type, { bubbles: true, composed: true }));
  }

  function writeValue(el, value) {
    try { el.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    setNativeValue(el, value);
    fire(el, 'input');
    fire(el, 'change');
    try {
      el.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    } catch (e) { fire(el, 'blur'); }
  }

  /* ---------------- 下拉选择 ---------------- */
  function normOpt(s) {
    return norm(s).replace(/\s+/g, '');
  }

  function chooseOption(select, candidates) {
    const opts = Array.from(select.options || []);
    if (!opts.length) return false;
    const cands = candidates.filter(Boolean).map((c) => String(c));
    for (const c of cands) {
      const target = normOpt(c);
      if (!target) continue;
      let hit = opts.find((o) => normOpt(o.textContent) === target || normOpt(o.value) === target);
      if (!hit) hit = opts.find((o) => normOpt(o.textContent).includes(target) || normOpt(o.value).includes(target));
      if (hit) {
        if (hit.value === '' && opts.length > 1) continue;
        select.value = hit.value;
        fire(select, 'input');
        fire(select, 'change');
        return true;
      }
    }
    return false;
  }

  function selectFor(el, key, profile, emptyOnly) {
    const p = profile;
    const candidates = [];
    if (key === 'address.country') {
      candidates.push(p.address.country, p.address.countryCode, p.meta.countryName, p.meta.country);
      if (p.address.countryCode === 'US') candidates.push('United States', 'USA', 'US', '美国');
    } else if (key === 'address.region') {
      candidates.push(p.address.region, p.address.regionCode);
    } else if (key === 'person.gender') {
      candidates.push(p.person.gender, p.person.gender === 'male' ? '男' : '女');
      if (p.person.gender === 'male') candidates.push('M', 'Male', 'Man', 'Herr', 'Monsieur');
      else candidates.push('F', 'Female', 'Woman', 'Frau', 'Madame');
    } else if (key === 'person.title') {
      candidates.push(p.person.title);
      if (p.person.gender === 'male') candidates.push('Mr', 'Mr.', 'Mister', 'Herr', 'M.', '先生');
      else candidates.push('Ms', 'Ms.', 'Mrs', 'Mrs.', 'Frau', 'Mme', '女士');
    } else if (key === 'person.dob') {
      // 拆分式生日下拉：按 name/id 判断年月日
      const t = norm(`${el.name || ''} ${el.id || ''}`);
      const [y, m, d] = p.person.dob.split('-');
      if (anyToken(t, ['year', 'yyyy', '年'])) candidates.push(y);
      else if (anyToken(t, ['month', 'mm', '月'])) candidates.push(m, String(+m));
      else if (anyToken(t, ['day', 'dd', '日'])) candidates.push(d, String(+d));
      if (!candidates.length) return false;
    } else {
      return false;
    }
    if (emptyOnly && el.selectedIndex > 0 && el.value) return false;
    return chooseOption(el, candidates);
  }

  /* ---------------- 日期格式 ---------------- */
  function formatDate(el, iso, profile) {
    const [y, m, d] = iso.split('-');
    const ph = `${el.placeholder || ''} ${el.getAttribute('aria-label') || ''} ${labelText(el)}`.toLowerCase();
    if (ph.includes('yyyy')) {
      const iy = ph.indexOf('yyyy');
      const im = ph.indexOf('mm');
      const id = ph.indexOf('dd');
      const order = [['y', iy], ['m', im], ['d', id]].filter((x) => x[1] >= 0).sort((a, b) => a[1] - b[1]).map((x) => x[0]).join('');
      if (order === 'ymd') return iso;
      if (order === 'mdy') return `${+m}/${+d}/${y}`;
      if (order === 'dmy') return `${+d}/${+m}/${y}`;
    }
    if (/(mm\s*[\/.-]\s*dd)|(mmddyyyy)/.test(ph)) return `${+m}/${+d}/${y}`;
    if (/(dd\s*[\/.-]\s*mm)|(ddmmyyyy)/.test(ph)) return `${+d}/${+m}/${y}`;
    return profile.meta.country === 'US' ? `${+m}/${+d}/${y}` : `${+d}/${+m}/${y}`;
  }

  /* ---------------- 收集字段（含 Shadow DOM） ---------------- */
  function collectFields(root) {
    const out = [];
    const visit = (node) => {
      if (!node || !node.querySelectorAll) return;
      const found = node.querySelectorAll('input, textarea, select');
      for (const el of found) out.push(el);
      const all = node.querySelectorAll('*');
      for (const el of all) {
        if (el.shadowRoot) visit(el.shadowRoot);
      }
    };
    visit(root || document);
    return out;
  }

  /* ---------------- 高亮 ---------------- */
  function ensureStyle() {
    if (document.getElementById('fakechar-style')) return;
    const st = document.createElement('style');
    st.id = 'fakechar-style';
    st.textContent = '.fakechar-hl{outline:2px solid #007aff !important;outline-offset:1px !important;background-color:rgba(0,122,255,.08) !important;transition:outline-color .2s,background-color .2s;}';
    (document.head || document.documentElement).appendChild(st);
  }

  function decorate(el) {
    ensureStyle();
    el.classList.add('fakechar-hl');
    setTimeout(() => el.classList.remove('fakechar-hl'), 2200);
  }

  /* ---------------- 主流程 ---------------- */
  function fillPage(profile, options) {
    const opts = Object.assign({ emptyOnly: false, highlight: false }, options || {});
    if (!profile || !profile.person) return { ok: false, error: 'no-profile' };
    const fields = collectFields(document);
    let filled = 0;
    let matched = 0;
    const keys = [];

    for (const el of fields) {
      if (shouldSkip(el)) continue;
      const best = pickRule(el);
      if (!best.key) continue;
      matched++;

      const value = getValue(profile, best.key);
      if (value == null || value === '') continue;

      try {
        if (el.tagName === 'SELECT') {
          if (selectFor(el, best.key, profile, opts.emptyOnly)) {
            filled++;
            keys.push(best.key);
            if (opts.highlight) decorate(el);
          }
          continue;
        }
        if (el.type === 'radio') {
          if (best.key === 'person.gender') {
            const v = norm(el.value || '');
            const want = profile.person.gender;
            const match = want === 'male'
              ? ['male', 'm', 'man', '男', '1', 'herr']
              : ['female', 'f', 'woman', '女', '2', 'frau'];
            if (match.includes(v) && !el.checked) {
              el.click();
              filled++;
              keys.push(best.key);
              if (opts.highlight) decorate(el);
            }
          }
          continue;
        }
        if (el.type === 'checkbox') continue;

        const current = String(el.value || '').trim();
        if (opts.emptyOnly && current) continue;

        let out = String(value);
        if (best.key === 'person.dob') {
          if (el.type === 'date' || el.type === 'month') {
            out = el.type === 'month' ? profile.person.dob.slice(0, 7) : profile.person.dob;
          } else {
            out = formatDate(el, profile.person.dob, profile);
          }
        }
        if (best.key === 'person.age' && el.type === 'number') out = String(profile.person.age);
        if (best.key === 'contact.website' && el.type === 'url') out = profile.contact.website;

        writeValue(el, out);
        filled++;
        keys.push(best.key);
        if (opts.highlight) decorate(el);
      } catch (e) { /* 单个字段失败不影响整体 */ }
    }

    return { ok: true, filled, matched, total: fields.length, keys: Array.from(new Set(keys)) };
  }

  function highlightPage(profile) {
    const fields = collectFields(document);
    let matched = 0;
    for (const el of fields) {
      if (shouldSkip(el)) continue;
      const best = pickRule(el);
      if (!best.key) continue;
      matched++;
      decorate(el);
    }
    return { ok: true, matched, total: fields.length };
  }

  /* ---------------- 消息 ---------------- */
  try {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (!msg || (msg.type !== 'FAKECHAR_FILL' && msg.type !== 'FAKECHAR_HIGHLIGHT' && msg.type !== 'FAKECHAR_PING')) return;
      try {
        if (msg.type === 'FAKECHAR_PING') sendResponse({ ok: true });
        else if (msg.type === 'FAKECHAR_FILL') sendResponse(fillPage(msg.profile, msg.options));
        else sendResponse(highlightPage(msg.profile));
      } catch (e) {
        sendResponse({ ok: false, error: String((e && e.message) || e) });
      }
    });
  } catch (e) { /* 非扩展环境 */ }

  /* ---------------- 自动填充 ---------------- */
  try {
    chrome.storage.local.get(['fakechar.profile', 'fakechar.settings'], (data) => {
      if (!data) return;
      const profile = data['fakechar.profile'];
      const settings = data['fakechar.settings'] || {};
      if (!profile || !settings.autoFill) return;
      setTimeout(() => {
        if (document.visibilityState === 'hidden') return;
        if (!document.querySelector('input, textarea, select')) return;
        fillPage(profile, { emptyOnly: !!settings.emptyOnly, highlight: false });
      }, 900);
    });
  } catch (e) { /* storage 不可用则跳过 */ }

  g.__fakecharFiller = { fillPage, highlightPage, collectFields, pickRule };
})(typeof globalThis !== 'undefined' ? globalThis : this);