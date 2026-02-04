/* main.js : Common Logic */

// Initialize FFmpeg
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true });

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(el => el.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
}

// Ad Modal Functions
window.openAdModal = function() {
    document.getElementById('ad-overlay').style.display = 'flex';
    document.getElementById('ad-status').innerText = "⏳ Processing...";
}

window.closeAdModal = function() {
    document.getElementById('ad-overlay').style.display = 'none';
}
