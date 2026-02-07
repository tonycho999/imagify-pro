/* lang.js : 다국어 지원 및 자동 감지 시스템 */

const translations = {
    // 1. 한국어 (Korean)
    ko: {
        subtitle: "설치 없는 무료 미디어 변환 도구",
        nav_gif: "🎥 GIF 메이커",
        nav_webp: "⚡ WebP 변환",
        nav_meme: "🤣 밈 만들기",
        nav_audio: "🎵 MP3 추출",
        nav_icon: "📱 아이콘 생성",
        
        // GIF 섹션
        h2_gif: "비디오 → GIF 변환기",
        guide_title: "📖 사용 방법",
        guide_gif_1: "비디오 파일을 업로드하세요.",
        guide_gif_2: "(선택) 시작 시간과 길이를 설정하세요.",
        guide_gif_3: "<b>GIF 만들기</b> 버튼을 누르세요.",
        label_start: "시작:",
        label_duration: "길이:",
        btn_gif: "GIF 만들기",
        
        // WebP 섹션
        h2_webp: "JPG/PNG → WebP 변환",
        guide_webp_1: "이미지 파일을 업로드하세요.",
        guide_webp_2: "<b>변환 및 다운로드</b> 버튼을 누르세요.",
        guide_webp_3: "화질은 유지하고 용량은 50% 줄어듭니다.",
        btn_webp: "변환 및 다운로드",
        
        // Meme 섹션
        h2_meme: "짤방(Meme) 제작기",
        guide_meme_1: "사진을 업로드하세요.",
        guide_meme_2: "위/아래 문구를 입력하세요.",
        guide_meme_3: "<b>저장하기</b>를 눌러 다운로드하세요.",
        ph_top: "윗글 입력 (예: 개발자가)",
        ph_bottom: "아랫글 입력 (예: 버그를 만났을 때)",
        btn_meme: "짤방 저장하기",
        
        // Audio 섹션
        h2_audio: "비디오 → MP3 추출",
        guide_audio_1: "비디오 파일을 업로드하세요.",
        guide_audio_2: "<b>MP3 추출하기</b> 버튼을 누르세요.",
        btn_audio: "MP3 추출하기",
        
        // Icon 섹션
        h2_icon: "앱 아이콘 생성",
        guide_icon_1: "정사각형 이미지를 올리세요.",
        guide_icon_2: "<b>아이콘 만들기</b>를 누르세요.",
        guide_icon_3: "512, 192, 180px 아이콘이 생성됩니다.",
        btn_icon: "아이콘 만들기",

        // 광고 및 팝업
        ad_wait: "잠시만 기다려주세요.",
        ad_close_btn: "5초 대기...",
        ad_caption: "광고 시청 후 10분간 무료 이용",
        welcome_title: "Imagify Pro에 오신 것을 환영합니다!",
        welcome_desc_1: "짧은 광고 <b>1개</b>만 시청하세요.",
        welcome_desc_2: "<b>10분간</b> 모든 기능을 제한 없이 쓰세요!",
        welcome_desc_3: "무료 시간에는 광고가 나오지 않습니다.",
        btn_watch: "📺 광고 보고 시작하기",
        btn_look: "그냥 둘러보기"
    },

    // 2. 영어 (English - Default)
    en: {
        subtitle: "Free, Secure, Serverless Media Tools",
        nav_gif: "🎥 GIF Maker",
        nav_webp: "⚡ WebP Convert",
        nav_meme: "🤣 Meme Gen",
        nav_audio: "🎵 Audio Extract",
        nav_icon: "📱 Icon Gen",
        
        h2_gif: "Video to GIF Converter",
        guide_title: "📖 How to use",
        guide_gif_1: "Upload a video file.",
        guide_gif_2: "(Optional) Set Start Time/Duration.",
        guide_gif_3: "Click <b>Convert to GIF</b>.",
        label_start: "Start:",
        label_duration: "Duration:",
        btn_gif: "Convert to GIF",
        
        h2_webp: "JPG/PNG to WebP",
        guide_webp_1: "Upload an image file.",
        guide_webp_2: "Click <b>Convert & Download</b>.",
        guide_webp_3: "Saves space (approx. -50%).",
        btn_webp: "Convert & Download",
        
        h2_meme: "Meme Generator",
        guide_meme_1: "Upload an image.",
        guide_meme_2: "Type text in Top/Bottom fields.",
        guide_meme_3: "Click <b>Save Meme</b>.",
        ph_top: "TOP TEXT",
        ph_bottom: "BOTTOM TEXT",
        btn_meme: "Save Meme",
        
        h2_audio: "Video to MP3 Extractor",
        guide_audio_1: "Upload a video file.",
        guide_audio_2: "Click <b>Extract MP3</b>.",
        btn_audio: "Extract MP3",
        
        h2_icon: "App Icon Generator",
        guide_icon_1: "Upload a square image.",
        guide_icon_2: "Click <b>Generate Icons</b>.",
        guide_icon_3: "Get 512, 192, 180px icons.",
        btn_icon: "Generate Icons",

        ad_wait: "Please wait a moment.",
        ad_close_btn: "Wait 5s...",
        ad_caption: "Ad supports this free tool (Free for 10 mins after watching)",
        welcome_title: "Welcome to Imagify Pro!",
        welcome_desc_1: "Watch <b style='color:#e11d48'>1 short ad</b> now.",
        welcome_desc_2: "Get <b style='color:#16a34a'>10 minutes</b> of free access.",
        welcome_desc_3: "No more ads during free time!",
        btn_watch: "📺 Watch Ad & Start",
        btn_look: "Just look around"
    },

    // 3. 일본어 (Japanese)
    ja: {
        subtitle: "インストール不要の無料メディア変換ツール",
        nav_gif: "🎥 GIF作成",
        nav_webp: "⚡ WebP変換",
        nav_meme: "🤣 ミーム作成",
        nav_audio: "🎵 MP3抽出",
        nav_icon: "📱 アイコン作成",
        h2_gif: "動画 → GIF 変換",
        btn_gif: "GIFを作成",
        h2_webp: "JPG/PNG → WebP 変換",
        btn_webp: "変換してダウンロード",
        h2_meme: "ミームジェネレーター",
        ph_top: "上のテキスト",
        ph_bottom: "下のテキスト",
        btn_meme: "保存する",
        h2_audio: "動画 → MP3 抽出",
        btn_audio: "MP3を抽出",
        h2_icon: "アプリアイコン作成",
        btn_icon: "アイコン作成",
        ad_wait: "少々お待ちください。",
        welcome_title: "Imagify Proへようこそ！",
        btn_watch: "📺 広告を見て開始",
        btn_look: "見て回る"
    },

    // 4. 중국어 간체 (Chinese Simplified)
    zh: {
        subtitle: "免费、安全、无需安装的媒体工具",
        nav_gif: "🎥 GIF制作",
        nav_webp: "⚡ WebP转换",
        nav_meme: "🤣 表情包制作",
        nav_audio: "🎵 音频提取",
        nav_icon: "📱 图标生成",
        h2_gif: "视频转GIF",
        btn_gif: "制作GIF",
        h2_webp: "JPG/PNG转WebP",
        btn_webp: "转换并下载",
        h2_meme: "表情包生成器",
        ph_top: "顶部文字",
        ph_bottom: "底部文字",
        btn_meme: "保存表情包",
        h2_audio: "视频转MP3",
        btn_audio: "提取MP3",
        h2_icon: "应用图标生成",
        btn_icon: "生成图标",
        ad_wait: "请稍候。",
        welcome_title: "欢迎来到 Imagify Pro！",
        btn_watch: "📺 观看广告并开始",
        btn_look: "随便看看"
    },

    // 5. 스페인어 (Spanish)
    es: {
        subtitle: "Herramientas multimedia gratuitas sin instalación",
        nav_gif: "🎥 Creador GIF",
        nav_webp: "⚡ Convertir WebP",
        nav_meme: "🤣 Generar Meme",
        nav_audio: "🎵 Extraer Audio",
        nav_icon: "📱 Crear Icono",
        h2_gif: "Convertidor de Video a GIF",
        btn_gif: "Crear GIF",
        h2_webp: "JPG/PNG a WebP",
        btn_webp: "Convertir y Descargar",
        h2_meme: "Generador de Memes",
        ph_top: "TEXTO SUPERIOR",
        ph_bottom: "TEXTO INFERIOR",
        btn_meme: "Guardar Meme",
        h2_audio: "Extractor de Video a MP3",
        btn_audio: "Extraer MP3",
        h2_icon: "Generador de Iconos",
        btn_icon: "Generar Iconos",
        ad_wait: "Por favor espere.",
        welcome_title: "¡Bienvenido a Imagify Pro!",
        btn_watch: "📺 Ver anuncio y empezar",
        btn_look: "Solo mirar"
    },

    // 6. 프랑스어 (French)
    fr: {
        subtitle: "Outils multimédias gratuits sans installation",
        nav_gif: "🎥 Créer GIF",
        nav_webp: "⚡ Convertir WebP",
        nav_meme: "🤣 Créer Meme",
        nav_audio: "🎵 Extraire Audio",
        nav_icon: "📱 Icône App",
        h2_gif: "Convertisseur Vidéo en GIF",
        btn_gif: "Créer GIF",
        h2_webp: "JPG/PNG en WebP",
        btn_webp: "Convertir et Télécharger",
        h2_meme: "Générateur de Mèmes",
        ph_top: "TEXTE HAUT",
        ph_bottom: "TEXTE BAS",
        btn_meme: "Sauvegarder",
        h2_audio: "Extraire MP3 de Vidéo",
        btn_audio: "Extraire MP3",
        h2_icon: "Générateur d'Icônes",
        btn_icon: "Générer Icônes",
        ad_wait: "Veuillez patienter.",
        welcome_title: "Bienvenue sur Imagify Pro !",
        btn_watch: "📺 Voir la pub et commencer",
        btn_look: "Juste regarder"
    },

    // 7. 독일어 (German)
    de: {
        subtitle: "Kostenlose Medien-Tools ohne Installation",
        nav_gif: "🎥 GIF-Maker",
        nav_webp: "⚡ WebP-Konverter",
        nav_meme: "🤣 Meme-Generator",
        nav_audio: "🎵 Audio-Extraktor",
        nav_icon: "📱 Icon-Generator",
        h2_gif: "Video zu GIF Konverter",
        btn_gif: "GIF erstellen",
        h2_webp: "JPG/PNG zu WebP",
        btn_webp: "Konvertieren & Laden",
        h2_meme: "Meme-Generator",
        ph_top: "TEXT OBEN",
        ph_bottom: "TEXT UNTEN",
        btn_meme: "Meme speichern",
        h2_audio: "Video zu MP3",
        btn_audio: "MP3 extrahieren",
        h2_icon: "App-Icon Generator",
        btn_icon: "Icons erstellen",
        ad_wait: "Bitte warten.",
        welcome_title: "Willkommen bei Imagify Pro!",
        btn_watch: "📺 Anzeige ansehen & starten",
        btn_look: "Nur umschauen"
    },

    // 8. 러시아어 (Russian)
    ru: {
        subtitle: "Бесплатные медиа-инструменты",
        nav_gif: "🎥 GIF Мейкер",
        nav_webp: "⚡ WebP Конвертер",
        nav_meme: "🤣 Мемы",
        nav_audio: "🎵 Аудио",
        nav_icon: "📱 Иконки",
        h2_gif: "Конвертер видео в GIF",
        btn_gif: "Создать GIF",
        h2_webp: "JPG/PNG в WebP",
        btn_webp: "Конвертировать",
        h2_meme: "Генератор мемов",
        ph_top: "ВЕРХНИЙ ТЕКСТ",
        ph_bottom: "НИЖНИЙ ТЕКСТ",
        btn_meme: "Сохранить мем",
        h2_audio: "Видео в MP3",
        btn_audio: "Извлечь MP3",
        h2_icon: "Генератор иконок",
        btn_icon: "Создать иконки",
        ad_wait: "Пожалуйста, подождите.",
        welcome_title: "Добро пожаловать в Imagify Pro!",
        btn_watch: "📺 Смотреть рекламу",
        btn_look: "Просто посмотреть"
    },

    // 9. 포르투갈어 (Portuguese)
    pt: {
        subtitle: "Ferramentas de mídia gratuitas",
        nav_gif: "🎥 Criador de GIF",
        nav_webp: "⚡ Converter WebP",
        nav_meme: "🤣 Gerador de Meme",
        nav_audio: "🎵 Extrair Áudio",
        nav_icon: "📱 Ícones de App",
        h2_gif: "Vídeo para GIF",
        btn_gif: "Criar GIF",
        h2_webp: "JPG/PNG para WebP",
        btn_webp: "Converter e Baixar",
        h2_meme: "Gerador de Memes",
        ph_top: "TEXTO SUPERIOR",
        ph_bottom: "TEXTO INFERIOR",
        btn_meme: "Salvar Meme",
        h2_audio: "Vídeo para MP3",
        btn_audio: "Extrair MP3",
        h2_icon: "Gerador de Ícones",
        btn_icon: "Gerar Ícones",
        ad_wait: "Por favor, aguarde.",
        welcome_title: "Bem-vindo ao Imagify Pro!",
        btn_watch: "📺 Ver anúncio e iniciar",
        btn_look: "Apenas olhar"
    },

    // 10. 인도네시아어 (Indonesian)
    id: {
        subtitle: "Alat Media Gratis Tanpa Instalasi",
        nav_gif: "🎥 Pembuat GIF",
        nav_webp: "⚡ Konversi WebP",
        nav_meme: "🤣 Pembuat Meme",
        nav_audio: "🎵 Ekstrak Audio",
        nav_icon: "📱 Pembuat Ikon",
        h2_gif: "Konverter Video ke GIF",
        btn_gif: "Buat GIF",
        h2_webp: "JPG/PNG ke WebP",
        btn_webp: "Konversi & Unduh",
        h2_meme: "Pembuat Meme",
        ph_top: "TEKS ATAS",
        ph_bottom: "TEKS BAWAH",
        btn_meme: "Simpan Meme",
        h2_audio: "Video ke MP3",
        btn_audio: "Ekstrak MP3",
        h2_icon: "Pembuat Ikon Aplikasi",
        btn_icon: "Buat Ikon",
        ad_wait: "Mohon tunggu.",
        welcome_title: "Selamat datang di Imagify Pro!",
        btn_watch: "📺 Tonton Iklan & Mulai",
        btn_look: "Lihat-lihat saja"
    }
};

// 언어 적용 함수
function applyLanguage() {
    // 1. 브라우저 언어 감지 (앞 2글자만 추출, 예: ko-KR -> ko)
    const userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    
    // 2. 지원하는 언어인지 확인 (없으면 영어 'en'으로 설정)
    const lang = translations[userLang] ? userLang : 'en';
    const t = translations[lang]; // 선택된 언어 팩

    console.log(`Detected Language: ${userLang}, Applied: ${lang}`);

    // 3. HTML 요소에 텍스트 적용 (data-i18n 속성 이용)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        // 텍스트 교체 (번역 키가 있을 때만)
        if (t[key]) {
            // input이나 textarea의 placeholder인 경우
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } 
            // 일반 텍스트인 경우 (HTML 태그 포함 가능)
            else {
                el.innerHTML = t[key];
            }
        }
    });

    // 4. (보너스) 문서 제목(Title) 등 메타 정보가 필요하면 여기서 변경 가능
    // document.title = t.welcome_title; 
}

// 페이지 로드 시 언어 적용 실행
document.addEventListener('DOMContentLoaded', applyLanguage);
