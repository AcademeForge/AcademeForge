
"use strict";

const API_URL = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/af-certificate-api";

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

function showResult(r) {
    resetCards();
    byId('statusPanel').classList.add('success');
    
    byId('resultName').textContent = r.full_name || '—';
    byId('resultRole').textContent = [r.role, r.department].filter(Boolean).join(' · ') || '—';
    byId('resultCertId').textContent = r.certificate_id || '—';

    const chips = [];
    if(r.category)         chips.push(`<span class="chip">🏷️ ${r.category}</span>`);
    if(r.work_type)        chips.push(`<span class="chip">⚡ ${r.work_type}</span>`);
    if(r.stipend)          chips.push(`<span class="chip">💰 ${r.stipend}</span>`);
    byId('chipsRow').innerHTML = chips.join('');

    byId('resultIssueDate').textContent = fmtDate(r.issue_date);
    byId('resultDept').textContent = r.department || '—';
    byId('resultType').textContent = r.certificate_type || '—';

    if(r.signatory_name){
        byId('signatorySection').style.display = 'grid';
        byId('signName').textContent = r.signatory_name;
        byId('signRole').textContent = r.signatory_role || 'Authorized Signatory';
        byId('signAva').textContent = initials(r.signatory_name);
    } else {
        byId('signatorySection').style.display = 'none';
    }

    if(r.description){
        byId('descSection').style.display = 'grid';
        byId('descBlock').textContent = r.description;
    } else {
        byId('descSection').style.display = 'none';
    }

    byId('resultState').style.display = 'block';
}

function fmtDate(d){if(!d)return'—';try{return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});}catch{return d;}}
function initials(name){return(name||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0].toUpperCase()).join('');}

async function verify() {
    const id = byId('certInput').value.trim().toUpperCase();
    if(!id) return;

    resetCards();
    byId('loadingState').style.display = 'flex';
    const btn = byId('verifyBtn');
    btn.disabled = true;
    btn.textContent = 'Verifying...';

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'verify', certificate_id: id})
        });
        const data = await res.json();
        
        btn.disabled = false;
        btn.textContent = 'Verify Certificate';

        if(!data.success) { showError(); return; }
        if(!data.found) { showNotFound(id); }
        else { showResult(data.record); }

    } catch(e) {
        btn.disabled = false;
        btn.textContent = 'Verify Certificate';
        showError();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id') || p.get('cert') || p.get('certificate_id');
    if(id) {
        byId('certInput').value = id.toUpperCase();
        verify();
    }
});
