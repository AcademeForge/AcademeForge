
"use strict";

const AF_API = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/get-af-team-members";
const AF_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let allMembers = [];
let isLoaded = false;

function byId(id) { return document.getElementById(id); }

function resetCards() {
    ['defaultState', 'loadingState', 'resultState', 'notFoundState', 'errorState'].forEach(id => {
        if(byId(id)) {
            byId(id).style.display = 'none';
        }
    });
}

function showNotFound(id) {
    resetCards();
    byId('nfId').textContent = id;
    byId('notFoundState').style.display = 'flex';
}

function showError() {
    resetCards();
    byId('errorState').style.display = 'flex';
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
    
    // Normalize data
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
        'active': { color: 'var(--green)', text: '✅ Active Member', accent: 'var(--green)' },
        'alumni': { color: 'var(--text-muted)', text: '🎓 Alumni', accent: 'var(--text-muted)' },
        'on_leave': { color: 'var(--amber)', text: '⏸️ On Leave', accent: 'var(--amber)' },
        'inactive': { color: 'var(--red)', text: '❌ Inactive', accent: 'var(--red)' }
    };
    
    const statusData = statusMap[status] || statusMap['active'];
    byId('resultStatusLbl').textContent = statusData.text;
    byId('resultStatusLbl').style.color = statusData.color;
    byId('resultStatusAccent').style.background = statusData.accent;

    // Avatar
    if(r.avatar_url && r.avatar_url.startsWith("http")) {
        byId('resultAvatar').innerHTML = `<img src="${escapeHtml(r.avatar_url)}" alt="${fullName}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
        byId('resultAvatar').innerHTML = fullName.charAt(0).toUpperCase();
    }

    // Chips
    const chips = [];
    chips.push(`<span class="chip chip-p">🏢 ${dept}</span>`);
    if(r.location) chips.push(`<span class="chip chip-n">📍 ${escapeHtml(r.location)}</span>`);
    if(r.username) chips.push(`<span class="chip chip-n">@${escapeHtml(r.username)}</span>`);
    byId('chipsRow').innerHTML = chips.join('');

    // Grid Details
    const cells = [];
    cells.push(dc(formatDate(r.joined_at), 'Joined Date'));
    if(status === 'alumni' || r.ended_at) cells.push(dc(formatDate(r.ended_at), 'End Date'));
    else cells.push(dc('Currently Active', 'Status'));
    
    byId('detailGrid').innerHTML = cells.join('');

    // Bio
    if(r.bio){
        byId('descSection').style.display = 'block';
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
        byId('linksSection').style.display = 'block';
        byId('linksRow').innerHTML = links.join('');
    } else {
        byId('linksSection').style.display = 'none';
    }

    byId('resultState').style.display = 'block';
}

function dc(val,lbl){return `<div class="detail-cell"><div class="detail-val">${val}</div><div class="detail-lbl">${lbl}</div></div>`;}

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

    // Load data if not already loaded
    const success = await loadData();
    
    btn.disabled = false;
    btn.textContent = 'Verify Member';

    if(!success) {
        showError();
        return;
    }
    
    // Find member
    const member = allMembers.find(m => (m.member_id || "").toLowerCase() === id);
    
    if(!member) {
        showNotFound(byId('memberInput').value.trim().toUpperCase());
    } else {
        showResult(member);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Optionally pre-load data in background
    loadData();

    // Check URL params
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id') || p.get('member_id');
    if(id) {
        byId('memberInput').value = id.toUpperCase();
        verify();
    }
});
