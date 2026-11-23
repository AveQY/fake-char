/* FakeChar · 基础工具（随机、校验位、格式化），无任何外部依赖 */
(function (g) {
  'use strict';

  const U = {
    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    chance(p) {
      return Math.random() < p;
    },
    pad(n, w = 2) {
      return String(n).padStart(w, '0');
    },
    digits(n) {
      let s = '';
      for (let i = 0; i < n; i++) s += U.randInt(0, 9);
      return s;
    },
    letters(n, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      let s = '';
      for (let i = 0; i < n; i++) s += alphabet[U.randInt(0, alphabet.length - 1)];
      return s;
    },
    norm(s) {
      return String(s == null ? '' : s)
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .trim();
    },
    ascii(s) {
      return String(s)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9]+/g, '')
        .toLowerCase();
    },
    luhnValid(num) {
      const s = String(num).replace(/\D/g, '');
      if (!s) return false;
      let sum = 0;
      let dbl = false;
      for (let i = s.length - 1; i >= 0; i--) {
        let d = +s[i];
        if (dbl) {
          d *= 2;
          if (d > 9) d -= 9;
        }
        sum += d;
        dbl = !dbl;
      }
      return sum % 10 === 0;
    },
    luhnCheckDigit(partial) {
      for (let d = 0; d <= 9; d++) {
        if (U.luhnValid(String(partial) + d)) return d;
      }
      return 0;
    },
    randomPassword(len = 14) {
      const sets = [
        'ABCDEFGHJKLMNPQRSTUVWXYZ',
        'abcdefghijkmnopqrstuvwxyz',
        '23456789',
        '!@#$%^&*'
      ];
      let out = sets.map((s) => s[U.randInt(0, s.length - 1)]).join('');
      const all = sets.join('');
      while (out.length < len) out += all[U.randInt(0, all.length - 1)];
      return out
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    },
    uuid4() {
      const hex = '0123456789abcdef';
      let s = '';
      for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) s += '-';
        else if (i === 14) s += '4';
        else if (i === 19) s += hex[U.randInt(8, 11)];
        else s += hex[U.randInt(0, 15)];
      }
      return s;
    },
    lorem() {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
    },
    dateISO(d) {
      return `${d.getUTCFullYear()}-${U.pad(d.getUTCMonth() + 1)}-${U.pad(d.getUTCDate())}`;
    }
  };

  g.FakeCharUtil = U;
})(typeof globalThis !== 'undefined' ? globalThis : this);