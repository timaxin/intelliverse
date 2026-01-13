

const langMap = {
    "am": "አማርኛ", "ar": "العربية", "bn": "বাংলা", "bg": "Български", "zh": "简体中文",
    "hr": "Hrvatski", "cs": "Čeština", "da": "Dansk", "nl": "Nederlands", "en": "English",
    "et": "Eesti", "fi": "Suomi", "fr": "Français", "de": "Deutsch", "el": "Ελληνικά",
    "gu": "ગુજરાતી", "he": "עברית", "hi": "हिन्दी", "hu": "Magyar", "id": "Bahasa Indonesia",
    "it": "Italiano", "ja": "日本語", "kn": "ಕನ್ನಡ", "ko": "한국어", "lv": "Latviešu",
    "lt": "Lietuvių", "ms": "Bahasa Melayu", "mr": "मраठी", "no": "Norsk", "ps": "پښتو",
    "fa": "فارسی", "pl": "Polski", "pt": "Português", "ro": "Română", "ru": "Русский",
    "sr": "Српски", "sk": "Slovenčina", "sl": "Slovenščina", "es": "Español", "sw": "Kiswahili",
    "sv": "Svenska", "tl": "Tagalog", "ta": "தமிழ்", "te": "తెలుగు", "th": "ไทย",
    "tr": "Türkçe", "uk": "Українська", "ur": "اردو", "vi": "Tiếng Việt"
};

let translations = {};
const langSelect = document.getElementById('home-lang-select');
const dietBtn = document.getElementById('diet-link');

/**
 * ИНИЦИАЛИЗАЦИЯ
 */
async function init() {
    try {
        // 1. Загружаем переводы
        const response = await fetch('translations.json');
        if (response.ok) {
            translations = await response.json();
        }

        // 2. Наполняем список языков
        if (langSelect) {
            langSelect.innerHTML = '';
            Object.entries(langMap).forEach(([code, name]) => {
                const option = new Option(name, code);
                langSelect.appendChild(option);
            });

            // 3. Устанавливаем сохраненный язык
            const savedLang = localStorage.getItem('appLanguage') || 'en';
            langSelect.value = savedLang;
            updateLanguage(savedLang);
        }
    } catch (error) {
        console.error("Ошибка инициализации:", error);
    }
}

/**
 * СМЕНА ЯЗЫКА (Локальная для HomePage)
 */
function updateLanguage(lang) {
    localStorage.setItem('appLanguage', lang);
    const data = translations[lang] || translations['en'];
    if (!data) return;

    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (data[key]) elem.textContent = data[key];
    });
}

/**
 * ПРЯМОЙ ПЕРЕХОД ПО КЛИКУ
 */
if (dietBtn) {
    dietBtn.addEventListener('click', () => {
        // Просто переходим на страницу приложения без анимаций
        window.location.href = 'app.html';
    });
}

/**
 * СЛУШАТЕЛИ
 */
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

init();