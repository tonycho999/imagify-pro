/* icon.js : 앱 아이콘(192, 512) 생성 기능 */

async function processIcon() {
    const fileInput = document.getElementById('icon-upload');
    const log = document.getElementById('icon-log');
    const resultDiv = document.getElementById('icon-result');

    // 1. 파일 선택 확인
    if (fileInput.files.length === 0) {
        return alert("아이콘으로 만들 이미지를 선택해주세요!");
    }

    const file = fileInput.files[0];
    log.innerText = "⏳ 아이콘 생성 중...";
    resultDiv.innerHTML = ""; // 이전 결과 지우기

    // 2. 이미지 불러오기
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        // 3. 512px, 192px 아이콘 생성
        createIcon(img, 512, 'icon-512.png', resultDiv);
        createIcon(img, 192, 'icon-192.png', resultDiv);
        
        log.innerText = "✅ 아이콘 생성 완료!";
    };
}

// 아이콘 생성 및 다운로드 버튼을 만드는 함수
function createIcon(imgElement, size, fileName, container) {
    // 1. 캔버스 생성
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 2. 이미지 그리기 (강제로 지정된 사이즈로 맞춤)
    // 원본 비율 유지하고 싶다면 계산 로직이 필요하지만, 아이콘은 보통 꽉 채웁니다.
    ctx.drawImage(imgElement, 0, 0, size, size);

    // 3. 이미지 데이터 URL 추출
    const dataUrl = canvas.toDataURL('image/png');

    // 4. 화면에 표시할 요소 생성 (래퍼 Div)
    const wrapper = document.createElement('div');
    wrapper.style.display = "inline-block";
    wrapper.style.margin = "10px";
    wrapper.style.textAlign = "center";

    // 5. 미리보기 이미지
    const previewImg = document.createElement('img');
    previewImg.src = dataUrl;
    previewImg.style.width = size > 128 ? '128px' : size + 'px'; // 화면엔 너무 크지 않게 표시
    previewImg.style.border = "1px solid #ddd";
    previewImg.style.borderRadius = "15px";
    previewImg.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

    // 6. 다운로드 버튼
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.innerText = `⬇️ ${size}x${size} 저장`;
    link.className = "action-btn"; // CSS 스타일 적용
    link.style.fontSize = "14px";
    link.style.padding = "8px 15px";
    link.style.marginTop = "5px";

    // 7. 조립해서 화면에 넣기
    wrapper.appendChild(previewImg);
    wrapper.appendChild(document.createElement('br')); // 줄바꿈
    wrapper.appendChild(link);
    container.appendChild(wrapper);
}
