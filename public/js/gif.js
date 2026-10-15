const MIN_IMAGES = 2;
const MAX_IMAGES = 10;
const OUTPUT_WIDTH = 480; // GIF 가로 크기(px)

const gifInput = document.getElementById('gif-upload');

gifInput.addEventListener('change', () => {
    const files = Array.from(gifInput.files);
    const controls = document.getElementById('gif-controls');
    const log = document.getElementById('gif-log');

    if (files.length < MIN_IMAGES) {
        controls.style.display = 'none';
        log.innerText = `⚠️ 이미지를 최소 ${MIN_IMAGES}장 이상 선택해주세요.`;
        return;
    }
    if (files.length > MAX_IMAGES) {
        controls.style.display = 'none';
        log.innerText = `⚠️ 이미지는 최대 ${MAX_IMAGES}장까지 가능합니다. (현재 ${files.length}장)`;
        return;
    }
    controls.style.display = 'block';
    log.innerText = `🖼️ ${files.length}장 선택됨`;
});

// 이미지 원본 크기 구하기
function getImageSize(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
            URL.revokeObjectURL(url);
        };
        img.onerror = () => reject(new Error(`${file.name} 로드 실패`));
        img.src = url;
    });
}

// 모든 이미지를 같은 크기의 PNG로 통일 (포맷·크기가 달라도 OK)
function normalizeImage(file, width, height) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // 배경(여백) 색
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // 비율 유지하며 가운데 정렬
            const scale = Math.min(width / img.width, height / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);

            URL.revokeObjectURL(url);
            canvas.toBlob(async (blob) => {
                resolve(new Uint8Array(await blob.arrayBuffer()));
            }, 'image/png');
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error(`${file.name} 로드 실패`));
        };
        img.src = url;
    });
}

async function processGif() {
    const files = Array.from(gifInput.files);

    if (files.length < MIN_IMAGES) return alert(`이미지를 최소 ${MIN_IMAGES}장 이상 올려주세요.`);
    if (files.length > MAX_IMAGES) return alert(`이미지는 최대 ${MAX_IMAGES}장까지 가능합니다.`);

    // [광고 체크] 통과하면 내부 함수 실행
    window.checkAd(async () => {
        const log = document.getElementById('gif-log');
        const delay = parseFloat(document.getElementById('gif-delay').value) || 0.5;
        const frameNames = [];

        try {
            log.innerText = "⏳ Loading FFmpeg engine...";
            if (!window.ffmpeg.isLoaded()) await window.ffmpeg.load();

            // 첫 번째 이미지 비율 기준으로 출력 크기 결정
            log.innerText = "🖼️ Preparing images...";
            const first = await getImageSize(files[0]);
            const width = OUTPUT_WIDTH;
            const height = Math.round((first.height * width / first.width) / 2) * 2;

            for (let i = 0; i < files.length; i++) {
                log.innerText = `🖼️ Preparing images... (${i + 1}/${files.length})`;
                const data = await normalizeImage(files[i], width, height);
                const name = `img${String(i).padStart(3, '0')}.png`;
                window.ffmpeg.FS('writeFile', name, data);
                frameNames.push(name);
            }

            log.innerText = "🎞️ Creating GIF...";
            await window.ffmpeg.run(
                '-framerate', `1000/${Math.round(delay * 1000)}`, // 프레임당 delay초
                '-i', 'img%03d.png',
                '-filter_complex', 'split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
                '-loop', '0', // 무한 반복
                'output.gif'
            );

            const data = window.ffmpeg.FS('readFile', 'output.gif');
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

            const resultDiv = document.getElementById('gif-result');
            resultDiv.innerHTML = '';

            const img = document.createElement('img');
            img.src = url;
            resultDiv.appendChild(img);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'imagify-images.gif';
            link.innerText = "⬇️ Download GIF";
            link.className = "action-btn";
            link.style.display = "block";
            resultDiv.appendChild(link);

            log.innerText = "✅ Conversion Complete!";
        } catch (err) {
            console.error(err);
            log.innerText = "❌ 변환 실패: " + err.message;
        } finally {
            // 메모리 정리 (반복 변환 시 메모리 누적 방지)
            frameNames.forEach(n => { try { window.ffmpeg.FS('unlink', n); } catch (e) {} });
            try { window.ffmpeg.FS('unlink', 'output.gif'); } catch (e) {}
        }
    });
}
