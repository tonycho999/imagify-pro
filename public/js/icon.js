/* icon.js */
async function processIcon() {
    const fileInput = document.getElementById('icon-upload');
    const log = document.getElementById('icon-log');
    const resultDiv = document.getElementById('icon-result');

    if (fileInput.files.length === 0) return alert("Please upload an image!");

    // 광고 체크 후 실행 (main.js의 checkAd 함수 의존)
    if (window.checkAd) {
        window.checkAd(() => runGeneration());
    } else {
        // main.js가 로드되지 않았을 경우를 대비한 안전장치
        runGeneration();
    }

    function runGeneration() {
        const file = fileInput.files[0];
        log.innerText = "⏳ Generating icons...";
        resultDiv.innerHTML = ""; // 이전 결과 초기화

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = function() {
            // 1. App Icon (512x512) - Play Store / App Store
            createIcon(img, 512, 'icon-512.png', resultDiv);
            
            // 2. Android Icon (192x192)
            createIcon(img, 192, 'icon-192.png', resultDiv);
            
            // 3. iPhone/iPad Icon (180x180)
            createIcon(img, 180, 'icon-180.png', resultDiv);

            // 4. [추가됨] Favicon (32x32) - 브라우저 탭 아이콘
            createIcon(img, 32, 'favicon.png', resultDiv);

            log.innerText = "✅ All Icons & Favicon Generated!";
        };
    }
}

function createIcon(imgElement, size, fileName, container) {
    // 캔버스 생성 및 리사이징
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 이미지 부드럽게 리사이징 (품질 향상)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(imgElement, 0, 0, size, size);

    const dataUrl = canvas.toDataURL('image/png');

    // 결과를 담을 박스 생성
    const wrapper = document.createElement('div');
    wrapper.style.display = "inline-flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.margin = "10px";
    wrapper.style.padding = "10px";
    wrapper.style.border = "1px solid #eee";
    wrapper.style.borderRadius = "10px";
    wrapper.style.background = "#fff";

    // 미리보기 이미지
    const previewImg = document.createElement('img');
    previewImg.src = dataUrl;
    
    // 32px 파비콘은 너무 작아 보일 수 있으므로 미리보기에서는 최소 64px로 보여줌
    const displaySize = size < 64 ? 64 : (size > 128 ? 128 : size);
    
    previewImg.style.width = displaySize + 'px';
    previewImg.style.height = displaySize + 'px';
    previewImg.style.objectFit = "contain";
    previewImg.style.borderRadius = "8px";
    previewImg.style.marginBottom = "10px";
    if(size === 32) previewImg.style.imageRendering = "pixelated"; // 파비콘은 픽셀 보이게

    // 라벨 (크기 표시)
    const label = document.createElement('span');
    label.innerText = size === 32 ? "Favicon (32px)" : `${size}x${size}`;
    label.style.fontSize = "12px";
    label.style.color = "#666";
    label.style.marginBottom = "5px";
    label.style.fontWeight = "bold";

    // 다운로드 버튼
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.innerText = "⬇️ Save";
    link.className = "action-btn"; // CSS 클래스 적용
    link.style.fontSize = "13px";
    link.style.padding = "5px 12px";
    link.style.margin = "0";

    wrapper.appendChild(label);
    wrapper.appendChild(previewImg);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
}
