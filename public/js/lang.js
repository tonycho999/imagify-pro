/* lang.js : 다국어 및 SEO 메타데이터 관리 */

const translations = {
    // 1. 한국어 (Korean)
    ko: {
        // [SEO Meta]
        meta_title: "Imagify Pro - 무료 온라인 미디어 변환 도구 (GIF, WebP, 아이콘)",
        meta_desc: "설치 없이 브라우저에서 바로 사용하세요. 동영상 GIF 변환, WebP 변환, 밈 제작, MP3 추출, 앱 아이콘 생성을 무료로 제공합니다.",
        meta_keywords: "GIF 만들기, WebP 변환, 동영상 MP3 추출, 아이콘 생성, 무료 온라인 도구, 밈 제작",
        
        // [UI Text]
        subtitle: "설치 없는 무료 미디어 변환 도구",
        nav_gif: "🎥 GIF 메이커",
        nav_webp: "⚡ WebP 변환",
        nav_meme: "🤣 밈 만들기",
        nav_audio: "🎵 MP3 추출",
        nav_icon: "📱 아이콘 생성",
        h2_gif: "비디오 → GIF 변환기",
        guide_title: "📖 사용 방법",
        guide_gif_1: "비디오 파일을 업로드하세요.",
        guide_gif_2: "(선택) 시작 시간과 길이를 설정하세요.",
        guide_gif_3: "<b>GIF 만들기</b> 버튼을 누르세요.",
        label_start: "시작:",
        label_duration: "길이:",
        btn_gif: "GIF 만들기",
        h2_webp: "JPG/PNG → WebP 변환",
        guide_webp_1: "이미지 파일을 업로드하세요.",
        guide_webp_2: "<b>변환 및 다운로드</b> 버튼을 누르세요.",
        guide_webp_3: "화질은 유지하고 용량은 50% 줄어듭니다.",
        btn_webp: "변환 및 다운로드",
        h2_meme: "짤방(Meme) 제작기",
        guide_meme_1: "사진을 업로드하세요.",
        guide_meme_2: "위/아래 문구를 입력하세요.",
        guide_meme_3: "<b>저장하기</b>를 눌러 다운로드하세요.",
        ph_top: "윗글 입력",
        ph_bottom: "아랫글 입력",
        btn_meme: "짤방 저장하기",
        h2_audio: "비디오 → MP3 추출",
        guide_audio_1: "비디오 파일을 업로드하세요.",
        guide_audio_2: "<b>MP3 추출하기</b> 버튼을 누르세요.",
        btn_audio: "MP3 추출하기",
        h2_icon: "앱 아이콘 생성",
        guide_icon_1: "정사각형 이미지를 올리세요.",
        guide_icon_2: "<b>아이콘 만들기</b>를 누르세요.",
        guide_icon_3: "512, 192, 180px 아이콘이 생성됩니다.",
        btn_icon: "아이콘 만들기",
        ad_wait: "잠시만 기다려주세요.",
        ad_close_btn: "5초 대기...",
        ad_caption: "광고 시청 후 10분간 무료 이용",
        welcome_title: "환영합니다!",
        welcome_desc_1: "짧은 광고 <b>1개</b>만 시청하세요.",
        welcome_desc_2: "<b>10분간</b> 무료로 이용하세요.",
        welcome_desc_3: "무료 시간에는 광고가 나오지 않습니다.",
        btn_watch: "📺 광고 보고 시작하기",
        btn_look: "그냥 둘러보기"
    },

    // 2. 영어 (English)
    en: {
        meta_title: "Imagify Pro - Free Online Media Tools (GIF, WebP, Icon)",
        meta_desc: "Convert Video to GIF, JPG to WebP, extract MP3, and generate App Icons. Free, secure, and serverless tools. No installation needed.",
        meta_keywords: "GIF maker, WebP converter, MP3 extractor, App icon generator, Free online tools, Meme generator",
        
        // (영어 UI 텍스트는 HTML 기본값이므로 생략 가능하나, 완벽한 치환을 위해 유지 추천)
    },

    // 3. 일본어 (Japanese)
    ja: {
        meta_title: "Imagify Pro - 無料オンラインメディア変換ツール (GIF, WebP)",
        meta_desc: "動画をGIFに変換、WebP変換、ミーム作成、MP3抽出、アプリアイコン生成。インストール不要、ブラウザで完結する安全なツールです。",
        meta_keywords: "GIF作成, WebP変換, MP3抽出, アイコン作成, 無料ツール, ミームジェネレーター",
        
        subtitle: "インストール不要の無料メディア変換ツール",
        nav_gif: "🎥 GIF作成",
        nav_webp: "⚡ WebP変換",
        nav_meme: "🤣 ミーム作成",
        nav_audio: "🎵 MP3抽出",
        nav_icon: "📱 アイコン作成",
        h2_gif: "動画 → GIF 変換",
        guide_title: "📖 使い方",
        guide_gif_1: "動画ファイルをアップロードします。",
        guide_gif_2: "開始時間と長さを設定します。",
        guide_gif_3: "<b>GIFを作成</b>をクリックします。",
        label_start: "開始:",
        label_duration: "長さ:",
        btn_gif: "GIFを作成",
        h2_webp: "JPG/PNG → WebP 変換",
        guide_webp_1: "画像ファイルをアップロードします。",
        guide_webp_2: "<b>変換してダウンロード</b>をクリック。",
        guide_webp_3: "画質そのままで容量50%削減。",
        btn_webp: "変換してダウンロード",
        h2_meme: "ミームジェネレーター",
        guide_meme_1: "画像をアップロード。",
        guide_meme_2: "上下のテキストを入力。",
        guide_meme_3: "<b>保存する</b>をクリック。",
        ph_top: "上のテキスト",
        ph_bottom: "下のテキスト",
        btn_meme: "保存する",
        h2_audio: "動画 → MP3 抽出",
        guide_audio_1: "動画をアップロード。",
        guide_audio_2: "<b>MP3を抽出</b>をクリック。",
        btn_audio: "MP3を抽出",
        h2_icon: "アプリアイコン作成",
        guide_icon_1: "正方形の画像をアップロード。",
        guide_icon_2: "<b>アイコン作成</b>をクリック。",
        guide_icon_3: "512, 192, 180px アイコンが作成されます。",
        btn_icon: "アイコン作成",
        ad_wait: "少々お待ちください。",
        ad_close_btn: "5秒待機...",
        ad_caption: "広告を見ると10分間無料",
        welcome_title: "Imagify Proへようこそ！",
        welcome_desc_1: "短い広告を<b>1つ</b>見てください。",
        welcome_desc_2: "<b>10分間</b>無料で使い放題。",
        welcome_desc_3: "無料時間は広告が出ません。",
        btn_watch: "📺 広告を見て開始",
        btn_look: "見て回る"
    },

    // 4. 중국어 간체 (Chinese Simplified)
    zh: {
        meta_title: "Imagify Pro - 免费在线媒体工具 (GIF, WebP, 图标生成)",
        meta_desc: "视频转GIF、图片转WebP、表情包制作、MP3提取及App图标生成。无需安装，浏览器内直接运行，安全快捷。",
        meta_keywords: "GIF制作, WebP转换, MP3提取, 图标生成, 在线工具, 表情包制作",
        
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
        meta_title: "Imagify Pro - Herramientas Multimedia Gratis (GIF, WebP)",
        meta_desc: "Convertidor de video a GIF, JPG a WebP, generador de memes, extracción de MP3 e iconos de App. Gratis, seguro y sin instalación.",
        meta_keywords: "Crear GIF, Convertir WebP, Extraer MP3, Generador de iconos, Herramientas online, Memes",
        
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
        meta_title: "Imagify Pro - Outils Médias Gratuits (GIF, WebP, Icônes)",
        meta_desc: "Convertissez vidéo en GIF, images en WebP, créez des mèmes, extrayez des MP3 et générez des icônes. Gratuit, sécurisé, sans installation.",
        meta_keywords: "Créer GIF, Convertisseur WebP, Extraire MP3, Générateur d'icônes, Outils gratuits, Mèmes",
        
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
        meta_title: "Imagify Pro - Kostenlose Medien-Tools (GIF, WebP, Icons)",
        meta_desc: "Video zu GIF, WebP-Konverter, Meme-Generator, MP3 extrahieren und App-Icons erstellen. Kostenlos, sicher und ohne Installation.",
        meta_keywords: "GIF erstellen, WebP umwandeln, MP3 extrahieren, Icon Generator, Online Tools, Meme",
        
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
        meta_title: "Imagify Pro - Бесплатные медиа-инструменты (GIF, WebP)",
        meta_desc: "Конвертер видео в GIF, JPG в WebP, создание мемов, извлечение MP3 и генерация иконок. Бесплатно, безопасно, без установки.",
        meta_keywords: "Создать GIF, Конвертер WebP, Извлечь MP3, Генератор иконок, Онлайн инструменты, Мемы",
        
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
        meta_title: "Imagify Pro - Ferramentas de Mídia Grátis (GIF, WebP)",
        meta_desc: "Conversor de vídeo para GIF, WebP, criador de memes, extração de MP3 e ícones de aplicativos. Gratuito, seguro e sem instalação.",
        meta_keywords: "Criar GIF, Converter WebP, Extrair MP3, Gerador de ícones, Ferramentas online, Memes",
        
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
        meta_title: "Imagify Pro - Alat Media Online Gratis (GIF, WebP, Ikon)",
        meta_desc: "Konversi Video ke GIF, WebP, pembuat Meme, ekstrak MP3, dan buat Ikon Aplikasi. Gratis, aman, dan tanpa instalasi.",
        meta_keywords: "Buat GIF, Konversi WebP, Ekstrak MP3, Pembuat Ikon, Alat Online, Meme",
        
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

// [업데이트됨] 언어 적용 함수 (메타 태그 변경 기능 추가)
function applyLanguage() {
    // 1. 브라우저 언어 감지
    const userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    
    // 2. 지원하는 언어인지 확인 (없으면 영어 'en')
    const lang = translations[userLang] ? userLang : 'en';
    const t = translations[lang];

    console.log(`Detected Language: ${userLang}, Applied: ${lang}`);

    // [NEW] 3. 페이지 제목(Title) 및 메타 태그 업데이트
    if (t.meta_title) document.title = t.meta_title;
    
    // Description 메타 태그 업데이트
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta_desc) {
        metaDesc.setAttribute("content", t.meta_desc);
    }

    // Keywords 메타 태그 업데이트 (없으면 생성)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords && t.meta_keywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
    }
    if (metaKeywords && t.meta_keywords) {
        metaKeywords.setAttribute("content", t.meta_keywords);
    }

    // 4. HTML 본문 텍스트 적용 (data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
}

// 페이지 로드 시 언어 적용 실행
document.addEventListener('DOMContentLoaded', applyLanguage);
