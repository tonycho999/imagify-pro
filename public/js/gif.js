/* gif.js : Video to GIF Converter */

const gifInput = document.getElementById('gif-upload');

// Show controls when file is selected
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
    
    // Check if FFmpeg is loaded (from main.js)
    if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

    log.innerText = "✂️ Processing video... (Converting & Cutting)";
    
    // Write file to memory
    window.ffmpeg.FS('writeFile', 'input.mp4', await FFmpeg.fetchFile(file));

    // Run FFmpeg command
    // -ss : Start time, -t : Duration
    // -vf : Filter (fps=10, scale width to 320px, keep aspect ratio)
    await window.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', start,
        '-t', duration,
        '-vf', 'fps=10,scale=320:-1',
        '-f', 'gif', 'output.gif'
    );

    // Read the result
    const data = window.ffmpeg.FS('readFile', 'output.gif');
    
    // Create URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    
    // Display result
    const img = document.createElement('img');
    img.src = url;
    
    const resultDiv = document.getElementById('gif-result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);
    
    // Download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'imagify-cut.gif';
    link.innerText = "⬇️ Download GIF";
    link.className = "action-btn"; // Apply button style
    link.style.display = "block";
    link.style.marginTop = "10px";
    link.style.textDecoration = "none";
    
    resultDiv.appendChild(link);
    
    log.innerText = "✅ Conversion Complete!";
}
