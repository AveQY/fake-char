/* 可选：jsdom 冒烟测试（需要 jsdom，未随扩展发布）
   用法：在任意临时目录 `npm i jsdom`，然后 `node --experimental-... test/domtest.js` 或把本文件放进去执行。
   验证：6 国 × 38 个字段的写入、autocomplete 匹配、select/date/卡号/密码、CJK label、placeholder-only、emptyOnly、事件派发。 */
const fs = require('fs');
const path = require('path');

let JSDOM;
try {
  JSDOM = require('jsdom').JSDOM;
} catch (e) {
  console.log('跳过：未安装 jsdom（npm i jsdom 后再运行）');
  process.exit(0);
}

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'test/test-demo.html'), 'utf8');

const dom = new JSDOM(html, { url: 'https://example.com/demo', runScripts: 'dangerously', pretendToBeVisual: true });
const { window } = dom;
const rect = () => ({ width: 120, height: 20, top: 0, left: 0, right: 120, bottom: 20, x: 0, y: 0 });
window.Element.prototype.getClientRects = function () { return [rect()]; };
window.Element.prototype.getBoundingClientRect = function () { return rect(); };

for (const f of ['lib/util.js', 'lib/data.js', 'lib/ids.js', 'lib/generator.js', 'content/filler.js']) {
  window.eval(fs.readFileSync(path.join(root, f), 'utf8'));
}

const doc = window.document;
const FakeChar = window.FakeChar;
const filler = window.__fakecharFiller;
const failures = [];
const ok = (cond, msg) => { if (!cond) failures.push(msg); };

for (const code of ['US', 'CN', 'DE', 'JP', 'BR', 'GB']) {
  doc.querySelectorAll('form').forEach((f) => f.reset());
  let inputs = 0;
  const onInput = () => { inputs++; };
  doc.addEventListener('input', onInput, true);

  const profile = FakeChar.buildProfile(code);
  const res = filler.fillPage(profile, { highlight: true });
  doc.removeEventListener('input', onInput, true);

  ok(res.ok, `[${code}] fillPage 失败`);
  ok(res.filled >= 30, `[${code}] 命中过少 filled=${res.filled}`);
  ok(inputs >= res.filled, `[${code}] input 事件不足: ${inputs} vs ${res.filled}`);

  const val = (name) => {
    const el = doc.querySelector(`[name="${name}"]`);
    return el ? el.value : '';
  };

  ok(val('firstName') === profile.person.firstName, `[${code}] firstName`);
  ok(val('lastName') === profile.person.lastName, `[${code}] lastName`);
  ok(val('email') === profile.contact.email, `[${code}] email`);
  ok(val('phone') === profile.contact.phone, `[${code}] phone`);
  ok(val('address') === profile.address.line1, `[${code}] street-address`);
  ok(val('city') === profile.address.city, `[${code}] city`);
  ok(val('zip') === profile.address.postalCode, `[${code}] zip`);
  ok(val('cc-number').replace(/\s/g, '') === profile.finance.cardNumberRaw, `[${code}] 卡号`);
  ok(val('password') === profile.online.password, `[${code}] 密码`);
  ok(val('note').length > 0, `[${code}] 备注`);
  ok(val('birthday') === profile.person.dob, `[${code}] date`);

  const stateSel = doc.querySelector('[name="state"]');
  ok(!stateSel.value || stateSel.value === profile.address.region, `[${code}] state`);
  ok(doc.querySelector('[name="country"]').value === profile.address.countryCode, `[${code}] country`);

  ok(val('xm') === profile.person.fullName, `[${code}] 中文姓名`);
  ok(val('sfz') === profile.ids.primary.value, `[${code}] 身份证号`);
  ok(val('sjh') === profile.contact.mobile, `[${code}] 手机号`);
  ok(val('yx') === profile.contact.email, `[${code}] 中文邮箱`);
  ok(val('xb') !== '', `[${code}] 性别`);
  ok(val('csrq').length > 0, `[${code}] 出生日期`);
  ok(val('dz') === profile.address.line1, `[${code}] 详细地址`);

  ok(val('fname') === profile.person.firstName, `[${code}] placeholder fname`);
  ok(val('lname') === profile.person.lastName, `[${code}] placeholder lname`);
  ok(val('mail_addr') === profile.contact.email, `[${code}] placeholder email`);
  ok(val('phone_number') === profile.contact.phone, `[${code}] placeholder phone`);
  ok(val('addr_line') === profile.address.line1, `[${code}] placeholder addr`);
  ok(val('addr_line2').length > 0, `[${code}] placeholder addr2`);
  ok(val('postal') === profile.address.postalCode, `[${code}] placeholder postal`);
  ok(val('region') === profile.address.region, `[${code}] placeholder region`);
  ok(val('comments').length > 0, `[${code}] textarea`);

  const again = filler.fillPage(profile, { emptyOnly: true });
  ok(again.ok && again.filled === 0, `[${code}] emptyOnly filled=${again.filled}`);
}

console.log('DOM 冒烟测试 · 6 国 × demo 页（38 个可填字段）');
if (failures.length) {
  console.log(`❌ ${failures.length} 条失败：`);
  for (const f of failures) console.log('  - ' + f);
  process.exitCode = 1;
} else {
  console.log('✅ 全部通过');
}