"use strict";

const STATUS_FUNCTION_URL = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application-status";
const LAST_APP_KEY = "academeforge_join_team_last_application_v4";
const THEME_KEY = "academeforge_theme";

function byId(id) {
  return document.getElementById(id);
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function digits(value) {
  return String(value || "").replace(/\D/g, "");
}

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

// THEME LOGIC (Light, Dark, System)
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "system";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const theme = e.currentTarget.dataset.theme;
      applyTheme(theme);
    });
  });
  
  // Listen for system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem(THEME_KEY) === "system") {
      applyTheme("system");
    }
  });
}

function applyTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });

  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// STATUS LOGIC
function showAlert(type, text) {
  const alertEl = byId("alertMessage");
  if (!alertEl) return;
  alertEl.className = "alert show " + type;
  alertEl.textContent = text;
}

function clearAlert() {
  const alertEl = byId("alertMessage");
  if (!alertEl) return;
  alertEl.className = "alert";
  alertEl.textContent = "";
}

function renderStatus(status) {
  byId("emptyState").hidden = true;
  byId("loadedState").hidden = false;
  byId("statusPanel").classList.remove("celebrate");

  byId("candidateName").textContent = clean(status.full_name) || "Not provided";
  byId("appliedRole").textContent = clean(status.role) || "General Application";

  const statusIdEl = byId("statusIdDisplay");
  if (status.application_id) {
    statusIdEl.textContent = clean(status.application_id);
    statusIdEl.parentElement.hidden = false;
  } else {
    statusIdEl.parentElement.hidden = true;
  }

  const timeline = byId("timelineList");
  let html = "";
  let isHired = false;

  const steps = [
    { key: "received", title: "Application Received", failTitle: "Application Rejected", desc: "We received your application details.", failDesc: "Your application was not selected to move forward." },
    { key: "reviewed", title: "Under Review", failTitle: "Review Failed", desc: "Our team is reviewing your profile.", failDesc: "After review, we decided not to proceed." },
    { key: "interview", title: "Interview / Task", failTitle: "Interview / Task Unsuccessful", desc: "You have been invited for a task or interview.", failDesc: "The interview/task stage did not pass." },
    { key: "final", title: "Final Decision", failTitle: "Offer Declined", desc: "A final decision is being made.", failDesc: "We were unable to extend an offer." },
    { key: "hired", title: "Offer Extended", failTitle: "Offer Withdrawn", desc: "Congratulations! You have been selected.", failDesc: "The offer was withdrawn or rejected." }
  ];

  let hitPending = false;
  let hitFail = false;

  steps.forEach(function (step) {
    const val = status[step.key];
    const isDone = (val === true || val === "T" || val === "t" || val === "true" || val === "yes");
    const isFailed = (val === false || val === "F" || val === "f" || val === "false" || val === "no");

    let clz = "pending";
    let icon = "⏳";
    let stepTitle = step.title;
    let stepDesc = step.desc;

    if (hitFail) {
      clz = "pending";
      icon = "—";
    } else if (isFailed) {
      clz = "fail";
      icon = "✕";
      stepTitle = step.failTitle;
      stepDesc = step.failDesc;
      hitFail = true;
    } else if (isDone) {
      clz = "done";
      icon = "✓";
      if (step.key === "hired") {
        isHired = true;
      }
    } else {
      hitPending = true;
    }

    html += `
      <div class="step ${clz}">
        <div class="step-icon">${icon}</div>
        <div>
          <h3>${stepTitle}</h3>
          <p>${stepDesc}</p>
        </div>
      </div>
    `;
  });

  const title = byId("statusTitle");
  const text = byId("statusText");

  if (isHired) {
    byId("statusPanel").classList.add("celebrate");
    title.textContent = "Congratulations!";
    text.textContent = "You have been selected to join AcademeForge.";
  } else if (hitFail) {
    title.textContent = "Application Closed";
    text.textContent = "Unfortunately, we are not moving forward with this application.";
  } else {
    title.textContent = "Application Status";
    text.textContent = "Current application progress is shown below.";
  }

  timeline.innerHTML = html;
  
  localStorage.setItem(LAST_APP_KEY, JSON.stringify({
    email: status.email || "",
    mobile: status.contact_number || "",
    savedAt: new Date().toISOString()
  }));
}

async function fetchApplicationStatus(email, mobile) {
  const cleanEmail = clean(email).toLowerCase();
  const cleanMobile = digits(mobile);

  if (!cleanEmail && !cleanMobile) throw new Error("Enter Email or Mobile Number.");

  const params = new URLSearchParams();
  if (cleanEmail) params.set("email", cleanEmail);
  if (cleanMobile) params.set("mobile", cleanMobile);

  const response = await fetch(STATUS_FUNCTION_URL + "?" + params.toString(), {
    method: "GET",
    mode: "cors",
    cache: "no-store",
    credentials: "omit",
    headers: { "Accept": "application/json" }
  });

  const result = await response.json().catch(() => ({ success: false, error: "Invalid response." }));
  if (!response.ok || !(result.success || result.ok)) {
    throw new Error(result.error || result.message || "Could not load application status.");
  }
  return result.data || result.status || result.application || result;
}

function initStatusForm() {
  const form = byId("statusForm");
  const button = byId("checkStatusBtn");
  const clearButton = byId("clearBtn");

  if (!form) return;

  const last = safeJsonParse(localStorage.getItem(LAST_APP_KEY) || "{}", {});
  if (last.email) byId("statusEmail").value = last.email;
  if (last.mobile) byId("statusMobile").value = last.mobile;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearAlert();

    const email = clean(byId("statusEmail").value).toLowerCase();
    const mobile = digits(byId("statusMobile").value);

    if (!email && !mobile) return showAlert("error", "Enter Email or Mobile Number.");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showAlert("error", "Enter a valid email address.");

    button.disabled = true;
    button.textContent = "Checking...";

    try {
      const status = await fetchApplicationStatus(email, mobile);
      renderStatus(status);
      showAlert("success", "Application status loaded successfully.");
    } catch (error) {
      showAlert("error", error.message || "Could not load status.");
    } finally {
      button.disabled = false;
      button.textContent = "Check Status";
    }
  });

  clearButton.addEventListener("click", function () {
    byId("statusEmail").value = "";
    byId("statusMobile").value = "";
    byId("emptyState").hidden = false;
    byId("loadedState").hidden = true;
    byId("statusPanel").classList.remove("celebrate");
    clearAlert();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const year = byId("year");
  if (year) year.textContent = new Date().getFullYear();

  initTheme();
  initStatusForm();

  const params = new URLSearchParams(window.location.search);
  const email = clean(params.get("email")).toLowerCase();
  const mobile = digits(params.get("mobile"));

  if (email && byId("statusEmail")) byId("statusEmail").value = email;
  if (mobile && byId("statusMobile")) byId("statusMobile").value = mobile;
});
