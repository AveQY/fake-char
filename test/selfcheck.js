/* 自检：在 Node 中加载 lib 并校验每个国家的档案字段与证件校验位 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
for (const f of ['lib/util.js', 'lib/data.js', 'lib/ids.js', 'lib/generator.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });
}

const U = globalThis.FakeCharUtil;
const DATA = globalThis.FakeCharData;
const FakeChar = globalThis.FakeChar;

/* ---------- 校验函数 ---------- */
const CF_ODD = {
  '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
  N: 20, O: 22, P: 24, Q: 26, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
};
const V_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
const V_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

function cnValid(id) {
  if (!/^\d{17}[\dX]$/.test(id)) return false;
  const w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let s = 0;
  for (let i = 0; i < 17; i++) s += +id[i] * w[i];
  return '10X98765432'[s % 11] === id[17];
}
function jpValid(s) {
  const d = [...s].map(Number);
  if (d.length !== 12) return false;
  let sum = 0;
  for (let n = 1; n <= 11; n++) sum += d[11 - n] * (n <= 6 ? n + 1 : n - 5);
  let c = 11 - (sum % 11);
  if (c >= 10) c = 0;
  return c === d[11];
}
function krValid(s) {
  if (!/^\d{13}$/.test(s)) return false;
  const w = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += +s[i] * w[i];
  return (11 - (sum % 11)) % 10 === +s[12];
}
function deValid(s) {
  const d = [...s].map(Number);
  if (d.length !== 11) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const p = d[i] * (i % 2 === 0 ? 1 : 2);
    sum += p > 9 ? p - 9 : p;
  }
  return (10 - (sum % 10)) % 10 === d[10];
}
function frValid(s) {
  if (!/^\d{15}$/.test(s)) return false;
  const body = s.slice(0, 13);
  return +s.slice(13) === 97 - (Number(body) % 97);
}
function itValid(cf) {
  if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cf)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const ch = cf[i];
    sum += i % 2 === 0 ? CF_ODD[ch] : (/\d/.test(ch) ? +ch : ch.charCodeAt(0) - 65);
  }
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26] === cf[15];
}
function esValid(s) {
  const m = /^(\d{8})([A-Z])$/.exec(s);
  return !!m && 'TRWAGMYFPDXBNJZSQVHLCKE'[+m[1] % 23] === m[2];
}
function nlValid(s) {
  if (!/^\d{9}$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += +s[i] * (9 - i);
  return (sum - +s[8]) % 11 === 0;
}
function auTfnValid(s) {
  const d = s.replace(/\s/g, '');
  if (!/^\d{9}$/.test(d)) return false;
  const w = [1, 4, 3, 7, 5, 8, 6, 9, 10];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +d[i] * w[i];
  return sum % 11 === 0;
}
function brCpfValid(s) {
  const d = s.replace(/[^\d]/g, '');
  if (!/^\d{11}$/.test(d)) return false;
  const calc = (len) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += +d[i] * (len + 1 - i);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(9) === +d[9] && calc(10) === +d[10];
}
function verhoeffValid(num) {
  let c = 0;
  const rev = [...num].reverse().map(Number);
  for (let i = 0; i < rev.length; i++) c = V_D[c][V_P[i % 8][rev[i]]];
  return c === 0;
}
function usSsnValid(s) {
  const m = /^(\d{3})-(\d{2})-(\d{4})$/.exec(s);
  if (!m) return false;
  const area = +m[1], group = +m[2], serial = +m[3];
  return area !== 0 && area !== 666 && area < 900 && group !== 0 && serial !== 0;
}

/* ---------- 期望格式 ---------- */
const EXPECT = {
  US: { types: ['ssn', 'dl', 'passport'], check: (ids) => usSsnValid(ids[0].value) },
  CN: { types: ['nationalId', 'passport'], check: (ids) => cnValid(ids[0].value) },
  CA: { types: ['sin', 'passport'], check: (ids) => /^\d{9}$/.test(ids[0].value) && U.luhnValid(ids[0].value) },
  GB: { types: ['nino', 'passport'], check: (ids) => /^[A-Z]{2} \d{2} \d{2} \d{2} [A-D]$/.test(ids[0].value) },
  AU: { types: ['tfn', 'passport'], check: (ids) => auTfnValid(ids[0].value) },
  JP: { types: ['mynumber', 'dl'], check: (ids) => jpValid(ids[0].value) },
  KR: { types: ['rrn', 'dl'], check: (ids) => krValid(ids[0].value) },
  DE: { types: ['taxId', 'passport'], check: (ids) => deValid(ids[0].value) },
  FR: { types: ['insee', 'passport'], check: (ids) => frValid(ids[0].value) },
  IT: { types: ['cf', 'ci'], check: (ids) => itValid(ids[0].value) },
  ES: { types: ['dni', 'passport'], check: (ids) => esValid(ids[0].value) },
  NL: { types: ['bsn', 'passport'], check: (ids) => nlValid(ids[0].value) },
  SE: { types: ['pn'], check: (ids) => U.luhnValid(ids[0].value.replace('-', '')) },
  BR: { types: ['cpf', 'rg'], check: (ids) => brCpfValid(ids[0].value) },
  MX: { types: ['rfc'], check: (ids) => /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/.test(ids[0].value) },
  IN: { types: ['aadhaar', 'pan'], check: (ids) => verhoeffValid(ids[0].value.replace(/\s/g, '')) }
};

const problems = [];
const samples = {};
let total = 0;

for (const code of Object.keys(DATA)) {
  const exp = EXPECT[code];
  if (!exp) problems.push(`[${code}] 缺少自检期望值`);

  for (let i = 0; i < 40; i++) {
    let p;
    try {
      p = FakeChar.buildProfile(code);
    } catch (e) {
      problems.push(`[${code}] 生成异常: ${e.stack || e}`);
      break;
    }
    total++;
    if (i === 0) samples[code] = p;

    const need = [
      ['person.fullName', p.person.fullName],
      ['person.firstName', p.person.firstName],
      ['person.lastName', p.person.lastName],
      ['person.dob', p.person.dob],
      ['contact.email', p.contact.email],
      ['contact.phone', p.contact.phone],
      ['contact.mobile', p.contact.mobile],
      ['contact.username', p.contact.username],
      ['address.line1', p.address.line1],
      ['address.city', p.address.city],
      ['address.region', p.address.region],
      ['address.postalCode', p.address.postalCode],
      ['address.country', p.address.country],
      ['company.name', p.company.name],
      ['company.jobTitle', p.company.jobTitle],
      ['online.password', p.online.password],
      ['online.uuid', p.online.uuid]
    ];
    for (const [k, v] of need) {
      if (v == null || v === '' || v === 'undefined') problems.push(`[${code}] 空字段 ${k}`);
    }
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(p.contact.email)) problems.push(`[${code}] 邮箱格式: ${p.contact.email}`);
    if (p.contact.phone.replace(/\D/g, '').length < 7) problems.push(`[${code}] 电话太短: ${p.contact.phone}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.person.dob)) problems.push(`[${code}] 生日格式: ${p.person.dob}`);
    if (!p.address.full) problems.push(`[${code}] 缺完整地址`);

    if (p.ids.all.length !== exp.types.length || p.ids.all.some((x, idx) => x.type !== exp.types[idx])) {
      problems.push(`[${code}] 证件类型不符: ${p.ids.all.map((x) => x.type).join(',')}`);
    }
    if (!exp.check(p.ids.all)) problems.push(`[${code}] 证件校验失败: ${p.ids.primary.value}`);

    if (!U.luhnValid(p.finance.cardNumberRaw)) problems.push(`[${code}] 卡号 Luhn 失败: ${p.finance.cardNumber}`);

    if (code === 'CN') {
      const id = p.ids.primary.value;
      const birth = p.person.dob.replace(/-/g, '');
      if (id.slice(6, 14) !== birth) problems.push(`[CN] 身份证生日与 dob 不一致: ${id} vs ${birth}`);
      const seq = +id.slice(14, 17);
      const male = p.person.gender === 'male';
      if ((seq % 2 === 1) !== male) problems.push(`[CN] 身份证性别位不符: ${id} ${p.person.gender}`);
      if (id.slice(0, 6) !== p.ids.primary.value.slice(0, 6)) problems.push('[CN] 地区码异常');
    }
    if (code === 'FR') {
      const id = p.ids.primary.value;
      const yymm = p.person.dob.slice(2, 4) + p.person.dob.slice(5, 7);
      if (id.slice(1, 5) !== yymm) problems.push(`[FR] INSEE 生日不一致: ${id} vs ${p.person.dob}`);
      const sex = p.person.gender === 'male' ? '1' : '2';
      if (id[0] !== sex) problems.push(`[FR] INSEE 性别位不符: ${id}`);
    }
    if (code === 'IT') {
      const cf = p.ids.primary.value;
      const [y, m, d] = p.person.dob.split('-');
      if (cf.slice(6, 8) !== y.slice(2)) problems.push(`[IT] CF 年份不符: ${cf}`);
      const dayIdx = +cf.slice(9, 11);
      const expectDay = +d + (p.person.gender === 'female' ? 40 : 0);
      if (dayIdx !== expectDay) problems.push(`[IT] CF 日期位不符: ${cf} day=${dayIdx} expect=${expectDay}`);
    }
    if (code === 'KR') {
      const rrn = p.ids.primary.value;
      const [y, m, d] = p.person.dob.split('-');
      if (rrn.slice(0, 6) !== y.slice(2) + m + d) problems.push(`[KR] RRN 生日不符: ${rrn}`);
      const g = +rrn[6];
      const male = p.person.gender === 'male';
      if ((g === 1 || g === 3) !== male) problems.push(`[KR] RRN 性别位不符: ${rrn} ${p.person.gender}`);
    }
    if (code === 'SE') {
      const pn = p.ids.primary.value.replace('-', '');
      const [y, m, d] = p.person.dob.split('-');
      if (pn.slice(0, 6) !== y.slice(2) + m + d) problems.push(`[SE] Personnummer 生日不符: ${pn}`);
    }
    if (code === 'IN') {
      const aad = p.ids.primary.value.replace(/\s/g, '');
      if (!/^[2-9]\d{11}$/.test(aad)) problems.push(`[IN] Aadhaar 首两位异常: ${aad}`);
    }
  }
}

console.log(`已生成并检查 ${total} 份档案（${Object.keys(DATA).length} 个国家 × 40）`);
if (problems.length) {
  const by = new Map();
  for (const msg of problems) {
    const m = /^\[([A-Z]{2})\]/.exec(msg);
    const code = m ? m[1] : '??';
    if (!by.has(code)) by.set(code, []);
    by.get(code).push(msg);
  }
  console.log(`❌ 问题 ${problems.length} 条，按国家：`);
  for (const [code, list] of by) {
    console.log(`  ${code}: ${list.length} 条`);
    for (const m of list.slice(0, 3)) console.log('    - ' + m);
  }
  process.exitCode = 1;
} else {
  console.log('✅ 全部字段非空、证件校验位、卡号 Luhn、各证件与生日/性别一致性检查通过');
}

const show = samples.US;
console.log('\n—— 美国样例 ——');
console.log(JSON.stringify(show, null, 2));

const cn = samples.CN;
console.log('\n—— 中国样例（关键字段）——');
console.log({
  name: cn.person.fullName, gender: cn.person.gender, dob: cn.person.dob,
  id: cn.ids.primary.value, email: cn.contact.email, phone: cn.contact.mobile,
  address: cn.address.full
});

const jp = samples.JP;
console.log('\n—— 日本样例 ——');
console.log({ name: jp.person.fullName, mynumber: jp.ids.all[0].value, address: jp.address.full });

const it = samples.IT;
console.log('\n—— 意大利样例 ——');
console.log({ name: it.person.fullName, cf: it.ids.all[0].value, address: it.address.full });