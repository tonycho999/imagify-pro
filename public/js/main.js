/* main.js */

// FFmpeg 초기화
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: false });

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

// gif.js 등에서 쓰는 window.checkAd(...) 호환용: 광고 없이 바로 실행
window.checkAd = function (callback) {
    if (typeof callback === 'function') callback();
};

document.addEventListener('DOMContentLoaded', function () {
    switchTab('gif');
    // 예전 광고 기록 정리
    localStorage.removeItem('imagify_ad_data');
});
