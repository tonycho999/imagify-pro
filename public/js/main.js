/* main.js */

// FFmpeg 초기화
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true });

// 탭 전환
function switchTab(tabId) {
    document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
}

/* --- 광고 시스템 설정 --- */
const AD_CONFIG = {
    FREE_TIME: 10 * 60 * 1000, // 10분 (ms)
    DAILY_LIMIT: 10,           // 하루 10회
    WAIT_SECONDS: 5            // 5초 대기
};

// 광고 체크 함수
window.checkAd = function(callback) {
    const now = new Date().getTime();
    const today = new Date().toISOString().split('T')[0];

    // 저장된 데이터 확인
    let storageData = JSON.parse(localStorage.getItem('imagify_ad_data')) || {
        date: today, count: 0, freeUntil: 0
    };

    // 날짜 변경 시 초기화
    if (storageData.date !== today) {
        storageData = { date: today, count: 0, freeUntil: 0 };
        localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));
    }

    // 조건 확인: 하루 제한 넘었거나, 무료 시간이 남았으면 바로 실행
    if (storageData.count >= AD_CONFIG.DAILY_LIMIT || now < storageData.freeUntil) {
        callback();
        return;
    }

    // 아니면 광고 팝업 오픈
    openAdModal(callback);
};

let countdownInterval;

function openAdModal(callback) {
    const modal = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    
    modal.style.display = 'flex';
    
    let timeLeft = AD_CONFIG.WAIT_SECONDS;
    closeBtn.disabled = true;
    closeBtn.style.opacity = "0.5";
    closeBtn.innerText = `Wait ${timeLeft}s...`;
    closeBtn.onclick = null; 

    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            closeBtn.innerText = `Wait ${timeLeft}s...`;
        } else {
            clearInterval(countdownInterval);
            closeBtn.disabled = false;
            closeBtn.style.opacity = "1";
            closeBtn.innerText = "Close & Start";
            
            closeBtn.onclick = function() {
                finishAd(callback);
            };
        }
    }, 1000);
}

function finishAd(callback) {
    document.getElementById('ad-overlay').style.display = 'none';

    // 보상 지급 및 저장
    const storageData = JSON.parse(localStorage.getItem('imagify_ad_data'));
    storageData.count += 1;
    storageData.freeUntil = new Date().getTime() + AD_CONFIG.FREE_TIME;
    
    localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));

    callback();
}
