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
  if (Array.isArray(status)) status = status[0];
  if (!status) throw new Error("No application data found.");

  byId("emptyState").hidden = true;
  byId("loadedState").hidden = false;
  byId("statusPanel").classList.remove("celebrate");

  byId("candidateName").textContent = clean(status.full_name) || "Not provided";
  byId("appliedRole").textContent = clean(status.selected_role) || "General Application";

  const statusIdEl = byId("statusIdDisplay");
  if (status.application_id || status.id) {
    statusIdEl.textContent = clean(status.application_id || status.id);
    statusIdEl.parentElement.hidden = false;
  } else {
    statusIdEl.parentElement.hidden = true;
  }

  const timeline = byId("timelineList");
  let html = "";
  
  function normalize(val) {
    if (val === true || val === "T" || val === "t" || val === "true" || val === "TRUE" || val == 1) return true;
    if (val === false || val === "F" || val === "f" || val === "false" || val === "FALSE" || val === 0 || val === "0") return false;
    return null;
  }

  const hrRead = normalize(status.hr_read);
  const hrApproved = normalize(status.hr_approved_resume);
  const triedToContact = normalize(status.tried_to_contact);
  const jobSecured = normalize(status.job_secured);
  const finalRejected = normalize(status.final_rejected);
  
  const reason = status.hr_rejection_reason || status.final_rejection_reason || status.rejection_reason || "No reason added by HR yet.";

  function step(state, icon, title, desc) {
    return `
      <div class="step ${state}">
        <div class="step-icon">${icon}</div>
        <div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      </div>
    `;
  }

  html += step("done", "✓", "Application Received", "Your application has been submitted successfully.");

  html += step(
    hrRead ? "done" : "pending", 
    hrRead ? "✓" : "⏳", 
    "HR Read", 
    hrRead ? "HR has read your application." : "Pending. HR has not marked this as read yet."
  );

  if (hrApproved === true) {
    html += step("done", "✓", "HR Approved Resume", "HR has approved your profile/resume for the next stage.");
  } else if (hrApproved === false) {
    html += step("fail", "✕", "Application Rejected by HR", "Application rejected by HR. Reason: " + reason);
  } else {
    html += step("pending", "⏳", "HR Approved Resume", "Pending HR approval.");
  }

  if (hrApproved !== false) {
    if (triedToContact === true) {
      html += step("done", "✓", "Contacted for Next Steps", "We have tried to contact you for the next steps/interview.");
    } else {
      html += step("pending", "⏳", "Contacted for Next Steps", "Pending contact for next steps.");
    }
  }

  let isHired = false;
  let isClosed = (hrApproved === false) || (finalRejected === true) || (jobSecured === false);

  if (hrApproved !== false) {
    if (jobSecured === true) {
      html += step("done", "✓", "Job Secured", "Congratulations! You have been selected.");
      isHired = true;
    } else if (jobSecured === false || finalRejected === true) {
      html += step("fail", "✕", "Final Decision", "Unfortunately, you were not selected for the role. Reason: " + reason);
    } else {
      html += step("pending", "⏳", "Final Decision", "Pending final decision.");
    }
  }

  const title = byId("statusTitle");
  const text = byId("statusText");

  if (isHired) {
    byId("statusPanel").classList.add("celebrate");
    title.textContent = "Congratulations!";
    text.textContent = "You have been selected to join AcademeForge.";
  } else if (isClosed) {
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
