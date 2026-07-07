
    "use strict";

    /* =========================================================
       CONFIG
       ========================================================= */

    const EDGE_FUNCTION_URL = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application";
    const STATUS_FUNCTION_URL = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application-status";

    const DRAFT_KEY = "academeforge_join_team_draft_v4";
    const LAST_APP_KEY = "academeforge_join_team_last_application_v4";

    /* =========================================================
       DATA
       ========================================================= */

    const countryCodes = [
      ["", "No Code"],
      ["+91", "India"],
      ["+977", "Nepal"],
      ["+880", "Bangladesh"],
      ["+975", "Bhutan"],
      ["+94", "Sri Lanka"],
      ["+960", "Maldives"],
      ["+92", "Pakistan"],
      ["+93", "Afghanistan"],
      ["+95", "Myanmar"],
      ["+1", "United States"],
      ["+44", "United Kingdom"],
      ["+971", "UAE"]
    ];

    const locationData = {
      India: {
        Bihar: [
          "Araria",
          "Arwal",
          "Aurangabad",
          "Banka",
          "Begusarai",
          "Bhagalpur",
          "Bhojpur",
          "Buxar",
          "Darbhanga",
          "East Champaran",
          "Gaya",
          "Gopalganj",
          "Jamui",
          "Jehanabad",
          "Kaimur",
          "Katihar",
          "Khagaria",
          "Kishanganj",
          "Lakhisarai",
          "Madhepura",
          "Madhubani",
          "Munger",
          "Muzaffarpur",
          "Nalanda",
          "Nawada",
          "Patna",
          "Purnea",
          "Rohtas",
          "Saharsa",
          "Samastipur",
          "Saran",
          "Sheikhpura",
          "Sheohar",
          "Sitamarhi",
          "Siwan",
          "Supaul",
          "Vaishali",
          "West Champaran"
        ],
        Delhi: [
          "Central Delhi",
          "East Delhi",
          "New Delhi",
          "North Delhi",
          "South Delhi",
          "West Delhi"
        ],
        "Uttar Pradesh": [
          "Agra",
          "Aligarh",
          "Bareilly",
          "Ghaziabad",
          "Gorakhpur",
          "Kanpur Nagar",
          "Lucknow",
          "Meerut",
          "Varanasi"
        ],
        "West Bengal": [
          "Kolkata",
          "Darjeeling",
          "Howrah",
          "Hooghly",
          "Malda",
          "Murshidabad",
          "Nadia"
        ],
        Maharashtra: [
          "Mumbai City",
          "Mumbai Suburban",
          "Nagpur",
          "Nashik",
          "Pune",
          "Thane"
        ],
        Karnataka: [
          "Bengaluru Urban",
          "Bengaluru Rural",
          "Mysuru"
        ],
        Gujarat: [
          "Ahmedabad",
          "Surat",
          "Vadodara",
          "Rajkot"
        ],
        Rajasthan: [
          "Jaipur",
          "Jodhpur",
          "Kota",
          "Udaipur"
        ],
        "Tamil Nadu": [
          "Chennai",
          "Coimbatore",
          "Madurai",
          "Salem"
        ],
        Telangana: [
          "Hyderabad",
          "Warangal"
        ],
        Kerala: [
          "Ernakulam",
          "Kozhikode",
          "Thiruvananthapuram"
        ],
        Punjab: [
          "Amritsar",
          "Jalandhar",
          "Ludhiana"
        ],
        Haryana: [
          "Gurugram",
          "Faridabad",
          "Panipat"
        ],
        Jharkhand: [
          "Ranchi",
          "Dhanbad",
          "Jamshedpur"
        ],
        Odisha: [
          "Bhubaneswar",
          "Cuttack",
          "Puri"
        ]
      },
      Nepal: {
        Bagmati: [
          "Kathmandu",
          "Lalitpur",
          "Bhaktapur"
        ]
      },
      Bangladesh: {
        Dhaka: [
          "Dhaka",
          "Gazipur"
        ],
        Chattogram: [
          "Chattogram",
          "Cox's Bazar"
        ]
      },
      Bhutan: {
        Thimphu: [
          "Thimphu"
        ],
        Paro: [
          "Paro"
        ]
      },
      "Sri Lanka": {
        Western: [
          "Colombo",
          "Gampaha"
        ]
      },
      Maldives: {
        Male: [
          "Male"
        ]
      },
      Pakistan: {
        Punjab: [
          "Lahore",
          "Faisalabad"
        ],
        Sindh: [
          "Karachi",
          "Hyderabad"
        ]
      },
      Afghanistan: {
        Kabul: [
          "Kabul"
        ],
        Herat: [
          "Herat"
        ]
      },
      Myanmar: {
        Yangon: [
          "Yangon"
        ],
        Mandalay: [
          "Mandalay"
        ]
      }
    };

    const roles = [
      ["Campus Ambassador", "Promote AcademeForge."],
      ["Content Writer", "Write posts and guides."],
      ["Video Editor", "Edit reels and videos."],
      ["Graphic Designer", "Create posters and banners."],
      ["Frontend Developer", "Build UI pages."],
      ["Backend Developer", "Build APIs and DB logic."],
      ["Full Stack Developer", "Build full features."],
      ["UI/UX Designer", "Design app screens."],
      ["Social Media Manager", "Manage growth campaigns."],
      ["Community Manager", "Handle groups."],
      ["Doubt Support", "Help students."],
      ["Data Entry Operator", "Manage records."],
      ["Research Assistant", "Collect research."],
      ["Marketing Intern", "Outreach campaigns."],
      ["Sales Support", "Handle leads."],
      ["HR Intern", "Hiring support."],
      ["Teacher / Mentor", "Teach remotely."],
      ["AI Tools Operator", "AI workflows."],
      ["Quality Checker", "Review quality."],
      ["Operations Assistant", "Daily operations."]
    ];

    const workTypes = [
      ["Unpaid Internship", "Learning-focused unpaid internship."],
      ["Paid Internship", "Paid internship after approval."],
      ["Part Time", "Limited weekly hours."],
      ["Full Time", "Dedicated remote role."],
      ["Volunteer", "Contribution-based role."],
      ["Freelance", "Task/project work."],
      ["Campus Role", "Representative role."],
      ["Training + Internship", "Training then evaluation."],
      ["Performance Based", "Reward by output."],
      ["Trial Role", "Short evaluation role."]
    ];

    const workTimeTypes = [
      ["Flexible", "Anytime with deadlines."],
      ["Morning", "Morning availability."],
      ["Afternoon", "Afternoon availability."],
      ["Evening", "Evening availability."],
      ["Weekend", "Weekend availability."],
      ["Fixed Schedule", "Fixed time."],
      ["After School/College", "After classes."],
      ["Night Shift", "Night availability."]
    ];

    /* =========================================================
       HELPERS
       ========================================================= */

    function byId(id) {
      return document.getElementById(id);
    }

    function clean(value) {
      return String(value || "").trim().replace(/\s+/g, " ");
    }

    function cleanLong(value) {
      return String(value || "").trim().replace(/\r\n/g, "\n").replace(/\n{4,}/g, "\n\n\n");
    }

    function digits(value) {
      return String(value || "").replace(/\D/g, "");
    }

    function showAlert(type, message) {
      const alert = byId("formAlert");
      alert.className = "alert show " + type;
      alert.textContent = message;
    }

    function clearAlert() {
      const alert = byId("formAlert");
      alert.className = "alert";
      alert.textContent = "";
    }

    function safeJsonParse(value, fallback) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return fallback;
      }
    }

    /* =========================================================
       THEME
       ========================================================= */

    function getPreferredTheme() {
      const saved = localStorage.getItem("academeforge_theme");
      if (saved === "light" || saved === "dark") return saved;

      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }

      return "light";
    }

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      byId("themeToggle").textContent = theme === "dark" ? "Light" : "Night";
      localStorage.setItem("academeforge_theme", theme);
    }

    function initTheme() {
      applyTheme(getPreferredTheme());

      byId("themeToggle").addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }

    /* =========================================================
       COUNTRY CODE
       ========================================================= */

    function initCountryCodes() {
      ["contactCountryCode", "whatsappCountryCode"].forEach(function (id) {
        const select = byId(id);
        select.innerHTML = "";

        countryCodes.forEach(function (item) {
          const code = item[0];
          const name = item[1];

          const option = document.createElement("option");
          option.value = code;
          option.textContent = code ? code + " " + name : "No country code";
          select.appendChild(option);
        });

        select.value = "+91";
      });
    }

    /* =========================================================
       CHOICE GRIDS
       ========================================================= */

    function createChoiceGrid(containerId, hiddenInputId, items) {
      const container = byId(containerId);
      const hiddenInput = byId(hiddenInputId);

      container.innerHTML = "";

      items.forEach(function (item) {
        const title = item[0];
        const description = item[1];

        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice";
        button.dataset.value = title;

        const titleSpan = document.createElement("span");
        titleSpan.textContent = title;

        const small = document.createElement("small");
        small.textContent = description;

        button.appendChild(titleSpan);
        button.appendChild(small);

        button.addEventListener("click", function () {
          hiddenInput.value = title;
          syncChoices();
          saveDraft();
        });

        container.appendChild(button);
      });
    }

    function syncChoices() {
      [
        ["roleGrid", "selectedRole"],
        ["workTypeGrid", "workType"],
        ["workTimeTypeGrid", "workTimeType"]
      ].forEach(function (pair) {
        const containerId = pair[0];
        const hiddenInputId = pair[1];

        const value = byId(hiddenInputId).value;
        const buttons = byId(containerId).querySelectorAll(".choice");

        buttons.forEach(function (button) {
          button.classList.toggle("selected", button.dataset.value === value);
        });
      });
    }

    /* =========================================================
       LOCATION SEARCH
       ========================================================= */

    function getCountries() {
      return Object.keys(locationData);
    }

    function getStates(country) {
      return Object.keys(locationData[country] || {});
    }

    function getDistricts(country, state) {
      return (locationData[country] || {})[state] || [];
    }

    function filterList(options, query) {
      const q = clean(query).toLowerCase();
      if (!q) return options;
      return options.filter(function (option) {
        return option.toLowerCase().includes(q);
      });
    }

    function renderSearchList(listId, options, onSelect) {
      const list = byId(listId);
      list.innerHTML = "";

      options.slice(0, 90).forEach(function (optionText) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "search-option";
        button.textContent = optionText;

        button.addEventListener("click", function () {
          onSelect(optionText);
          list.classList.remove("open");
          saveDraft();
        });

        list.appendChild(button);
      });

      list.classList.add("open");
    }

    function closeSearchLists() {
      document.querySelectorAll(".search-list").forEach(function (list) {
        list.classList.remove("open");
      });
    }

    function initLocationSearch() {
      const countrySearch = byId("countrySearch");
      const stateSearch = byId("stateSearch");
      const districtSearch = byId("districtSearch");

      countrySearch.addEventListener("focus", function () {
        renderSearchList("countryList", getCountries(), function (value) {
          countrySearch.value = value;
          byId("country").value = value;

          stateSearch.value = "";
          byId("stateName").value = "";

          districtSearch.value = "";
          byId("district").value = "";
        });
      });

      countrySearch.addEventListener("input", function () {
        renderSearchList("countryList", filterList(getCountries(), countrySearch.value), function (value) {
          countrySearch.value = value;
          byId("country").value = value;

          stateSearch.value = "";
          byId("stateName").value = "";

          districtSearch.value = "";
          byId("district").value = "";
        });
      });

      stateSearch.addEventListener("focus", function () {
        renderSearchList("stateList", getStates(byId("country").value), function (value) {
          stateSearch.value = value;
          byId("stateName").value = value;

          districtSearch.value = "";
          byId("district").value = "";
        });
      });

      stateSearch.addEventListener("input", function () {
        renderSearchList("stateList", filterList(getStates(byId("country").value), stateSearch.value), function (value) {
          stateSearch.value = value;
          byId("stateName").value = value;

          districtSearch.value = "";
          byId("district").value = "";
        });
      });

      districtSearch.addEventListener("focus", function () {
        renderSearchList("districtList", getDistricts(byId("country").value, byId("stateName").value), function (value) {
          districtSearch.value = value;
          byId("district").value = value;
        });
      });

      districtSearch.addEventListener("input", function () {
        renderSearchList("districtList", filterList(getDistricts(byId("country").value, byId("stateName").value), districtSearch.value), function (value) {
          districtSearch.value = value;
          byId("district").value = value;
        });
      });

      document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-select")) {
          closeSearchLists();
        }
      });
    }

    /* =========================================================
       FORM DATA
       ========================================================= */

    function collectFormData() {
      return {
        fullName: clean(byId("fullName").value),
        email: clean(byId("email").value).toLowerCase(),

        contactCountryCode: byId("contactCountryCode").value,
        contactNumber: digits(byId("contactNumber").value),

        whatsappCountryCode: byId("whatsappCountryCode").value,
        whatsappNumber: digits(byId("whatsappNumber").value),

        dateOfBirth: byId("dateOfBirth").value,
        ageGroup: byId("ageGroup").value,
        gender: byId("gender").value,

        country: byId("country").value,
        stateName: byId("stateName").value,
        district: byId("district").value,
        pincode: clean(byId("pincode").value),
        postOffice: clean(byId("postOffice").value),
        fullAddress: cleanLong(byId("fullAddress").value),

        selectedRole: byId("selectedRole").value,
        workType: byId("workType").value,
        workTimeType: byId("workTimeType").value,
        weeklyAvailability: byId("weeklyAvailability").value,

        educationLevel: byId("educationLevel").value,
        currentStatus: byId("currentStatus").value,
        experienceLevel: byId("experienceLevel").value,

        skills: cleanLong(byId("skills").value),
        portfolioUrl: clean(byId("portfolioUrl").value),
        linkedinUrl: clean(byId("linkedinUrl").value),
        githubUrl: clean(byId("githubUrl").value),
        instagramUrl: clean(byId("instagramUrl").value),

        whyJoin: cleanLong(byId("whyJoin").value),
        previousWork: cleanLong(byId("previousWork").value),

        certificateDeliveryRequired: byId("certificateDeliveryRequired").checked,
        consentAccuracy: byId("consentAccuracy").checked,
        consentContact: byId("consentContact").checked
      };
    }

    function validateFormData(data) {
      if (!data.fullName) return "Enter your full name.";
      if (!data.email || !data.email.includes("@")) return "Enter a valid email.";
      if (!data.contactNumber || data.contactNumber.length < 5) return "Enter your contact number.";
      if (!data.ageGroup) return "Select age group.";
      if (!data.country) return "Select country.";
      if (!data.stateName) return "Select state.";
      if (!data.district) return "Select district.";
      if (!data.pincode) return "Enter pincode.";
      if (!data.selectedRole) return "Select one role.";
      if (!data.workType) return "Select work type.";
      if (!data.workTimeType) return "Select work time type.";
      if (!data.weeklyAvailability) return "Select weekly availability.";
      if (!data.educationLevel) return "Select education level.";
      if (!data.currentStatus) return "Select current status.";
      if (!data.experienceLevel) return "Select experience level.";
      if (!data.skills) return "Write your skills.";
      if (!data.whyJoin) return "Write why you want to join.";
      if (!data.consentAccuracy) return "Confirm that your information is accurate.";
      if (!data.consentContact) return "Allow AcademeForge to contact you.";
      return "";
    }

    function buildPayload(data) {
      return {
        full_name: data.fullName,
        email: data.email,

        contact_country_code: data.contactCountryCode,
        contact_number: data.contactNumber,

        whatsapp_country_code: data.whatsappCountryCode,
        whatsapp_number: data.whatsappNumber,

        date_of_birth: data.dateOfBirth,
        age_group: data.ageGroup,
        gender: data.gender,

        country: data.country,
        state: data.stateName,
        district: data.district,
        pincode: data.pincode,
        post_office: data.postOffice,
        address_line: data.fullAddress,

        selected_role: data.selectedRole,
        work_type: data.workType,
        work_time_type: data.workTimeType,
        weekly_availability: data.weeklyAvailability,

        education_level: data.educationLevel,
        current_status: data.currentStatus,
        experience_level: data.experienceLevel,

        skills: data.skills.split(/[,;\n]/).map(clean).filter(Boolean),
        skills_text: data.skills,

        portfolio_url: data.portfolioUrl,
        linkedin_url: data.linkedinUrl,
        github_url: data.githubUrl,
        instagram_url: data.instagramUrl,

        why_join: data.whyJoin,
        previous_work: data.previousWork,

        certificate_delivery_needed: data.certificateDeliveryRequired,
        accuracy_confirmed: data.consentAccuracy,
        contact_permission: data.consentContact,

        source_page: window.location.href,
        user_agent: navigator.userAgent,
        submitted_at_client: new Date().toISOString()
      };
    }

    /* =========================================================
       DRAFT
       ========================================================= */

    function saveDraft() {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(collectFormData()));
      } catch (error) {
        console.warn("Draft save failed.", error);
      }
    }

    function clearDraft() {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (error) {
        console.warn("Draft clear failed.", error);
      }
    }

    function restoreDraft() {
      const draft = safeJsonParse(localStorage.getItem(DRAFT_KEY) || "{}", {});

      Object.keys(draft).forEach(function (key) {
        const element = byId(key);

        if (!element) return;

        if (element.type === "checkbox") {
          element.checked = Boolean(draft[key]);
        } else {
          element.value = draft[key] || "";
        }
      });

      byId("countrySearch").value = draft.country || "";
      byId("stateSearch").value = draft.stateName || "";
      byId("districtSearch").value = draft.district || "";

      byId("country").value = draft.country || "";
      byId("stateName").value = draft.stateName || "";
      byId("district").value = draft.district || "";

      syncChoices();
    }

    function resetHiddenAndSearchFields() {
      [
        "selectedRole",
        "workType",
        "workTimeType",
        "country",
        "stateName",
        "district"
      ].forEach(function (id) {
        byId(id).value = "";
      });

      byId("countrySearch").value = "";
      byId("stateSearch").value = "";
      byId("districtSearch").value = "";

      syncChoices();
    }

    /* =========================================================
       SUBMIT
       ========================================================= */

    async function submitApplication(data) {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(buildPayload(data))
      });

      const result = await response.json().catch(function () {
        return {
          success: false,
          ok: false,
          error: "Invalid server response."
        };
      });

      if (!response.ok || !(result.success === true || result.ok === true)) {
        const message = [
          result.error,
          result.details,
          result.code,
          result.hint
        ].filter(Boolean).join("\n");

        throw new Error(message || "Application submit failed.");
      }

      return {
        applicationId: result.applicationId || result.application_id || (result.data && result.data.id),
        raw: result
      };
    }

    function saveLastApplication(applicationId, email) {
      try {
        localStorage.setItem(LAST_APP_KEY, JSON.stringify({
          applicationId: applicationId,
          email: email || "",
          savedAt: new Date().toISOString()
        }));
      } catch (error) {
        console.warn("Could not save last application.", error);
      }
    }

    function getLastApplication() {
      return safeJsonParse(localStorage.getItem(LAST_APP_KEY) || "{}", {});
    }

    /* =========================================================
       STATUS UI
       ========================================================= */

    function normalizeStatusFlag(value) {
      if (value === true || value === "T" || value === "t" || value === "true" || value === 1 || value === "1") {
        return true;
      }

      if (value === false || value === "F" || value === "f" || value === "false" || value === 0 || value === "0") {
        return false;
      }

      return null;
    }

    function stepHtml(className, icon, title, message) {
      return (
        '<div class="step ' + className + '">' +
          '<div class="step-icon">' + icon + '</div>' +
          '<div>' +
            '<h4>' + escapeHtml(title) + '</h4>' +
            '<p>' + escapeHtml(message) + '</p>' +
          '</div>' +
        '</div>'
      );
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function renderStatus(status) {
      const card = byId("applicationStatus");
      const timeline = byId("timeline");
      const title = byId("statusTitle");
      const text = byId("statusText");
      const statusId = byId("statusId");

      card.classList.add("show");
      card.classList.remove("celebrate");

      const applicationId = status.application_id || status.applicationId || status.id || "";
      statusId.textContent = applicationId ? "Application ID: " + applicationId : "Application ID unavailable";

      const hrRead = normalizeStatusFlag(status.hr_read);
      const hrApproved = normalizeStatusFlag(status.hr_approved_resume);
      const triedToContact = normalizeStatusFlag(status.tried_to_contact);
      const jobSecured = normalizeStatusFlag(status.job_secured);
      const finalRejected = normalizeStatusFlag(status.final_rejected);

      const reason = status.hr_rejection_reason ||
        status.final_rejection_reason ||
        status.rejection_reason ||
        "No reason added by HR yet.";

      let html = "";

      html += stepHtml(
        "done",
        "âœ“",
        "Application submitted",
        "Your application has been submitted successfully."
      );

      html += stepHtml(
        hrRead === true ? "done" : "pending",
        hrRead === true ? "âœ“" : "â€¦",
        "HR read",
        hrRead === true ? "HR has read your application." : "Pending. HR has not marked this as read yet."
      );

      if (hrApproved === true) {
        html += stepHtml(
          "done",
          "âœ“",
          "HR approved resume",
          "HR has approved your profile/resume for the next stage."
        );
      } else if (hrApproved === false) {
        html += stepHtml(
          "fail",
          "Ã—",
          "Application rejected by HR",
          "Application rejected by HR. Reason: " + reason
        );
      } else {
        html += stepHtml(
          "pending",
          "â€¦",
          "HR approved resume",
          "Pending. HR approval decision is not marked yet."
        );
      }

      html += stepHtml(
        triedToContact === true ? "done" : "pending",
        triedToContact === true ? "âœ“" : "â€¦",
        "Tried to contact",
        triedToContact === true ? "Hiring team has tried to contact you." : "Pending. Hiring team has not marked contact attempt yet."
      );

      if (jobSecured === true) {
        html += stepHtml(
          "done",
          "âœ“",
          "Job secured",
          "Congratulations. Your job profile has been approved. You are now officially a member of AcademeForge. Hiring Department will contact you for further process."
        );

        title.textContent = "Congratulations â€” Job Profile Approved";
        text.textContent = "Your job profile has been approved by AcademeForge.";
        card.classList.add("celebrate");
      } else if (jobSecured === false || finalRejected === true) {
        html += stepHtml(
          "fail",
          "Ã—",
          "Final result",
          "Your application has been rejected. Reapply with good presentation."
        );

        title.textContent = "Application Rejected";
        text.textContent = "Your application is not approved at this stage.";
      } else {
        html += stepHtml(
          "pending",
          "â€¦",
          "Job secured",
          "Pending. Final job secured status is not marked yet."
        );

        title.textContent = "Job Application Status";
        text.textContent = "Current application progress is shown below.";
      }

      timeline.innerHTML = html;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function fetchApplicationStatus(applicationId) {
      if (!applicationId) {
        throw new Error("No application ID found. Submit application first.");
      }

      const response = await fetch(STATUS_FUNCTION_URL + "?application_id=" + encodeURIComponent(applicationId), {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: {
          "Accept": "application/json"
        }
      });

      const result = await response.json().catch(function () {
        return {
          success: false,
          ok: false,
          error: "Invalid status response."
        };
      });

      if (!response.ok || !(result.success === true || result.ok === true)) {
        throw new Error(result.error || result.details || "Could not load application status.");
      }

      return result.data || result.status || result;
    }

    function initStatusButtons() {
      async function loadStatus() {
        clearAlert();

        const lastApplication = getLastApplication();

        if (!lastApplication.applicationId) {
          byId("applicationStatus").classList.add("show");
          showAlert("error", "No submitted application found on this device. Submit application first.");
          return;
        }

        try {
          const status = await fetchApplicationStatus(lastApplication.applicationId);
          renderStatus(status);
        } catch (error) {
          showAlert("error", error.message || "Could not load status.");
        }
      }

      byId("statusBtn").addEventListener("click", loadStatus);
      byId("refreshStatusBtn").addEventListener("click", loadStatus);

      byId("hideStatusBtn").addEventListener("click", function () {
        byId("applicationStatus").classList.remove("show");
      });
    }

    /* =========================================================
       FORM INIT
       ========================================================= */

    function initForm() {
      const form = byId("joinTeamForm");

      form.addEventListener("input", saveDraft);
      form.addEventListener("change", saveDraft);

      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearAlert();

        const data = collectFormData();
        const validationError = validateFormData(data);

        if (validationError) {
          showAlert("error", validationError);
          return;
        }

        const submitButton = byId("submitBtn");
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
          const result = await submitApplication(data);

          if (!result.applicationId) {
            throw new Error("Application submitted, but application ID was not returned by backend.");
          }

          saveLastApplication(result.applicationId, data.email);
          clearDraft();

          form.reset();
          resetHiddenAndSearchFields();
          
     showAlert("success", "Test submitted successfully. Check status from Job Application Status page.");

        } catch (error) {
          showAlert("error", error.message || "Application submit failed.");
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Application";
        }
      });

      form.addEventListener("reset", function () {
        setTimeout(function () {
          clearDraft();
          resetHiddenAndSearchFields();
          clearAlert();
        }, 0);
      });

      byId("saveDraftBtn").addEventListener("click", function () {
        saveDraft();
        showAlert("success", "Draft saved on this device.");
      });
    }

    /* =========================================================
       BOOT
       ========================================================= */

    document.addEventListener("DOMContentLoaded", function () {
      byId("year").textContent = new Date().getFullYear();

      initTheme();
      initCountryCodes();

      createChoiceGrid("roleGrid", "selectedRole", roles);
      createChoiceGrid("workTypeGrid", "workType", workTypes);
      createChoiceGrid("workTimeTypeGrid", "workTimeType", workTimeTypes);

      initLocationSearch();
      initForm();
      initStatusButtons();

      restoreDraft();
    });
  
