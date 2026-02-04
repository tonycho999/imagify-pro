/* meme.js : 짤방 생성 기능 */

// DOM 요소 가져오기
const memeInput = document.getElementById('meme-upload');
const memeCanvas = document.getElementById('meme-canvas');
const ctx = memeCanvas.getContext('2d');

const topTextInput = document.getElementById('meme-top');
const bottomTextInput = document.getElementById('meme-bottom');

let currentMemeImg = null; // 현재 업로드된 이미지 저장용

// 1. 이미지가 업로드되면 캔버스에 그리기
memeInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            currentMemeImg = img;
            drawMeme(); // 이미지가 로드되면 바로 그리기 함수 실행
        };
    };
    reader.readAsDataURL(file);
});

// 2. 글자를 입력할 때마다 실시간으로 다시 그리기
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

// 3. 밈 그리기 핵심 함수 (이미지 + 텍스트 합성)
function drawMeme() {
    // 이미지가 없으면 아무것도 안 함
    if (!currentMemeImg) return;

    // 캔버스 크기를 이미지 원본 크기에 맞춤
    memeCanvas.width = currentMemeImg.width;
    memeCanvas.height = currentMemeImg.height;
    memeCanvas.style.display = 'block'; // 화면에 보이게 설정

    // 1) 이미지 그리기
    ctx.drawImage(currentMemeImg, 0, 0);

    // 2) 텍스트 스타일 설정 (임팩트 폰트 스타일)
    const fontSize = Math.floor(memeCanvas.width / 10); // 이미지 너비의 10% 크기
    ctx.font = `900 ${fontSize}px sans-serif`; // 굵은 고딕체
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';    // 흰색 글씨
    ctx.strokeStyle = 'black';  // 검은색 테두리
    ctx.lineWidth = Math.floor(fontSize / 8); // 테두리 두께
    ctx.lineJoin = 'round';     // 테두리 모서리를 둥글게

    // 3) 윗글 그리기
    const topText = topTextInput.value.toUpperCase(); // 대문자로 변환
    if (topText) {
        ctx.textBaseline = 'top';
        // 테두리 먼저 그리고 -> 글씨 덮어쓰기
        ctx.strokeText(topText, memeCanvas.width / 2, memeCanvas.height * 0.05);
        ctx.fillText(topText, memeCanvas.width / 2, memeCanvas.height * 0.05);
    }

    // 4) 아랫글 그리기
    const bottomText = bottomTextInput.value.toUpperCase();
    if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText, memeCanvas.width / 2, memeCanvas.height * 0.95);
        ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height * 0.95);
    }
}

// 4. 저장하기 버튼 클릭 시 실행되는 함수
function downloadMeme() {
    if (!currentMemeImg) {
        return alert("이미지를 먼저 업로드해주세요!");
    }

    // 캔버스를 이미지 주소로 변환
    const imageUrl = memeCanvas.toDataURL('image/png');

    // 가상의 링크를 만들어 클릭하게 함 (다운로드 트리거)
    const link = document.createElement('a');
    link.download = 'imagify-meme.png'; // 저장될 파일 이름
    link.href = imageUrl;
    link.click();
}
