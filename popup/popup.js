/* FakeChar · popup 交互 */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const els = {
    country: $('#country'),
    generate: $('#generate'),
    regen: $('#regen'),
    card: $('#profileCard'),
    fill: $('#fill'),
    fillEmpty: $('#fillEmpty'),
    highlight: $('#highlight'),
    save: $('#save'),
    savedList: $('#savedList'),
    savedCount: $('#savedCount'),
    autoFill: $('#autoFill'),
    copyJson: $('#copyJson'),
    toast: $('#toast')
  };

  const state = {
    profile: null,
    saved: [],
    settings: { country: 'US', autoFill: false, emptyOnly: false }
  };

  const GROUPS = [
    {
      title: '身份',
      items: (p) => [
        ['姓名', `${p.person.title} ${p.person.fullName}`],
        ['性别 / 年龄', `${p.person.genderLabel} · ${p.person.age} 岁`],
        ['出生日期', p.person.dob]
      ]
    },
    {
      title: '联系方式',
      items: (p) => [
        ['邮箱', p.contact.email],
        ['电话', p.contact.phone],
        ['手机', p.contact.mobile],
        ['用户名', p.contact.username],
        ['网站', p.contact.website]
      ]
    },
    {
      title: '地址',
      items: (p) => [
        ['地址 1', p.address.line1],
        ['地址 2', p.address.line2],
        ['城市', p.address.city],
        ['州 / 省', `${p.address.region}${p.address.regionCode ? ' (' + p.address.regionCode + ')' : ''}`],
        ['邮编', p.address.postalCode],
        ['国家', p.address.country]
      ]
    },
    {
      title: '工作',
      items: (p) => [
        ['公司', p.company.name],
        ['职位', p.company.jobTitle],
        ['部门', p.company.department]
      ]
    },
    {
      title: '证件',
      items: (p) => p.ids.all.map((id) => [id.label, id.value])
    },
    {
      title: '支付',
      items: (p) => [
        ['卡号', p.finance.cardNumber],
        ['类型', p.finance.cardType],
        ['有效期', p.finance.expiry],
        ['CVV', p.finance.cvv]
      ]
    },
    {
      title: '其他',
      items: (p) => [
        ['密码', p.online.password],
        ['UUID', p.online.uuid]
      ]
    }
  ];

  function toast(msg, isErr) {
    els.toast.textContent = msg;
    els.toast.classList.toggle('err', !!isErr);
    els.toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => els.toast.classList.remove('show'), 2200);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(String(text));
      toast(`已复制${label ? '：' + label : ''}`);
    } catch (e) {
      toast('复制失败', true);
    }
  }

  function buildCountrySelect() {
    els.country.textContent = '';
    for (const c of FakeChar.countries()) {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = `${c.nameZh} · ${c.name}`;
      els.country.appendChild(opt);
    }
  }

  function initials(p) {
    return (p.person.fullName || '')
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => x[0] || '')
      .join('')
      .toUpperCase();
  }

  function render() {
    const p = state.profile;
    els.card.textContent = '';
    if (!p) return;

    const head = document.createElement('div');
    head.className = 'card-head';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = initials(p);
    const who = document.createElement('div');
    who.className = 'who';
    const strong = document.createElement('strong');
    strong.textContent = `${p.person.title} ${p.person.fullName}`;
    const sub = document.createElement('span');
    sub.textContent = `${p.meta.countryNameZh} · ${p.person.genderLabel} · ${p.person.age} 岁`;
    who.append(strong, sub);
    head.append(avatar, who);
    els.card.appendChild(head);

    for (const group of GROUPS) {
      const items = group.items(p).filter(([, v]) => v != null && v !== '');
      if (!items.length) continue;
      const sec = document.createElement('div');
      sec.className = 'group';
      const h = document.createElement('h3');
      h.textContent = group.title;
      const rows = document.createElement('div');
      rows.className = 'rows';
      sec.append(h, rows);
      for (const [k, v] of items) {
        const row = document.createElement('div');
        row.className = 'field';
        const kk = document.createElement('span');
        kk.className = 'k';
        kk.textContent = String(k).replace(/（[^）]*）|\([^)]*\)/g, '').trim();
        kk.title = k;
        const vv = document.createElement('span');
        vv.className = 'v';
        vv.textContent = v;
        vv.title = v;
        const btn = document.createElement('button');
        btn.className = 'copy';
        btn.textContent = '⧉';
        btn.title = '复制';
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          copy(v, k);
        });
        row.append(kk, vv, btn);
        rows.appendChild(row);
      }
      els.card.appendChild(sec);
    }

    els.card.querySelectorAll('.field').forEach((row) => {
      row.addEventListener('click', () => {
        const v = row.querySelector('.v');
        if (v) copy(v.textContent, row.querySelector('.k').textContent);
      });
    });
  }

  function renderSaved() {
    els.savedList.textContent = '';
    els.savedCount.textContent = String(state.saved.length || 0);
    if (!state.saved.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '还没有保存的档案（点击“保存当前”）';
      els.savedList.appendChild(li);
      return;
    }
    for (const item of state.saved) {
      const li = document.createElement('li');
      const name = document.createElement('span');
      name.className = 's-name';
      name.textContent = item.label || item.profile.person.fullName;
      const meta = document.createElement('span');
      meta.className = 's-meta';
      meta.textContent = `跨${item.profile.meta.countryNameZh} · ${new Date(item.createdAt).toLocaleDateString()}`;
      const del = document.createElement('button');
      del.className = 's-del';
      del.textContent = '✕';
      del.title = '删除';
      del.addEventListener('click', (ev) => {
        ev.stopPropagation();
        state.saved = state.saved.filter((x) => x.id !== item.id);
        persist();
        renderSaved();
        toast('已删除档案');
      });
      li.append(name, meta, del);
      li.addEventListener('click', () => {
        state.profile = item.profile;
        els.country.value = state.profile.meta.country;
        persist();
        render();
        toast('已载入档案');
      });
      els.savedList.appendChild(li);
    }
  }

  async function persist() {
    try {
      await chrome.storage.local.set({
        'fakechar.profile': state.profile,
        'fakechar.saved': state.saved,
        'fakechar.settings': state.settings
      });
    } catch (e) { /* ignore */ }
  }

  function generate() {
    const code = els.country.value || 'US';
    state.profile = FakeChar.buildProfile(code);
    state.settings.country = code;
    persist();
    render();
    toast(`已生成：${state.profile.meta.countryNameZh}`);
  }

  async function activeTab() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab || null;
    } catch (e) {
      return null;
    }
  }

  async function send(msg) {
    const tab = await activeTab();
    if (!tab || !tab.id) {
      toast('找不到当前标签页', true);
      return null;
    }
    try {
      return await chrome.tabs.sendMessage(tab.id, msg);
    } catch (e) {
      return null;
    }
  }

  async function fill(options) {
    if (!state.profile) return;
    const res = await send({ type: 'FAKECHAR_FILL', profile: state.profile, options: options || {} });
    if (!res) return toast('无法填充：请在 http(s) 页面使用（chrome:// 与扩展页不支持）', true);
    if (res.ok) return toast(`已填充 ${res.filled} / ${res.matched} 个字段`);
    toast('填充失败：' + (res.error || '未知错误'), true);
  }

  async function highlight() {
    if (!state.profile) return;
    const res = await send({ type: 'FAKECHAR_HIGHLIGHT', profile: state.profile });
    if (!res) return toast('无法高亮：请在 http(s) 页面使用', true);
    toast(`高亮 ${res.matched} 个可填字段`);
  }

  async function saveCurrent() {
    if (!state.profile) return;
    state.saved.unshift({
      id: FakeCharUtil.uuid4(),
      createdAt: new Date().toISOString(),
      label: `${state.profile.person.fullName} · ${state.profile.meta.countryNameZh}`,
      profile: state.profile
    });
    state.saved = state.saved.slice(0, 20);
    await persist();
    renderSaved();
    toast('已保存档案');
  }

  function bind() {
    els.generate.addEventListener('click', generate);
    els.regen.addEventListener('click', generate);
    els.country.addEventListener('change', generate);
    els.fill.addEventListener('click', () => fill({ highlight: true }));
    els.fillEmpty.addEventListener('click', () => fill({ emptyOnly: true, highlight: true }));
    els.highlight.addEventListener('click', highlight);
    els.save.addEventListener('click', saveCurrent);
    els.autoFill.addEventListener('change', () => {
      state.settings.autoFill = els.autoFill.checked;
      persist();
      toast(state.settings.autoFill ? '已开启：打开页面自动填充（仅空白字段）' : '已关闭自动填充');
    });
    els.copyJson.addEventListener('click', () => {
      if (state.profile) copy(JSON.stringify(state.profile, null, 2), 'JSON');
    });
  }

  async function init() {
    buildCountrySelect();
    bind();
    let data = {};
    try {
      data = await chrome.storage.local.get(['fakechar.profile', 'fakechar.saved', 'fakechar.settings']);
    } catch (e) { /* ignore */ }
    state.profile = data['fakechar.profile'] || null;
    state.saved = Array.isArray(data['fakechar.saved']) ? data['fakechar.saved'] : [];
    state.settings = Object.assign(state.settings, data['fakechar.settings'] || {});
    els.autoFill.checked = !!state.settings.autoFill;
    if (!state.profile) {
      state.profile = FakeChar.buildProfile(state.settings.country || 'US');
      persist();
    }
    if (!state.profile.meta || state.profile.meta.version !== 1) {
      state.profile = FakeChar.buildProfile((state.profile.meta && state.profile.meta.country) || 'US');
      persist();
    }
    els.country.value = state.profile.meta.country;
    render();
    renderSaved();
  }

  init();
})();