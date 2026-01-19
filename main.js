

import prompts from './prompts.js';
import { LANG_MAP } from './config.js';

let uploadedFiles = [];
/**
 * 1. КОНФИГУРАЦИЯ
 */
const USE_STUBS = true;// OR FALSE TO GO TO SERVER
const POSSIBLE_SERVER_URLS = [
    'https://test-1-wmr6.onrender.com',
    'https://kevinalvarado.pythonanywhere.com',
    'https://sarahyousef22194.pythonanywhere.com'
];

let CURRENT_SERVER_URL = POSSIBLE_SERVER_URLS[0];
const API_ENDPOINT = '/api/direct';
const UPLOAD_ENDPOINT = '/core/upload';

let translations = {};
let STRINGS = {
    loading: "Loading, please wait...",
    error_ocr: "AI wasn't able to recognize food. Try again.",
    error_solution: "AI error. Please check your input."
};

/**
 * 2. СЕТЕВАЯ ЛОГИКА
 */
const fetchWithRetry = async (endpoint, options = {}) => {
    if (USE_STUBS) return null;
    for (let i = 0; i < POSSIBLE_SERVER_URLS.length; i++) {
        try {
            const baseUrl = CURRENT_SERVER_URL.trim().replace(/\/$/, "");
            const fullUrl = `${baseUrl}${endpoint}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000);
            const response = await fetch(fullUrl, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;
        } catch (error) {
            const currentIndex = POSSIBLE_SERVER_URLS.indexOf(CURRENT_SERVER_URL);
            CURRENT_SERVER_URL = POSSIBLE_SERVER_URLS[(currentIndex + 1) % POSSIBLE_SERVER_URLS.length];
            if (i === POSSIBLE_SERVER_URLS.length - 1) throw error;
        }
    }
};

/**
 * 3. ЛОКАЛИЗАЦИЯ
 */
const applyTranslation = (langCode) => {
    const data = translations[langCode] || translations['en'];
    if (!data) return;

    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (data[key]) {
            if (elem.tagName === 'OPTION') {
                elem.text = data[key];
            } else if (elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT') {
                elem.placeholder = data[key];
            } else {
                elem.textContent = data[key];
            }
        }
    });

    STRINGS.loading = data['loading_text'] || STRINGS.loading;
    STRINGS.error_ocr = data['error_ocr'] || STRINGS.error_ocr;
    STRINGS.error_solution = data['error_solution'] || STRINGS.error_solution;
};

/**
 * 4. ИНТЕРФЕЙС И ЛОГИКА ЗАГРУЗКИ (СТРЕЛКА <-> КОЛЕСИКО)
 */
const toggleLoader = (isLoading) => {
    const targets = [
        { img: 'arrowImg', loader: 'arrowLoader' },
        { img: 'arrowImg2', loader: 'arrowLoader2' }
    ];

    targets.forEach(target => {
        const imgEl = document.getElementById(target.img);
        const loaderEl = document.getElementById(target.loader);

        if (imgEl && loaderEl) {
            if (isLoading) {
                imgEl.style.display = 'none';
                loaderEl.style.display = 'inline-block';
            } else {
                imgEl.style.display = 'inline-block';
                loaderEl.style.display = 'none';
            }
        }
    });
};

const initSelects = () => {
    const fillNumeric = (id, start, end, step, unit = "") => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '<option value="0">Not Relevant</option>';
        for (let i = start; i <= end; i += step) el.appendChild(new Option(`${i}${unit}`, i));
    };

    const fillOptionsTranslated = (id, optionsArray) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '';
        optionsArray.forEach(opt => {
            const option = new Option(opt.text, opt.value);
            option.setAttribute('data-key', opt.key);
            el.appendChild(option);
        });
    };

    fillNumeric('category-select3', 5, 100, 5);
    fillNumeric('category-select5', 120, 220, 5, " cm");
    fillNumeric('category-select6', 20, 140, 5, " kg");

    fillOptionsTranslated('gender-select', [
        { text: "Male", value: "Male", key: "gender_male" },
        { text: "Female", value: "Female", key: "gender_female" }
    ]);

    fillOptionsTranslated('activity-select', [
        { text: "Sedentary", value: "Sedentary", key: "activity_sedentary" },
        { text: "Lightly Active", value: "Lightly Active", key: "activity_light" },
        { text: "Moderately Active", value: "Moderately Active", key: "activity_moderate" },
        { text: "Very Active", value: "Very Active", key: "activity_very" },
        { text: "Extremely Active", value: "Extremely Active", key: "activity_extreme" }
    ]);

    const langSelect = document.getElementById('category-select1');
    if (langSelect) {
        langSelect.innerHTML = '';
        Object.entries(LANG_MAP).forEach(([code, name]) => {
            langSelect.add(new Option(name, code));
        });
        const savedLang = localStorage.getItem('appLanguage') || 'en';
        langSelect.value = savedLang;
        langSelect.onchange = (e) => {
            const newLang = e.target.value;
            localStorage.setItem('appLanguage', newLang);
            applyTranslation(newLang);
        };
    }
};

/**
 * 5. МОДАЛЬНОЕ ОКНО
 */
const initModal = () => {
    const zoomBtn = document.getElementById('zoomBtn');
    const modal = document.getElementById('fullScreenModal');
    const modalImg = document.getElementById('modalImg');
    const previewImg = document.getElementById('previewImg');
    zoomBtn?.addEventListener('click', () => {
        if (previewImg?.src && previewImg.src !== window.location.href) {
            modalImg.src = previewImg.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
    [document.getElementById('closeModalBtn'), modal].forEach(el => {
        el?.addEventListener('click', (e) => {
            if (e.target === el || el.id === 'closeModalBtn') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
};

/**
 * 6. ЛОГИКА ОБРАБОТКИ
 */
const processImage = async (file) => {
    toggleLoader(true);
    try {
        let foodArray = [];
        if (USE_STUBS) {
            await new Promise(r => setTimeout(r, 1000));
            foodArray = [{ name: "Green Apple", food_quantity: "1", food_unit_of_measurement: "piece" }];
        } else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('app_name', 'core');

            // 1. Загрузка файла
            const upRes = await fetchWithRetry(UPLOAD_ENDPOINT, { method: 'POST', body: formData });
            const upData = await upRes.json();

            // 2. Запрос к ИИ
            const recRes = await fetchWithRetry(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "parts": [`Recognize food JSON URL: ${CURRENT_SERVER_URL}${upData.url}`],
                    "model_name": "gemini-flash-latest"
                })
            });
            const recData = await recRes.json();

            // 3. Безопасное извлечение JSON (ищем массив внутри ответа)
            const rawResponse = recData.response;
            const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);

            if (jsonMatch) {
                foodArray = JSON.parse(jsonMatch[0]);
            } else {
                console.error("AI response format error. Received:", rawResponse);
                throw new Error("No JSON array found");
            }
        }

        // 4. Вывод в поле "products"
        const productsInput = document.getElementById('products');
        if (productsInput && foodArray.length > 0) {
            productsInput.value = foodArray.map(f => {
                const qty = f.food_quantity || "";
                const unit = f.food_unit_of_measurement || "";
                const name = f.name || f.food_name || "Unknown";
                return `${qty} ${unit} ${name}`.trim();
            }).join(', ');
        }
    } catch (err) {
        console.error("Detailed Error:", err);
        alert(STRINGS.error_ocr);
    } finally {
        toggleLoader(false);
    }
};




    // --------------
const trackDietWithGemini = async () => {
    const macrosVal = document.getElementById('macros');
    const resultBox = document.getElementById('result-box');
    if (resultBox) resultBox.style.display = 'block';
    if (macrosVal) macrosVal.innerText = STRINGS.loading;

    toggleLoader(true);
    try {
        let finalData;
        if (USE_STUBS) {
            await new Promise(r => setTimeout(r, 2000));
            finalData = { summary: "Stub", calories: 450, proteins: 35, fats: 12, carbs: 50 };
        } else {
            const userInformation = {
                gender: document.getElementById('gender-select')?.value || "not_relevant",
                age: document.getElementById('category-select3')?.value || "0",
                height: document.getElementById('category-select5')?.value || "0",
                weight: document.getElementById('category-select6')?.value || "0",
                physicalActivityLevel: document.getElementById('activity-select')?.value || "not_relevant"
            };
            const savedCode = localStorage.getItem('appLanguage') || 'en';
            const currentLangName = LANG_MAP[savedCode] || "English";
            const prompt = prompts.imageWithNoTaskPrompt(userInformation, currentLangName);
            const response = await fetchWithRetry(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "parts": [prompt], "model_name": "gemini-flash-latest" })
            });
            const result = await response.json();
            finalData = JSON.parse(result.response.replace(/```json|```/gi, "").trim());
        }
        window.location.href = 'results.html?results=' + encodeURIComponent(JSON.stringify(finalData));
    } catch (e) {
        if (macrosVal) macrosVal.innerText = STRINGS.error_solution;
        toggleLoader(false);
    }
};

/**
 * 7. УПРАВЛЕНИЕ КОНТРОЛЛАМИ
 */

const initControls = () => {
    const fileInput = document.getElementById('fileInput');
    const galleryContainer = document.getElementById('galleryContainer');
    const imageGallery = document.getElementById('imageGallery');

    if (!fileInput) return;

    // Кнопки открытия выбора файла
    document.getElementById('photoId')?.addEventListener('click', () => { fileInput.removeAttribute('capture'); fileInput.click(); });
    document.getElementById('cameraId')?.addEventListener('click', () => { fileInput.setAttribute('capture', 'environment'); fileInput.click(); });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        galleryContainer.style.display = 'block';

        files.forEach(file => {
            const fileId = Date.now() + Math.random();
            uploadedFiles.push({ id: fileId, file: file });

            const reader = new FileReader();
            reader.onload = (ev) => {
                // Создаем элемент превью
                const wrapper = document.createElement('div');
                wrapper.className = 'gallery-item';
                wrapper.style = "position:relative; cursor:pointer; border: 2px solid #ccc; border-radius: 8px; overflow:hidden; width: 150px; height: 150px;";
                wrapper.innerHTML = `
                    <img src="${ev.target.result}" style="width:150%; height:150%; object-fit:cover;">
                    <div class="select-overlay" style="position:absolute; top:0; left:0; width:200%; height:200%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.2); color:white; font-size:10px; opacity:0; transition:0.3s;">Scan</div>
                `;

                // При клике на превью — запускаем распознавание этой картинки
                wrapper.onclick = () => {
                    // Визуально выделяем выбранную
                    document.querySelectorAll('.gallery-item').forEach(el => el.style.borderColor = "#ccc");
                    wrapper.style.borderColor = "#4CAF50";

                    // Запускаем процесс для конкретного файла
                    processImage(file);
                };

                // Эффект при наведении
                wrapper.onmouseenter = () => wrapper.querySelector('.select-overlay').style.opacity = "1";
                wrapper.onmouseleave = () => wrapper.querySelector('.select-overlay').style.opacity = "0";

                imageGallery.appendChild(wrapper);
            };
            reader.readAsDataURL(file);
        });

        // Сбрасываем input, чтобы можно было выбрать те же файлы снова
        fileInput.value = "";
    });

    // Очистка при нажатии на карандаш
    ['pencilId', 'pencilId2'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            document.getElementById('products').value = '';
            uploadedFiles = [];
            imageGallery.innerHTML = '';
            galleryContainer.style.display = 'none';
        });
    });

    ['arrowId', 'arrowId2'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', trackDietWithGemini);
    });

    initModal();
};


/**
 * 8. ИНИЦИАЛИЗАЦИЯ КНОПОК
 */
const initButtons = () => {
    const container = document.getElementById('buttonContainer');
    if (!container) return;

    container.innerHTML = `
        <button id="cameraId" class="action-btn" type="button"><img src="pics/camera.png" width="24"></button>
        <button id="photoId" class="action-btn" type="button"><img src="pics/photo.png" width="24"></button>
        <button id="pencilId" class="action-btn" type="button"><img src="pics/pencil.png" width="24"></button>
        <button id="arrowId" class="arrow-btn" type="button">
            <img id="arrowImg" src="pics/arrow.png" width="24">
            <div id="arrowLoader" class="loader" style="display: none;"></div>
        </button>
    `;
};







/**
 * ЗАПУСК
 */
document.addEventListener('DOMContentLoaded', async () => {
    initButtons(); // Кнопки создаются первыми
    initSelects();
    initControls(); // Затем вешаются события на созданные ID

    try {
        const response = await fetch('translations.json');
        if (response.ok) {
            translations = await response.json();
            const savedLang = localStorage.getItem('appLanguage') || 'en';
            setTimeout(() => {
                applyTranslation(savedLang);
            }, 50);
        }
    } catch (e) {
        console.warn("Defaults used", e);
    }
});