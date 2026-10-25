'use strict';

const $ = id => document.getElementById(id);
const ui = {
  list: $('build-list'), empty: $('empty-state'), emptyMessage: $('empty-message'),
  error: $('error-state'), count: $('count'), toast: $('toast'), search: $('search-input'), elementFilter: $('element-filter'),
};
const translations = {
  ja: {
    elementFilter: '属性で絞り込み', mainRole: '主力', supportRole: '支援',
    aboutLabel: 'サイトのご案内', socialLabel: 'SNSリンク',
    intro: '個人的に使っているプリセットコードを蓄積してるサイトです。\nあくまでも1ユーザが組んだだけのものなので、最適解という保証はありません。\nまぁそれなりに戦えるものにはなっていると思います。\n参考程度にお使いください。',
    codeNotice: 'プリセットコードは予告なく変更する可能性があります。',
    wantedNotice: '指名手配想定です。\n優先度の高い素質は安め編成との差分で見てください。',
    disclaimer: '※日本語以外はAI翻訳なので、間違ってるかもです。',
    contact: '何かご意見あればXまで。',
    heading: '編成・プリセット一覧', searchLabel: '編成名・キャラクター名・属性で検索',
    searchPlaceholder: '編成名・キャラ名・属性で検索', countUnit: '件',
    noBuilds: '編成はまだ登録されていません', noMatches: '一致する編成がありません',
    loadError: '編成データを読み込めませんでした', copy: 'コピー', copied: 'コピー済み',
    copySuccess: 'コピーしました', copyError: 'コピーできませんでした',
    preset: index => `プリセット${index + 1}`, copyLabel: label => `${label}をコピー`,
    pageTitle: '編成一覧 | ステラソラ',
  },
  en: {
    elementFilter: 'Filter by element', mainRole: 'Main', supportRole: 'Support',
    aboutLabel: 'About this site', socialLabel: 'Social media links',
    intro: 'This site is a collection of preset codes I use myself.\nThey\'re teams I\'ve put together as just one player, so I can\'t promise they\'re the best possible setups.\nStill, I think they hold up reasonably well in actual play.\nFeel free to use them as a reference.',
    codeNotice: 'Preset codes may change without prior notice.',
    wantedNotice: 'These builds are intended for Wanted missions.\nTo identify the higher-priority talents, compare each build with its budget version.',
    disclaimer: '※ Everything other than the Japanese text is AI-translated, so there may be mistakes.',
    contact: 'If you have any thoughts or suggestions, feel free to reach out on X.',
    heading: 'Teams & Presets', searchLabel: 'Search teams, characters or elements',
    searchPlaceholder: 'Search teams, characters or elements', countUnit: 'teams',
    noBuilds: 'No teams available yet', noMatches: 'No matching teams',
    loadError: 'Unable to load team data', copy: 'Copy', copied: 'Copied',
    copySuccess: 'Copied to clipboard', copyError: 'Unable to copy',
    preset: index => `Preset ${index + 1}`, copyLabel: label => `Copy ${label}`,
    pageTitle: 'Teams | Stella Sora',
  },
  'zh-Hans': {
    elementFilter: '按属性筛选', mainRole: '主力', supportRole: '支援',
    aboutLabel: '关于本站', socialLabel: '社交媒体',
    intro: '这个网站主要用来整理我自己平时使用的预设代码。\n这些队伍都只是我个人搭配的，不一定是最优解。\n不过我觉得实战表现还算不错。\n大家可以拿来参考一下。',
    codeNotice: '预设代码可能随时调整，恕不另行通知。',
    wantedNotice: '这些编队以通缉任务为前提。\n想了解哪些天赋优先级更高，请对照低成本编队，查看两者的差异。',
    disclaimer: '※ 除日语外，其他语言的内容均由 AI 翻译，可能会有不准确的地方。',
    contact: '如果有任何意见或建议，欢迎来 X 上找我。',
    heading: '队伍与预设代码', searchLabel: '搜索队伍、角色或属性',
    searchPlaceholder: '搜索队伍、角色或属性', countUnit: '组',
    noBuilds: '尚未添加队伍', noMatches: '没有符合条件的队伍',
    loadError: '无法加载队伍数据', copy: '复制', copied: '已复制',
    copySuccess: '已复制到剪贴板', copyError: '复制失败',
    preset: index => `预设${index + 1}`, copyLabel: label => `复制${label}`,
    pageTitle: '队伍列表 | 星塔旅人',
  },
  'zh-Hant': {
    elementFilter: '依屬性篩選', mainRole: '主力', supportRole: '支援',
    aboutLabel: '關於本站', socialLabel: '社群連結',
    intro: '這個網站主要用來整理我自己平常使用的預設代碼。\n這些隊伍都只是我個人搭配的，不一定是最佳配置。\n不過我覺得實戰表現還算不錯。\n歡迎大家作為參考。',
    codeNotice: '預設代碼可能隨時調整，恕不另行通知。',
    wantedNotice: '這些編隊以通緝任務為前提。\n想了解哪些天賦的優先級較高，請對照低成本編隊，查看兩者的差異。',
    disclaimer: '※ 除日文外，其他語言的內容均由 AI 翻譯，可能會有不準確的地方。',
    contact: '如果有任何意見或建議，歡迎到 X 上找我。',
    heading: '隊伍與預設代碼', searchLabel: '搜尋隊伍、角色或屬性',
    searchPlaceholder: '搜尋隊伍、角色或屬性', countUnit: '組',
    noBuilds: '尚未新增隊伍', noMatches: '找不到符合的隊伍',
    loadError: '無法載入隊伍資料', copy: '複製', copied: '已複製',
    copySuccess: '已複製到剪貼簿', copyError: '複製失敗',
    preset: index => `預設${index + 1}`, copyLabel: label => `複製${label}`,
    pageTitle: '隊伍列表 | 星塔旅人',
  },
  ko: {
    elementFilter: '속성별 필터', mainRole: '주력', supportRole: '지원',
    aboutLabel: '사이트 안내', socialLabel: '소셜 미디어',
    intro: '제가 평소에 사용하는 프리셋 코드를 모아 둔 사이트입니다.\n어디까지나 한 명의 유저가 직접 짠 조합이라 최적의 편성이라고 장담할 수는 없습니다.\n그래도 실전에서 어느 정도는 충분히 쓸 만하다고 생각합니다.\n가볍게 참고해 주세요.',
    codeNotice: '프리셋 코드는 사전 안내 없이 변경될 수 있습니다.',
    wantedNotice: '지명수배 콘텐츠를 기준으로 한 편성입니다.\n우선순위가 높은 소질은 저비용 편성과의 차이를 참고해 주세요.',
    disclaimer: '※ 일본어를 제외한 내용은 AI로 번역했기 때문에 잘못된 부분이 있을 수 있습니다.',
    contact: '의견이나 제안이 있으시면 X로 편하게 연락해 주세요.',
    heading: '파티 및 프리셋 목록', searchLabel: '파티 이름, 캐릭터 또는 속성 검색',
    searchPlaceholder: '파티 / 캐릭터 / 속성 검색', countUnit: '개',
    noBuilds: '등록된 파티가 없습니다', noMatches: '검색 결과가 없습니다',
    loadError: '파티 데이터를 불러오지 못했습니다', copy: '복사', copied: '복사됨',
    copySuccess: '클립보드에 복사했습니다', copyError: '복사하지 못했습니다',
    preset: index => `프리셋 ${index + 1}`, copyLabel: label => `${label} 복사`,
    pageTitle: '파티 목록 | 스텔라 소라',
  },
};
const state = { builds: [], characters: new Map(), elements: new Map(), notices: null, search: '', element: '', lang: 'ja' };
const noticeKeys = new Set(['intro', 'codeNotice', 'wantedNotice', 'disclaimer', 'contact']);
let toastTimer;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function normalize(value) {
  return String(value || '').normalize('NFKC').toLowerCase()
    .replace(/[ァ-ヶ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
}
function t(key) {
  const custom = noticeKeys.has(key) ? state.notices?.[state.lang]?.[key] : undefined;
  return typeof custom === 'string' ? custom : translations[state.lang][key];
}
const characterNameByLanguage = { en: 'enName', 'zh-Hans': 'zhHansName', 'zh-Hant': 'zhHantName', ko: 'koName' };
const characterNameFields = ['enName', 'zhHansName', 'zhHantName', 'koName'];
const elementLanguages = { ja: 'ja', en: 'en', 'zh-Hans': 'zhHans', 'zh-Hant': 'zhHant', ko: 'ko' };
function nameForCharacter(name) {
  const field = characterNameByLanguage[state.lang];
  return (field && state.characters.get(name)?.[field]) || name;
}
function notice(message) {
  clearTimeout(toastTimer);
  ui.toast.textContent = message;
  ui.toast.classList.add('visible');
  toastTimer = setTimeout(() => ui.toast.classList.remove('visible'), 2200);
}
function character(name, index) {
  const characterData = state.characters.get(name);
  const displayName = nameForCharacter(name);
  const figure = element('figure', 'character');
  const frame = element('div', 'portrait');
  const fallback = element('div', 'portrait-fallback', displayName.slice(0, 2));
  const image = document.createElement('img');
  image.alt = displayName;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('load', () => { frame.classList.add('is-loaded'); fallback.hidden = true; });
  image.addEventListener('error', () => { frame.classList.remove('is-loaded'); fallback.hidden = false; });
  image.src = `./${characterData?.image || `images/${encodeURIComponent(name)}.webp`}`;
  frame.append(fallback, image);
  figure.append(element('span', 'character-role', index === 0 ? t('mainRole') : t('supportRole')), frame, element('figcaption', '', displayName));
  return figure;
}
async function copy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.append(textarea);
  try {
    textarea.select();
    if (!document.execCommand('copy')) throw new Error('copy failed');
  } finally { textarea.remove(); }
}
function presetItem(preset, index) {
  const item = element('div', 'preset');
  const label = preset.label || t('preset')(index);
  const code = element('code', 'preset-code', preset.code);
  code.title = preset.code;
  const button = element('button', 'copy-button', t('copy'));
  button.type = 'button';
  button.setAttribute('aria-label', t('copyLabel')(label));
  button.addEventListener('click', async () => {
    try {
      await copy(preset.code);
      button.textContent = t('copied');
      button.classList.add('is-copied');
      notice(t('copySuccess'));
      setTimeout(() => {
        button.textContent = t('copy');
        button.classList.remove('is-copied');
      }, 1500);
    } catch { notice(t('copyError')); }
  });
  item.append(element('span', 'preset-label', label), code, button);
  return item;
}
function buildCard(build) {
  const card = element('article', 'build-card');
  if (state.elements.has(build.element)) card.dataset.element = build.element;
  const characters = element('div', 'characters');
  const presets = element('div', 'presets');
  build.characters.forEach((name, index) => characters.append(character(name, index)));
  build.presets.forEach((preset, index) => presets.append(presetItem(preset, index)));
  const heading = element('div', 'build-title-row');
  heading.append(element('h2', 'build-title', build.title));
  const tag = state.elements.get(build.element);
  if (tag) {
    const badge = element('span', 'element-tag', tag[elementLanguages[state.lang]]);
    badge.dataset.element = build.element;
    heading.append(badge);
  }
  card.append(heading);
  if (typeof build.comment === 'string' && build.comment.trim()) {
    card.append(element('p', 'build-comment', build.comment.trim()));
  }
  card.append(characters, presets);
  return card;
}
function validBuild(build) {
  return build && typeof build.title === 'string' &&
    (build.comment === undefined || (typeof build.comment === 'string' && build.comment.length <= 500)) &&
    (!build.element || state.elements.has(build.element)) &&
    Array.isArray(build.characters) && build.characters.length === 3 &&
    build.characters.every(name => typeof name === 'string') &&
    Array.isArray(build.presets) && build.presets.length === 2 &&
    build.presets.every(p => p && typeof p.label === 'string' && typeof p.code === 'string');
}
function searchable(build) {
  return [
    build.title,
    ...Object.values(state.elements.get(build.element) || {}).filter(value => typeof value === 'string'),
    ...build.characters.flatMap(name => {
      const c = state.characters.get(name);
      return [name, ...characterNameFields.map(field => c?.[field]), ...(c?.jaSearchAliases || [])];
    })
  ];
}
function render() {
  const terms = normalize(state.search).split(/\s+/).filter(Boolean);
  const matches = state.builds.filter(build => {
    if (state.element && build.element !== state.element) return false;
    if (!terms.length) return true;
    const values = searchable(build).map(normalize);
    return terms.every(term => values.some(value => value.includes(term)));
  });
  ui.list.replaceChildren(...matches.map(buildCard));
  ui.count.textContent = matches.length;
  ui.empty.hidden = matches.length !== 0;
  ui.emptyMessage.textContent = state.builds.length ? t('noMatches') : t('noBuilds');
}
function syncElementFilter() {
  for (const button of ui.elementFilter.querySelectorAll('button')) {
    const selected = button.dataset.element === state.element;
    button.classList.toggle('is-selected', selected);
    button.classList.toggle('is-muted', Boolean(state.element) && !selected);
    button.setAttribute('aria-pressed', String(selected));
  }
}
function updateElementFilter() {
  const buttons = [...state.elements.values()].map(entry => {
    const button = element('button', 'element-filter-button', entry[elementLanguages[state.lang]] || entry.ja);
    button.type = 'button';
    button.dataset.element = entry.id;
    button.addEventListener('click', () => {
      state.element = state.element === entry.id ? '' : entry.id;
      syncElementFilter();
      render();
    });
    return button;
  });
  ui.elementFilter.replaceChildren(...buttons);
  ui.elementFilter.setAttribute('aria-label', t('elementFilter'));
  syncElementFilter();
}
function setLanguage(lang) {
  if (!translations[lang]) return;
  state.lang = lang;
  document.documentElement.lang = lang;
  document.title = t('pageTitle');
  for (const node of document.querySelectorAll('[data-i18n]')) {
    const key = node.dataset.i18n;
    node.textContent = t(key);
    if (noticeKeys.has(key)) node.hidden = !node.textContent;
  }
  for (const node of document.querySelectorAll('[data-i18n-aria]')) {
    node.setAttribute('aria-label', t(node.dataset.i18nAria));
  }
  ui.search.placeholder = t('searchPlaceholder');
  updateElementFilter();
  for (const button of document.querySelectorAll('[data-lang]')) {
    const selected = button.dataset.lang === lang;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  try { localStorage.setItem('stella-language', lang); } catch { /* storage may be unavailable */ }
  render();
}
ui.search.addEventListener('input', event => { state.search = event.target.value; render(); });
for (const button of document.querySelectorAll('[data-lang]')) {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
}
async function loadJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}
async function initialize() {
  try {
    const [builds, characters, elements, notices] = await Promise.all([
      loadJson('./data/builds.json'), loadJson('./data/characters.json'), loadJson('./data/elements.json'),
      loadJson('./data/site-notices.json').catch(error => {
        console.warn('Using built-in site notices:', error);
        return null;
      }),
    ]);
    if (![builds, characters, elements].every(Array.isArray)) throw new Error('Invalid data');
    state.elements = new Map(elements.map(item => [item.id, item]));
    state.notices = notices && typeof notices === 'object' && !Array.isArray(notices) ? notices : null;
    state.builds = builds.filter(validBuild);
    state.characters = new Map(characters.filter(c => c && typeof c.name === 'string').map(c => [c.name, c]));
    let preferred = 'ja';
    try { preferred = localStorage.getItem('stella-language') || 'ja'; } catch { /* storage may be unavailable */ }
    setLanguage(translations[preferred] ? preferred : 'ja');
  } catch (error) {
    console.error('Failed to load team data', error);
    ui.list.replaceChildren();
    ui.empty.hidden = true;
    ui.error.hidden = false;
  }
}
initialize();
