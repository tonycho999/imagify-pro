const gifInput = document.getElementById('gif-upload');

gifInput.addEventListener('change', () => {
    document.getElementById('gif-controls').style.display = 'block';
});

async function processGif() {
    const file = gifInput.files[0];
    if (!file) return alert("Please upload a video first.");

    const log = document.getElementById('gif-log');
    const start = document.getElementById('gif-start').value;
    const duration = document.getElementById('gif-duration').value;

    log.innerText = "⏳ Loading FFmpeg engine...";
    if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

    log.innerText = "✂️ Converting and cutting...";
    window.ffmpeg.FS('writeFile', 'input.mp4', await FFmpeg.fetchFile(file));

    await window.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', start,
        '-t', duration,
        '-vf', 'fps=10,scale=320:-1',
        '-f', 'gif', 'output.gif'
    );

    const data = window.ffmpeg.FS('readFile', 'output.gif');
    
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    const img = document.createElement('img');
    img.src = url;
    
    const resultDiv = document.getElementById('gif-result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'imagify-cut.gif';
    link.innerText = "⬇️ Download GIF";
    link.style.display = "block";
    resultDiv.appendChild(link);
    
    log.innerText = "✅ Conversion Complete!";
}
