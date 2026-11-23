# FakeChar · 假身份生成与自动填充（Chrome 扩展）

参考 GitHub 上几个同类项目的思路合并而成：**Fake Filler**（一键全填）、**Autofillr**（自洽档案 + 按 autocomplete 匹配）、**fake-person-extension**（国家下拉 + 高亮）、**FakeCraft**（原生 setter 穿透 Vue/React + 中国证件规则）、**Form Filler with Faker**（多 locale 右键菜单）、**smart-form-filler**（label/placeholder/ARIA 多路匹配 + iframe）。

目标：**选国家 → 生成一份互相自洽的假身份 → 一键填进任意网页表单**。美国数据做得最深，另外覆盖 15 个常见国家。

> ⚠️ 仅用于本地开发、QA 测试、演示与隐私保护场景。生成的证件号、卡号均为**符合校验规则的虚构值**，不对应任何真实个人，请勿用于欺诈、绕过实名验证或其他违法用途。

界面是**浅色 iOS 风格**：`#f2f2f7` 分组背景、白色圆角卡片、系统蓝 `#007aff`、毛玻璃导航栏、iOS 开关与 HUD 式 toast。预览：[docs/popup-preview.png](docs/popup-preview.png)。

---

## 安装

1. 打开 `chrome://extensions/`（Edge 为 `edge://extensions/`）。
2. 右上角开启 **开发者模式**。
3. 点 **加载已解压的扩展程序**，选择本目录 `E:\chrome插件\fake-char`。
4. 固定到工具栏，点击图标打开面板。

不需要构建、不需要联网、不需要任何第三方依赖，纯 MV3 + 原生 JS。

## 使用

| 操作 | 方式 |
| --- | --- |
| 选择国家 | 弹窗顶部下拉（默认美国） |
| 生成新身份 | 「生成身份」或右上角 ↻ |
| 填入当前页 | 「填入当前页」按钮 / `Alt+Shift+F` / 页面右键菜单 |
| 换身份再填 | `Alt+Shift+G` 或右键「换一个身份并填充」 |
| 只填空白字段 | 「仅填空白」按钮 |
| 先看命中情况 | 「高亮字段」——命中的输入框描边 2 秒 |
| 复用档案 | 「保存当前」→ 列表里点击载入 |
| 自动填充 | 底部开关：每次打开页面自动填空白字段 |
| 导出 | 「复制 JSON」把整份档案复制到剪贴板 |

字段行可以直接点击复制单个值；每行右侧 `⧉` 也是复制。

## 支持国家（16）

| 国家 | 证件（自动生成，带本地校验规则） |
| --- | --- |
| 🇺🇸 美国（主） | SSN、驾照、护照；50 州 + DC 共 102 城市，州码/区号/邮编前缀三者一致 |
| 🇬🇧 英国 | NINO、护照 |
| 🇨🇦 加拿大 | SIN（Luhn）、护照 |
| 🇦🇺 澳大利亚 | TFN（加权模 11）、护照 |
| 🇨🇳 中国 | 18 位身份证（GB 11643 / MOD 11-2，含地区码、生日、性别位）、护照 |
| 🇯🇵 日本 | MyNumber（总务省校验式）、驾照 |
| 🇰🇷 韩国 | 住民登录番号（含性别世纪位 + 校验位）、驾照 |
| 🇩🇪 德国 | Steuer-ID（ISO 7064 变体）、护照 |
| 🇫🇷 法国 | INSEE / NIR（key = 97 − n mod 97）、护照 |
| 🇮🇹 意大利 | Codice Fiscale（含城市码、月份表、女性日 +40、校验字母）、身份证 |
| 🇪🇸 西班牙 | DNI（模 23 字母表）、护照 |
| 🇳🇱 荷兰 | BSN（11-test）、护照 |
| 🇸🇪 瑞典 | Personnummer（Luhn） |
| 🇧🇷 巴西 | CPF（双校验位）、RG |
| 🇲🇽 墨西哥 | RFC（姓名首字母 + 生日 + homoclave） |
| 🇮🇳 印度 | Aadhaar（Verhoeff 校验）、PAN |

每个国家都有：本地化姓名（中日韩为「显示名 + 罗马字」，用于生成邮箱/用户名）、城市 + 州/省 + 邮编 + 区号、街道名、公司前后缀、职位、邮箱域名、电话/手机格式。

## 一致性设计

一份档案内部所有字段互相对得上，不是随机拼凑：

- **邮箱/用户名**由姓名的罗马字派生（`daisuke.sato@gmail.com`），CJK 名字也走罗马字。
- **城市 → 州/省 → 邮编 → 电话区号** 来自同一条城市记录；美国 ZIP 由城市前缀 + 2 位扩展，电话用保留虚构号段 `(212) 555-01xx`。
- **证件号编码生日与性别**：中国身份证第 7–14 位 = 生日、第 17 位奇偶 = 性别；法国 INSEE 前 5 位 = 性别 + 年月；意大利 CF 第 7–11 位 = 生日（女性日 +40）；韩国 RRN 生日 + 世纪性别位；瑞典 Personnummer 生日；墨西哥 RFC 生日。生成器与自检脚本会交叉验证这些关系。
- **银行卡**：Visa/Mastercard/Amex 随机，Luhn 校验位现算，有效期在未来 1–4 年。
- **地址**按国家习惯拼装（美国 `Street + Suffix`，日本 `都道府県 + 市区町村 + 丁目-番-号`，中国 `市 + 区 + 路 + 号 + 单元/室`，法国 `rue + 名` 等）。

## 字段覆盖

姓名（first / last / full / middle / title）、邮箱、电话、手机、用户名、网站、地址 1/2、城市、州省、邮编、国家、生日、年龄、性别（含 radio 与 select）、公司、职位、部门、证件号、卡号、有效期、CVV、密码、备注。

匹配信号按权重叠加：`autocomplete` 属性 > `type`（email/tel/url/password/date/number）> `name`/`id` > `placeholder` > `<label for>` / 包裹 label / `aria-label` / `aria-labelledby` / 相邻文本 > 弱信号 class。带负向词表避免误伤（邮箱字段不会被地址规则抢走、搜索框不会被填、卡号不会被电话抢走）。

写入方式：走原型链上的原生 `value` setter，再依次派发 `focus → input → change → blur`，因此 **React / Vue 受控组件、Element/Ant Design 表单**都能收到更新；`select` 按选项文本或 value 匹配（州名 "California" 与码 "CA" 都能命中），`radio` 按性别点选，`<input type=date>` 直接写 ISO，文本日期按 placeholder 推测 `MM/DD/YYYY`、`DD/MM/YYYY` 或 `YYYY-MM-DD`。

## 文件结构

```
fake-char/
├── manifest.json          MV3 清单（storage / contextMenus / activeTab，<all_urls>）
├── background.js          service worker：右键菜单、快捷键、档案复用
├── lib/
│   ├── util.js            随机/格式化/归一化/Luhn/密码/UUID
│   ├── data.js            16 国数据包（姓名、城市、区号、邮编、街道、公司、职位、域名）
│   ├── ids.js             各国证件号生成 + 校验算法
│   └── generator.js       合成一致性档案 buildProfile(code)
├── content/filler.js      字段识别 + 写入 + 事件派发 + 高亮 + 自动填充
├── popup/                 popup.html / popup.css（浅色 iOS 风格）/ popup.js
├── icons/                 icon16/48/128.png
├── docs/                  popup-preview.png（界面预览）
└── test/
    ├── selfcheck.js       Node 自检：640 份档案的字段与校验位
    └── test-demo.html     手动测试页（标准表单 / 中文表单 / 非常规 name / iframe / 事件日志）
```

## 测试

```powershell
# 语法检查
node --check background.js
node --check content/filler.js

# 生成 16 国 × 40 = 640 份档案，校验所有证件校验位、生日/性别一致性、卡号 Luhn
node test/selfcheck.js

# 可选：用 jsdom 在无浏览器环境下跑填充冒烟测试（需先 npm i jsdom）
#   $env:NODE_PATH = "<装有 jsdom 的 node_modules 路径>"
#   node test/domtest.js
```

手动测试：Chrome 打开 `test/test-demo.html`（或拖进浏览器），选国家生成身份后点「填入当前页」。第 4 节 iframe 用来验证 `all_frames`；底部日志会打印每个字段收到的 `input` / `change` 事件，可确认事件确实派发到了页面。演示页共 38 个可填字段，命中 37–38 个属正常（演示页的州下拉只有 8 个州，其他州的档案不会硬塞错误选项）。

## 已知限制

- 只能填 `<input>` / `<textarea>` / `<select>`；自定义 div 选择器（部分 Ant Design / MUI 组件）需站点自身把值同步到隐藏 input 才生效。
- `chrome://`、扩展页、PDF 阅读器等受限页面无法注入。
- 跨域 iframe 无法注入（浏览器的同源限制），同源 iframe 正常。
- 页面在填充之后才异步渲染的表单，需要再点一次「填入当前页」；自动填充只在页面加载后 0.9 秒触发一次。
- 不处理验证码、滑块、短信验证，也不绕过任何风控。

## 隐私

- 所有生成逻辑在本地执行，**不发任何网络请求**。
- 档案与设置只存在 `chrome.storage.local`（本机），最多保存 20 份档案。
- 无分析、无遥测、无远程代码。

## 免责声明

本项目用于软件测试、表单演示、隐私保护（在非必要实名场景避免提交真实信息）。使用者需自行确保使用场景合法合规；作者不对任何滥用行为负责。