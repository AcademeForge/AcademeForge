"use strict";

const EDGE_FUNCTION_URL =
  "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application";
const DRAFT_KEY = "academeforge_join_team_draft_v5";

const countryCodes = [
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
  ["+971", "UAE"],
];

function byId(id) {
  return document.getElementById(id);
}
function clean(val) {
  return String(val || "").trim();
}

/* ================= THEME ================= */
function initTheme() {
  const savedTheme = localStorage.getItem("academeforge_theme") || "system";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      applyTheme(e.currentTarget.dataset.theme);
    });
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (localStorage.getItem("academeforge_theme") === "system") {
        applyTheme("system");
      }
    });
}

function applyTheme(theme) {
  localStorage.setItem("academeforge_theme", theme);
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

/* ================= SETUP ================= */
function initCountryCodes() {
  ["contactCountryCode", "whatsappCountryCode"].forEach((id) => {
    const select = byId(id);
    if (!select) return;
    select.innerHTML = '<option value="">Code</option>';
    countryCodes.forEach((item) => {
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
    setTimeout(() => {
      alertEl.style.display = "none";
    }, 5000);
  }
}

/* ================= DRAFTS ================= */
const formIds = [
  "fullName",
  "email",
  "alternateEmail",
  "contactCountryCode",
  "contactNumber",
  "whatsappCountryCode",
  "whatsappNumber",
  "dateOfBirth",
  "ageGroup",
  "gender",
  "countrySearch",
  "stateSearch",
  "districtSearch",
  "pincode",
  "postOffice",
  "fullAddress",
  "roleOfInterest",
  "weeklyAvailability",
  "educationLevel",
  "currentStatus",
  "experienceLevel",
  "skills",
  "portfolioUrl",
  "linkedinUrl",
  "githubUrl",
  "instagramUrl",
  "whyJoin",
  "previousWork",
];

const checkboxIds = [
  "certificateDeliveryRequired",
  "consentAccuracy",
  "consentContact",
];

function saveDraft() {
  const draft = {};
  formIds.forEach((id) => {
    const el = byId(id);
    if (el) draft[id] = el.value;
  });
  checkboxIds.forEach((id) => {
    const el = byId(id);
    if (el) draft[id] = el.checked;
  });
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function restoreDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    formIds.forEach((id) => {
      const el = byId(id);
      if (el && draft[id]) el.value = draft[id];
    });
    checkboxIds.forEach((id) => {
      const el = byId(id);
      if (el && draft[id] !== undefined) el.checked = draft[id];
    });
  } catch (e) {}
}

function showSubmittedState(dateStr) {
  let submittedDate = new Date(dateStr);
  if (isNaN(submittedDate.getTime())) {
    submittedDate = new Date();
    localStorage.setItem(
      "academeforge_join_team_submitted",
      submittedDate.toISOString(),
    );
  }

  const reapplyDate = new Date(
    submittedDate.getTime() + 30 * 24 * 60 * 60 * 1000,
  );
  const options = { year: "numeric", month: "long", day: "numeric" };

  const subDateEl = byId("submittedDateDisplay");
  if (subDateEl)
    subDateEl.textContent = submittedDate.toLocaleDateString("en-US", options);

  const reDateEl = byId("reapplyDateDisplay");
  if (reDateEl)
    reDateEl.textContent = reapplyDate.toLocaleDateString("en-US", options);

  const form = byId("applyForm");
  const submittedState = byId("alreadySubmittedState");
  const banner = byId("unpaidBanner");
  const intro = byId("formIntro");
  const checklist = byId("applicationChecklist");

  if (form) form.style.display = "none";
  const loginGate = document.getElementById("loginGate");
  if (loginGate) loginGate.style.display = "none";
  const stepper = byId("stepper");
  if (stepper) stepper.style.display = "none";
  if (submittedState) submittedState.style.display = "block";
  if (banner) banner.style.display = "none";
  if (intro) intro.style.display = "none";
  if (checklist) checklist.style.display = "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================= SUBMIT ================= */
async function handleSubmit(e) {
  e.preventDefault();

  const btn = byId("submitBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  const payload = {
    full_name: clean(byId("fullName")?.value),
    email: clean(byId("email")?.value),
    contact_country_code: clean(byId("contactCountryCode")?.value),
    contact_number: clean(byId("contactNumber")?.value),
    whatsapp_country_code: clean(byId("whatsappCountryCode")?.value),
    whatsapp_number: clean(byId("whatsappNumber")?.value),
    date_of_birth: clean(byId("dateOfBirth")?.value),
    age_group: clean(byId("ageGroup")?.value),
    gender: clean(byId("gender")?.value),

    country: clean(byId("country")?.value),
    state: clean(byId("stateName")?.value),
    district: clean(byId("district")?.value),
    pincode: clean(byId("pincode")?.value),
    post_office: clean(byId("postOffice")?.value),
    address_line: clean(byId("fullAddress")?.value),

    selected_role: clean(byId("roleOfInterest")?.value),
    work_type: "Remote",
    work_time_type: "Part-time",
    weekly_availability: clean(byId("weeklyAvailability")?.value),

    education_level: clean(byId("educationLevel")?.value),
    current_status: clean(byId("currentStatus")?.value),
    experience_level: clean(byId("experienceLevel")?.value),

    skills_text: clean(byId("skills")?.value),

    portfolio_url: clean(byId("portfolioUrl")?.value),
    linkedin_url: clean(byId("linkedinUrl")?.value),
    github_url: clean(byId("githubUrl")?.value),
    instagram_url: clean(byId("githubUrl")?.value),

    why_join: clean(byId("whyJoin")?.value),
    previous_work: clean(byId("previousWork")?.value),

    certificate_delivery_needed: byId("certificateDeliveryRequired")?.checked,
    accuracy_confirmed: byId("consentAccuracy")?.checked,
    contact_permission: byId("consentContact")?.checked,

    source_page: window.location.href,
    user_agent: navigator.userAgent,
    submitted_at_client: new Date().toISOString(),
  };

  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        resData.message ||
          resData.error ||
          "Server rejected the application. Please try again.",
      );
    }

    showAlert("Application submitted successfully!", false);
    localStorage.removeItem(DRAFT_KEY);
    const nowStr = new Date().toISOString();

    byId("applyForm").reset();

    showSubmittedState(nowStr);
  } catch (err) {
    showAlert(
      err.message || "Failed to submit application. Check your connection.",
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit Application";
  }
}

const locationData = {
  India: {
    "Andhra Pradesh": [
      "Alluri Sitharama Raju",
      "Anakapalli",
      "Ananthapuramu",
      "Annamayya",
      "Bapatla",
      "Chittoor",
      "Dr. B.R. Ambedkar Konaseema",
      "East Godavari",
      "Eluru",
      "Guntur",
      "Kakinada",
      "Krishna",
      "Kurnool",
      "Nandyal",
      "NTR",
      "Palnadu",
      "Parvathipuram Manyam",
      "Prakasam",
      "Sri Potti Sriramulu Nellore",
      "Sri Sathya Sai",
      "Srikakulam",
      "Tirupati",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "Y.S.R. Kadapa",
    ],
    "Arunachal Pradesh": [
      "Anjaw",
      "Changlang",
      "Dibang Valley",
      "East Kameng",
      "East Siang",
      "Itanagar Capital Complex",
      "Kamle",
      "Kra Daadi",
      "Kurung Kumey",
      "Lepa Rada",
      "Lohit",
      "Longding",
      "Lower Dibang Valley",
      "Lower Siang",
      "Lower Subansiri",
      "Namsai",
      "Pakke Kessang",
      "Papum Pare",
      "Shi Yomi",
      "Siang",
      "Tawang",
      "Tirap",
      "Upper Siang",
      "Upper Subansiri",
      "West Kameng",
      "West Siang",
    ],
    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Dima Hasao",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
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
      "East Champaran (Motihari)",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur (Bhabua)",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger (Monghyr)",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia (Purnea)",
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
      "West Champaran",
    ],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada (South Bastar)",
      "Dhamtari",
      "Durg",
      "Gariyaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham (Kawardha)",
      "Kanker (North Bastar)",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha (Palanpur)",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udepur",
      "Dahod",
      "Dangs (Ahwa)",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda (Nadiad)",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada (Rajpipla)",
      "Navsari",
      "Panchmahal (Godhra)",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha (Himmatnagar)",
      "Surat",
      "Surendranagar",
      "Tapi (Vyara)",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram (Gurgaon)",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    "Himachal Pradesh": [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul & Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur (Sirmour)",
      "Solan",
      "Una",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribag",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahibganj",
      "Seraikela-Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    Karnataka: [
      "Bagalkot",
      "Ballari (Bellary)",
      "Belagavi (Belgaum)",
      "Bengaluru (Bangalore) Rural",
      "Bengaluru (Bangalore) Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru (Chikmagalur)",
      "Chitradurga",
      "Dakshina Kannada",
      "Davangere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi (Gulbarga)",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru (Mysore)",
      "Raichur",
      "Ramanagara",
      "Shivamogga (Shimoga)",
      "Tumakuru (Tumkur)",
      "Udupi",
      "Uttara Kannada (Karwar)",
      "Vijayapura (Bijapur)",
      "Yadgir",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    "Madhya Pradesh": [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Hnahthial",
      "Khawzawl",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Saitual",
      "Serchhip",
    ],
    Nagaland: [
      "Chumukedima",
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Niuland",
      "Noklak",
      "Peren",
      "Phek",
      "Shamator",
      "Tseminyu",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghapur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar (Keonjhar)",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Sonepur",
      "Sundargarh",
    ],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Nawanshahr (Shahid Bhagat Singh Nagar)",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sahibzada Ajit Singh Nagar (Mohali)",
      "Sangrur",
      "Tarn Taran",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi (Tuticorin)",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhoopalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal (Rural)",
      "Warangal (Urban)",
      "Yadadri Bhuvanagiri",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi (Chattrapati Sahuji Mahraj Nagar)",
      "Amroha (J.P. Nagar)",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur (Panchsheel Nagar)",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kanshiram Nagar (Kasganj)",
      "Kaushambi",
      "Kushinagar (Padrauna)",
      "Lakhimpur - Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "RaeBareli",
      "Rampur",
      "Saharanpur",
      "Sambhal (Bhim Nagar)",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamali (Prabuddh Nagar)",
      "Shravasti",
      "Siddharth Nagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
    "West Bengal": [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur (South Dinajpur)",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Medinipur (West Medinipur)",
      "Paschim (West) Burdwan (Bardhaman)",
      "Purba Burdwan (Bardhaman)",
      "Purba Medinipur (East Medinipur)",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur (North Dinajpur)",
    ],
    "Andaman and Nicobar Islands": [
      "Nicobar",
      "North and Middle Andaman",
      "South Andaman",
    ],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": [
      "Dadra and Nagar Haveli",
      "Daman",
      "Diu",
    ],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    "Jammu and Kashmir": [
      "Anantnag",
      "Bandipore",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
    Ladakh: ["Kargil", "Leh"],
    Lakshadweep: ["Lakshadweep"],
    Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  },

  Nepal: { Bagmati: ["Kathmandu", "Lalitpur", "Bhaktapur"] },
  Bangladesh: {
    Dhaka: ["Dhaka", "Gazipur"],
    Chattogram: ["Chattogram", "Cox's Bazar"],
  },
  Bhutan: { Thimphu: ["Thimphu"], Paro: ["Paro"] },
  "Sri Lanka": { Western: ["Colombo", "Gampaha"] },
  Maldives: { Male: ["Male"] },
  Pakistan: {
    Punjab: ["Lahore", "Faisalabad"],
    Sindh: ["Karachi", "Hyderabad"],
  },
  Afghanistan: { Kabul: ["Kabul"], Herat: ["Herat"] },
  Myanmar: { Yangon: ["Yangon"], Mandalay: ["Mandalay"] },
};

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
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return options;
  return options.filter((option) => option.toLowerCase().includes(q));
}

function renderSearchList(listId, options, onSelect) {
  const list = byId(listId);
  list.innerHTML = "";
  options.slice(0, 90).forEach((optionText) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-option";
    button.textContent = optionText;
    button.addEventListener("click", () => {
      onSelect(optionText);
      list.classList.remove("open");
      saveDraft();
    });
    list.appendChild(button);
  });
  list.classList.add("open");
}

function closeSearchLists() {
  document.querySelectorAll(".search-list").forEach((list) => {
    list.classList.remove("open");
  });
}

function initLocationSearch() {
  const countrySearch = byId("countrySearch");
  const stateSearch = byId("stateSearch");
  const districtSearch = byId("districtSearch");

  if (!countrySearch) return; // safeguard

  countrySearch.addEventListener("focus", () => {
    renderSearchList("countryList", getCountries(), (value) => {
      countrySearch.value = value;
      byId("country").value = value;
      stateSearch.value = "";
      byId("stateName").value = "";
      districtSearch.value = "";
      byId("district").value = "";
    });
  });

  countrySearch.addEventListener("input", () => {
    renderSearchList(
      "countryList",
      filterList(getCountries(), countrySearch.value),
      (value) => {
        countrySearch.value = value;
        byId("country").value = value;
        stateSearch.value = "";
        byId("stateName").value = "";
        districtSearch.value = "";
        byId("district").value = "";
      },
    );
  });

  stateSearch.addEventListener("focus", () => {
    renderSearchList("stateList", getStates(byId("country").value), (value) => {
      stateSearch.value = value;
      byId("stateName").value = value;
      districtSearch.value = "";
      byId("district").value = "";
    });
  });

  stateSearch.addEventListener("input", () => {
    renderSearchList(
      "stateList",
      filterList(getStates(byId("country").value), stateSearch.value),
      (value) => {
        stateSearch.value = value;
        byId("stateName").value = value;
        districtSearch.value = "";
        byId("district").value = "";
      },
    );
  });

  districtSearch.addEventListener("focus", () => {
    renderSearchList(
      "districtList",
      getDistricts(byId("country").value, byId("stateName").value),
      (value) => {
        districtSearch.value = value;
        byId("district").value = value;
      },
    );
  });

  districtSearch.addEventListener("input", () => {
    renderSearchList(
      "districtList",
      filterList(
        getDistricts(byId("country").value, byId("stateName").value),
        districtSearch.value,
      ),
      (value) => {
        districtSearch.value = value;
        byId("district").value = value;
      },
    );
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-select")) {
      closeSearchLists();
    }
  });
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  if (localStorage.getItem("af_intern_logged_in") === "true") {
    const loginId = localStorage.getItem("af_intern_login_id");
    if (loginId) {
      // Securely fetch status from backend on page load
      fetchApplicationStatus(
        loginId.includes("@") ? loginId : null,
        !loginId.includes("@") ? loginId : null,
      )
        .then((status) => {
          if (status && (status.application_id || status.id)) {
            showSubmittedState(status.created_at || new Date().toISOString());
          } else {
            startApplication();
          }
        })
        .catch((e) => {
          if (
            !e.message ||
            (!e.message.includes("Application status not found") &&
              !e.message.includes("Not found"))
          ) {
            showAlert("Verification failed: " + (e.message || "Unknown error"));
            return;
          }
          startApplication();
        });
    } else {
      startApplication();
    }
  }

  initCountryCodes();
  restoreDraft();
  initLocationSearch();

  const form = byId("applyForm");
  if (form) {
    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);
    form.addEventListener("submit", handleSubmit);
  }
});

/* ================= LOGIN & MULTI-STEP LOGIC ================= */
// Setup Supabase
const STUDENT_URL = "https://afooyyydhlwngzssgqih.supabase.co";
const STUDENT_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb295eXlkaGx3bmd6c3NncWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDQxMjgsImV4cCI6MjA5NDIyMDEyOH0.KG0XO0oP_2MpewHoIwTtbrKg5FkyOYRUtVzLH1MSJiE";

let _sb = null;
async function getSb() {
  if (_sb) return _sb;
  if (typeof supabase === "undefined") {
    // dynamically load supabase
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  _sb = supabase.createClient(STUDENT_URL, STUDENT_KEY);
  return _sb;
}

function showAuthMsg(type, text) {
  const msgEl = document.getElementById("alMsg");
  if (!msgEl) return;
  msgEl.className = "al-msg " + type;
  msgEl.textContent = text || "";
}

function afGetDeviceId() {
  const k = "af_device_id";
  let id = localStorage.getItem(k);
  if (!id) {
    id =
      "afdev_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2, 12);
    localStorage.setItem(k, id);
  }
  return id;
}

function afGetDeviceName() {
  const ua = navigator.userAgent || "";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad/i.test(ua)) return "iOS";
  if (/Windows/i.test(ua)) return "Windows";
  return "Web Browser";
}

function cleanPhone(v) {
  return String(v || "")
    .trim()
    .replace(/\D/g, "");
}

async function doInternshipLogin() {
  const loginId = (document.getElementById("alLoginId").value || "").trim();
  const cleanId = cleanPhone(loginId);
  const password = (document.getElementById("alPassword").value || "").trim();

  if (!loginId) {
    showAuthMsg("err", "Enter your email or phone number.");
    return;
  }
  if (!password) {
    showAuthMsg("err", "Enter your password.");
    return;
  }
  const btn = document.getElementById("alLoginBtn");
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (btn) {
    btn.disabled = true;
  }
  if (loadingOverlay) {
    loadingOverlay.querySelector("p").innerText = "Authenticating...";
    loadingOverlay.classList.add("active");
  }

  try {
    const sb = await getSb();
    const { data, error } = await sb.functions.invoke("student-login-af", {
      body: {
        login_id: loginId,
        clean_login_id: cleanId,
        password,
        device_id: afGetDeviceId(),
        device_name: afGetDeviceName(),
      },
    });

    if (error) {
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showAuthMsg("err", error.message || "Login failed.");
      return;
    }
    if (!data || !data.ok) {
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showAuthMsg("err", (data && data.message) || "Login failed.");
      return;
    }
    if (!data.student) {
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showAuthMsg("err", "Login failed. Student data not received.");
      return;
    }

    // Success - Save basics
    localStorage.setItem("af_intern_logged_in", "true");
    localStorage.setItem("af_intern_login_id", loginId);
    localStorage.setItem("af_student_uuid", data.student.id || "");
    localStorage.setItem("af_student_name", data.student.name || "");
    localStorage.setItem("af_student_email", data.student.email || "");
    localStorage.setItem(
      "af_student_mobile",
      data.student.mobile || data.student.phone || "",
    );

    if (loadingOverlay) {
      loadingOverlay.querySelector("p").innerText =
        "Authentication successful! Starting application...";
    }

    // Prefill form
    if (document.getElementById("fullName"))
      document.getElementById("fullName").value = data.student.name || "";
    if (document.getElementById("email"))
      document.getElementById("email").value = data.student.email || "";
    if (document.getElementById("contactNumber"))
      document.getElementById("contactNumber").value =
        data.student.mobile || data.student.phone || "";

    try {
      const status = await fetchApplicationStatus(
        data.student.email,
        data.student.mobile || data.student.phone,
      );
      if (status && (status.application_id || status.id)) {
        if (loadingOverlay) loadingOverlay.classList.remove("active");
        showSubmittedState(status.created_at || new Date().toISOString());
        return;
      }
    } catch (e) {
      if (
        !e.message ||
        (!e.message.includes("Application status not found") &&
          !e.message.includes("Not found"))
      ) {
        if (loadingOverlay) loadingOverlay.classList.remove("active");
        showAuthMsg(
          "err",
          "Verification failed: " + (e.message || "Unknown error"),
        );
        return;
      }
    }

    setTimeout(() => {
      startApplication();
    }, 800);
  } catch (e) {
    if (loadingOverlay) loadingOverlay.classList.remove("active");
    showAuthMsg(
      "err",
      (e && e.message) || "Something went wrong. Please try again.",
    );
  } finally {
    if (btn) {
      btn.disabled = false;
    }
  }
}

// Multi-step logic
let currentStep = 1;
const totalSteps = 3;

function startApplication() {
  const overlay = document.getElementById("loadingOverlay");
  overlay.classList.add("active");

  setTimeout(() => {
    document.getElementById("loginGate").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
    goToStep(1);
    overlay.classList.remove("active");
  }, 600); // 0.6s artificial delay for loading.png to show
}

function goToStep(step) {
  // Optional validation before moving next
  if (step > currentStep) {
    // Check if required fields in current step are filled
    const currentContainer = document.getElementById("step" + currentStep);
    if (currentContainer) {
      const requiredInputs = currentContainer.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let allFilled = true;
      requiredInputs.forEach((inp) => {
        if (!inp.value.trim() && inp.type !== "checkbox") {
          allFilled = false;
          inp.style.borderColor = "red";
        } else if (inp.type === "checkbox" && !inp.checked) {
          allFilled = false;
        } else {
          inp.style.borderColor = "";
        }
      });
      if (!allFilled) {
        showAlert("Please fill out all required fields before proceeding.");
        return; // Prevent moving forward
      }
    }
  }

  // Show loading overlay
  const overlay = document.getElementById("loadingOverlay");
  overlay.classList.add("active");

  setTimeout(() => {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
      const s = document.getElementById("step" + i);
      if (s) {
        s.classList.remove("active");
      }
      const dot = document.getElementById("dot" + i);
      if (dot) {
        dot.classList.remove("active");
        if (i < step) {
          dot.classList.add("completed");
          dot.classList.remove("active");
        } else dot.classList.remove("completed");
      }
    }

    currentStep = step;

    // Show target step
    const target = document.getElementById("step" + step);
    if (target) target.classList.add("active");

    const dot = document.getElementById("dot" + step);
    if (dot) dot.classList.add("active");

    window.scrollTo({
      top: document.getElementById("stepper").offsetTop - 100,
      behavior: "smooth",
    });

    overlay.classList.remove("active");
  }, 500); // 0.5s loading PNG delay requested by user
}

// Check initial session
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("af_intern_logged_in") === "true") {
    document.getElementById("loginGate").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
  }
});

/* --- INLINE JS FROM HTML --- */

function closeGuidelines() {
  let e = document.getElementById("guidelinesPopup");
  ((e.style.opacity = "0"),
    setTimeout(() => {
      e.style.display = "none";
    }, 300),
    localStorage.setItem("agreed_to_guidelines", "true"));
}
document.addEventListener("DOMContentLoaded", () => {
  "true" === localStorage.getItem("agreed_to_guidelines") &&
    (document.getElementById("guidelinesPopup").style.display = "none");
});

const STATUS_FUNCTION_URL =
  "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/join-team-application-status";
async function fetchApplicationStatus(email, mobile) {
  const cleanEmail = String(email || "")
    .trim()
    .toLowerCase();
  const cleanMobile = String(mobile || "").replace(/\D/g, "");
  const params = new URLSearchParams();
  if (cleanEmail) params.set("email", cleanEmail);
  if (cleanMobile) params.set("mobile", cleanMobile);
  const response = await fetch(STATUS_FUNCTION_URL + "?" + params.toString(), {
    method: "GET",
    mode: "cors",
    cache: "no-store",
    credentials: "omit",
    headers: { Accept: "application/json" },
  });
  const result = await response.json().catch(() => ({ success: false }));
  if (!response.ok || !(result.success || result.ok)) {
    throw new Error(result.error || result.message || "Not found");
  }
  return result.data || result.status || result.application || result;
}

function doLogout() {
  localStorage.removeItem("af_intern_logged_in");
  localStorage.removeItem("af_intern_login_id");
  window.location.reload();
}

function checkLoginState() {
  if (localStorage.getItem("af_intern_logged_in") === "true") {
    const profileDropdown = document.getElementById("navProfileDropdown");
    if (profileDropdown) profileDropdown.style.display = "flex";
  }
}
document.addEventListener("DOMContentLoaded", checkLoginState);
