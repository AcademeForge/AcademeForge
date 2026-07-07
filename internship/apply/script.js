"use strict";

const EDGE_FUNCTION_URL = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application";
const DRAFT_KEY = "academeforge_join_team_draft_v5";

const countryCodes = [
  ["+91", "India"], ["+977", "Nepal"], ["+880", "Bangladesh"],
  ["+975", "Bhutan"], ["+94", "Sri Lanka"], ["+960", "Maldives"],
  ["+92", "Pakistan"], ["+93", "Afghanistan"], ["+95", "Myanmar"],
  ["+1", "United States"], ["+44", "United Kingdom"], ["+971", "UAE"]
];

function byId(id) { return document.getElementById(id); }
function clean(val) { return String(val || "").trim(); }

/* ================= THEME ================= */
function initTheme() {
  const savedTheme = localStorage.getItem("academeforge_theme") || "system";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      applyTheme(e.currentTarget.dataset.theme);
    });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("academeforge_theme") === "system") {
      applyTheme("system");
    }
  });
}

function applyTheme(theme) {
  localStorage.setItem("academeforge_theme", theme);
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

/* ================= SETUP ================= */
function initCountryCodes() {
  ["contactCountryCode", "whatsappCountryCode"].forEach(id => {
    const select = byId(id);
    if (!select) return;
    select.innerHTML = '<option value="">Code</option>';
    countryCodes.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item[0];
      opt.textContent = `${item[0]} ${item[1]}`;
      select.appendChild(opt);
    });
    select.value = "+91";
  });
}

function showAlert(message, isError = true) {
  const alertEl = byId("alertMessage");
  if (!alertEl) return;
  alertEl.textContent = message;
  alertEl.style.display = "block";
  alertEl.style.padding = "1rem";
  alertEl.style.marginBottom = "1.5rem";
  alertEl.style.borderRadius = "8px";
  alertEl.style.backgroundColor = isError ? "#fee2e2" : "#dcfce3";
  alertEl.style.color = isError ? "#b91c1c" : "#166534";
  alertEl.style.border = `1px solid ${isError ? "#f87171" : "#4ade80"}`;
  
  if (!isError) {
    setTimeout(() => { alertEl.style.display = "none"; }, 5000);
  }
}

/* ================= DRAFTS ================= */
const formIds = [
  "fullName", "email", "alternateEmail", "contactCountryCode", "contactNumber",
  "whatsappCountryCode", "whatsappNumber", "dateOfBirth", "ageGroup", "gender",
  "countrySearch", "stateSearch", "districtSearch", "pincode", "postOffice",
  "fullAddress", "roleOfInterest", "weeklyAvailability", "educationLevel",
  "currentStatus", "experienceLevel", "skills", "portfolioUrl", "linkedinUrl",
  "githubUrl", "instagramUrl", "whyJoin", "previousWork"
];

const checkboxIds = [
  "certificateDeliveryRequired", "consentAccuracy", "consentContact"
];

function saveDraft() {
  const draft = {};
  formIds.forEach(id => {
    const el = byId(id);
    if (el) draft[id] = el.value;
  });
  checkboxIds.forEach(id => {
    const el = byId(id);
    if (el) draft[id] = el.checked;
  });
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function restoreDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    formIds.forEach(id => {
      const el = byId(id);
      if (el && draft[id]) el.value = draft[id];
    });
    checkboxIds.forEach(id => {
      const el = byId(id);
      if (el && draft[id] !== undefined) el.checked = draft[id];
    });
  } catch (e) {}
}

/* ================= SUBMIT ================= */
async function handleSubmit(e) {
  e.preventDefault();
  
  const btn = byId("submitBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";
  
  const payload = {};
  formIds.forEach(id => payload[id] = clean(byId(id)?.value));
  checkboxIds.forEach(id => payload[id] = byId(id)?.checked);
  
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error("Server rejected the application. Please try again.");
    
    showAlert("Application submitted successfully!", false);
    localStorage.removeItem(DRAFT_KEY);
    byId("applyForm").reset();
    
    // Redirect to status page after successful submit
    setTimeout(() => {
      window.location.href = "/internship/status/index.html";
    }, 2000);
    
  } catch (err) {
    showAlert(err.message || "Failed to submit application. Check your connection.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit Application";
  }
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCountryCodes();
  restoreDraft();
  
  const form = byId("applyForm");
  if (form) {
    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);
    form.addEventListener("submit", handleSubmit);
  }
});
