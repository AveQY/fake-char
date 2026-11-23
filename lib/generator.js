/* FakeChar · 一致性身份档案生成器 */
(function (g) {
  'use strict';
  const U = g.FakeCharUtil;

  const display = (v) => (Array.isArray(v) ? v[0] : v);
  const roman = (v) => (Array.isArray(v) ? v[1] : v);

  function randomDob(minAge, maxAge) {
    const now = new Date();
    const age = U.randInt(minAge, maxAge);
    const year = now.getUTCFullYear() - age;
    const month = U.randInt(1, 12);
    const maxDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const day = U.randInt(1, maxDay);
    return { dob: `${year}-${U.pad(month)}-${U.pad(day)}`, age };
  }

  function card() {
    const type = U.pick(['visa', 'mastercard', 'amex']);
    let number;
    if (type === 'visa') number = '4' + U.digits(14);
    else if (type === 'mastercard') number = '5' + U.pick(['1', '2', '3', '4', '5']) + U.digits(13);
    else number = '3' + U.pick(['4', '7']) + U.digits(12);
    number += U.luhnCheckDigit(number);
    const now = new Date();
    const year = now.getUTCFullYear() + U.randInt(1, 4);
    const month = U.randInt(1, 12);
    return {
      cardType: type === 'visa' ? 'Visa' : type === 'mastercard' ? 'Mastercard' : 'American Express',
      cardNumber: number.replace(/(\d{4})(?=\d)/g, '$1 ').trim(),
      cardNumberRaw: number,
      expiryMonth: U.pad(month),
      expiryYear: String(year),
      expiry: `${U.pad(month)}/${String(year).slice(2)}`,
      cvv: type === 'amex' ? U.digits(4) : U.digits(3),
      cardholder: ''
    };
  }

  function buildProfile(code) {
    const D = g.FakeCharData;
    const pack = D[code] || D.US;
    const countryCode = D[code] ? code : 'US';

    const gender = U.chance(0.5) ? 'male' : 'female';
    const firstTok = U.pick(pack.first[gender]);
    const lastTok = U.pick(pack.last);
    const first = display(firstTok);
    const last = display(lastTok);
    const rf = U.ascii(roman(firstTok)) || 'user';
    const rl = U.ascii(roman(lastTok)) || 'name';
    const join = pack.join == null ? ' ' : pack.join;
    const order = pack.order === 'family' ? 'family' : 'given';

    const middle = pack.middle && order === 'given' && U.chance(0.6) ? U.pick(pack.middle[gender]) : '';

    const firstFull = middle ? `${first} ${middle}` : first;
    const fullName = order === 'family' ? `${last}${join}${first}` : `${firstFull}${join}${last}`;

    const { dob, age } = randomDob(18, 64);
    const city = U.pick(pack.cities);
    const postal = pack.postal(city);

    const addressLine1 = pack.addressLine(city);
    const addressLine2 = pack.addressLine2 ? pack.addressLine2(city) : '';

    const phone = pack.phone(city);
    const mobile = pack.mobile ? pack.mobile(city) : phone;

    const domain = U.pick(pack.domains);
    const emailLocal = `${rf}.${rl}${U.chance(0.3) ? U.digits(2) : ''}`;
    const email = `${emailLocal}@${domain}`;
    const username = `${rf}${rl}${U.digits(U.randInt(2, 4))}`;

    const companyName = `${U.pick(pack.companyPrefix)}${pack.companyJoin == null ? ' ' : pack.companyJoin}${U.pick(pack.companySuffix)}`;
    const jobTitle = U.pick(pack.jobs);

    const hostSlug = (U.ascii(companyName) || `${rl}${U.digits(3)}`).slice(0, 24);
    const website = `https://www.${hostSlug}.${pack.tld}`;

    const ids = g.FakeCharIds[countryCode]({
      gender, dob, regionCode: city.region, city, first, last, fullName
    });
    const primaryId = ids[0] || { type: 'id', label: 'ID', value: '' };

    const finance = card();
    finance.cardholder = fullName.toUpperCase().slice(0, 26);

    const profile = {
      meta: {
        country: countryCode,
        countryName: pack.name,
        countryNameZh: pack.nameZh,
        locale: pack.locale,
        createdAt: new Date().toISOString(),
        version: 1
      },
      person: {
        title: pack.titles[gender],
        firstName: first,
        middleName: middle,
        lastName: last,
        fullName,
        gender,
        genderLabel: gender === 'male' ? '男' : '女',
        dob,
        age
      },
      contact: {
        email,
        phone,
        mobile,
        username,
        website
      },
      address: {
        line1: addressLine1,
        line2: addressLine2,
        city: city.city,
        region: city.regionName,
        regionCode: city.region,
        postalCode: postal,
        country: pack.name,
        countryCode,
        district: city.district || ''
      },
      company: {
        name: companyName,
        jobTitle,
        department: U.pick(['Engineering', 'Sales', 'Operations', 'Finance', 'Marketing', 'HR'])
      },
      ids: {
        primary: primaryId,
        all: ids
      },
      finance,
      online: {
        password: U.randomPassword(14),
        uuid: U.uuid4()
      },
      note: U.lorem()
    };

    profile.address.full = [
      profile.address.line1,
      profile.address.line2,
      `${profile.address.postalCode} ${profile.address.city}`.trim(),
      profile.address.country
    ].filter(Boolean).join(', ');

    return profile;
  }

  function countries() {
    return Object.keys(g.FakeCharData).map((code) => ({
      code,
      name: g.FakeCharData[code].name,
      nameZh: g.FakeCharData[code].nameZh
    }));
  }

  g.FakeChar = { buildProfile, countries, version: '1.0.0' };
})(typeof globalThis !== 'undefined' ? globalThis : this);