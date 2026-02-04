/* meme.js : Meme Generator */

const memeInput = document.getElementById('meme-upload');
const memeCanvas = document.getElementById('meme-canvas');
const ctx = memeCanvas.getContext('2d');
const topTextInput = document.getElementById('meme-top');
const bottomTextInput = document.getElementById('meme-bottom');

let currentMemeImg = null;

// Load image onto canvas
memeInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            currentMemeImg = img;
            drawMeme();
        };
    };
    reader.readAsDataURL(file);
});

// Redraw when text changes
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

function drawMeme() {
    if (!currentMemeImg) return;

    // Resize canvas to match image
    memeCanvas.width = currentMemeImg.width;
    memeCanvas.height = currentMemeImg.height;
    memeCanvas.style.display = 'block';

    // Draw Image
    ctx.drawImage(currentMemeImg, 0, 0);

    // Text Style (Impact font style)
    const fontSize = Math.floor(memeCanvas.width / 10);
    ctx.font = `900 ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 8);
    ctx.lineJoin = 'round';

    // Draw Top Text
    const topText = topTextInput.value.toUpperCase();
    if (topText) {
        ctx.textBaseline = 'top';
        ctx.strokeText(topText, memeCanvas.width / 2, memeCanvas.height * 0.05);
        ctx.fillText(topText, memeCanvas.width / 2, memeCanvas.height * 0.05);
    }

    // Draw Bottom Text
    const bottomText = bottomTextInput.value.toUpperCase();
    if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText, memeCanvas.width / 2, memeCanvas.height * 0.95);
        ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height * 0.95);
    }
}

function downloadMeme() {
    if (!currentMemeImg) return alert("Please upload an image first!");
    
    const imageUrl = memeCanvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'imagify-meme.png';
    link.href = imageUrl;
    link.click();
}
