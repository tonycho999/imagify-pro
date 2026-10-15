/* gif.js - 이미지 여러 장 → GIF
   (ffmpeg core-st, 이미지별 표시 시간 + 전환마다 페이드 시간) */

const GIF_MIN = 2;
const GIF_MAX = 10;
const GIF_WIDTH = 480;          // 결과 GIF 가로(px)
const GIF_DELAY_MIN = 0.1;      // 이미지 표시 시간 범위
const GIF_DELAY_MAX = 10;
const FADE_MIN = 0;             // 전환 시간 범위 (0 = 바로 바뀜)
const FADE_MAX = 3;
const FADE_STEP = 0.05;         // 전환 프레임 간격(초)
const FADE_MAX_STEPS = 20;      // 전환 1회당 최대 중간 프레임 수 (용량 보호)

let gifFrames = [];             // { file, url, delay, fade }  fade = 다음 이미지로 넘어가는 전환 시간
let gifResultUrl = null;
let gifBusy = false;

const gifInput = document.getElementById('gif-upload');

/* ---------- 값 정리 ---------- */

function round1(v) { return Math.round(v * 10) / 10; }

function clampDelay(v) {
    if (isNaN(v)) v = 0.5;
    return Math.min(GIF_DELAY_MAX, Math.max(GIF_DELAY_MIN, round1(v)));
}

function clampFade(v) {
    if (isNaN(v)) v = 0;
    return Math.min(FADE_MAX, Math.max(FADE_MIN, round1(v)));
}

function getDefaultDelay() {
    return clampDelay(parseFloat(document.getElementById('gif-delay-all').value));
}

function getDefaultFade() {
    return clampFade(parseFloat(document.getElementById('gif-fade-all').value));
}

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

    gifFrames.push({
        file,
        url: URL.createObjectURL(file),
        delay: getDefaultDelay(),
        fade: getDefaultFade()
    });
    renderGifList();
});

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

function makeNumberInput(value, min, max, onChange) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = min;
    input.max = max;
    input.step = '0.1';
    input.value = value;
    input.addEventListener('change', () => onChange(input));
    return input;
}

// 이미지 한 줄
function makeImageRow(frame, i, n) {
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
    const input = makeNumberInput(frame.delay, GIF_DELAY_MIN, GIF_DELAY_MAX, el => {
        frame.delay = clampDelay(parseFloat(el.value));
        el.value = frame.delay;
        updateGifTotal();
    });
    label.append('⏱️ ', input, ' 초');

    const actions = document.createElement('div');
    actions.className = 'gif-actions';
    actions.append(
        makeSmallBtn('▲', '앞으로', () => moveFrame(i, -1), i === 0),
        makeSmallBtn('▼', '뒤로', () => moveFrame(i, 1), i === n - 1),
        makeSmallBtn('✕', '삭제', () => removeFrame(i))
    );

    li.append(num, img, label, actions);
    return li;
}

// 전환 한 줄 (i번 → i+1번, 마지막은 → 1번)
function makeTransRow(frame, i, n) {
    const isLoop = i === n - 1;
    const li = document.createElement('li');
    li.className = 'gif-trans' + (isLoop ? ' loop' : '');

    const title = document.createElement('span');
    title.textContent = isLoop ? `🔁 ${n} → 1 (반복될 때) 전환` : `⬇️ ${i + 1} → ${i + 2} 전환`;

    const hint = document.createElement('span');
    hint.className = 'gif-trans-hint';
    const updateHint = () => {
        hint.textContent = frame.fade > 0 ? `(페이드 ${frame.fade}초)` : '(바로 바뀜)';
    };

    const input = makeNumberInput(frame.fade, FADE_MIN, FADE_MAX, el => {
        frame.fade = clampFade(parseFloat(el.value));
        el.value = frame.fade;
        updateHint();
        updateGifTotal();
    });

    updateHint();
    li.append(title, input, '초', hint);
    return li;
}

function renderGifList() {
    const list = document.getElementById('gif-list');
    const n = gifFrames.length;
    list.innerHTML = '';

    gifFrames.forEach((frame, i) => {
        list.appendChild(makeImageRow(frame, i, n));
        if (n >= 2) list.appendChild(makeTransRow(frame, i, n));
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
    const n = gifFrames.length;
    const hold = gifFrames.reduce((s, f) => s + f.delay, 0);
    const fades = n >= 2 ? gifFrames.reduce((s, f) => s + f.fade, 0) : 0;
    document.getElementById('gif-total').textContent = n
        ? `총 ${n}장 · 한 바퀴 ${(hold + fades).toFixed(1)}초 (표시 ${hold.toFixed(1)}초 + 전환 ${fades.toFixed(1)}초)`
        : '';
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

function applyFadeAll() {
    const d = getDefaultFade();
    document.getElementById('gif-fade-all').value = d;
    gifFrames.forEach(f => (f.fade = d));
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

/* ---------- 이미지 준비 ---------- */

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('이미지를 불러오지 못했어요.'));
        img.src = url;
    });
}

// 같은 크기 캔버스에 흰 배경 + 비율 유지 가운데 정렬
function drawToCanvas(img, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
    return canvas;
}

function canvasToPng(canvas) {
    return new Promise(resolve => {
        canvas.toBlob(async blob => resolve(new Uint8Array(await blob.arrayBuffer())), 'image/png');
    });
}

/* ---------- GIF 만들기 ---------- */

async function processGif() {
    if (gifBusy) return;
    if (gifFrames.length < GIF_MIN) return alert(`이미지를 최소 ${GIF_MIN}장 이상 넣어주세요.`);

    const log = document.getElementById('gif-log');
    const resultDiv = document.getElementById('gif-result');
    const n = gifFrames.length;

    gifBusy = true;
    updateGifUI();

    try {
        // core-st는 run 1회 후 종료되므로 매번 엔진을 새로 띄움
        log.innerText = '⏳ 변환 엔진 준비 중...';
        await window.resetFFmpeg();
        const ffmpeg = window.ffmpeg;

        // 첫 이미지 비율 기준으로 크기 결정
        const first = await loadImage(gifFrames[0].url);
        const width = GIF_WIDTH;
        const height = Math.round((first.naturalHeight * width / first.naturalWidth) / 2) * 2;

        // 1) 모든 이미지를 같은 크기 캔버스로
        const bases = [];
        for (let i = 0; i < n; i++) {
            log.innerText = `🖼️ 이미지 준비 중... (${i + 1}/${n})`;
            const img = i === 0 ? first : await loadImage(gifFrames[i].url);
            bases.push(drawToCanvas(img, width, height));
        }

        const mix = document.createElement('canvas');
        mix.width = width;
        mix.height = height;
        const mctx = mix.getContext('2d');

        // 2) 이미지 + 전환마다 다른 페이드 프레임 저장
        const entries = [];   // { name, dur }
        let t = 0;

        for (let i = 0; i < n; i++) {
            log.innerText = `✨ 프레임 만드는 중... (${i + 1}/${n})`;

            const name = `f${String(i).padStart(3, '0')}.png`;
            ffmpeg.FS('writeFile', name, await canvasToPng(bases[i]));
            entries.push({ name, dur: gifFrames[i].delay });

            const fade = gifFrames[i].fade;       // 이 이미지 → 다음 이미지 (마지막은 → 첫 장)
            if (fade > 0) {
                const steps = Math.min(FADE_MAX_STEPS, Math.max(1, Math.round(fade / FADE_STEP)));
                const stepDur = Math.max(0.02, Math.round((fade / steps) * 100) / 100);
                const next = bases[(i + 1) % n];

                for (let s = 1; s <= steps; s++) {
                    const alpha = s / (steps + 1);  // 다음 이미지가 점점 진해짐
                    mctx.globalAlpha = 1;
                    mctx.drawImage(bases[i], 0, 0);
                    mctx.globalAlpha = alpha;
                    mctx.drawImage(next, 0, 0);

                    const tn = `t${String(t++).padStart(4, '0')}.png`;
                    ffmpeg.FS('writeFile', tn, await canvasToPng(mix));
                    entries.push({ name: tn, dur: stepDur });
                }
                mctx.globalAlpha = 1;
            }
        }

        // 3) 프레임별 시간 목록
        let list = '';
        entries.forEach(e => { list += `file '${e.name}'\nduration ${e.dur}\n`; });
        ffmpeg.FS('writeFile', 'list.txt', new TextEncoder().encode(list));

        // 마지막 프레임 시간 (GIF 단위: 1/100초)
        const lastDelayCs = Math.round(entries[entries.length - 1].dur * 100);

        // 4) 팔레트 생성 + GIF 변환을 run 1번으로
        log.innerText = `🎞️ GIF 만드는 중... (프레임 ${entries.length}장)`;
        await ffmpeg.run(
            '-f', 'concat', '-safe', '0', '-i', 'list.txt',
            '-filter_complex', 'split[a][b];[a]palettegen[p];[b][p]paletteuse',
            '-vsync', 'vfr',
            '-loop', '0',
            '-final_delay', String(lastDelayCs),
            '-y', 'output.gif'
        );

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

        const sizeMB = (data.length / 1024 / 1024).toFixed(1);
        log.innerText = `✅ 변환 완료! (${sizeMB}MB)`;
    } catch (err) {
        console.error(err);
        log.innerText = '❌ 변환 실패: ' + err.message;
    } finally {
        gifBusy = false;
        updateGifUI();
    }
}
