/* Set Minimum Date on Load */
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('booking-date');
    if(dateInput) dateInput.setAttribute('min', today);
});

const state = {
    layanan: null,
    kategori: null,
    lokasi: null,
    tanggal: '',
    waktu: '',
    requests: [],
    catatan: '',
    total: 0
};

const basePrices = {
    'Fotografi': 500000,
    'Videografi': 800000
};

function selectOption(stepId, value) {
    // Update state
    state[stepId] = value;

    // Highlight selected card visually
    const section = document.getElementById(stepId);
    const cards = section.querySelectorAll('.option-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    // Find clicked card (a bit simplistic but works as each card onclick passes the value)
    const targetCard = Array.from(cards).find(card => card.textContent.includes(value.split(' ')[0]));
    if(targetCard) targetCard.classList.add('selected');

    // Show action buttons for this step
    const actionDiv = document.getElementById(`action-${stepId}`);
    if (actionDiv) {
        actionDiv.classList.remove('hidden');
    }
}

function nextStep(nextId) {
    // Basic validation before jumping to schedule
    if (nextId === 'jadwal' && (!state.layanan || !state.kategori || !state.lokasi)) {
        alert("Silakan lengkapi pilihan sebelumnya terlebih dahulu.");
        return;
    }

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    // Show next step
    document.getElementById(nextId).classList.add('active');
}

function prevStep(prevId) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(prevId).classList.add('active');
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function updateReceipt() {
    // Gather inputs
    state.tanggal = document.getElementById('booking-date').value;
    state.waktu = document.getElementById('booking-time').value;
    
    const checkboxes = document.querySelectorAll('#request input[type="checkbox"]:checked');
    state.requests = Array.from(checkboxes).map(cb => {
        // Extract price from string e.g "Mesin Asap (+Rp 150.000)"
        let price = 0;
        if(cb.value.includes('150.000')) price = 150000;
        if(cb.value.includes('200.000')) price = 200000;
        if(cb.value.includes('100.000')) price = 100000;
        return { name: cb.value.split(' (+')[0], price: price };
    });

    state.catatan = document.getElementById('catatan').value;
}

function generateReceipt() {
    updateReceipt();
    
    const receiptBody = document.getElementById('receipt-content');
    const receiptTotalDiv = document.getElementById('receipt-total');
    
    let html = '';
    let total = 0;

    // Base Service
    if(state.layanan) {
        const base = basePrices[state.layanan] || 0;
        total += base;
        html += `<div class="receipt-row"><span>Layanan Utama (${state.layanan})</span><span>${formatRupiah(base)}</span></div>`;
        html += `<div class="receipt-row subtext"><span>Kategori: ${state.kategori || '-'} | Lokasi: ${state.lokasi || '-'}</span></div>`;
    }

    // Schedule
    html += `<div class="receipt-row subtext" style="color:var(--primary); margin-top:5px;"><span>Jadwal: ${state.tanggal || 'Belum diisi'} - ${state.waktu || 'Belum diisi'}</span></div>`;

    // Special Requests
    if(state.requests.length > 0) {
        html += `<div style="margin: 15px 0 5px; font-weight: 600;">Permintaan Khusus:</div>`;
        state.requests.forEach(req => {
            total += req.price;
            html += `<div class="receipt-row"><span>- ${req.name}</span><span>${formatRupiah(req.price)}</span></div>`;
        });
    }

    if(state.catatan) {
        html += `<div class="receipt-row subtext" style="margin-top:15px; font-style:italic;">Catatan: "${state.catatan}"</div>`;
    }

    receiptBody.innerHTML = html;
    
    state.total = total;
    receiptTotalDiv.innerHTML = `<span>Total Estimasi</span><span style="color: var(--primary)">${formatRupiah(total)}</span>`;
}

function finishBooking() {
    // Format text for WhatsApp
    let text = `Halo Admin Antigravity,%0A%0ASaya ingin melakukan pemesanan booking dengan detail:%0A%0A`;
    text += `🔹 *Layanan:* ${state.layanan}%0A`;
    text += `🔹 *Kategori:* ${state.kategori}%0A`;
    text += `🔹 *Lokasi:* ${state.lokasi}%0A`;
    text += `🔹 *Tanggal:* ${state.tanggal}%0A`;
    text += `🔹 *Waktu:* ${state.waktu}%0A`;
    
    if(state.requests.length > 0) {
        text += `%0A*Permintaan Khusus:*%0A`;
        state.requests.forEach(r => text += `- ${r.name}%0A`);
    }
    
    if(state.catatan) {
        text += `%0A*Catatan:* ${state.catatan}%0A`;
    }
    
    text += `%0A*Total Estimasi:* ${formatRupiah(state.total)}%0A`;
    text += `%0ATerima Kasih!`;

    // Replace with your actual connected WhatsApp business number
    const waNumber = '6281234567890'; // Use country code without +
    const waLink = `https://wa.me/${waNumber}?text=${text}`;
    
    window.open(waLink, '_blank');
}
