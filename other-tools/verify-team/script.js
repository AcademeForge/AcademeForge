
"use strict";

const AF_API = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/get-af-team-members";
const AF_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let allMembers = [];
let isLoaded = false;

function byId(id) { return document.getElementById(id); }

function resetCards() {
    ['defaultState', 'loadingState', 'resultState', 'notFoundState', 'errorState'].forEach(id => {
        if(byId(id)) byId(id).style.display = 'none';
    });
    const panel = byId('statusPanel');
    panel.classList.remove('success', 'error');
}

function showNotFound(id) {
    resetCards();
    byId('nfId').textContent = id;
    byId('notFoundState').style.display = 'flex';
    byId('statusPanel').classList.add('error');
}

function showError() {
    resetCards();
    byId('errorState').style.display = 'flex';
    byId('statusPanel').classList.add('error');
}

function escapeHtml(value){
    return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function safeUrl(url){
    if(!url) return "";
    const value = String(url).trim();
    if(value.startsWith("http://") || value.startsWith("https://")) return value;
    return "";
}

function formatDate(date){
    if(!date) return "Present";
    try{
        return new Date(date).toLocaleDateString("en-IN", {year:"numeric", month:"short"});
    }catch{
        return "Present";
    }
}

function showResult(r) {
    resetCards();
    byId('statusPanel').classList.add('success');
    
    const fullName = escapeHtml(r.full_name || r.name || "Unknown Member");
    const roleTitle = escapeHtml(r.role_title || r.role || "Member");
    const memberId = escapeHtml(r.member_id || "—");
    const dept = escapeHtml(r.department || "AcademeForge");
    const status = String(r.status || "active").toLowerCase();
    
    byId('resultName').textContent = fullName;
    byId('resultRole').textContent = roleTitle;
    byId('resultMemberId').textContent = memberId;

    // Status mapping
    const statusMap = {
        'active': { color: 'var(--green)', text: '✅ Active Member' },
        'alumni': { color: 'var(--text-muted)', text: '🎓 Alumni' },
        'on_leave': { color: 'var(--amber)', text: '⏸️ On Leave' },
        'inactive': { color: 'var(--red)', text: '❌ Inactive' }
    };
    
    const statusData = statusMap[status] || statusMap['active'];
    byId('resultStatusLbl').textContent = statusData.text;
    byId('resultStatusLbl').style.color = statusData.color;

    // Avatar
    const avatarBox = byId('resultAvatar');
    if(r.avatar_url && r.avatar_url.startsWith("http")) {
        avatarBox.innerHTML = `<img src="${escapeHtml(r.avatar_url)}" alt="${fullName}">`;
        avatarBox.style.background = 'transparent';
        avatarBox.style.border = 'none';
    } else {
        avatarBox.innerHTML = fullName.charAt(0).toUpperCase();
        avatarBox.style.background = 'rgba(16, 185, 129, 0.1)';
        avatarBox.style.border = '2px solid rgba(16, 185, 129, 0.3)';
    }

    // Chips
    const chips = [];
    chips.push(`<span class="chip">🏢 ${dept}</span>`);
    if(r.username) chips.push(`<span class="chip">@${escapeHtml(r.username)}</span>`);
    byId('chipsRow').innerHTML = chips.join('');

    // Grid Details
    byId('resultJoined').textContent = formatDate(r.joined_at);
    byId('resultEnded').textContent = (status === 'alumni' || r.ended_at) ? formatDate(r.ended_at) : 'Currently Active';
    byId('resultLocation').textContent = escapeHtml(r.location || 'India');

    // Bio
    if(r.bio){
        byId('descSection').style.display = 'grid';
        byId('descBlock').textContent = escapeHtml(r.bio);
    } else {
        byId('descSection').style.display = 'none';
    }
    
    // Links
    const links = [];
    const linkedin = safeUrl(r.linkedin_url);
    const github = safeUrl(r.github_url);
    const portfolio = safeUrl(r.portfolio_url);
    
    if(linkedin) links.push(`<a href="${linkedin}" target="_blank" class="ext-link">LinkedIn ↗</a>`);
    if(github) links.push(`<a href="${github}" target="_blank" class="ext-link">GitHub ↗</a>`);
    if(portfolio) links.push(`<a href="${portfolio}" target="_blank" class="ext-link">Portfolio ↗</a>`);
    
    if(links.length > 0) {
        byId('linksSection').style.display = 'grid';
        byId('linksRow').innerHTML = links.join('');
    } else {
        byId('linksSection').style.display = 'none';
    }

    byId('resultState').style.display = 'block';
}

async function loadData() {
    if(isLoaded) return true;
    try {
        const response = await fetch(AF_API, {
            headers: {
                apikey: AF_ANON_KEY,
                Authorization: `Bearer ${AF_ANON_KEY}`
            }
        });
        if(!response.ok) throw new Error("HTTP error");
        const data = await response.json();
        allMembers = data.members || [];
        isLoaded = true;
        return true;
    } catch(e) {
        return false;
    }
}

async function verify() {
    const id = byId('memberInput').value.trim().toLowerCase();
    if(!id) return;

    resetCards();
    byId('loadingState').style.display = 'flex';
    const btn = byId('verifyBtn');
    btn.disabled = true;
    btn.textContent = 'Verifying...';

    const success = await loadData();
    
    btn.disabled = false;
    btn.textContent = 'Verify Member';

    if(!success) { showError(); return; }
    
    const member = allMembers.find(m => (m.member_id || "").toLowerCase() === id);
    
    if(!member) showNotFound(byId('memberInput').value.trim().toUpperCase());
    else showResult(member);
}

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    const p = newSearchParams(window.location.search);
    const id = p.get('id') || p.get('member_id');
    if(id) {
        byId('memberInput').value = id.toUpperCase();
        verify();
    }
});
