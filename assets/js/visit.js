"use strict";

/* ── Constants ── */
const SUPABASE_URL  = "https://afooyyydhlwngzssgqih.supabase.co";
const ANALYTICS_EP  = `${SUPABASE_URL}/functions/v1/academeforge-analytics`;
const ANALYTICS_KEY = "academeforge_analytics_cache_v4";
const DEVICE_ID_KEY = "academeforge_device_id_v4";
const GEO_KEY        = "academeforge_geo_cache_v1";
const GEO_API        = "https://ipapi.co/json/";
const GEO_TTL_MS     = 24 * 60 * 60 * 1000; // 24h — re-check location once a day

/* ── Number helpers ── */
function safeNumber(v)  { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : 0; }
function formatCount(v) { return `${safeNumber(v).toLocaleString("en-IN")}+`; }
function byId(id)       { return document.getElementById(id); }


function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = crypto?.randomUUID?.() ?? `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch(e) { return `device-${Date.now().toString(36)}`; }
}


async function getGeoLocation() {
  try {
    const cached = JSON.parse(localStorage.getItem(GEO_KEY) || "null");
    if (cached && Date.now() - cached.ts < GEO_TTL_MS) return cached.data;
  } catch(e) {}

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(GEO_API, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error("geo lookup failed");
    const json = await res.json();
    const data = {
      country: json.country_name || null,
      region:  json.region       || null,
      city:    json.city         || null
    };
    try { localStorage.setItem(GEO_KEY, JSON.stringify({ ts: Date.now(), data })); } catch(e) {}
    return data;
  } catch(e) {
    return { country: null, region: null, city: null };
  }
}

/* ── Analytics cache ── */
function getAnalyticsCache() {
  try {
    const p = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || "{}");
    return {
      website_visits:        safeNumber(p.website_visits),
      last_visit_tracked_at: safeNumber(p.last_visit_tracked_at)
    };
  } catch(e) { return { website_visits: 0, last_visit_tracked_at: 0 }; }
}

function setAnalyticsCache(cache) {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify({
      website_visits:        safeNumber(cache.website_visits),
      last_visit_tracked_at: safeNumber(cache.last_visit_tracked_at)
    }));
  } catch(e) {}
}

function updateCountersFromCache() {
  const cache = getAnalyticsCache();
  const v = byId("visitCount");
  if (v) v.textContent = formatCount(cache.website_visits);
}

function updateCountersFromServerData(data) {
  if (!data || typeof data !== "object") return;
  const cache = getAnalyticsCache();
  setAnalyticsCache({
    website_visits:        safeNumber(data.website_visits ?? data.visits ?? cache.website_visits),
    last_visit_tracked_at: cache.last_visit_tracked_at
  });
  updateCountersFromCache();
}

async function sendAnalytics(action, payload) {
  try {
    if (!navigator.onLine) return { success: false };
    const geo = await getGeoLocation();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    const response = await fetch(ANALYTICS_EP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        device_id:  getDeviceId(),
        page:       location.pathname,
        user_agent: navigator.userAgent,
        country:    geo.country,
        region:     geo.region,
        city:       geo.city,
        payload:    payload || {}
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    let result = null;
    try { result = await response.json(); } catch(e) { result = { success: response.ok }; }
    if (!response.ok) return { success: false };
    if (result?.success && result?.data) updateCountersFromServerData(result.data);
    return result || { success: true };
  } catch(e) { return { success: false }; }
}

/* ── Website visit tracking ──
   Counts a new visit if the device hasn't been tracked in the last
   30 minutes; otherwise just refreshes counts from the server. */
async function trackWebsiteVisit() {
  const cache = getAnalyticsCache();
  const now   = Date.now();
  updateCountersFromCache();
  if (now - cache.last_visit_tracked_at < 1_800_000) { await sendAnalytics("counts", {}); return; }
  setAnalyticsCache({ ...cache, website_visits: cache.website_visits + 1, last_visit_tracked_at: now });
  updateCountersFromCache();
  await sendAnalytics("website_visit", {});
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  updateCountersFromCache();
  trackWebsiteVisit();
});
