/* audio.js : Video to MP3 Extractor */

async function processAudio() {
    const fileInput = document.getElementById('audio-upload');
    const log = document.getElementById('audio-log');
    const resultDiv = document.getElementById('audio-result');

    if (fileInput.files.length === 0) {
        return alert("Please select a video file!");
    }

    const file = fileInput.files[0];
    log.innerText = "⏳ Preparing FFmpeg engine...";
    resultDiv.innerHTML = "";

    try {
        if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

        log.innerText = "🎵 Extracting Audio... (Wait a moment)";
        
        // Write file
        window.ffmpeg.FS('writeFile', 'input_video', await FFmpeg.fetchFile(file));

        // Run FFmpeg: -vn (No Video), -acodec libmp3lame (MP3)
        await window.ffmpeg.run('-i', 'input_video', '-vn', '-acodec', 'libmp3lame', '-q:a', '2', 'output.mp3');

        // Read file
        const data = window.ffmpeg.FS('readFile', 'output.mp3');
        const blob = new Blob([data.buffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        
        // Create Audio Player
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = url;
        audioPlayer.style.width = '100%';
        audioPlayer.style.marginTop = '15px';
        
        // Create Download Button
        const link = document.createElement('a');
        link.href = url;
        // Use original filename with .mp3 extension
        link.download = `${file.name.split('.')[0]}.mp3`;
        link.innerText = "⬇️ Download MP3";
        link.className = "action-btn";
        link.style.display = "block";
        link.style.marginTop = "10px";
        link.style.textDecoration = "none";
        link.style.textAlign = "center";

        resultDiv.appendChild(audioPlayer);
        resultDiv.appendChild(link);
        log.innerText = "✅ Extraction Complete!";

    } catch (error) {
        console.error(error);
        log.innerText = "❌ Error occurred.";
    }
}
