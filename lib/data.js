/* FakeChar · 国家数据包（美国最深，其余 15 国覆盖主要城市/姓名/证件/电话规则） */
(function (g) {
  'use strict';
  const U = g.FakeCharUtil;
  const C = (city, region, regionName, zip, area, extra) =>
    Object.assign({ city, region, regionName, zip, area }, extra || {});

  const DATA = {
    /* ================= United States（主） ================= */
    US: {
      name: 'United States', nameZh: '美国', locale: 'en-US', tld: 'com',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Mr.', female: 'Ms.' },
      first: {
        male: ['James', 'Michael', 'Robert', 'John', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Andrew', 'Joshua', 'Kevin', 'Brian', 'Ryan', 'Jacob', 'Ethan', 'Noah', 'Liam', 'Mason', 'Logan', 'Lucas', 'Benjamin', 'Alexander', 'Elijah'],
        female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Emily', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Ashley', 'Amanda', 'Melissa', 'Nicole', 'Rachel', 'Hannah', 'Laura', 'Megan', 'Chloe', 'Grace', 'Natalie', 'Samantha']
      },
      middle: {
        male: ['James', 'Lee', 'Allen', 'Ray', 'Scott', 'Wayne', 'Michael'],
        female: ['Marie', 'Ann', 'Rose', 'Grace', 'Lynn', 'Jane', 'Elizabeth']
      },
      last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera'],
      cities: [
        C('New York', 'NY', 'New York', '100', '212'), C('Buffalo', 'NY', 'New York', '142', '716'), C('Albany', 'NY', 'New York', '122', '518'),
        C('Los Angeles', 'CA', 'California', '900', '213'), C('San Francisco', 'CA', 'California', '941', '415'), C('San Diego', 'CA', 'California', '921', '619'), C('Sacramento', 'CA', 'California', '958', '916'),
        C('Houston', 'TX', 'Texas', '770', '713'), C('Dallas', 'TX', 'Texas', '752', '214'), C('Austin', 'TX', 'Texas', '787', '512'), C('San Antonio', 'TX', 'Texas', '782', '210'),
        C('Chicago', 'IL', 'Illinois', '606', '312'), C('Springfield', 'IL', 'Illinois', '627', '217'),
        C('Phoenix', 'AZ', 'Arizona', '850', '602'), C('Tucson', 'AZ', 'Arizona', '857', '520'),
        C('Philadelphia', 'PA', 'Pennsylvania', '191', '215'), C('Pittsburgh', 'PA', 'Pennsylvania', '152', '412'), C('Harrisburg', 'PA', 'Pennsylvania', '171', '717'),
        C('Jacksonville', 'FL', 'Florida', '322', '904'), C('Miami', 'FL', 'Florida', '331', '305'), C('Orlando', 'FL', 'Florida', '328', '407'), C('Tampa', 'FL', 'Florida', '336', '813'),
        C('Columbus', 'OH', 'Ohio', '432', '614'), C('Cleveland', 'OH', 'Ohio', '441', '216'), C('Cincinnati', 'OH', 'Ohio', '452', '513'),
        C('Atlanta', 'GA', 'Georgia', '303', '404'), C('Savannah', 'GA', 'Georgia', '314', '912'),
        C('Charlotte', 'NC', 'North Carolina', '282', '704'), C('Raleigh', 'NC', 'North Carolina', '276', '919'),
        C('Detroit', 'MI', 'Michigan', '482', '313'), C('Grand Rapids', 'MI', 'Michigan', '495', '616'),
        C('Seattle', 'WA', 'Washington', '981', '206'), C('Spokane', 'WA', 'Washington', '992', '509'),
        C('Boston', 'MA', 'Massachusetts', '021', '617'), C('Worcester', 'MA', 'Massachusetts', '016', '508'),
        C('Nashville', 'TN', 'Tennessee', '372', '615'), C('Memphis', 'TN', 'Tennessee', '381', '901'),
        C('Indianapolis', 'IN', 'Indiana', '462', '317'), C('Fort Wayne', 'IN', 'Indiana', '468', '260'),
        C('Denver', 'CO', 'Colorado', '802', '303'), C('Colorado Springs', 'CO', 'Colorado', '809', '719'),
        C('Baltimore', 'MD', 'Maryland', '212', '410'), C('Annapolis', 'MD', 'Maryland', '214', '443'),
        C('Milwaukee', 'WI', 'Wisconsin', '532', '414'), C('Madison', 'WI', 'Wisconsin', '537', '608'),
        C('Portland', 'OR', 'Oregon', '972', '503'), C('Eugene', 'OR', 'Oregon', '974', '541'),
        C('Las Vegas', 'NV', 'Nevada', '891', '702'), C('Reno', 'NV', 'Nevada', '895', '775'),
        C('Oklahoma City', 'OK', 'Oklahoma', '731', '405'), C('Tulsa', 'OK', 'Oklahoma', '741', '918'),
        C('Louisville', 'KY', 'Kentucky', '402', '502'), C('Lexington', 'KY', 'Kentucky', '405', '859'),
        C('New Orleans', 'LA', 'Louisiana', '701', '504'), C('Baton Rouge', 'LA', 'Louisiana', '708', '225'),
        C('Birmingham', 'AL', 'Alabama', '352', '205'), C('Montgomery', 'AL', 'Alabama', '361', '334'),
        C('Little Rock', 'AR', 'Arkansas', '722', '501'), C('Fayetteville', 'AR', 'Arkansas', '727', '479'),
        C('Jackson', 'MS', 'Mississippi', '392', '601'), C('Gulfport', 'MS', 'Mississippi', '395', '228'),
        C('Kansas City', 'MO', 'Missouri', '641', '816'), C('St. Louis', 'MO', 'Missouri', '631', '314'),
        C('Omaha', 'NE', 'Nebraska', '681', '402'), C('Lincoln', 'NE', 'Nebraska', '685', '402'),
        C('Minneapolis', 'MN', 'Minnesota', '554', '612'), C('St. Paul', 'MN', 'Minnesota', '551', '651'),
        C('Des Moines', 'IA', 'Iowa', '503', '515'), C('Cedar Rapids', 'IA', 'Iowa', '524', '319'),
        C('Wichita', 'KS', 'Kansas', '672', '316'), C('Topeka', 'KS', 'Kansas', '666', '785'),
        C('Salt Lake City', 'UT', 'Utah', '841', '801'), C('Provo', 'UT', 'Utah', '846', '801'),
        C('Albuquerque', 'NM', 'New Mexico', '871', '505'), C('Santa Fe', 'NM', 'New Mexico', '875', '505'),
        C('Boise', 'ID', 'Idaho', '837', '208'), C('Idaho Falls', 'ID', 'Idaho', '834', '208'),
        C('Billings', 'MT', 'Montana', '591', '406'), C('Missoula', 'MT', 'Montana', '598', '406'),
        C('Cheyenne', 'WY', 'Wyoming', '820', '307'), C('Casper', 'WY', 'Wyoming', '826', '307'),
        C('Fargo', 'ND', 'North Dakota', '581', '701'), C('Bismarck', 'ND', 'North Dakota', '585', '701'),
        C('Sioux Falls', 'SD', 'South Dakota', '571', '605'), C('Rapid City', 'SD', 'South Dakota', '577', '605'),
        C('Charleston', 'SC', 'South Carolina', '294', '843'), C('Columbia', 'SC', 'South Carolina', '292', '803'),
        C('Richmond', 'VA', 'Virginia', '232', '804'), C('Arlington', 'VA', 'Virginia', '222', '703'), C('Virginia Beach', 'VA', 'Virginia', '234', '757'),
        C('Charleston', 'WV', 'West Virginia', '253', '304'), C('Huntington', 'WV', 'West Virginia', '257', '304'),
        C('Providence', 'RI', 'Rhode Island', '029', '401'), C('Newport', 'RI', 'Rhode Island', '028', '401'),
        C('Hartford', 'CT', 'Connecticut', '061', '860'), C('Stamford', 'CT', 'Connecticut', '069', '203'),
        C('Newark', 'NJ', 'New Jersey', '071', '973'), C('Trenton', 'NJ', 'New Jersey', '086', '609'),
        C('Wilmington', 'DE', 'Delaware', '198', '302'), C('Dover', 'DE', 'Delaware', '199', '302'),
        C('Manchester', 'NH', 'New Hampshire', '031', '603'), C('Concord', 'NH', 'New Hampshire', '033', '603'),
        C('Burlington', 'VT', 'Vermont', '054', '802'), C('Montpelier', 'VT', 'Vermont', '056', '802'),
        C('Portland', 'ME', 'Maine', '041', '207'), C('Bangor', 'ME', 'Maine', '044', '207'),
        C('Honolulu', 'HI', 'Hawaii', '968', '808'), C('Hilo', 'HI', 'Hawaii', '967', '808'),
        C('Anchorage', 'AK', 'Alaska', '995', '907'), C('Fairbanks', 'AK', 'Alaska', '997', '907'),
        C('Washington', 'DC', 'District of Columbia', '200', '202')
      ],
      streetNames: ['Maple', 'Oak', 'Pine', 'Cedar', 'Elm', 'Washington', 'Lakeview', 'Highland', 'Sunset', 'Ridge', 'Park', 'Main', 'Forest', 'River', 'Meadow', 'Spring', 'Church', 'Center', 'Walnut', 'Cherry', 'Aspen', 'Willow', 'Bay', 'Brookside', 'Cambridge', 'Dover', 'Essex', 'Franklin', 'Grant', 'Lincoln'],
      streetSuffix: ['St', 'Ave', 'Rd', 'Blvd', 'Ln', 'Dr', 'Ct', 'Pl', 'Way', 'Ter'],
      companyPrefix: ['Northwind', 'Acme', 'Blue Ridge', 'Summit', 'BrightPath', 'Ironwood', 'Cedar Peak', 'Silverline', 'Redwood', 'Atlas', 'Pioneer', 'Copperfield', 'Harbor Point', 'Beacon'],
      companySuffix: ['Inc.', 'LLC', 'Corp.', 'Group', 'Solutions', 'Systems', 'Partners', 'Labs', 'Consulting', 'Holdings'],
      jobs: ['Software Engineer', 'Product Manager', 'Data Analyst', 'Registered Nurse', 'Accountant', 'Marketing Specialist', 'Operations Manager', 'Graphic Designer', 'Sales Representative', 'Project Coordinator', 'Financial Analyst', 'HR Specialist', 'Teacher', 'Electrician', 'Customer Success Manager', 'DevOps Engineer', 'UX Designer', 'Office Manager'],
      domains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'proton.me'],
      phone(c) { return `(${c.area}) 555-01${U.pad(U.randInt(0, 99))}`; },
      mobile(c) { return `(${c.area}) 555-01${U.pad(U.randInt(0, 99))}`; },
      postal(c) { return `${c.zip}${U.pad(U.randInt(1, 99))}`; },
      addressLine() {
        return `${U.randInt(101, 9899)} ${U.pick(this.streetNames)} ${U.pick(this.streetSuffix)}`;
      },
      addressLine2() {
        return `Apt ${U.randInt(1, 40)}${U.pick(['A', 'B', 'C', ''])}`;
      }
    },

    /* ================= United Kingdom ================= */
    GB: {
      name: 'United Kingdom', nameZh: '英国', locale: 'en-GB', tld: 'co.uk',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Mr', female: 'Ms' },
      first: {
        male: ['Oliver', 'Harry', 'Jack', 'George', 'Charlie', 'Thomas', 'Oscar', 'William', 'James', 'Henry'],
        female: ['Emily', 'Olivia', 'Sophie', 'Grace', 'Charlotte', 'Amelia', 'Jessica', 'Lucy', 'Ella', 'Freya']
      },
      middle: { male: ['James', 'John', 'David'], female: ['Rose', 'Marie', 'Louise'] },
      last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright', 'Thompson', 'Evans', 'Walker', 'White', 'Roberts'],
      cities: [
        C('London', 'LDN', 'London', 'SW1A 1AA', '020'),
        C('Manchester', 'MAN', 'Greater Manchester', 'M1 1AE', '0161'),
        C('Birmingham', 'BIR', 'West Midlands', 'B1 1BB', '0121'),
        C('Leeds', 'LDS', 'West Yorkshire', 'LS1 1UR', '0113'),
        C('Glasgow', 'GLG', 'Scotland', 'G1 1XW', '0141'),
        C('Bristol', 'BRS', 'Bristol', 'BS1 4DJ', '0117'),
        C('Liverpool', 'LIV', 'Merseyside', 'L1 1JQ', '0151'),
        C('Edinburgh', 'EDH', 'Scotland', 'EH1 1YZ', '0131')
      ],
      streetNames: ['Baker Street', 'Church Road', 'High Street', 'Station Road', 'Victoria Road', 'Queens Road', 'Mill Lane', 'Kings Road', 'Park Avenue', 'Elm Grove'],
      companyPrefix: ['Thornbury', 'Kingsley', 'Northgate', 'Pemberton', 'Ashford', 'Whitfield'],
      companySuffix: ['Ltd', 'Ltd.', 'Group', 'Consulting', 'Holdings', 'Partners'],
      jobs: ['Software Developer', 'Account Manager', 'Marketing Executive', 'Project Manager', 'Financial Adviser', 'Graphic Designer', 'Operations Analyst', 'Teacher'],
      domains: ['gmail.com', 'btinternet.com', 'sky.com', 'outlook.com', 'yahoo.co.uk'],
      phone(c) { return `${c.area} ${U.digits(4)} ${U.digits(4)}`; },
      mobile() { return `07${U.digits(3)} ${U.digits(6)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.randInt(1, 240)} ${U.pick(this.streetNames)}`; },
      addressLine2() { return `Flat ${U.randInt(1, 24)}`; }
    },

    /* ================= Canada ================= */
    CA: {
      name: 'Canada', nameZh: '加拿大', locale: 'en-CA', tld: 'ca',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Mr.', female: 'Ms.' },
      first: {
        male: ['Liam', 'Noah', 'Ethan', 'Lucas', 'Owen', 'Jack', 'William', 'Benjamin', 'Nathan', 'Jacob'],
        female: ['Olivia', 'Emma', 'Charlotte', 'Ava', 'Sophia', 'Chloe', 'Emily', 'Abigail', 'Léa', 'Hannah']
      },
      middle: { male: ['William', 'James', 'Robert'], female: ['Marie', 'Anne', 'Claire'] },
      last: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Gagnon', 'Johnson', 'Taylor', 'Leblanc', 'Côté', 'Bouchard', 'Lee', 'Gauthier'],
      cities: [
        C('Toronto', 'ON', 'Ontario', 'M5H 2N2', '416'),
        C('Ottawa', 'ON', 'Ontario', 'K1A 0B1', '613'),
        C('Vancouver', 'BC', 'British Columbia', 'V6B 1A1', '604'),
        C('Montreal', 'QC', 'Quebec', 'H2Y 1C6', '514'),
        C('Calgary', 'AB', 'Alberta', 'T2P 1J9', '403'),
        C('Edmonton', 'AB', 'Alberta', 'T5J 0N3', '780'),
        C('Winnipeg', 'MB', 'Manitoba', 'R3C 0V8', '204'),
        C('Halifax', 'NS', 'Nova Scotia', 'B3J 1S9', '902')
      ],
      streetNames: ['Maple', 'King', 'Queen', 'Yonge', 'Bloor', 'Granville', 'Rue Sainte-Catherine', 'Portage', 'Bay', 'Dundas'],
      streetSuffix: ['St', 'Ave', 'Rd', 'Blvd', 'Cres', 'Dr'],
      companyPrefix: ['Maple', 'Northern', 'Lakeside', 'Granite', 'Maple Leaf', 'Polaris'],
      companySuffix: ['Inc.', 'Ltd.', 'Corp.', 'Group', 'Consulting'],
      jobs: ['Software Engineer', 'Accountant', 'Project Manager', 'Sales Manager', 'Registered Nurse', 'Marketing Coordinator', 'Electrician'],
      domains: ['gmail.com', 'sympatico.ca', 'shaw.ca', 'outlook.com', 'yahoo.ca'],
      phone(c) { return `(${c.area}) 555-01${U.pad(U.randInt(0, 99))}`; },
      mobile(c) { return `(${c.area}) 555-01${U.pad(U.randInt(0, 99))}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.randInt(10, 4999)} ${U.pick(this.streetNames)} ${U.pick(this.streetSuffix)}`; },
      addressLine2() { return `Unit ${U.randInt(1, 40)}`; }
    },

    /* ================= Australia ================= */
    AU: {
      name: 'Australia', nameZh: '澳大利亚', locale: 'en-AU', tld: 'com.au',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Mr', female: 'Ms' },
      first: {
        male: ['Jack', 'Oliver', 'Noah', 'William', 'Leo', 'Henry', 'Thomas', 'Charlie', 'Lucas', 'Ethan'],
        female: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Ava', 'Grace', 'Chloe', 'Sophie', 'Ruby']
      },
      middle: { male: ['James', 'John', 'David'], female: ['Rose', 'Jane', 'Mary'] },
      last: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Nguyen', 'Martin', 'White', 'Anderson', 'Thompson', 'Walker', 'Harris', 'Kelly', 'Ryan'],
      cities: [
        C('Sydney', 'NSW', 'New South Wales', '2000', '02'),
        C('Melbourne', 'VIC', 'Victoria', '3000', '03'),
        C('Brisbane', 'QLD', 'Queensland', '4000', '07'),
        C('Perth', 'WA', 'Western Australia', '6000', '08'),
        C('Adelaide', 'SA', 'South Australia', '5000', '08'),
        C('Canberra', 'ACT', 'Australian Capital Territory', '2600', '02'),
        C('Hobart', 'TAS', 'Tasmania', '7000', '03'),
        C('Darwin', 'NT', 'Northern Territory', '0800', '08')
      ],
      streetNames: ['George', 'Elizabeth', 'Collins', 'Flinders', 'King William', 'Queen', 'Macquarie', 'Bourke', 'Pitt', 'Adelaide'],
      streetSuffix: ['St', 'Rd', 'Ave', 'Pde', 'Ct', 'Dr'],
      companyPrefix: ['Coastline', 'Southern Cross', 'Outback', 'Harbour', 'Kangaroo', 'Redgum'],
      companySuffix: ['Pty Ltd', 'Group', 'Consulting', 'Holdings'],
      jobs: ['Software Engineer', 'Mining Engineer', 'Project Manager', 'Accountant', 'Registered Nurse', 'Marketing Officer', 'Electrician'],
      domains: ['gmail.com', 'bigpond.com', 'iinet.net.au', 'outlook.com.au', 'yahoo.com.au'],
      phone(c) { return `(${c.area}) ${U.digits(4)} ${U.digits(4)}`; },
      mobile() { return `04${U.digits(2)} ${U.digits(3)} ${U.digits(3)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.randInt(1, 299)} ${U.pick(this.streetNames)} ${U.pick(this.streetSuffix)}`; },
      addressLine2() { return `Unit ${U.randInt(1, 30)}`; }
    },

    /* ================= China ================= */
    CN: {
      name: 'China', nameZh: '中国', locale: 'zh-CN', tld: 'cn',
      order: 'family', join: '', companyJoin: '',
      titles: { male: '先生', female: '女士' },
      first: {
        male: [['伟', 'wei'], ['强', 'qiang'], ['磊', 'lei'], ['军', 'jun'], ['洋', 'yang'], ['勇', 'yong'], ['杰', 'jie'], ['涛', 'tao'], ['明', 'ming'], ['超', 'chao'], ['刚', 'gang'], ['辉', 'hui'], ['鹏', 'peng'], ['华', 'hua'], ['飞', 'fei'], ['宇', 'yu'], ['浩', 'hao'], ['凯', 'kai'], ['健', 'jian'], ['俊', 'jun']],
        female: [['芳', 'fang'], ['娜', 'na'], ['敏', 'min'], ['静', 'jing'], ['丽', 'li'], ['艳', 'yan'], ['娟', 'juan'], ['霞', 'xia'], ['婷', 'ting'], ['雪', 'xue'], ['琳', 'lin'], ['晶', 'jing'], ['欣', 'xin'], ['悦', 'yue'], ['怡', 'yi'], ['佳', 'jia'], ['慧', 'hui'], ['倩', 'qian'], ['颖', 'ying'], ['洁', 'jie']]
      },
      last: [['王', 'wang'], ['李', 'li'], ['张', 'zhang'], ['刘', 'liu'], ['陈', 'chen'], ['杨', 'yang'], ['赵', 'zhao'], ['黄', 'huang'], ['周', 'zhou'], ['吴', 'wu'], ['徐', 'xu'], ['孙', 'sun'], ['胡', 'hu'], ['朱', 'zhu'], ['高', 'gao'], ['林', 'lin'], ['何', 'he'], ['郭', 'guo'], ['马', 'ma'], ['罗', 'luo'], ['梁', 'liang'], ['宋', 'song'], ['郑', 'zheng'], ['谢', 'xie'], ['韩', 'han'], ['唐', 'tang'], ['冯', 'feng'], ['董', 'dong'], ['程', 'cheng'], ['曹', 'cao'], ['袁', 'yuan'], ['邓', 'deng']],
      cities: [
        C('北京市', '北京', '北京市', '100000', '010', { code: '110105', district: '朝阳区' }),
        C('上海市', '上海', '上海市', '200000', '021', { code: '310104', district: '徐汇区' }),
        C('广州市', '广东', '广东省', '510000', '020', { code: '440106', district: '天河区' }),
        C('深圳市', '广东', '广东省', '518000', '0755', { code: '440305', district: '南山区' }),
        C('杭州市', '浙江', '浙江省', '310000', '0571', { code: '330106', district: '西湖区' }),
        C('成都市', '四川', '四川省', '610000', '028', { code: '510107', district: '武侯区' }),
        C('南京市', '江苏', '江苏省', '210000', '025', { code: '320102', district: '玄武区' }),
        C('武汉市', '湖北', '湖北省', '430000', '027', { code: '420106', district: '武昌区' }),
        C('西安市', '陕西', '陕西省', '710000', '029', { code: '610113', district: '雁塔区' }),
        C('重庆市', '重庆', '重庆市', '400000', '023', { code: '500103', district: '渝中区' }),
        C('天津市', '天津', '天津市', '300000', '022', { code: '120101', district: '和平区' }),
        C('苏州市', '江苏', '江苏省', '215000', '0512', { code: '320505', district: '虎丘区' }),
        C('青岛市', '山东', '山东省', '266000', '0532', { code: '370202', district: '市南区' }),
        C('沈阳市', '辽宁', '辽宁省', '110000', '024', { code: '210102', district: '和平区' }),
        C('长沙市', '湖南', '湖南省', '410000', '0731', { code: '430104', district: '岳麓区' })
      ],
      streetNames: ['建国路', '人民路', '中山路', '解放路', '建设路', '长江路', '南京路', '延安路', '文化路', '和平路'],
      companyPrefix: ['华信', '东方', '恒达', '中科', '长城', '远洋', '金桥', '博远'],
      companySuffix: ['有限公司', '科技有限公司', '贸易有限公司', '实业有限公司'],
      jobs: ['软件工程师', '产品经理', '会计', '销售经理', '市场专员', '行政助理', '人力资源专员', '设计师', '教师', '医生'],
      domains: ['qq.com', '163.com', '126.com', 'gmail.com', 'outlook.com'],
      phone(c) { return `${c.area}-${U.digits(8)}`; },
      mobile() { return `1${U.pick(['3', '5', '6', '7', '8', '9'])}${U.digits(9)}`; },
      postal(c) { return c.zip; },
      addressLine(c) { return `${c.city}${c.district}${U.pick(this.streetNames)}${U.randInt(1, 299)}号`; },
      addressLine2() { return `${U.randInt(1, 20)}单元${U.randInt(1, 25)}0${U.randInt(1, 3)}室`; }
    },

    /* ================= Japan ================= */
    JP: {
      name: 'Japan', nameZh: '日本', locale: 'ja-JP', tld: 'jp',
      order: 'family', join: '', companyJoin: '',
      titles: { male: '様', female: '様' },
      first: {
        male: [['大輔', 'daisuke'], ['翔', 'sho'], ['健太', 'kenta'], ['拓也', 'takuya'], ['直樹', 'naoki'], ['亮', 'ryo'], ['誠', 'makoto'], ['浩二', 'koji'], ['雄大', 'yudai'], ['竜也', 'tatsuya']],
        female: [['美咲', 'misaki'], ['陽子', 'yoko'], ['愛', 'ai'], ['結衣', 'yui'], ['真由美', 'mayumi'], ['瞳', 'hitomi'], ['由紀', 'yuki'], ['奈々', 'nana'], ['さくら', 'sakura'], ['恵', 'megumi']]
      },
      last: [['佐藤', 'sato'], ['鈴木', 'suzuki'], ['高橋', 'takahashi'], ['田中', 'tanaka'], ['伊藤', 'ito'], ['渡辺', 'watanabe'], ['山本', 'yamamoto'], ['中村', 'nakamura'], ['小林', 'kobayashi'], ['加藤', 'kato'], ['吉田', 'yoshida'], ['山田', 'yamada'], ['佐々木', 'sasaki'], ['山口', 'yamaguchi'], ['松本', 'matsumoto']],
      cities: [
        C('渋谷区', '東京', '東京都', '150-0002', '03'),
        C('大阪市北区', '大阪', '大阪府', '530-0001', '06'),
        C('京都市中京区', '京都', '京都府', '604-8006', '075'),
        C('札幌市中央区', '北海道', '北海道', '060-0001', '011'),
        C('名古屋市中区', '愛知', '愛知県', '460-0001', '052'),
        C('福岡市博多区', '福岡', '福岡県', '812-0011', '092'),
        C('横浜市西区', '神奈川', '神奈川県', '220-0011', '045'),
        C('神戸市中央区', '兵庫', '兵庫県', '650-0001', '078')
      ],
      companyPrefix: ['山田', '佐藤', '日本', '東京', '大和', '富士'],
      companySuffix: ['株式会社', '商事', '工業', 'システムズ'],
      jobs: ['ソフトウェアエンジニア', '営業', '経理', 'プロジェクトマネージャー', 'デザイナー', '看護師', '教師'],
      domains: ['gmail.com', 'yahoo.co.jp', 'docomo.ne.jp', 'softbank.ne.jp'],
      phone(c) { return `${c.area}-${U.digits(4)}-${U.digits(4)}`; },
      mobile() { return `090-${U.digits(4)}-${U.digits(4)}`; },
      postal(c) { return `〒${c.zip}`; },
      addressLine(c) { return `${c.regionName}${c.city}${U.randInt(1, 5)}-${U.randInt(1, 30)}-${U.randInt(1, 20)}`; },
      addressLine2() { return `${U.pick(['コーポ', 'メゾン', 'ハイツ'])}${U.pick(['A', 'B', 'C'])}${U.randInt(101, 1203)}`; }
    },

    /* ================= South Korea ================= */
    KR: {
      name: 'South Korea', nameZh: '韩国', locale: 'ko-KR', tld: 'kr',
      order: 'family', join: '', companyJoin: '',
      titles: { male: '씨', female: '씨' },
      first: {
        male: [['民俊', 'minjun'], ['志勳', 'jihoon'], ['賢宇', 'hyunwoo'], ['承佑', 'seungwoo'], ['俊浩', 'junho'], ['東賢', 'donghyun'], ['宰民', 'jaemin'], ['成民', 'sungmin']],
        female: [['智秀', 'jisoo'], ['敏京', 'minkyung'], ['恩靜', 'eunjung'], ['雅英', 'ahyoung'], ['秀晶', 'soojung'], ['智恩', 'jieun'], ['多恩', 'daeun'], ['允熙', 'yoonhee']]
      },
      last: [['金', 'kim'], ['李', 'lee'], ['朴', 'park'], ['崔', 'choi'], ['鄭', 'jung'], ['姜', 'kang'], ['趙', 'cho'], ['尹', 'yoon'], ['張', 'jang'], ['林', 'lim'], ['韓', 'han'], ['吳', 'oh'], ['申', 'shin'], ['徐', 'seo'], ['權', 'kwon']],
      cities: [
        C('중구', '서울', '서울특별시', '04524', '02'),
        C('해운대구', '부산', '부산광역시', '48095', '051'),
        C('남동구', '인천', '인천광역시', '21554', '032'),
        C('중구', '대구', '대구광역시', '41911', '053'),
        C('서구', '대전', '대전광역시', '35242', '042'),
        C('동구', '광주', '광주광역시', '61475', '062'),
        C('수원시', '경기', '경기도', '16487', '031')
      ],
      streetNames: ['세종대로', '테헤란로', '강남대로', '을지로', '종로', '한강대로', '충정로'],
      companyPrefix: ['한국', '대한', '서울', '한빛', '미래'],
      companySuffix: ['주식회사', '테크', '시스템'],
      jobs: ['소프트웨어 엔지니어', '영업', '회계', '프로젝트 매니저', '디자이너', '간호사', '교사'],
      domains: ['gmail.com', 'naver.com', 'hanmail.net', 'kakao.com'],
      phone(c) { return `${c.area}-${U.digits(3)}-${U.digits(4)}`; },
      mobile() { return `010-${U.digits(4)}-${U.digits(4)}`; },
      postal(c) { return c.zip; },
      addressLine(c) { return `${c.regionName} ${c.city} ${U.pick(this.streetNames)} ${U.randInt(1, 399)}`; },
      addressLine2() { return `${U.randInt(1, 25)}동 ${U.randInt(101, 2503)}호`; }
    },

    /* ================= Germany ================= */
    DE: {
      name: 'Germany', nameZh: '德国', locale: 'de-DE', tld: 'de',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Herr', female: 'Frau' },
      first: {
        male: ['Lukas', 'Leon', 'Felix', 'Jonas', 'Maximilian', 'Paul', 'Elias', 'Noah', 'Finn', 'Ben'],
        female: ['Anna', 'Lena', 'Sophie', 'Marie', 'Laura', 'Julia', 'Emma', 'Mia', 'Lea', 'Clara']
      },
      middle: { male: ['Michael', 'Thomas', 'Andreas'], female: ['Marie', 'Louise', 'Sophie'] },
      last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf'],
      cities: [
        C('Berlin', 'BE', 'Berlin', '10115', '030'),
        C('München', 'BY', 'Bayern', '80331', '089'),
        C('Hamburg', 'HH', 'Hamburg', '20095', '040'),
        C('Köln', 'NW', 'Nordrhein-Westfalen', '50667', '0221'),
        C('Frankfurt am Main', 'HE', 'Hessen', '60311', '069'),
        C('Stuttgart', 'BW', 'Baden-Württemberg', '70173', '0711'),
        C('Düsseldorf', 'NW', 'Nordrhein-Westfalen', '40213', '0211'),
        C('Dresden', 'SN', 'Sachsen', '01067', '0351'),
        C('Leipzig', 'SN', 'Sachsen', '04109', '0341'),
        C('Hannover', 'NI', 'Niedersachsen', '30159', '0511')
      ],
      streetNames: ['Hauptstraße', 'Bahnhofstraße', 'Schulstraße', 'Gartenstraße', 'Dorfstraße', 'Lindenweg', 'Goethestraße', 'Berliner Straße', 'Ringstraße', 'Kirchgasse'],
      companyPrefix: ['Nordwind', 'Rheinland', 'Bavaria', 'Elbe', 'Schwarzwald', 'Hansa'],
      companySuffix: ['GmbH', 'AG', 'GmbH & Co. KG', 'Consulting', 'Systems'],
      jobs: ['Softwareentwickler', 'Projektmanager', 'Buchhalter', 'Vertriebsleiter', 'Marketingreferent', 'Designer', 'Krankenpfleger', 'Lehrer'],
      domains: ['gmail.com', 'web.de', 'gmx.de', 'outlook.de', 't-online.de'],
      phone(c) { return `${c.area} ${U.digits(8)}`; },
      mobile() { return `015${U.pick(['1', '2', '5', '7'])} ${U.digits(8)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.pick(this.streetNames)} ${U.randInt(1, 240)}`; },
      addressLine2() { return `Wohnung ${U.randInt(1, 30)}`; }
    },

    /* ================= France ================= */
    FR: {
      name: 'France', nameZh: '法国', locale: 'fr-FR', tld: 'fr',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'M.', female: 'Mme' },
      first: {
        male: ['Lucas', 'Hugo', 'Louis', 'Gabriel', 'Nathan', 'Jules', 'Adam', 'Raphaël', 'Théo', 'Arthur'],
        female: ['Emma', 'Léa', 'Chloé', 'Manon', 'Camille', 'Sarah', 'Inès', 'Juliette', 'Louise', 'Alice']
      },
      middle: { male: ['Pierre', 'Jean', 'Michel'], female: ['Marie', 'Claire', 'Sophie'] },
      last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia'],
      cities: [
        C('Paris', '75', 'Île-de-France', '75011', '01', { dept: '75' }),
        C('Marseille', '13', 'Provence-Alpes-Côte d’Azur', '13001', '04', { dept: '13' }),
        C('Lyon', '69', 'Auvergne-Rhône-Alpes', '69001', '04', { dept: '69' }),
        C('Toulouse', '31', 'Occitanie', '31000', '05', { dept: '31' }),
        C('Nantes', '44', 'Pays de la Loire', '44000', '02', { dept: '44' }),
        C('Bordeaux', '33', 'Nouvelle-Aquitaine', '33000', '05', { dept: '33' }),
        C('Strasbourg', '67', 'Grand Est', '67000', '03', { dept: '67' }),
        C('Lille', '59', 'Hauts-de-France', '59000', '03', { dept: '59' }),
        C('Nice', '06', 'Provence-Alpes-Côte d’Azur', '06000', '04', { dept: '06' }),
        C('Montpellier', '34', 'Occitanie', '34000', '04', { dept: '34' })
      ],
      streetNames: ['de la Paix', 'Victor Hugo', 'Jean Jaurès', 'des Fleurs', 'du Moulin', 'de la Gare', 'Pasteur', 'de Verdun'],
      companyPrefix: ['Atelier', 'Groupe', 'Maison', 'Provence', 'Lumière'],
      companySuffix: ['SARL', 'SAS', 'SA', 'Conseil', 'Solutions'],
      jobs: ['Développeur', 'Chef de projet', 'Comptable', 'Commercial', 'Chargé de marketing', 'Designer', 'Infirmier', 'Enseignant'],
      domains: ['gmail.com', 'orange.fr', 'free.fr', 'laposte.net', 'hotmail.fr'],
      phone(c) { return `${c.area} ${U.digits(2)} ${U.digits(2)} ${U.digits(2)} ${U.digits(2)}`; },
      mobile() { return `06 ${U.digits(2)} ${U.digits(2)} ${U.digits(2)} ${U.digits(2)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.randInt(1, 199)} ${U.pick(['rue', 'avenue', 'boulevard'])} ${U.pick(this.streetNames)}`; },
      addressLine2() { return `Bât. ${U.letters(1)}`; }
    },

    /* ================= Italy ================= */
    IT: {
      name: 'Italy', nameZh: '意大利', locale: 'it-IT', tld: 'it',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Sig.', female: 'Sig.ra' },
      first: {
        male: ['Luca', 'Marco', 'Andrea', 'Matteo', 'Alessandro', 'Davide', 'Simone', 'Francesco', 'Lorenzo', 'Giovanni'],
        female: ['Giulia', 'Sofia', 'Martina', 'Chiara', 'Sara', 'Elena', 'Francesca', 'Alessia', 'Valentina', 'Giorgia']
      },
      middle: { male: ['Maria', 'Giuseppe', 'Antonio'], female: ['Maria', 'Anna', 'Lucia'] },
      last: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Costa'],
      cities: [
        C('Roma', 'RM', 'Lazio', '00184', '06', { cf: 'H501' }),
        C('Milano', 'MI', 'Lombardia', '20121', '02', { cf: 'F205' }),
        C('Napoli', 'NA', 'Campania', '80100', '081', { cf: 'F839' }),
        C('Torino', 'TO', 'Piemonte', '10121', '011', { cf: 'L219' }),
        C('Firenze', 'FI', 'Toscana', '50122', '055', { cf: 'D612' }),
        C('Bologna', 'BO', 'Emilia-Romagna', '40124', '051', { cf: 'A944' }),
        C('Palermo', 'PA', 'Sicilia', '90133', '091', { cf: 'G273' }),
        C('Genova', 'GE', 'Liguria', '16121', '010', { cf: 'D969' }),
        C('Venezia', 'VE', 'Veneto', '30122', '041', { cf: 'L736' }),
        C('Bari', 'BA', 'Puglia', '70122', '080', { cf: 'A662' })
      ],
      streetNames: ['Roma', 'Garibaldi', 'Dante', 'Mazzini', 'Vittorio Emanuele', 'Marconi', 'Sant’Antonio', 'delle Rose'],
      companyPrefix: ['Rossi', 'Milano', 'Firenze', 'Adriatica', 'Toscana'],
      companySuffix: ['S.r.l.', 'S.p.A.', 'Group', 'Consulting'],
      jobs: ['Ingegnere software', 'Project manager', 'Contabile', 'Responsabile vendite', 'Addetto marketing', 'Designer', 'Infermiere', 'Insegnante'],
      domains: ['gmail.com', 'libero.it', 'virgilio.it', 'outlook.it'],
      phone(c) { return `${c.area} ${U.digits(4)} ${U.digits(4)}`; },
      mobile() { return `3${U.digits(2)} ${U.digits(3)} ${U.digits(4)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `Via ${U.pick(this.streetNames)} ${U.randInt(1, 199)}`; },
      addressLine2() { return `Int. ${U.randInt(1, 20)}`; }
    },

    /* ================= Spain ================= */
    ES: {
      name: 'Spain', nameZh: '西班牙', locale: 'es-ES', tld: 'es',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Sr.', female: 'Sra.' },
      first: {
        male: ['Hugo', 'Daniel', 'Pablo', 'Alejandro', 'Javier', 'Sergio', 'Adrián', 'Carlos', 'Miguel', 'Diego'],
        female: ['Lucía', 'Martina', 'Sara', 'Paula', 'Marta', 'Carmen', 'Ana', 'Elena', 'Laura', 'María']
      },
      middle: { male: ['José', 'Antonio', 'Manuel'], female: ['María', 'Carmen', 'Isabel'] },
      last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno'],
      cities: [
        C('Madrid', 'MD', 'Comunidad de Madrid', '28013', '91'),
        C('Barcelona', 'CT', 'Cataluña', '08002', '93'),
        C('Valencia', 'VC', 'Comunidad Valenciana', '46002', '96'),
        C('Sevilla', 'AN', 'Andalucía', '41001', '95'),
        C('Bilbao', 'PV', 'País Vasco', '48001', '94'),
        C('Málaga', 'AN', 'Andalucía', '29001', '95'),
        C('Zaragoza', 'AR', 'Aragón', '50001', '976'),
        C('Murcia', 'MC', 'Región de Murcia', '30001', '968')
      ],
      streetNames: ['Mayor', 'Real', 'Cervantes', 'Gran Vía', 'de la Constitución', 'San Juan', 'del Sol', 'Luna'],
      companyPrefix: ['Grupo', 'Iberia', 'Sol', 'Mediterráneo', 'Costa'],
      companySuffix: ['S.L.', 'S.A.', 'Consultores', 'Soluciones'],
      jobs: ['Ingeniero de software', 'Jefe de proyecto', 'Contable', 'Comercial', 'Marketing', 'Diseñador', 'Enfermero', 'Profesor'],
      domains: ['gmail.com', 'hotmail.es', 'telefonica.net', 'outlook.es'],
      phone(c) { return `${c.area} ${U.digits(3)} ${U.digits(2)} ${U.digits(2)}`; },
      mobile() { return `6${U.digits(2)} ${U.digits(3)} ${U.digits(3)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `Calle ${U.pick(this.streetNames)} ${U.randInt(1, 199)}, ${U.randInt(1, 8)}º${U.letters(1, 'ABCD')}`; },
      addressLine2() { return ''; }
    },

    /* ================= Netherlands ================= */
    NL: {
      name: 'Netherlands', nameZh: '荷兰', locale: 'nl-NL', tld: 'nl',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Dhr.', female: 'Mevr.' },
      first: {
        male: ['Daan', 'Sem', 'Lucas', 'Milan', 'Levi', 'Finn', 'Bram', 'Thijs', 'Sven', 'Jesse'],
        female: ['Emma', 'Julia', 'Sophie', 'Tess', 'Anna', 'Mila', 'Sanne', 'Fleur', 'Lotte', 'Noor']
      },
      last: ['de Jong', 'Jansen', 'de Vries', 'van den Berg', 'van Dijk', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder', 'Bos', 'Vos', 'Peters', 'Hendriks'],
      cities: [
        C('Amsterdam', 'NH', 'Noord-Holland', '1012 AB', '020'),
        C('Rotterdam', 'ZH', 'Zuid-Holland', '3011 AD', '010'),
        C('Den Haag', 'ZH', 'Zuid-Holland', '2511 AB', '070'),
        C('Utrecht', 'UT', 'Utrecht', '3511 AB', '030'),
        C('Eindhoven', 'NB', 'Noord-Brabant', '5611 AB', '040'),
        C('Groningen', 'GR', 'Groningen', '9711 AB', '050')
      ],
      streetNames: ['Kerkstraat', 'Dorpsstraat', 'Molenweg', 'Schoolstraat', 'Nieuwstraat', 'Julianastraat', 'Wilhelminastraat'],
      companyPrefix: ['Van Dijk', 'Noordzee', 'Holland', 'Tulip', 'Delta'],
      companySuffix: ['B.V.', 'N.V.', 'Consultancy', 'Solutions'],
      jobs: ['Softwareontwikkelaar', 'Projectmanager', 'Accountant', 'Accountmanager', 'Marketingmedewerker', 'Ontwerper', 'Verpleegkundige', 'Docent'],
      domains: ['gmail.com', 'ziggo.nl', 'kpnmail.nl', 'outlook.com'],
      phone(c) { return `${c.area}-${U.digits(7)}`; },
      mobile() { return `06 ${U.digits(8)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.pick(this.streetNames)} ${U.randInt(1, 199)}`; },
      addressLine2() { return `Apt. ${U.randInt(1, 20)}`; }
    },

    /* ================= Sweden ================= */
    SE: {
      name: 'Sweden', nameZh: '瑞典', locale: 'sv-SE', tld: 'se',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Herr', female: 'Fru' },
      first: {
        male: ['Erik', 'Lars', 'Johan', 'Anders', 'Nils', 'Oskar', 'Axel', 'Gustav', 'Hugo', 'Filip'],
        female: ['Anna', 'Maria', 'Sara', 'Emma', 'Karin', 'Linnéa', 'Elin', 'Maja', 'Alice', 'Astrid']
      },
      last: ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson', 'Pettersson', 'Jonsson', 'Lindberg', 'Bergström', 'Lindqvist'],
      cities: [
        C('Stockholm', 'AB', 'Stockholms län', '111 20', '08'),
        C('Göteborg', 'O', 'Västra Götaland', '411 03', '031'),
        C('Malmö', 'M', 'Skåne', '211 20', '040'),
        C('Uppsala', 'C', 'Uppsala län', '753 20', '018'),
        C('Linköping', 'E', 'Östergötland', '581 31', '013'),
        C('Umeå', 'AC', 'Västerbotten', '903 25', '090')
      ],
      streetNames: ['Storgatan', 'Järnvägsgatan', 'Skolgatan', 'Norra Vägen', 'Kyrkogatan', 'Drottninggatan', 'Parkvägen'],
      companyPrefix: ['Nordic', 'Stockholm', 'Scandia', 'Polar', 'Lind'],
      companySuffix: ['AB', 'Group', 'Consulting', 'Tech'],
      jobs: ['Mjukvaruutvecklare', 'Projektledare', 'Revisor', 'Säljare', 'Marknadsförare', 'Designer', 'Sjuksköterska', 'Lärare'],
      domains: ['gmail.com', 'telia.se', 'bredband.net', 'outlook.com'],
      phone(c) { return `${c.area}-${U.digits(3)} ${U.digits(2)} ${U.digits(2)}`; },
      mobile() { return `070-${U.digits(3)} ${U.digits(2)} ${U.digits(2)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.pick(this.streetNames)} ${U.randInt(1, 199)}`; },
      addressLine2() { return `Lgh ${U.randInt(1, 20)}`; }
    },

    /* ================= Brazil ================= */
    BR: {
      name: 'Brazil', nameZh: '巴西', locale: 'pt-BR', tld: 'com.br',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Sr.', female: 'Sra.' },
      first: {
        male: ['João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Thiago', 'Bruno', 'Felipe', 'Matheus', 'Gustavo'],
        female: ['Ana', 'Maria', 'Juliana', 'Camila', 'Fernanda', 'Beatriz', 'Larissa', 'Patrícia', 'Gabriela', 'Letícia']
      },
      middle: { male: ['Carlos', 'Eduardo', 'Paulo'], female: ['Maria', 'Cristina', 'Aparecida'] },
      last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Pereira', 'Costa', 'Ferreira', 'Almeida', 'Ribeiro', 'Rodrigues', 'Carvalho', 'Gomes', 'Martins', 'Araújo'],
      cities: [
        C('São Paulo', 'SP', 'São Paulo', '01310-100', '11'),
        C('Rio de Janeiro', 'RJ', 'Rio de Janeiro', '20040-020', '21'),
        C('Brasília', 'DF', 'Distrito Federal', '70040-010', '61'),
        C('Belo Horizonte', 'MG', 'Minas Gerais', '30130-010', '31'),
        C('Curitiba', 'PR', 'Paraná', '80010-010', '41'),
        C('Porto Alegre', 'RS', 'Rio Grande do Sul', '90010-000', '51'),
        C('Recife', 'PE', 'Pernambuco', '50010-000', '81'),
        C('Salvador', 'BA', 'Bahia', '40010-000', '71')
      ],
      streetNames: ['das Flores', 'Sete de Setembro', 'Getúlio Vargas', 'Santos Dumont', 'Brasil', 'da Independência', 'Rio Branco'],
      companyPrefix: ['Silva', 'Brasil', 'Atlântica', 'Solar', 'Verde'],
      companySuffix: ['Ltda.', 'S.A.', 'Serviços', 'Soluções'],
      jobs: ['Desenvolvedor', 'Gerente de projetos', 'Contador', 'Vendedor', 'Analista de marketing', 'Designer', 'Enfermeiro', 'Professor'],
      domains: ['gmail.com', 'uol.com.br', 'bol.com.br', 'outlook.com'],
      phone(c) { return `(${c.area}) ${U.digits(4)}-${U.digits(4)}`; },
      mobile(c) { return `(${c.area}) 9${U.digits(4)}-${U.digits(4)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `Rua ${U.pick(this.streetNames)}, ${U.randInt(1, 1999)}`; },
      addressLine2() { return `Apto ${U.randInt(1, 99)}`; }
    },

    /* ================= Mexico ================= */
    MX: {
      name: 'Mexico', nameZh: '墨西哥', locale: 'es-MX', tld: 'mx',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Sr.', female: 'Sra.' },
      first: {
        male: ['José', 'Luis', 'Carlos', 'Juan', 'Miguel', 'Diego', 'Alejandro', 'Fernando', 'Ricardo', 'Javier'],
        female: ['María', 'Guadalupe', 'Fernanda', 'Sofía', 'Valeria', 'Daniela', 'Andrea', 'Gabriela', 'Paola', 'Ximena']
      },
      middle: { male: ['Antonio', 'Eduardo', 'Francisco'], female: ['María', 'Fernanda', 'Isabel'] },
      last: ['Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Rodríguez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz'],
      cities: [
        C('Ciudad de México', 'CDMX', 'Ciudad de México', '01000', '55'),
        C('Guadalajara', 'JAL', 'Jalisco', '44100', '33'),
        C('Monterrey', 'NL', 'Nuevo León', '64000', '81'),
        C('Puebla', 'PUE', 'Puebla', '72000', '222'),
        C('Mérida', 'YUC', 'Yucatán', '97000', '999'),
        C('Tijuana', 'BC', 'Baja California', '22000', '664')
      ],
      streetNames: ['Reforma', 'Juárez', 'Hidalgo', 'Madero', 'Constitución', 'Independencia', 'Insurgentes'],
      colonias: ['Centro', 'Del Valle', 'Nápoles', 'Roma Norte', 'Polanco', 'Chapultepec'],
      companyPrefix: ['Grupo', 'Azteca', 'Sol', 'Norte', 'Maya'],
      companySuffix: ['S.A. de C.V.', 'S. de R.L.', 'Consultores'],
      jobs: ['Ingeniero de software', 'Gerente de proyecto', 'Contador', 'Ejecutivo de ventas', 'Mercadotecnia', 'Diseñador', 'Enfermero', 'Profesor'],
      domains: ['gmail.com', 'hotmail.com', 'prodigy.net.mx', 'outlook.com'],
      phone(c) { return `${c.area} ${U.digits(4)} ${U.digits(4)}`; },
      mobile(c) { return `${c.area} 1 ${U.digits(3)} ${U.digits(4)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `Av. ${U.pick(this.streetNames)} ${U.randInt(1, 999)}, Col. ${U.pick(this.colonias)}`; },
      addressLine2() { return ''; }
    },

    /* ================= India ================= */
    IN: {
      name: 'India', nameZh: '印度', locale: 'en-IN', tld: 'in',
      order: 'given', join: ' ', companyJoin: ' ',
      titles: { male: 'Mr.', female: 'Ms.' },
      first: {
        male: ['Aarav', 'Rohit', 'Arjun', 'Vikram', 'Rahul', 'Aditya', 'Karan', 'Siddharth', 'Nikhil', 'Manish'],
        female: ['Priya', 'Ananya', 'Sneha', 'Kavya', 'Meera', 'Divya', 'Riya', 'Neha', 'Pooja', 'Shreya']
      },
      middle: { male: ['Kumar', 'Raj', 'Vijay'], female: ['Devi', 'Kumari', 'Lakshmi'] },
      last: ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Nair', 'Iyer', 'Das', 'Mehta', 'Joshi', 'Rao', 'Chauhan', 'Verma', 'Bose'],
      cities: [
        C('Mumbai', 'MH', 'Maharashtra', '400001', '22'),
        C('New Delhi', 'DL', 'Delhi', '110001', '11'),
        C('Bengaluru', 'KA', 'Karnataka', '560001', '80'),
        C('Chennai', 'TN', 'Tamil Nadu', '600001', '44'),
        C('Hyderabad', 'TS', 'Telangana', '500001', '40'),
        C('Kolkata', 'WB', 'West Bengal', '700001', '33'),
        C('Pune', 'MH', 'Maharashtra', '411001', '20'),
        C('Ahmedabad', 'GJ', 'Gujarat', '380001', '79')
      ],
      streetNames: ['MG Road', 'Nehru Road', 'Brigade Road', 'Park Street', 'Anna Salai', 'Linking Road', 'Gandhi Road'],
      areas: ['Indiranagar', 'Andheri West', 'Koramangala', 'Banjara Hills', 'Salt Lake', 'Viman Nagar'],
      companyPrefix: ['Sharma', 'Bharat', 'Infotech', 'Sunrise', 'Lotus'],
      companySuffix: ['Pvt Ltd', 'Technologies', 'Solutions', 'Consulting'],
      jobs: ['Software Engineer', 'Project Manager', 'Accountant', 'Sales Executive', 'Marketing Analyst', 'Designer', 'Nurse', 'Teacher'],
      domains: ['gmail.com', 'rediffmail.com', 'yahoo.co.in', 'outlook.com'],
      phone(c) { return `${c.area} ${U.digits(4)} ${U.digits(4)}`; },
      mobile() { return `9${U.digits(4)} ${U.digits(5)}`; },
      postal(c) { return c.zip; },
      addressLine() { return `${U.randInt(1, 399)}, ${U.pick(this.streetNames)}, ${U.pick(this.areas)}`; },
      addressLine2() { return ''; }
    }
  };

  g.FakeCharData = DATA;
})(typeof globalThis !== 'undefined' ? globalThis : this);