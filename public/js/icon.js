/* icon.js : App Icon Generator (512, 192) */

async function processIcon() {
    const fileInput = document.getElementById('icon-upload');
    const log = document.getElementById('icon-log');
    const resultDiv = document.getElementById('icon-result');

    if (fileInput.files.length === 0) {
        return alert("Please upload an image!");
    }

    const file = fileInput.files[0];
    log.innerText = "⏳ Generating icons...";
    resultDiv.innerHTML = "";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        createIcon(img, 512, 'icon-512.png', resultDiv);
        createIcon(img, 192, 'icon-192.png', resultDiv);
        log.innerText = "✅ Icons Generated!";
    };
}

function createIcon(imgElement, size, fileName, container) {
    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Draw Image (Resize)
    ctx.drawImage(imgElement, 0, 0, size, size);

    const dataUrl = canvas.toDataURL('image/png');

    // Create UI Elements
    const wrapper = document.createElement('div');
    wrapper.style.display = "inline-block";
    wrapper.style.margin = "10px";
    wrapper.style.textAlign = "center";

    const previewImg = document.createElement('img');
    previewImg.src = dataUrl;
    previewImg.style.width = size > 128 ? '128px' : size + 'px';
    previewImg.style.border = "1px solid #ddd";
    previewImg.style.borderRadius = "15px";
    previewImg.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.innerText = `⬇️ Save ${size}x${size}`;
    link.className = "action-btn";
    link.style.fontSize = "14px";
    link.style.padding = "8px 15px";
    link.style.marginTop = "5px";
    link.style.textDecoration = "none";

    wrapper.appendChild(previewImg);
    wrapper.appendChild(document.createElement('br'));
    wrapper.appendChild(link);
    container.appendChild(wrapper);
}
