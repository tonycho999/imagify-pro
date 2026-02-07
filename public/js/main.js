/* main.js : 광고 및 공통 로직 */

// FFmpeg 초기화
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true });

// 탭 전환 함수
function switchTab(tabId) {
    document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
}

/* --- 🛑 [핵심] 보상형 광고 로직 시스템 --- */
const AD_CONFIG = {
    FREE_TIME: 10 * 60 * 1000, // 10분 무료 (밀리초)
    DAILY_LIMIT: 10,           // 하루 최대 10회
    WAIT_SECONDS: 5            // 5초 강제 시청
};

// 광고 체크 함수 (이 함수가 문지기 역할을 함)
window.checkAd = function(callback) {
    const now = new Date().getTime();
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜

    // 1. 저장된 기록 불러오기
    let storageData = JSON.parse(localStorage.getItem('imagify_ad_data')) || {
        date: today,
        count: 0,
        freeUntil: 0
    };

    // 2. 날짜가 바뀌었으면 초기화
    if (storageData.date !== today) {
        storageData = { date: today, count: 0, freeUntil: 0 };
        localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));
    }

    // 3. 광고 면제 조건 확인 (10분 이내이거나, 하루 10회 다 봤으면)
    if (storageData.count >= AD_CONFIG.DAILY_LIMIT || now < storageData.freeUntil) {
        callback(); // 광고 없이 바로 실행
        return;
    }

    // 4. 조건이 안 되면 광고 팝업 열기
    openAdModal(callback);
};

let countdownInterval;

function openAdModal(callback) {
    const modal = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    const timerTxt = document.getElementById('ad-timer-txt');
    
    modal.style.display = 'flex';
    
    // 버튼 잠그기 및 타이머 설정
    let timeLeft = AD_CONFIG.WAIT_SECONDS;
    closeBtn.disabled = true;
    closeBtn.style.opacity = "0.5";
    closeBtn.innerText = `Wait ${timeLeft}s...`;
    closeBtn.onclick = null; // 기존 이벤트 제거

    // 카운트다운 시작
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            closeBtn.innerText = `Wait ${timeLeft}s...`;
        } else {
            // 시간 종료: 버튼 활성화
            clearInterval(countdownInterval);
            closeBtn.disabled = false;
            closeBtn.style.opacity = "1";
            closeBtn.innerText = "Close & Start";
            
            // 닫기 버튼에 기능 연결
            closeBtn.onclick = function() {
                finishAd(callback);
            };
        }
    }, 1000);
}

function finishAd(callback) {
    // 1. 모달 닫기
    document.getElementById('ad-overlay').style.display = 'none';

    // 2. 보상 저장 (10분 무료 시간 부여 + 횟수 증가)
    const storageData = JSON.parse(localStorage.getItem('imagify_ad_data'));
    storageData.count += 1;
    storageData.freeUntil = new Date().getTime() + AD_CONFIG.FREE_TIME;
    
    localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));

    // 3. 실제 기능 실행
    callback();
}
