/* FakeChar · 后台服务：右键菜单 / 快捷键 / 档案复用 */
importScripts('lib/util.js', 'lib/data.js', 'lib/ids.js', 'lib/generator.js');

const MENUS = [
  { id: 'fakechar-fill', title: 'FakeChar：填充当前页面' },
  { id: 'fakechar-regen', title: 'FakeChar：换一个身份并填充' },
  { id: 'fakechar-highlight', title: 'FakeChar：高亮可填字段' }
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    for (const m of MENUS) {
      chrome.contextMenus.create({ id: m.id, title: m.title, contexts: ['page', 'editable', 'frame'] });
    }
  });
});

async function getProfile(regen) {
  const data = await chrome.storage.local.get(['fakechar.profile', 'fakechar.settings']);
  let profile = data['fakechar.profile'];
  const settings = data['fakechar.settings'] || {};
  if (!profile || regen) {
    profile = FakeChar.buildProfile(settings.country || 'US');
    await chrome.storage.local.set({ 'fakechar.profile': profile });
  }
  return profile;
}

async function sendToTab(tabId, msg) {
  try {
    return await chrome.tabs.sendMessage(tabId, msg);
  } catch (e) {
    return null;
  }
}

function flashBadge(text, isErr) {
  try {
    chrome.action.setBadgeBackgroundColor({ color: isErr ? '#b91c1c' : '#4f46e5' });
    chrome.action.setBadgeText({ text });
    setTimeout(() => chrome.action.setBadgeText({ text: '' }), 2200);
  } catch (e) { /* ignore */ }
}

async function fillActiveTab(regen, options) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;
  const profile = await getProfile(regen);
  const res = await sendToTab(tab.id, { type: 'FAKECHAR_FILL', profile, options });
  if (res && res.ok) flashBadge(String(res.filled));
  else flashBadge('×', true);
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) return;
  if (info.menuItemId === 'fakechar-highlight') {
    const profile = await getProfile(false);
    const res = await sendToTab(tab.id, { type: 'FAKECHAR_HIGHLIGHT', profile });
    if (res && res.ok) flashBadge(String(res.matched));
    return;
  }
  const regen = info.menuItemId === 'fakechar-regen';
  const profile = await getProfile(regen);
  const res = await sendToTab(tab.id, { type: 'FAKECHAR_FILL', profile, options: { highlight: true } });
  if (res && res.ok) flashBadge(String(res.filled));
  else flashBadge('×', true);
});

chrome.commands.onCommand.addListener(async (cmd) => {
  if (cmd === 'fill-page') await fillActiveTab(false, { highlight: true });
  else if (cmd === 'regen-fill') await fillActiveTab(true, { highlight: true });
});