"use strict";

const ACADEMEFORGE_ANALYTICS_ENDPOINT = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/academeforge-analytics";
const APK_URL = "/IMG/af-v3.apk";
const ANALYTICS_CACHE_KEY = "academeforge_analytics_cache_v4";
const DEVICE_ID_KEY = "academeforge_device_id_v4";
const THEME_KEY = "academeforge_theme_v1";

const TEXT = {
  vision: "AcademeForge exists to help students learn beyond textbooks, marks, and memorization. The vision is to build a modern learning ecosystem where students develop practical skills, creativity, confidence, AI fluency, communication, and execution ability. The long-term goal is to reach 100,000+ students across India.",
  about: "AcademeForge began in January 2024 as a Telegram community for Class 10 students — a space to solve doubts, take quizzes, and support each other. Today it is a practical learning ecosystem combining text-based Explore courses with instant certificates, LearnSpace video programs, the AF ProGuide AI mentor, gamified AF Test Arena quizzes with XP and global leaderboards, a Learning Heatmap for streak tracking, an in-app student Community, and free companion apps Timezy, Zenopulsky, and Capacity. Built primarily for Indian students.",
  founder: "Devraj Kumar is the Founder of AcademeForge. He started the platform as a student — with direct understanding of how students struggle with outdated learning systems, lack of practical exposure, and confusion around modern digital skills. His quote: 'Students should not wait for opportunities. They should learn how to create them.' The long-term goal is to impact 100,000+ students with practical, AI-ready, beginner-friendly learning.",
  privacy: "AcademeForge may collect basic information needed for learning access, support, communication, analytics, security, and platform improvement. Student data is not sold to advertisers. Basic usage data and device identifiers may be used to improve the platform experience.",
  data: "Student data may be used for: account creation and login, batch allocation, class communication, assignment tracking, certificate verification, support tickets, safety monitoring, platform analytics, and continuous improvement of AcademeForge products.",
  community: "AcademeForge community spaces — including the in-app Community feed and Telegram group — should remain respectful, safe, and learning-focused. Spam, harassment, abusive language, impersonation, cheating, misinformation, and unauthorized promotions are not allowed. Posts support English and Hindi/Hinglish.",
  terms: "By using AcademeForge website, app, community, or learning services, users agree to follow platform rules, respect intellectual property, avoid misuse, and use official channels for support. Explore course certificates are issued on completion. LearnSpace program terms will be published with official batch announcements.",
  safety: "Students should use only official AcademeForge links. Avoid sharing OTPs or passwords with anyone. Report suspicious messages or impersonation immediately. The Bug Center inside the app can be used to report platform issues. Support response time is 24–48 hours on working days.",
  programs: "AcademeForge offers two types of learning: 1. Explore (text-based, instant certificate): Creative & Graphic Design Mastery, Video & Media Editing Mastery, AI Coding & Logic Foundation, Freelancing & Monetization Roadmap, AI & Prompt Engineering. 2. LearnSpace (video programs, fees TBA): Freelancing & Digital Monetization, AI & Prompt Engineering, Video Editing & Digital Media Production, Creative Graphic Design & Brand Visuals, AI Coding & Logic Foundation. LearnSpace fees and start dates are to be announced.",
  fees: "Explore text-based course fees are affordable — specific pricing is visible inside the AcademeForge app. LearnSpace video program fees are yet to be announced. They will be published once the batch structure and admission policies are finalized. Timezy and the free tier of AF ProGuide are completely free.",
  support: "WhatsApp and phone call support are not available right now. Students can: 1. Use the AF ProGuide AI Help Desk on this website (available 24/7) 2. Email: academeforge@gmail.com (response: 24–48 hours on working days) 3. Use the Bug Center inside the app to report technical issues 4. Join the Telegram group: https://t.me/+46ubatq-EV0wNjY1"
};

function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }
function byId(id) { return document.getElementById(id); }

function esc(value) { return String(value ?? "").replace(/[&<>"]/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m])); }
function paras(text) { return esc(text).split(/\n\s*\n/g).map((p) => `<p>${p.replace(/\n/g,"<br>")}</p>`).join(""); }
function safeNumber(value) { const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : 0; }
function formatCount(value) { return `${safeNumber(value).toLocaleString("en-IN")}+`; }

function setTheme(theme) {
  const t = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", t);
  const meta = qs('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "dark" ? "#050816" : "#f8fafc");
  try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
  const toggle = byId("themeToggle");
  if (!toggle) return;
  toggle.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
  const label = toggle.querySelector(".label");
  if (label) label.textContent = t === "dark" ? "Night On" : "Night";
}

function initTheme() {
  let saved = "light";
  try { saved = localStorage.getItem(THEME_KEY) || "light"; } catch(e) {}
  setTheme(saved);
  const toggle = byId("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
}

function setAILauncherVisible(isVisible) {
  const launcher = byId("aiLauncher");
  if (!launcher) return;
  launcher.classList.toggle("ai-launcher-hidden", !isVisible);
  launcher.setAttribute("aria-hidden", String(!isVisible));
  launcher.tabIndex = isVisible ? 0 : -1;
}

function toggleAIChat(forceOpen) {
  const panel = byId("aiChatPanel");
  const frame = byId("aiFrame");
  if (!panel) return;
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !panel.classList.contains("open");
  panel.classList.toggle("open", shouldOpen);
  panel.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
  setAILauncherVisible(!shouldOpen);
  if (shouldOpen && frame && !frame.src && frame.dataset.src) { frame.src = frame.dataset.src; }
}

function openModal(title, html) {
  const modal = byId("modal");
  const mtitle = byId("mtitle");
  const mtext = byId("mtext");
  if (!modal || !mtitle || !mtext) { alert(`${title}\n\n${String(html).replace(/<[^>]*>/g, "")}`); return; }
  mtitle.textContent = title;
  mtext.innerHTML = html;
  modal.classList.add("open");
  document.body.classList.add("lock");
}

function info(title, text) { openModal(title, paras(text)); }

function closeModal() {
  const modal = byId("modal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.classList.remove("lock");
}

function course(title, duration, fees, syllabus, facilities) {
  openModal(title, `
    <div class="grid">
      <div class="card" style="background:var(--surface2);border:1px solid var(--line);"><b>Duration</b><p>${esc(duration)}</p></div>
      <div class="card" style="background:var(--surface2);border:1px solid var(--line);"><b>Fees</b><p>${esc(fees)}</p></div>
      <div class="card" style="background:var(--surface2);border:1px solid var(--line);"><b>Learning Scope</b><p>${esc(syllabus)}</p></div>
      <div class="card" style="background:var(--surface2);border:1px solid var(--line);"><b>Format</b><p>${esc(facilities)}</p></div>
    </div>`);
}

function initModalBackdrop() {
  const modal = byId("modal");
  if (!modal) return;
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
}

function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) { id = crypto && crypto.randomUUID ? crypto.randomUUID() : `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; localStorage.setItem(DEVICE_ID_KEY, id); }
    return id;
  } catch(e) { return `device-${Date.now().toString(36)}`; }
}

function getAnalyticsCache() {
  try {
    const p = JSON.parse(localStorage.getItem(ANALYTICS_CACHE_KEY) || "{}");
    return { website_visits: safeNumber(p.website_visits), apk_downloads: safeNumber(p.apk_downloads), last_visit_tracked_at: safeNumber(p.last_visit_tracked_at) };
  } catch(e) { return { website_visits: 0, apk_downloads: 0, last_visit_tracked_at: 0 }; }
}

function setAnalyticsCache(cache) {
  try { localStorage.setItem(ANALYTICS_CACHE_KEY, JSON.stringify({ website_visits: safeNumber(cache.website_visits), apk_downloads: safeNumber(cache.apk_downloads), last_visit_tracked_at: safeNumber(cache.last_visit_tracked_at) })); } catch(e) {}
}

function updateCountersFromCache() {
  const cache = getAnalyticsCache();
  const v = byId("visitCount");
  const a = byId("apkCount");
  if (v) v.textContent = formatCount(cache.website_visits);
  if (a) a.textContent = formatCount(cache.apk_downloads);
}

function updateCountersFromServerData(data) {
  if (!data || typeof data !== "object") return;
  const cache = getAnalyticsCache();
  setAnalyticsCache({ website_visits: safeNumber(data.website_visits ?? data.visits ?? cache.website_visits), apk_downloads: safeNumber(data.apk_downloads ?? data.downloads ?? cache.apk_downloads), last_visit_tracked_at: cache.last_visit_tracked_at });
  updateCountersFromCache();
}

async function sendAnalytics(action, payload) {
  try {
    if (!navigator.onLine) return { success: false };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    const response = await fetch(ACADEMEFORGE_ANALYTICS_ENDPOINT, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, device_id: getDeviceId(), page: location.pathname, user_agent: navigator.userAgent, payload: payload || {} }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    let result = null;
    try { result = await response.json(); } catch(e) { result = { success: response.ok }; }
    if (!response.ok) return { success: false };
    if (result && result.success && result.data) updateCountersFromServerData(result.data);
    return result || { success: true };
  } catch(e) { return { success: false }; }
}

async function trackWebsiteVisit() {
  const cache = getAnalyticsCache();
  const now = Date.now();
  updateCountersFromCache();
  if (now - cache.last_visit_tracked_at < 1800000) { await sendAnalytics("counts", {}); return; }
  setAnalyticsCache({ ...cache, website_visits: cache.website_visits + 1, last_visit_tracked_at: now });
  updateCountersFromCache();
  await sendAnalytics("website_visit", {});
}

async function downloadApk() {
  const cache = getAnalyticsCache();
  setAnalyticsCache({ ...cache, apk_downloads: cache.apk_downloads + 1 });
  updateCountersFromCache();
  await sendAnalytics("apk_download", { download_source: "main_website" });
  try {
    const link = document.createElement("a");
    link.href = APK_URL; link.download = "af-v3.apk"; link.rel = "noopener noreferrer";
    document.body.appendChild(link); link.click(); link.remove();
  } catch(e) { window.location.href = APK_URL; }
}

function initMenu() {
  const menu = byId("menu");
  const openBtn = byId("openMenu");
  const closeBtn = byId("closeMenu");
  function setMenuState(isOpen) {
    if (!menu) return;
    menu.classList.toggle("open", isOpen);
    menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    document.body.classList.toggle("lock", isOpen);
  }
  if (openBtn) openBtn.addEventListener("click", () => setMenuState(true));
  if (closeBtn) closeBtn.addEventListener("click", () => setMenuState(false));
  qsa(".mlnk").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenuState(false); closeModal(); toggleAIChat(false); } });
}

function initFAQ() {
  qsa(".faq").forEach((item) => item.addEventListener("click", () => item.classList.toggle("open")));
}

function initReveal() {
  const items = qsa(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("show")); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => observer.observe(i));
}

function initOfflineBanner() {
  const banner = byId("offline");
  function sync() { if (banner) banner.style.display = navigator.onLine ? "none" : "block"; }
  window.addEventListener("online", sync);
  window.addEventListener("offline", sync);
  sync();
}

function initYear() {
  const y = byId("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme(); initMenu(); initFAQ(); initReveal(); initOfflineBanner(); initYear(); initModalBackdrop();
  updateCountersFromCache(); trackWebsiteVisit();
});
