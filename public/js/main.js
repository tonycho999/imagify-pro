// 전역 변수로 설정 (다른 JS파일에서 쓰기 위해)
const { createFFmpeg, fetchFile } = FFmpeg;
window.ffmpeg = createFFmpeg({ log: true });

// 탭 전환 함수
function switchTab(tabId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(el => el.classList.remove('active'));
    
    // 선택한 섹션 보이기
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
}
