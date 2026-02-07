/* webp.js */
function processWebp() {
    const fileInput = document.getElementById('webp-upload');
    const log = document.getElementById('webp-log');
    
    if (fileInput.files.length === 0) return alert("Please select an image!");
    
    window.checkAd(() => {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const webpUrl = canvas.toDataURL("image/webp", 0.8);
                const link = document.createElement('a');
                link.href = webpUrl;
                link.download = file.name.split('.')[0] + ".webp";
                link.click();
                
                log.innerText = "✅ Converted and Downloaded!";
            }
        };
        reader.readAsDataURL(file);
    });
}
