/* main.js */

// 1. FFmpeg 초기화
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true }); // 배포 시 false 권장

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

/* --- 광고 시스템 설정 --- */
const AD_CONFIG = {
    FREE_TIME: 10 * 60 * 1000, // 광고 1회 시청 시 10분 무료
    DAILY_LIMIT: 10,           // 하루 최대 광고 횟수 (넘으면 광고 없이 사용)
    WAIT_SECONDS: 5,           // 광고 대기 시간(초)
    STORAGE_KEY: 'imagify_ad_data'
};

// 광고 시청 후 실행할 작업 (예: GIF 변환)
let pendingAction = null;

// 로컬(한국) 시간 기준 날짜 "YYYY-MM-DD"
function getToday() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function saveAdData(data) {
    localStorage.setItem(AD_CONFIG.STORAGE_KEY, JSON.stringify(data));
}

function getAdData() {
    let data = null;
    try {
        data = JSON.parse(localStorage.getItem(AD_CONFIG.STORAGE_KEY));
    } catch (e) {
        data = null; // 저장값이 깨졌을 때 대비
    }

    // 날짜가 바뀌면 횟수만 초기화 (남은 무료 시간은 유지)
    if (!data || data.date !== getToday()) {
        data = { date: getToday(), count: 0, freeUntil: (data && data.freeUntil) || 0 };
        saveAdData(data);
    }
    return data;
}

// 지금 광고 없이 쓸 수 있는지
function isFreeNow() {
    const data = getAdData();
    return Date.now() < data.freeUntil || data.count >= AD_CONFIG.DAILY_LIMIT;
}

/**
 * [핵심] 광고 체크 후 작업 실행
 * gif.js 등에서 window.checkAd(async () => { ... }) 형태로 사용
 */
window.checkAd = function (callback) {
    if (typeof callback !== 'function') return;

    // 무료 시간이거나, 광고 팝업 HTML이 없으면 바로 실행
    if (isFreeNow() || !document.getElementById('ad-overlay')) {
        callback();
        return;
    }

    pendingAction = callback;
    openAdModal();
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    switchTab('gif');
    checkUserStatus();
});

// 무료 시간이 아니면 웰컴 팝업 표시
function checkUserStatus() {
    if (isFreeNow()) return;
    const welcome = document.getElementById('welcome-overlay');
    if (welcome) welcome.style.display = 'flex';
}

/* --- 팝업 제어 --- */

// 웰컴 팝업 닫기 (그냥 둘러보기)
window.closeWelcome = function () {
    const welcome = document.getElementById('welcome-overlay');
    if (welcome) welcome.style.display = 'none';
};

// 광고 보고 시작하기
window.startWithAd = function () {
    closeWelcome();
    openAdModal();
};

// 광고 팝업 열기 + 타이머
function openAdModal() {
    const modal = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    const timerTxt = document.getElementById('ad-timer-txt');

    if (!modal || !closeBtn) {
        // 팝업 HTML이 없으면 광고 없이 진행
        runPendingAction();
        return;
    }

    modal.style.display = 'flex';

    // 팝업이 화면에 나온 뒤 광고 요청
    setTimeout(() => {
        try {
            const adIns = modal.querySelector('.adsbygoogle');
            if (adIns && adIns.innerHTML.trim() === '') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error('AdSense 로드 오류:', e);
        }
    }, 100);

    let timeLeft = AD_CONFIG.WAIT_SECONDS;

    closeBtn.disabled = true;
    closeBtn.onclick = null;
    closeBtn.style.opacity = '0.5';
    closeBtn.innerText = `${timeLeft}초 기다려주세요...`;
    if (timerTxt) timerTxt.innerText = `${timeLeft}초 후 시작할 수 있어요`;

    if (window.adTimer) clearInterval(window.adTimer);

    window.adTimer = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0) {
            closeBtn.innerText = `${timeLeft}초 기다려주세요...`;
            if (timerTxt) timerTxt.innerText = `${timeLeft}초 후 시작할 수 있어요`;
        } else {
            clearInterval(window.adTimer);
            if (timerTxt) timerTxt.innerText = '기다려주셔서 감사합니다! 🙏';

            closeBtn.disabled = false;
            closeBtn.style.opacity = '1';
            closeBtn.innerText = '닫고 시작하기';
            closeBtn.onclick = finishAd;
        }
    }, 1000);
}

// 광고 시청 완료 처리
function finishAd() {
    const modal = document.getElementById('ad-overlay');
    if (modal) modal.style.display = 'none';

    const data = getAdData();
    data.count += 1;
    data.freeUntil = Date.now() + AD_CONFIG.FREE_TIME;
    saveAdData(data);

    alert(`🎉 ${AD_CONFIG.FREE_TIME / 60000}분 동안 광고 없이 이용할 수 있어요!`);
    runPendingAction();
}

// 대기 중이던 작업 실행 (예: 광고 후 바로 GIF 변환)
function runPendingAction() {
    if (typeof pendingAction === 'function') {
        const action = pendingAction;
        pendingAction = null;
        action();
    }
}
