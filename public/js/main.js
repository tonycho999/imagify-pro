/* main.js */

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

/* --- 광고 시스템 설정 --- */
const AD_CONFIG = {
    FREE_TIME: 10 * 60 * 1000, // 10분 무료
    DAILY_LIMIT: 10,           // 하루 10회
    WAIT_SECONDS: 5            // 5초 대기
};

// [중요] 구글 광고 안전 로딩 함수
// 팝업이 display:none 상태일 때 광고를 로딩하면 에러가 나므로,
// 팝업이 보일 때 이 함수를 호출해 광고를 불러옵니다.
function loadAds() {
    try {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach(ad => {
            // 아직 로딩되지 않은 광고만 골라서 push 실행
            if (!ad.getAttribute('data-ad-status')) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        });
    } catch (e) {
        console.log("Ad load deferred");
    }
}

// 페이지 로드 시
window.onload = function() {
    const now = new Date().getTime();
    const today = new Date().toISOString().split('T')[0];
    
    let storageData = JSON.parse(localStorage.getItem('imagify_ad_data'));
    const isFreeUser = storageData && storageData.date === today && now < storageData.freeUntil;

    // 무료 사용자가 '아니면' 웰컴 팝업 띄우기
    if (!isFreeUser) {
        document.getElementById('welcome-overlay').style.display = 'flex';
    }
    
    // *참고: 무료 사용자라도 하단 '게임 배너'는 계속 보여줍니다 (House Ad).
    // 만약 무료 사용자에게 하단 게임 배너도 숨기고 싶다면 아래 주석을 해제하세요.
    /*
    if (isFreeUser) {
        const promo = document.getElementById('bottom-game-promo');
        if (promo) promo.style.display = 'none';
    }
    */
};

window.closeWelcome = function() {
    document.getElementById('welcome-overlay').style.display = 'none';
};

window.startWithAd = function() {
    closeWelcome();
    // 웰컴 팝업 닫고 -> 바로 광고 체크(팝업) 실행
    window.checkAd(() => {
        alert("🎉 You have 10 minutes of free time now!");
    });
};

// 광고 체크 및 팝업 실행 함수
window.checkAd = function(callback) {
    const now = new Date().getTime();
    const today = new Date().toISOString().split('T')[0];
    let storageData = JSON.parse(localStorage.getItem('imagify_ad_data')) || {
        date: today, count: 0, freeUntil: 0
    };

    if (storageData.date !== today) {
        storageData = { date: today, count: 0, freeUntil: 0 };
        localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));
    }

    if (storageData.count >= AD_CONFIG.DAILY_LIMIT || now < storageData.freeUntil) {
        callback();
        return;
    }

    openAdModal(callback);
};

let countdownInterval;

function openAdModal(callback) {
    const modal = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    
    // 1. 팝업 보여주기
    modal.style.display = 'flex';
    
    // 2. [핵심] 팝업이 보이고 난 뒤, 아주 조금 있다가 광고 로딩 (에러 방지)
    setTimeout(loadAds, 100);

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

    const storageData = JSON.parse(localStorage.getItem('imagify_ad_data')) || { count: 0 };
    storageData.count += 1;
    storageData.freeUntil = new Date().getTime() + AD_CONFIG.FREE_TIME;
    storageData.date = new Date().toISOString().split('T')[0];
    
    localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));
    callback();
}
