async function processAudio() {
    const fileInput = document.getElementById('audio-upload');
    const log = document.getElementById('audio-log');
    const resultDiv = document.getElementById('audio-result');

    if (fileInput.files.length === 0) return alert("Please select a video file!");

    // [광고 체크]
    window.checkAd(async () => {
        const file = fileInput.files[0];
        log.innerText = "⏳ Preparing FFmpeg engine...";
        resultDiv.innerHTML = "";

        try {
            if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

            log.innerText = "🎵 Extracting Audio...";
            window.ffmpeg.FS('writeFile', 'input_video', await FFmpeg.fetchFile(file));
            await window.ffmpeg.run('-i', 'input_video', '-vn', '-acodec', 'libmp3lame', '-q:a', '2', 'output.mp3');

            const data = window.ffmpeg.FS('readFile', 'output.mp3');
            const blob = new Blob([data.buffer], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            
            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = url;
            audioPlayer.style.width = '100%';
            audioPlayer.style.marginTop = '15px';
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${file.name.split('.')[0]}.mp3`;
            link.innerText = "⬇️ Download MP3";
            link.className = "action-btn";
            link.style.display = "block";
            
            resultDiv.appendChild(audioPlayer);
            resultDiv.appendChild(link);
            log.innerText = "✅ Extraction Complete!";
        } catch (error) {
            console.error(error);
            log.innerText = "❌ Error occurred.";
        }
    });
}
