/* main.js */

// 1. FFmpeg 초기화 (필요시 사용)
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true });

/**
 * [핵심 기능] 탭 전환 함수
 * @param {string} tabName - 활성화할 탭 이름 (예: 'gif', 'webp')
 */
function switchTab(tabName) {
    // 1-1. 모든 탭 버튼 비활성화
    const buttons = document.querySelectorAll('.nav button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 1-2. 모든 섹션(화면) 숨기기
    const sections = document.querySelectorAll('main section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none'; // 확실하게 숨김
    });

    // 2-1. 선택된 버튼 활성화
    const activeBtn = document.getElementById('btn-' + tabName);
    if (activeBtn) activeBtn.classList.add('active');

    // 2-2. 선택된 섹션 보여주기
    const activeSection = document.getElementById('tab-' + tabName);
    if (activeSection) {
        activeSection.classList.add('active');
        activeSection.style.display = 'block'; // 확실하게 보임
    }
}

/* --- 광고 시스템 설정 --- */
const AD_CONFIG = {
    FREE_TIME: 10 * 60 * 1000, // 10분 무료
    DAILY_LIMIT: 10,           // 하루 10회
    WAIT_SECONDS: 5            // 5초 대기
};

// [중요] 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 1. 초기 탭 설정 (GIF 탭 강제 표시)
    switchTab('gif');

    // 2. 광고 및 사용자 상태 체크
    checkUserStatus();
});

// 사용자 상태(무료/유료) 체크 후 웰컴 팝업 띄우기
function checkUserStatus() {
    const now = new Date().getTime();
    const today = new Date().toISOString().split('T')[0];
    
    let storageData = JSON.parse(localStorage.getItem('imagify_ad_data'));
    
    // 데이터가 없거나, 날짜가 지났으면 초기화
    if (!storageData || storageData.date !== today) {
        storageData = { date: today, count: 0, freeUntil: 0 };
        localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));
    }

    const isFreeUser = now < storageData.freeUntil;

    // 무료 사용 시간이 끝났으면 웰컴 팝업 띄우기
    if (!isFreeUser) {
        const welcomeOverlay = document.getElementById('welcome-overlay');
        if (welcomeOverlay) welcomeOverlay.style.display = 'flex';
    }
}

/* --- 팝업 제어 함수들 --- */

// 웰컴 팝업 닫기 (그냥 둘러보기)
window.closeWelcome = function() {
    document.getElementById('welcome-overlay').style.display = 'none';
};

// 광고 보고 시작하기 버튼 클릭 시
window.startWithAd = function() {
    closeWelcome(); // 웰컴 팝업 닫고
    openAdModal();  // 광고 팝업 열기
};

// 광고 팝업 열기 및 타이머 시작
function openAdModal() {
    const modal = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('ad-close-btn');
    const timerTxt = document.getElementById('ad-timer-txt');

    // 1. 팝업 보여주기
    modal.style.display = 'flex';

    // 2. [핵심] 광고 로딩 (팝업이 보인 후 실행해야 에러 안 남)
    // 약간의 지연(100ms)을 주어 DOM 렌더링 후 실행
    setTimeout(() => {
        try {
            const adIns = modal.querySelector('.adsbygoogle');
            // 내용이 비어있을 때만 광고 요청 (중복 방지)
            if (adIns && adIns.innerHTML.trim() === "") {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense load error:", e);
        }
    }, 100);

    // 3. 카운트다운 타이머 시작
    let timeLeft = AD_CONFIG.WAIT_SECONDS;
    
    // 버튼 초기화
    closeBtn.disabled = true;
    closeBtn.style.opacity = "0.5";
    closeBtn.innerText = `Wait ${timeLeft}s...`;
    
    // 기존 타이머 있으면 제거
    if (window.adTimer) clearInterval(window.adTimer);

    window.adTimer = setInterval(() => {
        timeLeft--;
        if (timerTxt) timerTxt.innerText = `Please wait ${timeLeft} seconds...`;
        
        if (timeLeft > 0) {
            closeBtn.innerText = `Wait ${timeLeft}s...`;
        } else {
            // 시간 종료: 버튼 활성화
            clearInterval(window.adTimer);
            if (timerTxt) timerTxt.innerText = "Thanks for waiting!";
            
            closeBtn.disabled = false;
            closeBtn.style.opacity = "1";
            closeBtn.innerText = "Close & Start";
            
            // 닫기 버튼 클릭 시 무료 시간 부여
            closeBtn.onclick = function() {
                finishAd();
            };
        }
    }, 1000);
}

// 광고 시청 완료 후 처리
function finishAd() {
    document.getElementById('ad-overlay').style.display = 'none';

    // 무료 시간 데이터 저장
    const storageData = JSON.parse(localStorage.getItem('imagify_ad_data')) || { count: 0 };
    storageData.count += 1;
    storageData.freeUntil = new Date().getTime() + AD_CONFIG.FREE_TIME;
    storageData.date = new Date().toISOString().split('T')[0];
    
    localStorage.setItem('imagify_ad_data', JSON.stringify(storageData));

    alert("🎉 You have 10 minutes of free access!");
}
