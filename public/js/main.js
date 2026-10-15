/* main.js */

// FFmpeg 초기화 (싱글스레드: SharedArrayBuffer 불필요)
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({
    log: false,
    mainName: 'main',
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

/**
 * core-st는 run() 한 번 후 종료되므로, 작업 전마다 엔진을 새로 띄움
 * gif.js, audio.js 등에서 await resetFFmpeg(); 로 사용
 */
window.resetFFmpeg = async function () {
    if (window.ffmpeg.isLoaded()) {
        try { window.ffmpeg.exit(); } catch (e) {}
    }
    await window.ffmpeg.load();
};

/**
 * 탭 전환
 * @param {string} tabName - 'gif', 'webp', 'meme', 'audio', 'icon'
 */
function switchTab(tabName) {
    document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));

    // id가 "tab-"로 시작하는 섹션만 숨김 (SEO 섹션은 유지)
    document.querySelectorAll('main section[id^="tab-"]').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    const activeBtn = document.getElementById('btn-' + tabName);
    if (activeBtn) activeBtn.classList.add('active');

    const activeSection = document.getElementById('tab-' + tabName);
    if (activeSection) {
        activeSection.classList.add('active');
        activeSection.style.display = 'block';
    }
}

// 예전 코드 호환용: 광고 없이 바로 실행
window.checkAd = function (callback) {
    if (typeof callback === 'function') callback();
};

document.addEventListener('DOMContentLoaded', function () {
    switchTab('gif');
    localStorage.removeItem('imagify_ad_data');
});
