const gifInput = document.getElementById('gif-upload');
// 파일 선택 시 시간 설정창 보여주기
gifInput.addEventListener('change', () => {
    document.getElementById('gif-controls').style.display = 'block';
});

async function processGif() {
    const file = gifInput.files[0];
    if (!file) return alert("비디오를 먼저 올려주세요.");

    const log = document.getElementById('gif-log');
    const start = document.getElementById('gif-start').value;
    const duration = document.getElementById('gif-duration').value;

    log.innerText = "⏳ 엔진 로딩 중...";
    if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

    log.innerText = "✂️ 변환 및 자르기 중...";
    window.ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

    // 핵심: -ss(시작시간) -t(지속시간) 옵션 사용
    await window.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', start,
        '-t', duration,
        '-vf', 'fps=10,scale=320:-1', // 용량 최적화 (10프레임, 너비 320px)
        '-f', 'gif', 'output.gif'
    );

    const data = window.ffmpeg.FS('readFile', 'output.gif');
    
    // 결과 표시
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    const img = document.createElement('img');
    img.src = url;
    
    const resultDiv = document.getElementById('gif-result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);
    
    // 다운로드 버튼
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cut-video.gif';
    link.innerText = "⬇️ 다운로드";
    link.style.display = "block";
    resultDiv.appendChild(link);
    
    log.innerText = "✅ 완료!";
}
