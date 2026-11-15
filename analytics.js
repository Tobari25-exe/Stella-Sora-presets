/* Anonymous, best-effort event capture for the published GitHub Pages site. */
(() => {
  'use strict';
  const worker = String(window.STELLA_ANALYTICS_WORKER || '').replace(/\/$/, '');
  const publishHost = 'tobari25-exe.github.io';
  const publishPath = '/Stella-Sora-presets/';
  const active = location.protocol === 'https:' && location.hostname === publishHost &&
    (location.pathname === publishPath.slice(0, -1) || location.pathname.startsWith(publishPath)) &&
    /^https:\/\/[-a-z0-9.]+(?:\/[-a-z0-9]*)?$/i.test(worker);
  const allowedLanguages = new Set(['ja', 'en', 'zh-Hans', 'zh-Hant', 'ko']);

  function language() {
    try {
      const saved = localStorage.getItem('stella-language');
      return allowedLanguages.has(saved) ? saved : 'ja';
    } catch (_) { return 'ja'; }
  }
  function trafficSource() {
    try {
      const source = (new URLSearchParams(location.search).get('utm_source') || '').trim().toLowerCase();
      if (source) {
        if (['twitter', 'x', 't.co'].includes(source)) return 'x';
        if (source.includes('google')) return 'google';
        if (source.includes('youtube')) return 'youtube';
        if (source.includes('bing')) return 'bing';
        if (source.includes('yahoo')) return 'yahoo';
        return 'other';
      }
      if (!document.referrer) return 'direct_unknown';
      const host = new URL(document.referrer).hostname.toLowerCase();
      if (host === location.hostname) return 'internal';
      if (host === 'x.com' || host.endsWith('.x.com') || host === 't.co' || host === 'twitter.com' || host.endsWith('.twitter.com')) return 'x';
      if (host === 'google.com' || host.startsWith('google.') || host.includes('.google.')) return 'google';
      if (host === 'youtube.com' || host.endsWith('.youtube.com') || host === 'youtu.be') return 'youtube';
      if (host === 'bing.com' || host.endsWith('.bing.com')) return 'bing';
      if (host === 'yahoo.com' || host.endsWith('.yahoo.com') || host.startsWith('search.yahoo.')) return 'yahoo';
      return 'other';
    } catch (_) { return 'direct_unknown'; }
  }
  const source = trafficSource();

  function track(eventType, fields = {}) {
    if (!active || !window.crypto || typeof crypto.randomUUID !== 'function') return;
    if (!['page_view', 'copy_success', 'filter_select'].includes(eventType)) return;
    const event = {
      event_id: crypto.randomUUID(),
      event_type: eventType,
      source,
      language: allowedLanguages.has(fields.language) ? fields.language : language(),
    };
    if (eventType === 'copy_success') {
      event.build_id = fields.build_id;
      event.build_title = fields.build_title;
      event.preset_index = fields.preset_index;
      event.element = fields.element || null;
    } else if (eventType === 'filter_select') {
      event.element = fields.element;
      event.filter_action = fields.filter_action;
    }
    try {
      // Observability must never interfere with the UI or copying.
      void fetch(`${worker}/event`, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event), keepalive: true,
      }).catch(() => {});
    } catch (_) { /* analytics unavailable: ignore */ }
  }
  window.StellaAnalytics = Object.freeze({ track });
  // Independent from app data loading: even a data-load failure is a page view.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => track('page_view'), { once: true });
  } else {
    track('page_view');
  }
})();
