/* webp.js : 이미지 WebP 변환 로직 */

function processWebp() {
    const fileInput = document.getElementById('webp-upload');
    const log = document.getElementById('webp-log');
    
    // 1. 파일 선택 확인
    if (fileInput.files.length === 0) {
        alert("변환할 이미지를 선택해주세요! (Please select an image!)");
        return;
    }

    // 2. 변환 로직 (내부 함수)
    const runConversion = () => {
        const file = fileInput.files[0];
        log.innerHTML = "⏳ Converting... (변환 중)";

        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // 3. 캔버스 생성 및 그리기
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // 4. WebP로 변환 (품질 0.8)
                const webpUrl = canvas.toDataURL("image/webp", 0.8);

                // 5. 결과 화면 표시
                log.innerHTML = ""; // 로딩 메시지 삭제

                // 미리보기 이미지 생성
                const preview = document.createElement('img');
                preview.src = webpUrl;
                preview.style.maxWidth = "100%";
                preview.style.maxHeight = "300px";
                preview.style.borderRadius = "8px";
                preview.style.margin = "10px 0";
                preview.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

                // 다운로드 버튼 생성
                const link = document.createElement('a');
                link.href = webpUrl;
                link.download = file.name.split('.')[0] + ".webp";
                link.className = "action-btn"; // CSS 버튼 스타일 적용
                link.style.backgroundColor = "#16a34a"; // 초록색 버튼
                link.style.display = "inline-block";
                link.innerText = "⬇️ Download WebP";

                // 화면에 추가
                const wrapper = document.createElement('div');
                wrapper.style.textAlign = "center";
                wrapper.appendChild(preview);
                wrapper.appendChild(document.createElement('br'));
                wrapper.appendChild(link);
                
                log.appendChild(wrapper);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // 6. 광고 체크 후 실행 (안전장치 포함)
    if (window.checkAd) {
        window.checkAd(runConversion);
    } else {
        // 만약 main.js가 로드되지 않았더라도 기능은 작동하게 함
        console.warn("Ad system not loaded, running directly.");
        runConversion();
    }
}
