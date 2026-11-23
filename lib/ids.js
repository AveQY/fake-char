/* FakeChar · 各国证件号生成器（能算校验位的都算真校验位） */
(function (g) {
  'use strict';

  const U = g.FakeCharUtil;
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /* ---------------- United States ---------------- */
  const SSN_AREA = {
    NY: [50, 134], NJ: [135, 158], PA: [159, 211], MD: [212, 220], VA: [223, 231],
    NC: [232, 246], SC: [247, 251], GA: [252, 260], FL: [261, 267], OH: [268, 302],
    IN: [303, 317], IL: [318, 351], MI: [362, 386], WI: [387, 399], MN: [468, 477],
    IA: [478, 485], MO: [486, 500], KS: [509, 515], NE: [505, 508], SD: [501, 502],
    ND: [501, 504], OK: [440, 448], TX: [449, 467], AR: [429, 432], LA: [433, 439],
    MS: [425, 428], AL: [416, 424], TN: [408, 415], KY: [400, 407], WV: [232, 236],
    CA: [545, 573], AZ: [526, 527], UT: [528, 529], CO: [521, 524], WA: [531, 539],
    OR: [540, 544], ID: [518, 520], MT: [516, 517], WY: [520, 520], HI: [575, 576],
    AK: [574, 574]
  };

  function usAreaFor(stateCode) {
    const r = SSN_AREA[stateCode];
    if (r) return U.randInt(r[0], r[1]);
    let a = U.randInt(100, 799);
    if (a === 666) a = 667;
    return a;
  }

  function usSsn(ctx) {
    const area = usAreaFor(ctx.regionCode);
    return `${U.pad(area, 3)}-${U.pad(U.randInt(1, 99))}-${U.pad(U.randInt(1, 9999), 4)}`;
  }

  function usDl(ctx) {
    return `${U.letters(1)}${U.digits(7)}`;
  }

  function usPassport() {
    return `5${U.digits(8)}`;
  }

  /* ---------------- Mainland China ---------------- */
  function cnId(ctx) {
    const region = (ctx.city && ctx.city.code) || '110101';
    const birth = ctx.dob.replace(/-/g, '');
    let seq = U.digits(3);
    const n = +seq;
    if (ctx.gender === 'male' && n % 2 === 0) seq = U.pad(n + 1 > 999 ? 1 : n + 1, 3);
    if (ctx.gender === 'female' && n % 2 === 1) seq = U.pad(n + 1 > 999 ? 2 : n + 1, 3);
    const body = region + birth + seq;
    const w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let sum = 0;
    for (let i = 0; i < 17; i++) sum += +body[i] * w[i];
    return body + '10X98765432'[sum % 11];
  }

  function cnPassport() {
    return `E${U.digits(8)}`;
  }

  /* ---------------- Canada ---------------- */
  function caSin() {
    const base = U.digits(8);
    return base + U.luhnCheckDigit(base);
  }

  function caPassport() {
    return `${U.letters(2)}${U.digits(6)}`;
  }

  /* ---------------- United Kingdom ---------------- */
  const NINO_FIRST = 'ABCEGHJKLMNPRSTWXYZ';
  const NINO_SECOND = 'ABCEGHJKLMNPRSTWXYZ';

  function gbNino() {
    let a = NINO_FIRST[U.randInt(0, NINO_FIRST.length - 1)];
    let b = NINO_SECOND[U.randInt(0, NINO_SECOND.length - 1)];
    const banned = ['BG', 'GB', 'NK', 'KN', 'TN', 'NT', 'ZZ'];
    let guard = 0;
    while (banned.includes(a + b) && guard++ < 40) {
      a = NINO_FIRST[U.randInt(0, NINO_FIRST.length - 1)];
      b = NINO_SECOND[U.randInt(0, NINO_SECOND.length - 1)];
    }
    return `${a}${b} ${U.digits(2)} ${U.digits(2)} ${U.digits(2)} ${U.letters(1, 'ABCD')}`;
  }

  function gbPassport() {
    return U.digits(9);
  }

  /* ---------------- Australia ---------------- */
  function auTfn() {
    for (let i = 0; i < 200; i++) {
      const d = U.digits(9);
      const w = [1, 4, 3, 7, 5, 8, 6, 9, 10];
      let sum = 0;
      for (let k = 0; k < 9; k++) sum += +d[k] * w[k];
      if (sum % 11 === 0) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    }
    return '123 456 782';
  }

  function auPassport() {
    return `PA${U.digits(7)}`;
  }

  /* ---------------- Japan ---------------- */
  function jpMyNumber() {
    const d = U.digits(11).split('');
    let sum = 0;
    for (let n = 1; n <= 11; n++) {
      const digit = +d[11 - n];
      const q = n <= 6 ? n + 1 : n - 5;
      sum += digit * q;
    }
    let c = 11 - (sum % 11);
    if (c >= 10) c = 0;
    return d.join('') + c;
  }

  function jpDl() {
    const pref = U.pad(U.randInt(10, 99));
    return `${pref}${U.pad(U.randInt(100, 999), 3)}${U.pad(U.randInt(1000, 9999), 4)}`;
  }

  /* ---------------- South Korea ---------------- */
  function krRrn(ctx) {
    const [y, m, d] = ctx.dob.split('-').map(Number);
    const yy = String(y).slice(2);
    const centuryFemale = y >= 2000 ? '4' : '2';
    const centuryMale = y >= 2000 ? '3' : '1';
    const g = ctx.gender === 'female' ? centuryFemale : centuryMale;
    const region = U.pad(U.randInt(11, 99));
    const seq = U.pad(U.randInt(1, 999), 3);
    const body = `${yy}${U.pad(m)}${U.pad(d)}${g}${region}${seq}`;
    const w = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += +body[i] * w[i];
    const check = (11 - (sum % 11)) % 10;
    return `${body}${check}`;
  }

  function krDl() {
    return `${U.pad(U.randInt(11, 99))}-${U.digits(2)}-${U.digits(6)}`;
  }

  /* ---------------- Germany ---------------- */
  function deSteuerId() {
    const d = U.digits(10).split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const p = d[i] * (i % 2 === 0 ? 1 : 2);
      sum += p > 9 ? (p - 9) : p; // 数字和：1..18 -> 0..9
    }
    const check = (10 - (sum % 10)) % 10;
    return d.join('') + check;
  }

  function dePassport() {
    return `${U.letters(1)}${U.digits(8)}`;
  }

  /* ---------------- France ---------------- */
  function frInsee(ctx) {
    const dept = (ctx.city && ctx.city.dept) || '75';
    const yy = ctx.dob.slice(2, 4);
    const mm = ctx.dob.slice(5, 7);
    const sex = ctx.gender === 'male' ? '1' : '2';
    const commune = U.digits(3);
    const order = U.digits(3);
    const body = `${sex}${yy}${mm}${dept}${commune}${order}`;
    const key = 97 - (Number(body) % 97);
    return body + U.pad(key);
  }

  function frPassport() {
    return `${U.pad(U.randInt(10, 24))}${U.letters(2)}${U.digits(5)}`;
  }

  /* ---------------- Italy ---------------- */
  const CF_ODD = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
    N: 20, O: 22, P: 24, Q: 26, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
  };
  const CF_MONTH = 'ABCDEHLMPRST';
  const CF_PLACES = ['A944', 'B354', 'C351', 'D612', 'D969', 'F205', 'F839', 'G273', 'L219', 'L736', 'M082', 'M089', 'L781', 'G224'];

  function cfPart(s, isName) {
    s = s.toUpperCase().replace(/[^A-Z]/g, '');
    const cons = s.split('').filter((c) => 'BCDFGHJKLMNPQRSTVWXYZ'.includes(c));
    const vow = s.split('').filter((c) => 'AEIOU'.includes(c));
    if (isName && cons.length >= 4) return cons[0] + cons[2] + cons[3];
    const out = (cons.concat(vow)).join('');
    return (out + 'XXX').slice(0, 3);
  }

  function itCf(ctx) {
    const sur = cfPart(ctx.last);
    const nam = cfPart(ctx.first, true);
    const [y, m, d] = ctx.dob.split('-').map(Number);
    const yy = String(y).slice(2);
    const month = CF_MONTH[m - 1];
    const day = d + (ctx.gender === 'female' ? 40 : 0);
    const place = (ctx.city && ctx.city.cf) || U.pick(CF_PLACES);
    const body = `${sur}${nam}${yy}${month}${U.pad(day)}${place}`;
    let sum = 0;
    for (let i = 0; i < 15; i++) {
      const ch = body[i];
      // 0-based 偶数索引 = 1-based 奇数位，用 odd 表；偶数位字母 A=0..Z=25、数字取本身
      sum += i % 2 === 0 ? CF_ODD[ch] : (/\d/.test(ch) ? +ch : ch.charCodeAt(0) - 65);
    }
    return body + A[sum % 26];
  }

  function itCi() {
    return `CA${U.digits(5)}${U.letters(2)}`;
  }

  /* ---------------- Spain ---------------- */
  const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

  function esDni() {
    const n = U.randInt(10000000, 99999999);
    return `${n}${DNI_LETTERS[n % 23]}`;
  }

  function esPassport() {
    return `${U.letters(3)}${U.digits(6)}`;
  }

  /* ---------------- Netherlands ---------------- */
  function nlBsn() {
    for (let i = 0; i < 100; i++) {
      const d = U.digits(8).split('').map(Number);
      let sum = 0;
      for (let k = 0; k < 8; k++) sum += d[k] * (9 - k);
      const last = sum % 11;
      if (last <= 9) return d.join('') + last;
    }
    return '123456789';
  }

  function nlPassport() {
    return `${U.letters(2)}${U.digits(7)}`;
  }

  /* ---------------- Sweden ---------------- */
  function sePersonnummer(ctx) {
    const [y, m, d] = ctx.dob.split('-').map(Number);
    let serial = U.digits(3);
    let third = +serial[2];
    if (ctx.gender === 'male' && third % 2 === 0) serial = serial.slice(0, 2) + (third + 1 > 9 ? 1 : third + 1);
    if (ctx.gender === 'female' && third % 2 === 1) serial = serial.slice(0, 2) + (third + 1 > 9 ? 0 : third + 1);
    const body = `${String(y).slice(2)}${U.pad(m)}${U.pad(d)}${serial}`;
    return `${body.slice(0, 6)}-${body.slice(6)}${U.luhnCheckDigit(body)}`;
  }

  /* ---------------- Brazil ---------------- */
  function brCpf() {
    const d = U.digits(9).split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += d[i] * (10 - i);
    let r = sum % 11;
    const c1 = r < 2 ? 0 : 11 - r;
    d.push(c1);
    sum = 0;
    for (let i = 0; i < 10; i++) sum += d[i] * (11 - i);
    r = sum % 11;
    const c2 = r < 2 ? 0 : 11 - r;
    const s = d.join('') + c2;
    return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}`;
  }

  function brRg() {
    return `${U.digits(2)}.${U.digits(3)}.${U.digits(3)}-${U.digits(1)}`;
  }

  /* ---------------- Mexico ---------------- */
  function mxRfc(ctx) {
    const sur = ctx.last.toUpperCase().replace(/[^A-Z]/g, '');
    const nam = ctx.first.toUpperCase().replace(/[^A-Z]/g, '');
    const vowel = (sur.split('').find((c) => 'AEIOU'.includes(c)) || 'X');
    const letters = `${sur[0] || 'X'}${vowel}${nam[0] || 'X'}${sur[1] || 'X'}`;
    const [y, m, d] = ctx.dob.split('-').map(Number);
    const homoclave = U.letters(1) + U.pad(U.randInt(10, 99));
    return `${letters}${String(y).slice(2)}${U.pad(m)}${U.pad(d)}${homoclave}`.toUpperCase();
  }

  /* ---------------- India ---------------- */
  const V_D = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];
  const V_P = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];
  const V_INV = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

  function verhoeffCheckDigit(payload) {
    let c = 0;
    const rev = String(payload).split('').reverse();
    for (let i = 0; i < rev.length; i++) c = V_D[c][V_P[(i + 1) % 8][+rev[i]]];
    return V_INV[c];
  }

  function inAadhaar() {
    const first = U.randInt(2, 9);
    const base = String(first) + U.digits(10);
    return `${base.slice(0, 4)} ${base.slice(4, 8)} ${base.slice(8)} ${verhoeffCheckDigit(base)}`;
  }

  function inPan() {
    return `${U.letters(5)}${U.digits(4)}${U.letters(1)}`;
  }

  /* ---------------- Registry ---------------- */
  const IDS = {
    US(ctx) {
      return [
        { type: 'ssn', label: 'SSN（社会安全号）', value: usSsn(ctx) },
        { type: 'dl', label: 'Driver License（驾照）', value: usDl(ctx) },
        { type: 'passport', label: 'Passport（护照）', value: usPassport() }
      ];
    },
    CN(ctx) {
      return [
        { type: 'nationalId', label: '身份证号', value: cnId(ctx) },
        { type: 'passport', label: '护照号', value: cnPassport() }
      ];
    },
    CA(ctx) {
      return [
        { type: 'sin', label: 'SIN（社会保险号）', value: caSin() },
        { type: 'passport', label: 'Passport（护照）', value: caPassport() }
      ];
    },
    GB(ctx) {
      return [
        { type: 'nino', label: 'NINO（国民保险号）', value: gbNino() },
        { type: 'passport', label: 'Passport（护照）', value: gbPassport() }
      ];
    },
    AU(ctx) {
      return [
        { type: 'tfn', label: 'TFN（税号）', value: auTfn() },
        { type: 'passport', label: 'Passport（护照）', value: auPassport() }
      ];
    },
    JP(ctx) {
      return [
        { type: 'mynumber', label: 'マイナンバー（个人编号）', value: jpMyNumber() },
        { type: 'dl', label: '運転免許証（驾照）', value: jpDl() }
      ];
    },
    KR(ctx) {
      return [
        { type: 'rrn', label: '주민등록번호（住民号码）', value: krRrn(ctx) },
        { type: 'dl', label: '운전면허（驾照）', value: krDl() }
      ];
    },
    DE(ctx) {
      return [
        { type: 'taxId', label: 'Steuer-ID（税号）', value: deSteuerId() },
        { type: 'passport', label: 'Reisepass（护照）', value: dePassport() }
      ];
    },
    FR(ctx) {
      return [
        { type: 'insee', label: 'INSEE / NIR（社保号）', value: frInsee(ctx) },
        { type: 'passport', label: 'Passeport（护照）', value: frPassport() }
      ];
    },
    IT(ctx) {
      return [
        { type: 'cf', label: 'Codice Fiscale（税号）', value: itCf(ctx) },
        { type: 'ci', label: 'Carta d’identità（身份证）', value: itCi() }
      ];
    },
    ES(ctx) {
      return [
        { type: 'dni', label: 'DNI（身份证号）', value: esDni() },
        { type: 'passport', label: 'Pasaporte（护照）', value: esPassport() }
      ];
    },
    NL(ctx) {
      return [
        { type: 'bsn', label: 'BSN（公民服务号）', value: nlBsn() },
        { type: 'passport', label: 'Paspoort（护照）', value: nlPassport() }
      ];
    },
    SE(ctx) {
      return [
        { type: 'pn', label: 'Personnummer（人口号）', value: sePersonnummer(ctx) }
      ];
    },
    BR(ctx) {
      return [
        { type: 'cpf', label: 'CPF（税号）', value: brCpf() },
        { type: 'rg', label: 'RG（身份证）', value: brRg() }
      ];
    },
    MX(ctx) {
      return [
        { type: 'rfc', label: 'RFC（税号）', value: mxRfc(ctx) }
      ];
    },
    IN(ctx) {
      return [
        { type: 'aadhaar', label: 'Aadhaar（身份证）', value: inAadhaar() },
        { type: 'pan', label: 'PAN（税号）', value: inPan() }
      ];
    }
  };

  g.FakeCharIds = IDS;
  g.FakeCharIdCheck = { verhoeffCheckDigit, luhnValid: U.luhnValid };
})(typeof globalThis !== 'undefined' ? globalThis : this);