/* gif.js - 이미지 여러 장 → GIF (ffmpeg core-st, 이미지마다 시간 설정) */

const GIF_MIN = 2;
const GIF_MAX = 10;
const GIF_WIDTH = 480;        // 결과 GIF 가로(px)
const GIF_FPS = 10;           // 0.1초 단위로 시간 지정
const GIF_DELAY_MIN = 0.1;
const GIF_DELAY_MAX = 10;

let gifFrames = [];           // { file, url, delay }
let gifResultUrl = null;
let gifBusy = false;

const gifInput = document.getElementById('gif-upload');

/* ---------- 이미지 추가 ---------- */

function openGifPicker() {
    if (gifBusy) return;
    if (gifFrames.length >= GIF_MAX) return alert(`이미지는 최대 ${GIF_MAX}장까지 넣을 수 있어요.`);
    gifInput.value = '';
    gifInput.click();
}

gifInput.addEventListener('change', () => {
    const file = gifInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('이미지 파일만 넣을 수 있어요.');

    gifFrames.push({ file, url: URL.createObjectURL(file), delay: getDefaultDelay() });
    renderGifList();
});

function clampDelay(v) {
    if (isNaN(v)) v = 0.5;
    return Math.min(GIF_DELAY_MAX, Math.max(GIF_DELAY_MIN, Math.round(v * 10) / 10));
}

function getDefaultDelay() {
    return clampDelay(parseFloat(document.getElementById('gif-delay-all').value));
}

/* ---------- 목록 그리기 ---------- */

function makeSmallBtn(text, title, onClick, disabled = false) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    b.title = title;
    b.disabled = disabled;
    b.addEventListener('click', onClick);
    return b;
}

function renderGifList() {
    const list = document.getElementById('gif-list');
    list.innerHTML = '';

    gifFrames.forEach((frame, i) => {
        const li = document.createElement('li');
        li.className = 'gif-item';

        const num = document.createElement('span');
        num.className = 'gif-num';
        num.textContent = i + 1;

        const img = document.createElement('img');
        img.src = frame.url;
        img.alt = `${i + 1}번째 이미지`;

        const label = document.createElement('label');
        label.className = 'gif-delay';
        const input = document.createElement('input');
        input.type = 'number';
        input.min = GIF_DELAY_MIN;
        input.max = GIF_DELAY_MAX;
        input.step = '0.1';
        input.value = frame.delay;
        input.addEventListener('change', () => {
            frame.delay = clampDelay(parseFloat(input.value));
            input.value = frame.delay;
            updateGifTotal();
        });
        label.append('⏱️ ', input, ' 초');

        const actions = document.createElement('div');
        actions.className = 'gif-actions';
        actions.append(
            makeSmallBtn('▲', '앞으로', () => moveFrame(i, -1), i === 0),
            makeSmallBtn('▼', '뒤로', () => moveFrame(i, 1), i === gifFrames.length - 1),
            makeSmallBtn('✕', '삭제', () => removeFrame(i))
        );

        li.append(num, img, label, actions);
        list.appendChild(li);
    });

    updateGifUI();
}

function updateGifUI() {
    const n = gifFrames.length;
    const askText = document.getElementById('gif-ask-text');
    const moreBtn = document.getElementById('gif-more-btn');
    const makeBtn = document.getElementById('gif-make-btn');

    document.getElementById('gif-add-first').style.display = n === 0 ? '' : 'none';
    document.getElementById('gif-bulk').style.display = n > 0 ? 'block' : 'none';
    document.getElementById('gif-ask').style.display = n > 0 ? 'block' : 'none';

    if (n < GIF_MIN) {
        askText.innerHTML = `🖼️ <b>${n}장</b> 추가됐어요. GIF를 만들려면 <b>최소 ${GIF_MIN}장</b>이 필요해요. 한 장 더 추가해주세요!`;
    } else if (n < GIF_MAX) {
        askText.innerHTML = `🖼️ <b>${n}장</b> 추가됐어요. 한 장 더 추가할까요? (최대 ${GIF_MAX}장)`;
    } else {
        askText.innerHTML = `✅ 최대 <b>${GIF_MAX}장</b>을 모두 채웠어요. 이제 GIF를 만들어보세요!`;
    }

    moreBtn.style.display = n < GIF_MAX ? '' : 'none';
    makeBtn.disabled = n < GIF_MIN || gifBusy;
    makeBtn.style.opacity = makeBtn.disabled ? '0.5' : '1';
    updateGifTotal();
}

function updateGifTotal() {
    const total = gifFrames.reduce((s, f) => s + f.delay, 0);
    document.getElementById('gif-total').textContent =
        gifFrames.length ? `총 ${gifFrames.length}장 · 한 바퀴 ${total.toFixed(1)}초` : '';
}

/* ---------- 순서 / 삭제 / 전체 적용 / 초기화 ---------- */

function moveFrame(i, dir) {
    const j = i + dir;
    if (gifBusy || j < 0 || j >= gifFrames.length) return;
    [gifFrames[i], gifFrames[j]] = [gifFrames[j], gifFrames[i]];
    renderGifList();
}

function removeFrame(i) {
    if (gifBusy) return;
    URL.revokeObjectURL(gifFrames[i].url);
    gifFrames.splice(i, 1);
    renderGifList();
}

function applyDelayAll() {
    const d = getDefaultDelay();
    document.getElementById('gif-delay-all').value = d;
    gifFrames.forEach(f => (f.delay = d));
    renderGifList();
}

function resetGif() {
    if (gifBusy) return;
    gifFrames.forEach(f => URL.revokeObjectURL(f.url));
    gifFrames = [];
    if (gifResultUrl) URL.revokeObjectURL(gifResultUrl);
    gifResultUrl = null;
    document.getElementById('gif-result').innerHTML = '';
    document.getElementById('gif-log').innerText = '';
    renderGifList();
}

/* ---------- 이미지 준비 (크기·포맷 통일) ---------- */

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('이미지를 불러오지 못했어요.'));
        img.src = url;
    });
}

function toPngBytes(img, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';                 // 여백 색
    ctx.fillRect(0, 0, width, height);
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);

    return new Promise(resolve => {
        canvas.toBlob(async blob => resolve(new Uint8Array(await blob.arrayBuffer())), 'image/png');
    });
}

/* ---------- GIF 만들기 ---------- */

async function processGif() {
    if (gifBusy) return;
    if (gifFrames.length < GIF_MIN) return alert(`이미지를 최소 ${GIF_MIN}장 이상 넣어주세요.`);

    window.checkAd(async () => {
        const ffmpeg = window.ffmpeg;
        const log = document.getElementById('gif-log');
        const resultDiv = document.getElementById('gif-result');
        const tempFiles = [];

        gifBusy = true;
        updateGifUI();

        try {
            log.innerText = '⏳ 변환 엔진 불러오는 중...';
            if (!ffmpeg.isLoaded()) await ffmpeg.load();

            // 첫 이미지 비율 기준으로 크기 결정
            const first = await loadImage(gifFrames[0].url);
            const width = GIF_WIDTH;
            const height = Math.round((first.naturalHeight * width / first.naturalWidth) / 2) * 2;

            // 1) 이미지를 같은 크기의 PNG로 저장
            for (let i = 0; i < gifFrames.length; i++) {
                log.innerText = `🖼️ 이미지 준비 중... (${i + 1}/${gifFrames.length})`;
                const img = i === 0 ? first : await loadImage(gifFrames[i].url);
                const name = `f${String(i).padStart(3, '0')}.png`;
                ffmpeg.FS('writeFile', name, await toPngBytes(img, width, height));
                tempFiles.push(name);
            }

            // 2) 이미지별 표시 시간을 담은 concat 목록
            let list = '';
            gifFrames.forEach((f, i) => {
                list += `file '${tempFiles[i]}'\nduration ${f.delay}\n`;
            });
            list += `file '${tempFiles[tempFiles.length - 1]}'\n`; // 마지막 시간 적용용 (ffmpeg 규칙)
            ffmpeg.FS('writeFile', 'list.txt', new TextEncoder().encode(list));
            tempFiles.push('list.txt');

            const total = gifFrames.reduce((s, f) => s + f.delay, 0).toFixed(1);

            // 3) 색상 팔레트 만들기 (화질 향상)
            log.innerText = '🎨 색상 분석 중...';
            await ffmpeg.run(
                '-f', 'concat', '-safe', '0', '-i', 'list.txt',
                '-vf', 'palettegen',
                '-y', 'palette.png'
            );
            tempFiles.push('palette.png');

            // 4) GIF 만들기
            log.innerText = '🎞️ GIF 만드는 중...';
            await ffmpeg.run(
                '-f', 'concat', '-safe', '0', '-i', 'list.txt',
                '-i', 'palette.png',
                '-filter_complex', `[0:v]fps=${GIF_FPS}[v];[v][1:v]paletteuse`,
                '-t', total,
                '-loop', '0',
                '-y', 'output.gif'
            );
            tempFiles.push('output.gif');

            const data = ffmpeg.FS('readFile', 'output.gif');
            if (gifResultUrl) URL.revokeObjectURL(gifResultUrl);
            gifResultUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

            resultDiv.innerHTML = '';
            const out = document.createElement('img');
            out.src = gifResultUrl;
            out.alt = '완성된 GIF';
            resultDiv.appendChild(out);

            const link = document.createElement('a');
            link.href = gifResultUrl;
            link.download = 'imagify.gif';
            link.textContent = '⬇️ GIF 다운로드';
            link.className = 'action-btn';
            link.style.display = 'block';
            resultDiv.appendChild(link);

            log.innerText = '✅ 변환 완료!';
        } catch (err) {
            console.error(err);
            log.innerText = '❌ 변환 실패: ' + err.message;
        } finally {
            tempFiles.forEach(n => { try { ffmpeg.FS('unlink', n); } catch (e) {} });
            gifBusy = false;
            updateGifUI();
        }
    });
}
