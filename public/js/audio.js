/* audio.js : 비디오에서 MP3 추출 기능 */

async function processAudio() {
    const fileInput = document.getElementById('audio-upload');
    const log = document.getElementById('audio-log');
    const resultDiv = document.getElementById('audio-result');

    // 1. 파일 선택 확인
    if (fileInput.files.length === 0) {
        return alert("MP3로 변환할 비디오 파일을 선택해주세요!");
    }

    const file = fileInput.files[0];

    // 2. UI 초기화
    log.innerText = "⏳ FFmpeg 엔진 준비 중...";
    resultDiv.innerHTML = ""; // 이전 결과 지우기

    try {
        // main.js에서 생성한 window.ffmpeg가 로드되었는지 확인
        if (!window.ffmpeg.isLoaded()) {
            await window.ffmpeg.load();
        }

        log.innerText = "🎵 오디오 추출 중... (영상 길이에 따라 시간이 걸릴 수 있습니다)";

        // 3. 파일 메모리에 쓰기
        // (FFmpeg.fetchFile을 사용하여 파일 데이터를 바이너리로 변환)
        window.ffmpeg.FS('writeFile', 'input_video', await FFmpeg.fetchFile(file));

        // 4. 변환 명령어 실행 (핵심)
        // -i input_video      : 입력 파일
        // -vn                 : 비디오 트랙 제거 (Video No)
        // -acodec libmp3lame  : MP3 코덱 사용
        // -q:a 2              : 오디오 품질 (0~9, 2는 표준 고음질 VBR)
        // output.mp3          : 출력 파일명
        await window.ffmpeg.run('-i', 'input_video', '-vn', '-acodec', 'libmp3lame', '-q:a', '2', 'output.mp3');

        // 5. 결과 파일 읽기
        const data = window.ffmpeg.FS('readFile', 'output.mp3');

        // 6. 다운로드용 URL 생성 (Blob)
        const blob = new Blob([data.buffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);

        // 7. 화면에 결과 표시
        
        // A) 바로 들어볼 수 있는 오디오 플레이어
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = url;
        audioPlayer.style.width = '100%';
        audioPlayer.style.marginTop = '15px';
        
        // B) 다운로드 버튼
        const link = document.createElement('a');
        link.href = url;
        
        // 파일명 설정 (원본이름.mp3)
        const originalName = file.name.split('.').slice(0, -1).join('.');
        link.download = `${originalName}.mp3`;
        
        link.innerText = "⬇️ MP3 다운로드";
        link.className = "action-btn"; // CSS 스타일 적용
        link.style.display = "block";
        link.style.marginTop = "10px";
        link.style.textDecoration = "none";
        link.style.textAlign = "center";

        // 화면에 추가
        resultDiv.appendChild(audioPlayer);
        resultDiv.appendChild(link);

        log.innerText = "✅ 추출 완료!";

        // (선택) 메모리 정리: 파일 삭제
        // window.ffmpeg.FS('unlink', 'input_video');
        // window.ffmpeg.FS('unlink', 'output.mp3');

    } catch (error) {
        console.error(error);
        log.innerText = "❌ 오류가 발생했습니다. (브라우저가 mp3 변환을 지원하지 않을 수 있습니다)";
    }
}
