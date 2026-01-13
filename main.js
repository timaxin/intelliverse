// const CURRENT_SERVER_URL = 'https://Italord1.pythonanywhere.com';
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// let ARROW_BUTTONS = [];
//
// let toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
//     ARROW_BUTTONS.forEach(button => {
//         button.style.display = button.style.display === 'none' ? 'block' : 'none';
//     })
// }
//
// // --- 1. Инициализация выпадающих списков ---
// const initSelects = () => {
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     if (ageSelect) {
//         for (let age = 5; age <= 100; age += 5) {
//             ageSelect.appendChild(new Option(age, age));
//         }
//     }
//
//     if (heightSelect) {
//         for (let h = 120; h <= 220; h += 5) {
//             heightSelect.appendChild(new Option(`${h} cm`, h));
//         }
//     }
//
//     if (weightSelect) {
//         for (let w = 20; w <= 140; w += 5) {
//             weightSelect.appendChild(new Option(`${w} kg`, w));
//         }
//     }
// };
//
// // --- 2. Генерация кнопок интерфейса ---
// const initButtons = () => {
//     const container = document.getElementById('buttonContainer');
//     if (!container) return;
//
//     const buttons = [
//         { id: 'camera', label: 'make picture' },
//         { id: 'photo', label: 'download photo' },
//         { id: 'pencil', label: 'correct' },
//         { id: 'arrow', label: 'add form' }
//     ];
//
//     container.innerHTML = buttons.map(btn => `
//         <button id="${btn.id}Id" aria-label="${btn.label}">
//             <img src="pics/${btn.id}.png" alt="" width="20" height="20">
//         </button>
//     `).join('') + container.innerHTML;
// };
//
// // --- 3. Функция сжатия изображения (Убирает ошибку "крупное фото") ---
// const uploadImage = (file) => {
//     const url = CURRENT_SERVER_URL + UPLOAD_ENDPOINT;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//     return new Promise((resolve, reject) => {
//         fetch(url, {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 resolve(CURRENT_SERVER_URL + data.url);
//             })
//             .catch(error => {
//                 console.error('Ошибка загрузки:', error);
//                 reject(error);
//             });
//     });
// };
//
// // --- 4. Основная функция работы с Gemini API ---
// const trackDietWithGemini = async (imageUrl = undefined) => {
//     const url = CURRENT_SERVER_URL + API_ENDPOINT;
//     const userFoodInput = document.getElementById('products').value;
//
//     const resBox = document.getElementById('result-box');
//     const macrosVal = document.getElementById('macros');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = "Analysing is in process... Please wait.";
//
//     const prompt = `Identify food and estimate portions.
//     Return ONLY a JSON object without quotes:
//     {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}.
//     User input: ${userFoodInput}`;
//
//     const payload = {
//         "parts": [prompt, ...(imageUrl ? [`Recognize food on the image: ${imageUrl}`] : [])],
//         "model_name": "gemini-2.5-flash"
//     };
//
//     try {
//         toggleLoader();
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
//
//         const result = await response.json();
//         let rawText = result.response;
//
//         const cleanJson = JSON.parse(rawText.replace(/```json|```/gi, "").trim());
//         updateUI(cleanJson);
//
//     } catch (error) {
//         console.error('Error:', error);
//         if (macrosVal) macrosVal.innerText = "Error of recognizing. Try another photo...";
//     }
//     finally {
//         toggleLoader();
//     }
// };
//
// // --- 5. Обновление UI ---
// function updateUI(data) {
//     const calVal = document.getElementById('calories-val');
//     const macrosVal = document.getElementById('macros');
//     const jsonDiv = document.getElementById('json');
//
//     if (calVal) calVal.innerText = `${data.calories || 0} kcal`;
//     if (macrosVal) {
//         macrosVal.innerText = `Б: ${data.proteins || 0}г | Ж: ${data.fats || 0}г | У: ${data.carbs || 0}г`;
//     }
//     if (jsonDiv && DEBUG) jsonDiv.innerText = JSON.stringify(data, null, 2);
// }
//
// // --- 6. Обработка файлов ---
// const initFileHandlers = () => {
//     const fileInput = document.getElementById('fileInput');
//     if (!fileInput) return;
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//
//         try {
//             const uploadedImageUrl = await uploadImage(file);
//             await trackDietWithGemini(uploadedImageUrl);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             return;
//         }
//     });
// };
//
// const initArrowButtons = () => {
//     ARROW_BUTTONS.forEach(button => {
//         button.addEventListener('click', () => {
//             trackDietWithGemini();
//         })
//     })
// }
//
// // --- Запуск ---
// document.addEventListener('DOMContentLoaded', () => {
//     initSelects();
//     initButtons();
//     initFileHandlers();
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     initArrowButtons();
// });



// -------------2--variant ---------------------------------------------
//
// const CURRENT_SERVER_URL = 'https://Italord1.pythonanywhere.com';
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// let ARROW_BUTTONS = [];
//
// let toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
//     ARROW_BUTTONS.forEach(button => {
//         button.style.display = button.style.display === 'none' ? 'block' : 'none';
//     })
// }
//
// // --- 1. Инициализация выпадающих списков ---
// const initSelects = () => {
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     if (ageSelect) {
//         for (let age = 5; age <= 100; age += 5) {
//             ageSelect.appendChild(new Option(age, age));
//         }
//     }
//
//     if (heightSelect) {
//         for (let h = 120; h <= 220; h += 5) {
//             heightSelect.appendChild(new Option(`${h} cm`, h));
//         }
//     }
//
//     if (weightSelect) {
//         for (let w = 20; w <= 140; w += 5) {
//             weightSelect.appendChild(new Option(`${w} kg`, w));
//         }
//     }
// };
//
// // --- 2. Генерация кнопок интерфейса ---
// const initButtons = () => {
//     const container = document.getElementById('buttonContainer');
//     if (!container) return;
//
//     const buttons = [
//         { id: 'camera', label: 'make picture' },
//         { id: 'photo', label: 'download photo' },
//         { id: 'pencil', label: 'correct' },
//         { id: 'arrow', label: 'add form' }
//     ];
//
//     container.innerHTML = buttons.map(btn => `
//         <button id="${btn.id}Id" aria-label="${btn.label}">
//             <img src="pics/${btn.id}.png" alt="" width="20" height="20">
//         </button>
//     `).join('') + container.innerHTML;
// };
//
// // --- 3. Функция сжатия изображения (Убирает ошибку "крупное фото") ---
// const uploadImage = (file) => {
//     const url = CURRENT_SERVER_URL + UPLOAD_ENDPOINT;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//     return new Promise((resolve, reject) => {
//         fetch(url, {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 resolve(CURRENT_SERVER_URL + data.url);
//             })
//             .catch(error => {
//                 console.error('Ошибка загрузки:', error);
//                 reject(error);
//             });
//     });
// };
//
// const recognizeImage = async (imageUrl) => {
//     const url = CURRENT_SERVER_URL + API_ENDPOINT;
//     const payload = {
//         "parts": [`
//             Recognize food on the image and return result in JSON format of a following structure:
//             [{
//                 "name": "food name",
//                 "food_quantity": "quantity of food recognized tightly connected to food_unit_of_measurement",
//                 "food_unit_of_measurement": "grams or pieces or spoons or whatever suitable for serving"
//             }]
//             Image URL is ${imageUrl}`],
//         "model_name": "gemini-2.5-flash"
//     };
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     return await response.json();
// };
//
// // --- 4. Основная функция работы с Gemini API ---
// const trackDietWithGemini = async (recognizedFood = undefined) => {
//     const url = CURRENT_SERVER_URL + API_ENDPOINT;
//     const userFoodInput = document.getElementById('products').value;
//
//     const resBox = document.getElementById('result-box');
//     const macrosVal = document.getElementById('macros');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = "Analysing is in process... Please wait.";
//
//     const prompt = `Identify food and estimate portions.
//     Return ONLY a JSON object without quotes:
//     {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}.
//     User input: ${userFoodInput}`;
//
//     const payload = {
//         "parts": [prompt, ...(recognizedFood ? ['Take into account this recognized food: ' + JSON.stringify(recognizedFood)] : [])],
//         "model_name": "gemini-2.5-flash"
//     };
//
//     try {
//         toggleLoader();
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
//
//         const result = await response.json();
//         let rawText = result.response;
//
//         const cleanJson = JSON.parse(rawText.replace(/```json|```/gi, "").trim());
//         updateUI(cleanJson);
//
//     } catch (error) {
//         console.error('Error:', error);
//         if (macrosVal) macrosVal.innerText = "Error of recognizing. Try another photo...";
//     }
//     finally {
//         toggleLoader();
//     }
// };
//
// // --- 5. Обновление UI ---
// function updateUI(data) {
//     const calVal = document.getElementById('calories-val');
//     const macrosVal = document.getElementById('macros');
//     const jsonDiv = document.getElementById('json');
//
//     if (calVal) calVal.innerText = `${data.calories || 0} kcal`;
//     if (macrosVal) {
//         macrosVal.innerText = `Б: ${data.proteins || 0}г | Ж: ${data.fats || 0}г | У: ${data.carbs || 0}г`;
//     }
//     if (jsonDiv && DEBUG) jsonDiv.innerText = JSON.stringify(data, null, 2);
// }
//
// // --- 6. Обработка файлов ---
// const initFileHandlers = () => {
//     const fileInput = document.getElementById('fileInput');
//     if (!fileInput) return;
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//
//         try {
//             const uploadedImageUrl = await uploadImage(file);
//             const recognitionResult = await recognizeImage(uploadedImageUrl);
//
//             console.log("Recognition result:", recognitionResult);
//
//             const recognizedFoodArray = JSON.parse(recognitionResult.response.replace(/```json|```/gi, "").trim());
//
//             const recognizedFoodDiv = document.getElementById('recognized-food-container');
//             const recognizedFoodList = document.getElementById('recognized-food-list');
//             if (recognizedFoodDiv && recognizedFoodList) {
//                 recognizedFoodList.innerHTML = recognizedFoodArray.map(foodItem =>
//                     `<div><input value="${foodItem.name || ''}"/><input value="${foodItem.food_quantity || ''}"/>${foodItem.food_unit_of_measurement || ''}</div>`
//                 ).join('');
//                 recognizedFoodDiv.style.display = 'block';
//             }
//             // await trackDietWithGemini(recognitionResult);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             return;
//         }
//     });
// };
//
// const initArrowButtons = () => {
//     ARROW_BUTTONS.forEach(button => {
//         button.addEventListener('click', () => {
//             trackDietWithGemini();
//         })
//     })
// }
//
// // --- Запуск ---
// document.addEventListener('DOMContentLoaded', () => {
//     initSelects();
//     initButtons();
//     initFileHandlers();
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     initArrowButtons();
// });
//


// ----------------3 variant with xml---------------
// // const CURRENT_SERVER_URL = 'https://Italord1.pythonanywhere.com';;
// const CURRENT_SERVER_URL = 'https://sarahyousef22194.pythonanywhere.com';
//
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// // Ресурсы из предоставленных XML
// const STRINGS = {
//     loading: "Loading, please, wait...",
//     error_ocr: "AI wasn't able to recognize text from the image. Please, try again.",
//     error_solution: "AI wasn't able to solve this problem. Please, try again.",
//     detect_ingredients_guidance: "Review the detected ingredients. If any details are incorrect or missing, you can modify them before generating a new nutritional analysis"
// };
//
// const LANGUAGES = ["Amharic", "Arabic", "Bengali", "Bulgarian", "Chinese Simplified",
//     "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish",
//     "French", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian",
//     "Indonesian", "Italian", "Japanese", "Kannada", "Korean", "Latvian", "Lithuanian",
//     "Malay", "Marathi", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese",
//     "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili",
//     "Swedish", "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese"];
// const PHYSICAL_ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];
// const GENDER = ["Male", "Female"];
//
// let ARROW_BUTTONS = [];
//
// let toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
// };
//
//
//
// const initSelects = () => {
//     const langSelect = document.getElementById('category-select1');
//     const genderSelect = document.getElementById('gender-select');
//     const activitySelect = document.getElementById('activity-select');
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     // --- Логика определения языка девайса ---
//
//     // Получаем язык системы (например, "ru-RU" -> "Russian")
//     const deviceLanguageCode = navigator.language || navigator.userLanguage;
//     const shortLangCode = deviceLanguageCode.split('-')[0].toLowerCase(); // берем только "ru", "en" и т.д.
//
//     // Карта соответствия коротких кодов вашим полным названиям из массива LANGUAGES
//     const langMap = {
//         "am": "Amharic", "ar": "Arabic", "bn": "Bengali", "bg": "Bulgarian", "zh": "Chinese Simplified",
//         "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English",
//         "et": "Estonian", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek",
//         "gu": "Gujarati", "he": "Hebrew", "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian",
//         "it": "Italian", "ja": "Japanese", "kn": "Kannada", "ko": "Korean", "lv": "Latvian",
//         "lt": "Lithuanian", "ms": "Malay", "mr": "Marathi", "no": "Norwegian", "ps": "Pashto",
//         "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian", "ru": "Russian",
//         "sr": "Serbian", "sk": "Slovak", "sl": "Slovenian", "es": "Spanish", "sw": "Swahili",
//         "sv": "Swedish", "tl": "Tagalog", "ta": "Tamil", "te": "Telugu", "th": "Thai",
//         "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "vi": "Vietnamese"
//     };
//
//     // Определяем, какой язык выбрать по умолчанию
//     const detectedLangName = langMap[shortLangCode];
//     // Проверяем, есть ли такой язык в нашем списке LANGUAGES
//     const finalDefaultLang = LANGUAGES.includes(detectedLangName) ? detectedLangName : "English";
//
//     // Наполнение языков
//     LANGUAGES.forEach(lang => {
//         const option = new Option(lang, lang);
//         langSelect.appendChild(option);
//     });
//
//     // Устанавливаем выбранный язык
//     langSelect.value = finalDefaultLang;
//
//     // --- Остальные настройки (Not Relevant) ---
//
//     // Пол
//     genderSelect.appendChild(new Option("Not Relevant", "not_relevant"));
//     GENDER.forEach(g => genderSelect.appendChild(new Option(g, g)));
//
//     // Активность
//     activitySelect.appendChild(new Option("Not Relevant", "not_relevant"));
//     PHYSICAL_ACTIVITY.forEach(a => activitySelect.appendChild(new Option(a, a)));
//
//     // Возраст
//     if (ageSelect) {
//         ageSelect.innerHTML = "";
//         ageSelect.appendChild(new Option("Not Relevant", "0"));
//         for (let age = 5; age <= 100; age += 5) ageSelect.appendChild(new Option(age, age));
//     }
//
//     // Рост
//     if (heightSelect) {
//         heightSelect.innerHTML = "";
//         heightSelect.appendChild(new Option("Not Relevant", "0"));
//         for (let h = 120; h <= 220; h += 5) heightSelect.appendChild(new Option(`${h} cm`, h));
//     }
//
//     // Вес
//     if (weightSelect) {
//         weightSelect.innerHTML = "";
//         weightSelect.appendChild(new Option("Not Relevant", "0"));
//         for (let w = 20; w <= 140; w += 5) weightSelect.appendChild(new Option(`${w} kg`, w));
//     }
// };
//
//
//
//
// // --- 2. Генерация кнопок (Labels из ресурсов) ---
// const initButtons = () => {
//     const container = document.getElementById('buttonContainer');
//     if (!container) return;
//
//     const buttons = [
//         { id: 'camera', label: 'Take a Picture' },
//         { id: 'photo', label: 'Upload Picture' },
//         { id: 'pencil', label: 'Correct' },
//         { id: 'arrow', label: 'Next' }
//     ];
//
//     container.innerHTML = buttons.map(btn => `
//         <button id="${btn.id}Id" title="${btn.label}" aria-label="${btn.label}">
//             <img src="pics/${btn.id}.png" alt="" width="20" height="20">
//         </button>
//     `).join('') + container.innerHTML;
// };
//
// // --- 3. Загрузка и распознавание ---
// const uploadImage = async (file) => {
//     const url = CURRENT_SERVER_URL + UPLOAD_ENDPOINT;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//
//     const response = await fetch(url, { method: 'POST', body: formData });
//     const data = await response.json();
//     return CURRENT_SERVER_URL + data.url;
// };
//
// const recognizeImage = async (imageUrl) => {
//     const url = CURRENT_SERVER_URL + API_ENDPOINT;
//     const payload = {
//         "parts": [`
//             Recognize food on the image.
//             Guidance: ${STRINGS.detect_ingredients_guidance}.
//             Return JSON: [{"name": "food name", "food_quantity": "value", "food_unit_of_measurement": "unit"}]
//             URL: ${imageUrl}`],
//         "model_name": " gemini-flash-latest"
//     };
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     return await response.json();
// };
//
// // --- 4. Основная логика анализа ---
// const trackDietWithGemini = async (recognizedFood = undefined) => {
//     const userFoodInput = document.getElementById('products').value;
//     const resBox = document.getElementById('result-box');
//     const macrosVal = document.getElementById('macros');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = STRINGS.loading;
//
//     const prompt = `Analyze nutrition. User info:
//     Gender: ${document.getElementById('gender-select').value},
//     Activity: ${document.getElementById('activity-select').value}.
//     Input: ${userFoodInput}.
//     Return ONLY JSON: {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}`;
//
//     const payload = {
//         "parts": [prompt, ...(recognizedFood ? [JSON.stringify(recognizedFood)] : [])],
//         "model_name": "gemini-2.0-flash"
//     };
//
//     try {
//         toggleLoader();
//         const response = await fetch(CURRENT_SERVER_URL + API_ENDPOINT, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         const result = await response.json();
//         const cleanJson = JSON.parse(result.response.replace(/```json|```/gi, "").trim());
//         updateUI(cleanJson);
//     } catch (error) {
//         console.error(error);
//         if (macrosVal) macrosVal.innerText = STRINGS.error_solution;
//     } finally {
//         toggleLoader();
//     }
// };
//
// function updateUI(data) {
//     document.getElementById('calories-val').innerText = `${data.calories || 0} kcal`;
//     document.getElementById('macros').innerText = `P: ${data.proteins || 0}g | F: ${data.fats || 0}g | C: ${data.carbs || 0}g`;
//     if (DEBUG) document.getElementById('json').innerText = JSON.stringify(data, null, 2);
// }
//
// const initFileHandlers = () => {
//     const fileInput = document.getElementById('fileInput');
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         toggleLoader();
//         try {
//             const imgUrl = await uploadImage(file);
//             const recognition = await recognizeImage(imgUrl);
//             const foodArray = JSON.parse(recognition.response.replace(/```json|```/gi, "").trim());
//
//             // Заполняем текстовое поле распознанными продуктами для редактирования
//             const foodText = foodArray.map(f => `${f.food_quantity} ${f.food_unit_of_measurement} ${f.name}`).join(', ');
//             document.getElementById('products').value = foodText;
//
//             alert(STRINGS.detect_ingredients_guidance);
//         } catch (err) {
//             alert(STRINGS.error_ocr);
//         } finally {
//             toggleLoader();
//         }
//     });
// };
//
//
// const initActionButtons = () => {
//     // Находим кнопку карандаша (ластика)
//     const pencilBtn = document.getElementById('pencilId');
//     const pencilBtn2 = document.getElementById('pencilId2'); // Вторая кнопка внизу
//
//     const clearForm = () => {
//         // 1. Очищаем текстовое поле
//         const textarea = document.getElementById('products');
//         if (textarea) textarea.value = '';
//
//         // 2. Скрываем блок результатов
//         const resBox = document.getElementById('result-box');
//         if (resBox) resBox.style.display = 'none';
//
//         // 3. Очищаем JSON блок (если DEBUG включен)
//         const jsonDiv = document.getElementById('json');
//         if (jsonDiv) jsonDiv.innerText = '';
//
//         console.log("Form cleared");
//     };
//
//     // Вешаем событие на обе кнопки
//     pencilBtn?.addEventListener('click', clearForm);
//     pencilBtn2?.addEventListener('click', clearForm);
// };
//
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     ARROW_BUTTONS.forEach(btn => btn?.addEventListener('click', () => trackDietWithGemini()));
//
//
//
// document.addEventListener('DOMContentLoaded', () => {
//     initSelects();
//     initButtons();
//     initFileHandlers();
//     initActionButtons();
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     ARROW_BUTTONS.forEach(btn => btn?.addEventListener('click', () => trackDietWithGemini()));
// });

// ---------------------------------------before to delete--------

//
// /**
//  * КОНФИГУРАЦИЯ И СЕРВЕР
//  */
// const CURRENT_SERVER_URL = 'https://sarahyousef22194.pythonanywhere.com';
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// /**
//  * РЕСУРСЫ И СТРОКИ
//  */
// const STRINGS = {
//     loading: "Loading, please, wait...",
//     error_ocr: "AI wasn't able to recognize text from the image. Please, try again.",
//     error_solution: "AI wasn't able to solve this problem. Please, try again.",
//     detect_ingredients_guidance: "Review the detected ingredients. Ifлюбые детали неверны, вы можете их изменить."
// };
//
// const LANGUAGES = [
//     "Amharic", "Arabic", "Bengali", "Bulgarian", "Chinese Simplified",
//     "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish",
//     "French", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian",
//     "Indonesian", "Italian", "Japanese", "Kannada", "Korean", "Latvian", "Lithuanian",
//     "Malay", "Marathi", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese",
//     "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili",
//     "Swedish", "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese"
// ];
//
// const PHYSICAL_ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];
// const GENDER = ["Male", "Female"];
//
// let ARROW_BUTTONS = [];
//
// /**
//  * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//  */
// const toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
// };
//
// /**
//  * 1. ИНИЦИАЛИЗАЦИЯ ВЫПАДАЮЩИХ СПИСКОВ
//  */
// const initSelects = () => {
//     const langSelect = document.getElementById('category-select1');
//     const genderSelect = document.getElementById('gender-select');
//     const activitySelect = document.getElementById('activity-select');
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     if (!langSelect) return;
//
//     // Наполнение языков
//     langSelect.innerHTML = '';
//     LANGUAGES.forEach(lang => langSelect.appendChild(new Option(lang, lang)));
//
//     // Установка языка из localStorage (выбранного на HomePage)
//     const savedLangCode = localStorage.getItem('appLanguage') || 'en';
//     const langMap = {
//         "am": "Amharic", "ar": "Arabic", "bn": "Bengali", "bg": "Bulgarian", "zh": "Chinese Simplified",
//         "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English",
//         "et": "Estonian", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek",
//         "gu": "Gujarati", "he": "Hebrew", "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian",
//         "it": "Italian", "ja": "Japanese", "kn": "Kannada", "ko": "Korean", "lv": "Latvian",
//         "lt": "Lithuanian", "ms": "Malay", "mr": "Marathi", "no": "Norwegian", "ps": "Pashto",
//         "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian", "ru": "Russian",
//         "sr": "Serbian", "sk": "Slovak", "sl": "Slovenian", "es": "Spanish", "sw": "Swahili",
//         "sv": "Swedish", "tl": "Tagalog", "ta": "Tamil", "te": "Telugu", "th": "Thai",
//         "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "vi": "Vietnamese"
//     };
//     langSelect.value = langMap[savedLangCode] || "English";
//
//     // Пол и Активность
//     [genderSelect, activitySelect].forEach(sel => {
//         if (sel) {
//             sel.innerHTML = '<option value="not_relevant">Not Relevant</option>';
//             const data = sel === genderSelect ? GENDER : PHYSICAL_ACTIVITY;
//             data.forEach(item => sel.appendChild(new Option(item, item)));
//         }
//     });
//
//     // Числовые селекты
//     const fillNumeric = (el, start, end, step, unit = "") => {
//         if (!el) return;
//         el.innerHTML = '<option value="0">Not Relevant</option>';
//         for (let i = start; i <= end; i += step) el.appendChild(new Option(`${i}${unit}`, i));
//     };
//
//     fillNumeric(ageSelect, 5, 100, 5);
//     fillNumeric(heightSelect, 120, 220, 5, " cm");
//     fillNumeric(weightSelect, 20, 140, 5, " kg");
// };
//
// /**
//  * 2. ГЕНЕРАЦИЯ КНОПОК
//  */
// const initButtons = () => {
//     const container = document.getElementById('buttonContainer');
//     if (!container) return;
//
//     const buttons = [
//         { id: 'camera', label: 'Take a Picture' },
//         { id: 'photo', label: 'Upload Picture' },
//         { id: 'pencil', label: 'Correct' },
//         { id: 'arrow', label: 'Next' }
//     ];
//
//     container.innerHTML = buttons.map(btn => `
//         <button id="${btn.id}Id" title="${btn.label}" aria-label="${btn.label}">
//             <img src="pics/${btn.id}.png" alt="" width="20" height="20">
//         </button>
//     `).join('') + container.innerHTML;
// };
//
// /**
//  * 3. ЗАГРУЗКА И РАСПОЗНАВАНИЕ (GEMINI-FLASH-LATEST)
//  */
// const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//
//     const response = await fetch(CURRENT_SERVER_URL + UPLOAD_ENDPOINT, { method: 'POST', body: formData });
//     if (!response.ok) throw new Error("Upload failed");
//     const data = await response.json();
//     return CURRENT_SERVER_URL + data.url;
// };
//
// const recognizeImage = async (imageUrl) => {
//     const payload = {
//         "parts": [`Recognize food on the image. Return JSON: [{"name": "food name", "food_quantity": "value", "food_unit_of_measurement": "unit"}]. URL: ${imageUrl}`],
//         "model_name": "gemini-flash-latest"
//     };
//     const response = await fetch(CURRENT_SERVER_URL + API_ENDPOINT, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     return await response.json();
// };
//
// /**
//  * 4. ОСНОВНОЙ АНАЛИЗ (GEMINI-FLASH-LATEST)
//  */
// const trackDietWithGemini = async (recognizedFood = undefined) => {
//     const userFoodInput = document.getElementById('products').value;
//     const resBox = document.getElementById('result-box');
//     const macrosVal = document.getElementById('macros');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = STRINGS.loading;
//
//     const prompt = `Analyze nutrition. User: Gender ${document.getElementById('gender-select').value}, Activity ${document.getElementById('activity-select').value}. Input: ${userFoodInput}. Return ONLY JSON: {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}`;
//
//     const payload = {
//         "parts": [prompt, ...(recognizedFood ? [JSON.stringify(recognizedFood)] : [])],
//         "model_name": "gemini-flash-latest"
//     };
//
//     try {
//         toggleLoader();
//         const response = await fetch(CURRENT_SERVER_URL + API_ENDPOINT, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         if (!response.ok) throw new Error("Server error");
//         const result = await response.json();
//         const cleanJson = JSON.parse(result.response.replace(/```json|```/gi, "").trim());
//         updateUI(cleanJson);
//     } catch (error) {
//         console.error(error);
//         if (macrosVal) macrosVal.innerText = STRINGS.error_solution;
//     } finally {
//         toggleLoader();
//     }
// };
//
// function updateUI(data) {
//     document.getElementById('calories-val').innerText = `${data.calories || 0} kcal`;
//     document.getElementById('macros').innerText = `P: ${data.proteins || 0}g | F: ${data.fats || 0}g | C: ${data.carbs || 0}g`;
//     if (DEBUG && document.getElementById('json')) {
//         document.getElementById('json').innerText = JSON.stringify(data, null, 2);
//     }
// }
//
// /**
//  * 5. ОБРАБОТЧИКИ СОБЫТИЙ
//  */
// const initFileHandlers = () => {
//     const fileInput = document.getElementById('fileInput');
//     if (!fileInput) return;
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         toggleLoader();
//         try {
//             const imgUrl = await uploadImage(file);
//             const recognition = await recognizeImage(imgUrl);
//             const foodArray = JSON.parse(recognition.response.replace(/```json|```/gi, "").trim());
//
//             const foodText = foodArray.map(f => `${f.food_quantity} ${f.food_unit_of_measurement} ${f.name}`).join(', ');
//             document.getElementById('products').value = foodText;
//         } catch (err) {
//             alert(STRINGS.error_ocr);
//         } finally {
//             toggleLoader();
//         }
//     });
// };
//
// const initActionButtons = () => {
//     const clearForm = () => {
//         const textarea = document.getElementById('products');
//         if (textarea) textarea.value = '';
//         const resBox = document.getElementById('result-box');
//         if (resBox) resBox.style.display = 'none';
//     };
//
//     document.getElementById('pencilId')?.addEventListener('click', clearForm);
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     ARROW_BUTTONS.forEach(btn => btn?.addEventListener('click', () => trackDietWithGemini()));
// };
//
// /**
//  * ЗАПУСК
//  */
// document.addEventListener('DOMContentLoaded', () => {
//     initSelects();
//     initButtons();
//     initFileHandlers();
//     initActionButtons();
// });
// ---------------------------------------new-------------------

// /**
//  * КОНФИГУРАЦИЯ
//  */
// const CURRENT_SERVER_URL = 'https://sarahyousef22194.pythonanywhere.com';
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// let translations = {}; // Глобальный объект для хранения текстов
// let ARROW_BUTTONS = [];
//
// /**
//  * СИСТЕМНЫЕ СТРОКИ (Будут обновлены при загрузке языка)
//  */
// let STRINGS = {
//     loading: "Loading, please, wait...",
//     error_ocr: "AI wasn't able to recognize food. Try again.",
//     error_solution: "AI error. Please check your input.",
//     guidance: "Review the detected ingredients..."
// };
//
// /**
//  * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//  */
// const toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
// };
//
// /**
//  * 1. ЛОКАЛИЗАЦИЯ (ПЕРЕВОД ИНТЕРФЕЙСА)
//  */
// const applyTranslation = (langCode) => {
//     const data = translations[langCode] || translations['en'];
//     if (!data) return;
//
//     // Обновляем все элементы с атрибутом data-key
//     document.querySelectorAll('[data-key]').forEach(elem => {
//         const key = elem.getAttribute('data-key');
//         if (data[key]) {
//             if (elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT') {
//                 elem.placeholder = data[key];
//             } else {
//                 elem.textContent = data[key];
//             }
//         }
//     });
//
//     // Обновляем системные сообщения
//     STRINGS.loading = data['loading_text'] || STRINGS.loading;
//     STRINGS.error_ocr = data['error_ocr'] || STRINGS.error_ocr;
// };
//
// /**
//  * 2. ИНИЦИАЛИЗАЦИЯ СЕЛЕКТОВ
//  */
// const initSelects = () => {
//     const langSelect = document.getElementById('category-select1');
//     const genderSelect = document.getElementById('gender-select');
//     const activitySelect = document.getElementById('activity-select');
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     const LANGUAGES = ["Amharic", "Arabic", "Bengali", "Bulgarian", "Chinese Simplified", "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", "Kannada", "Korean", "Latvian", "Lithuanian", "Malay", "Marathi", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese"];
//     const GENDER = ["Male", "Female"];
//     const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];
//
//     // Карта для поиска имени по коду
//     const langMap = {"am": "Amharic", "ar": "Arabic", "bn": "Bengali", "bg": "Bulgarian", "zh": "Chinese Simplified", "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English", "et": "Estonian", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek", "gu": "Gujarati", "he": "Hebrew", "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian", "it": "Italian", "ja": "Japanese", "kn": "Kannada", "ko": "Korean", "lv": "Latvian", "lt": "Lithuanian", "ms": "Malay", "mr": "Marathi", "no": "Norwegian", "ps": "Pashto", "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian", "ru": "Russian", "sr": "Serbian", "sk": "Slovak", "sl": "Slovenian", "es": "Spanish", "sw": "Swahili", "sv": "Swedish", "tl": "Tagalog", "ta": "Tamil", "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "vi": "Vietnamese"};
//
//     if (langSelect) {
//         langSelect.innerHTML = '';
//         LANGUAGES.forEach(l => langSelect.appendChild(new Option(l, l)));
//
//         const savedCode = localStorage.getItem('appLanguage') || 'en';
//         langSelect.value = langMap[savedCode] || "English";
//
//         langSelect.addEventListener('change', (e) => {
//             const code = Object.keys(langMap).find(key => langMap[key] === e.target.value);
//             if (code) {
//                 localStorage.setItem('appLanguage', code);
//                 applyTranslation(code);
//             }
//         });
//     }
//
//     const fillOptions = (sel, data) => {
//         if (!sel) return;
//         sel.innerHTML = '<option value="not_relevant">Not Relevant</option>';
//         data.forEach(item => sel.appendChild(new Option(item, item)));
//     };
//
//     fillOptions(genderSelect, GENDER);
//     fillOptions(activitySelect, ACTIVITY);
//
//     const fillNumeric = (el, start, end, step, unit = "") => {
//         if (!el) return;
//         el.innerHTML = '<option value="0">Not Relevant</option>';
//         for (let i = start; i <= end; i += step) el.appendChild(new Option(`${i}${unit}`, i));
//     };
//
//     fillNumeric(ageSelect, 5, 100, 5);
//     fillNumeric(heightSelect, 120, 220, 5, " cm");
//     fillNumeric(weightSelect, 20, 140, 5, " kg");
// };
//
// /**
//  * 3. РАБОТА С СЕРВЕРОМ (GEMINI-FLASH-LATEST)
//  */
// const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//
//     const response = await fetch(`${CURRENT_SERVER_URL}${UPLOAD_ENDPOINT}`, { method: 'POST', body: formData });
//     if (!response.ok) throw new Error("Upload Error");
//     const data = await response.json();
//     return `${CURRENT_SERVER_URL}${data.url}`;
// };
//
// const recognizeImage = async (imageUrl) => {
//     const payload = {
//         "parts": [`Recognize food on the image. Return ONLY JSON: [{"name": "food", "food_quantity": "val", "food_unit_of_measurement": "unit"}]. URL: ${imageUrl}`],
//         "model_name": "gemini-flash-latest"
//     };
//     const response = await fetch(`${CURRENT_SERVER_URL}${API_ENDPOINT}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     return await response.json();
// };
//
// const trackDietWithGemini = async () => {
//     const userFoodInput = document.getElementById('products').value;
//     const macrosVal = document.getElementById('macros');
//     const resBox = document.getElementById('result-box');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = STRINGS.loading;
//
//     const prompt = `Analyze nutrition. User: ${document.getElementById('gender-select').value}, ${document.getElementById('activity-select').value}. Input: ${userFoodInput}. Return ONLY JSON object: {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}`;
//
//     const payload = {
//         "parts": [prompt],
//         "model_name": "gemini-flash-latest"
//     };
//
//     try {
//         toggleLoader();
//         const response = await fetch(`${CURRENT_SERVER_URL}${API_ENDPOINT}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         const result = await response.json();
//         const cleanJson = JSON.parse(result.response.replace(/```json|```/gi, "").trim());
//
//         document.getElementById('calories-val').innerText = `${cleanJson.calories || 0} kcal`;
//         document.getElementById('macros').innerText = `P: ${cleanJson.proteins}g | F: ${cleanJson.fats}g | C: ${cleanJson.carbs}g`;
//
//         if (DEBUG && document.getElementById('json')) {
//             document.getElementById('json').innerText = JSON.stringify(cleanJson, null, 2);
//         }
//     } catch (error) {
//         if (macrosVal) macrosVal.innerText = STRINGS.error_solution;
//     } finally {
//         toggleLoader();
//     }
// };
//
// /**
//  * 4. ОБРАБОТЧИКИ КНОПОК
//  */
// const initControls = () => {
//     const fileInput = document.getElementById('fileInput');
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput?.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         toggleLoader();
//         try {
//             const imgUrl = await uploadImage(file);
//             const recognition = await recognizeImage(imgUrl);
//             const foodArray = JSON.parse(recognition.response.replace(/```json|```/gi, "").trim());
//
//             document.getElementById('products').value = foodArray.map(f => `${f.food_quantity} ${f.food_unit_of_measurement} ${f.name}`).join(', ');
//         } catch (err) {
//             alert(STRINGS.error_ocr);
//         } finally {
//             toggleLoader();
//         }
//     });
//
//     document.getElementById('pencilId')?.addEventListener('click', () => {
//         document.getElementById('products').value = '';
//         document.getElementById('result-box').style.display = 'none';
//     });
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     ARROW_BUTTONS.forEach(btn => btn?.addEventListener('click', trackDietWithGemini));
// };
//
// /**
//  * ЗАПУСК ПРИЛОЖЕНИЯ
//  */
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('translations.json');
//         if (response.ok) translations = await response.json();
//
//         initSelects();
//         initControls();
//
//         const savedCode = localStorage.getItem('appLanguage') || 'en';
//         applyTranslation(savedCode);
//     } catch (e) {
//         console.error("Init failed", e);
//     }
// });


/**
 * КОНФИГУРАЦИЯ
 */
//
// const CURRENT_SERVER_URL = 'https://sarahyousef22194.pythonanywhere.com';
// const API_ENDPOINT = '/api/direct';
// const UPLOAD_ENDPOINT = '/core/upload';
// const DEBUG = true;
//
// let translations = {}; // Глобальный объект для хранения текстов
// let ARROW_BUTTONS = [];
//
// /**
//  * СИСТЕМНЫЕ СТРОКИ (Будут обновлены при загрузке языка)
//  */
// let STRINGS = {
//     loading: "Loading, please, wait...",
//     error_ocr: "AI wasn't able to recognize food. Try again.",
//     error_solution: "AI error. Please check your input.",
//     guidance: "Review the detected ingredients..."
// };
//
// /**
//  * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//  */
// const toggleLoader = () => {
//     document.querySelectorAll('.loader').forEach(loader => {
//         loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
//     });
// };
//
// /**
//  * 1. ЛОКАЛИЗАЦИЯ (ПЕРЕВОД ИНТЕРФЕЙСА)
//  */
// const applyTranslation = (langCode) => {
//     const data = translations[langCode] || translations['en'];
//     if (!data) return;
//
//     // Обновляем все элементы с атрибутом data-key
//     document.querySelectorAll('[data-key]').forEach(elem => {
//         const key = elem.getAttribute('data-key');
//         if (data[key]) {
//             if (elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT') {
//                 elem.placeholder = data[key];
//             } else {
//                 elem.textContent = data[key];
//             }
//         }
//     });
//
//     // Обновляем системные сообщения
//     STRINGS.loading = data['loading_text'] || STRINGS.loading;
//     STRINGS.error_ocr = data['error_ocr'] || STRINGS.error_ocr;
//     STRINGS.error_solution = data['error_solution'] || STRINGS.error_solution;
// };
//
// /**
//  * 2. ГЕНЕРАЦИЯ КНОПОК ПАНЕЛИ
//  */
// const initButtons = () => {
//     const container = document.getElementById('buttonContainer');
//     if (!container) {
//         console.error("Критическая ошибка: Контейнер 'buttonContainer' не найден в HTML!");
//         return;
//     }
//
//     const buttons = [
//         { id: 'camera', labelKey: 'camera_label' },
//         { id: 'photo', labelKey: 'photo_label' },
//         { id: 'pencil', labelKey: 'btn_correct' },
//         { id: 'arrow', labelKey: 'btn_next' }
//     ];
//
//     // Очищаем и создаем кнопки динамически
//     container.innerHTML = buttons.map(btn => `
//         <button id="${btn.id}Id" title="${btn.id}" class="action-btn">
//             <img src="pics/${btn.id}.png" alt="" width="24" height="24">
//         </button>
//     `).join('');
//
//     console.log("Панель кнопок успешно создана");
// };
//
// /**
//  * 3. ИНИЦИАЛИЗАЦИЯ СЕЛЕКТОВ
//  */
// const initSelects = () => {
//     const langSelect = document.getElementById('category-select1');
//     const genderSelect = document.getElementById('gender-select');
//     const activitySelect = document.getElementById('activity-select');
//     const ageSelect = document.getElementById('category-select3');
//     const heightSelect = document.getElementById('category-select5');
//     const weightSelect = document.getElementById('category-select6');
//
//     const LANGUAGES = ["Amharic", "Arabic", "Bengali", "Bulgarian", "Chinese Simplified", "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", "Kannada", "Korean", "Latvian", "Lithuanian", "Malay", "Marathi", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese"];
//     const GENDER = ["Male", "Female"];
//     const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];
//
//     const langMap = {"am": "Amharic", "ar": "Arabic", "bn": "Bengali", "bg": "Bulgarian", "zh": "Chinese Simplified", "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English", "et": "Estonian", "fi": "Finnish", "fr": "French", "de": "German", "el": "Greek", "gu": "Gujarati", "he": "Hebrew", "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian", "it": "Italian", "ja": "Japanese", "kn": "Kannada", "ko": "Korean", "lv": "Latvian", "lt": "Lithuanian", "ms": "Malay", "mr": "Marathi", "no": "Norwegian", "ps": "Pashto", "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian", "ru": "Russian", "sr": "Serbian", "sk": "Slovak", "sl": "Slovenian", "es": "Spanish", "sw": "Swahili", "sv": "Swedish", "tl": "Tagalog", "ta": "Tamil", "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "vi": "Vietnamese"};
//
//     if (langSelect) {
//         langSelect.innerHTML = '';
//         LANGUAGES.forEach(l => langSelect.appendChild(new Option(l, l)));
//         const savedCode = localStorage.getItem('appLanguage') || 'en';
//         langSelect.value = langMap[savedCode] || "English";
//
//         langSelect.addEventListener('change', (e) => {
//             const code = Object.keys(langMap).find(key => langMap[key] === e.target.value);
//             if (code) {
//                 localStorage.setItem('appLanguage', code);
//                 applyTranslation(code);
//             }
//         });
//     }
//
//     const fillOptions = (sel, data) => {
//         if (!sel) return;
//         sel.innerHTML = '<option value="not_relevant">Not Relevant</option>';
//         data.forEach(item => sel.appendChild(new Option(item, item)));
//     };
//
//     fillOptions(genderSelect, GENDER);
//     fillOptions(activitySelect, ACTIVITY);
//
//     const fillNumeric = (el, start, end, step, unit = "") => {
//         if (!el) return;
//         el.innerHTML = '<option value="0">Not Relevant</option>';
//         for (let i = start; i <= end; i += step) el.appendChild(new Option(`${i}${unit}`, i));
//     };
//
//     fillNumeric(ageSelect, 5, 100, 5);
//     fillNumeric(heightSelect, 120, 220, 5, " cm");
//     fillNumeric(weightSelect, 20, 140, 5, " kg");
// };
//
// /**
//  * 4. РАБОТА С СЕРВЕРОМ
//  */
// const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('app_name', 'core');
//
//     const response = await fetch(`${CURRENT_SERVER_URL}${UPLOAD_ENDPOINT}`, { method: 'POST', body: formData });
//     if (!response.ok) throw new Error("Upload Error");
//     const data = await response.json();
//     return `${CURRENT_SERVER_URL}${data.url}`;
// };
//
// const recognizeImage = async (imageUrl) => {
//     const payload = {
//         "parts": [`Recognize food on the image. Return ONLY JSON: [{"name": "food", "food_quantity": "val", "food_unit_of_measurement": "unit"}]. URL: ${imageUrl}`],
//         "model_name": "gemini-flash-latest"
//     };
//     const response = await fetch(`${CURRENT_SERVER_URL}${API_ENDPOINT}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     return await response.json();
// };
//
// const trackDietWithGemini = async () => {
//     const userFoodInput = document.getElementById('products').value;
//     const macrosVal = document.getElementById('macros');
//     const resBox = document.getElementById('result-box');
//
//     if (resBox) resBox.style.display = 'block';
//     if (macrosVal) macrosVal.innerText = STRINGS.loading;
//
//     const prompt = `Analyze nutrition. User: ${document.getElementById('gender-select').value}, ${document.getElementById('activity-select').value}. Input: ${userFoodInput}. Return ONLY JSON object: {"food_items": [], "calories": 0, "proteins": 0, "fats": 0, "carbs": 0}`;
//
//     const payload = { "parts": [prompt], "model_name": "gemini-flash-latest" };
//
//     try {
//         toggleLoader();
//         const response = await fetch(`${CURRENT_SERVER_URL}${API_ENDPOINT}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });
//
//         const result = await response.json();
//         const cleanJson = JSON.parse(result.response.replace(/```json|```/gi, "").trim());
//
//         document.getElementById('calories-val').innerText = `${cleanJson.calories || 0} kcal`;
//         document.getElementById('macros').innerText = `P: ${cleanJson.proteins}g | F: ${cleanJson.fats}g | C: ${cleanJson.carbs}g`;
//     } catch (error) {
//         if (macrosVal) macrosVal.innerText = STRINGS.error_solution;
//     } finally {
//         toggleLoader();
//     }
// };
//
// /**
//  * 5. ОБРАБОТЧИКИ КНОПОК
//  */
// const initControls = () => {
//     const fileInput = document.getElementById('fileInput');
//
//     document.getElementById('photoId')?.addEventListener('click', () => {
//         fileInput.removeAttribute('capture');
//         fileInput.click();
//     });
//
//     document.getElementById('cameraId')?.addEventListener('click', () => {
//         fileInput.setAttribute('capture', 'environment');
//         fileInput.click();
//     });
//
//     fileInput?.addEventListener('change', async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         toggleLoader();
//         try {
//             const imgUrl = await uploadImage(file);
//             const recognition = await recognizeImage(imgUrl);
//             const foodArray = JSON.parse(recognition.response.replace(/```json|```/gi, "").trim());
//             document.getElementById('products').value = foodArray.map(f => `${f.food_quantity} ${f.food_unit_of_measurement} ${f.name}`).join(', ');
//         } catch (err) {
//             alert(STRINGS.error_ocr);
//         } finally {
//             toggleLoader();
//         }
//     });
//
//     document.getElementById('pencilId')?.addEventListener('click', () => {
//         document.getElementById('products').value = '';
//         const resBox = document.getElementById('result-box');
//         if (resBox) resBox.style.display = 'none';
//     });
//
//     ARROW_BUTTONS = [document.getElementById('arrowId'), document.getElementById('arrowId2')];
//     ARROW_BUTTONS.forEach(btn => btn?.addEventListener('click', trackDietWithGemini));
// };
//
// /**
//  * ЗАПУСК ПРИЛОЖЕНИЯ
//  */
// document.addEventListener('DOMContentLoaded', async () => {
//     // 1. Сначала генерируем кнопки в DOM
//     initButtons();
//
//     // 2. Инициализируем селекты и вешаем события на кнопки
//     initSelects();
//     initControls();
//
//     // 3. Загружаем переводы и применяем их
//     try {
//         const response = await fetch('translations.json');
//         if (response.ok) {
//             translations = await response.json();
//             const savedCode = localStorage.getItem('appLanguage') || 'en';
//             applyTranslation(savedCode);
//         }
//     } catch (e) {
//         console.warn("Translation load failed", e);
//     }
// });

import prompts from './prompts.js';

/**
 * КОНФИГУРАЦИЯ
 */

const POSSIBLE_SERVER_URLS = ['example.com', 'https://sarahyousef22194.pythonanywhere.com'];
let CURRENT_SERVER_URL = POSSIBLE_SERVER_URLS[0];
const API_ENDPOINT = '/api/direct';
const UPLOAD_ENDPOINT = '/core/upload';
const DEBUG = true;

let translations = {};
let ARROW_BUTTONS = [];

let STRINGS = {
    loading: "Loading, please, wait...",
    error_ocr: "AI wasn't able to recognize food. Try again.",
    error_solution: "AI error. Please check your input."
};

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

/* Заменяем fetch на fetchWithRetry с заменой сервера при ошибке */
const fetchWithRetry = async (endpoint, options = {}) => {
    const currentIndex = POSSIBLE_SERVER_URLS.indexOf(CURRENT_SERVER_URL);
    for (let i = currentIndex; i < POSSIBLE_SERVER_URLS.length; i++) {
        try {
            const response = await fetch(`${CURRENT_SERVER_URL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response;
        } catch (error) {
            console.warn(`Request failed, retrying... (${i + 1})`, error);
            if (i === POSSIBLE_SERVER_URLS.length - 1) {
                throw error;
            }
            // Переключаемся на следующий сервер
            const nextIndex = (currentIndex + 1) % POSSIBLE_SERVER_URLS.length;
            CURRENT_SERVER_URL = POSSIBLE_SERVER_URLS[nextIndex];
            console.log(`Switching to server: ${CURRENT_SERVER_URL}`);
        }
    }
};

/**
 * 1. ЛОКАЛИЗАЦИЯ
 */
const applyTranslation = (langCode) => {
    const data = translations[langCode] || translations['en'];
    if (!data) return;

    // Перевод всех элементов с data-key
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (data[key]) {
            if (elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT') {
                elem.placeholder = data[key];
            } else {
                elem.textContent = data[key];
            }
        }
    });

    // Перевод динамических опций в селектах
    const notRelevantText = data['opt_not_relevant'] || "Not Relevant";
    document.querySelectorAll('option[value="0"], option[value="not_relevant"]').forEach(opt => {
        opt.textContent = notRelevantText;
    });

    // Обновление системных строк
    STRINGS.loading = data['loading_text'] || STRINGS.loading;
    STRINGS.error_ocr = data['error_ocr'] || STRINGS.error_ocr;
    STRINGS.error_solution = data['error_solution'] || STRINGS.error_solution;
};

/**
 * 2. ГЕНЕРАЦИЯ КНОПОК ПАНЕЛИ
 */
const initButtons = () => {
    const container = document.getElementById('buttonContainer');
    if (!container) return;

    const buttons = [
        { id: 'camera' }, { id: 'photo' }, { id: 'pencil' }
    ];

    container.innerHTML = buttons.map(btn => `
        <button id="${btn.id}Id" class="action-btn">
            <img src="pics/${btn.id}.png" alt="" width="24" height="24">
        </button>
    `).join('') + container.innerHTML;
};

/**
 * 3. ИНИЦИАЛИЗАЦИЯ СЕЛЕКТОВ
 */
const initSelects = () => {
    const langSelect = document.getElementById('category-select1');
    const genderSelect = document.getElementById('gender-select');
    const activitySelect = document.getElementById('activity-select');

    const fillOptions = (sel, data) => {
        if (!sel) return;
        sel.innerHTML = '<option value="not_relevant">Not Relevant</option>';
        data.forEach(item => sel.appendChild(new Option(item, item)));
    };

    if (langSelect) {
        langSelect.innerHTML = '';
        Object.values(langMap).forEach(l => langSelect.appendChild(new Option(l, l)));
        const savedCode = localStorage.getItem('appLanguage') || 'en';
        langSelect.value = langMap[savedCode] || "English";
        langSelect.addEventListener('change', (e) => {
            const code = Object.keys(langMap).find(key => langMap[key] === e.target.value);
            if (code) {
                localStorage.setItem('appLanguage', code);
                applyTranslation(code);
            }
        });
    }

    fillOptions(genderSelect, ["Male", "Female"]);
    fillOptions(activitySelect, ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"]);

    const fillNumeric = (id, start, end, step, unit = "") => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '<option value="0">Not Relevant</option>';
        for (let i = start; i <= end; i += step) el.appendChild(new Option(`${i}${unit}`, i));
    };

    fillNumeric('category-select3', 5, 100, 5);
    fillNumeric('category-select5', 120, 220, 5, " cm");
    fillNumeric('category-select6', 20, 140, 5, " kg");
};

/**
 * 4. ОБРАБОТЧИКИ (Камера, Фото, Сервер)
 */
const toggleLoader = () => {
    document.querySelectorAll('.loader').forEach(l => l.style.display = l.style.display === 'none' ? 'inline-block' : 'none');
    ['arrowId', 'arrowId2'].forEach(id => {
        document.getElementById(id).style.display = document.getElementById(id).style.display === 'none' ? 'block' : 'none';
    });
};

const trackDietWithGemini = async () => {
    const userFoodInput = document.getElementById('products').value;
    const macrosVal = document.getElementById('macros');
    const resBox = document.getElementById('result-box');

    if (resBox) resBox.style.display = 'block';
    if (macrosVal) macrosVal.innerText = STRINGS.loading;

    const userInformation = {
        gender: document.getElementById('gender-select').value,
        age: document.getElementById('category-select3').value,
        height: document.getElementById('category-select5').value,
        weight: document.getElementById('category-select6').value,
        physicalActivityLevel: document.getElementById('activity-select').value
    };
    const savedCode = localStorage.getItem('appLanguage') || 'en';
    const languageSelected = langMap[savedCode] || "English";
    const prompt = prompts.imageWithNoTaskPrompt(userInformation, languageSelected);

    try {
        toggleLoader();
        const response = await fetchWithRetry(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "parts": [prompt], "model_name": "gemini-flash-latest" })
        });
        const result = await response.json();
        const cleanJson = JSON.parse(result.response.replace(/```json|```/gi, "").trim());

        document.getElementById('calories-val').innerText = `${cleanJson.calories} kcal`;
        document.getElementById('macros').innerText = `P: ${cleanJson.proteins}g | F: ${cleanJson.fats}g | C: ${cleanJson.carbs}g`;

        document.location.href = 'results.html?results=' + encodeURIComponent(JSON.stringify(cleanJson));
    } catch (e) {
        macrosVal.innerText = STRINGS.error_solution;
    } finally {
        toggleLoader();
    }
};

const initControls = () => {
    const fileInput = document.getElementById('fileInput');
    document.getElementById('photoId')?.addEventListener('click', () => { fileInput.removeAttribute('capture'); fileInput.click(); });
    document.getElementById('cameraId')?.addEventListener('click', () => { fileInput.setAttribute('capture', 'environment'); fileInput.click(); });

    fileInput?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        toggleLoader();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('app_name', 'core');
            const upRes = await fetchWithRetry(UPLOAD_ENDPOINT, { method: 'POST', body: formData });
            const upData = await upRes.json();

            const recRes = await fetchWithRetry(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "parts": [`Recognize food. Return JSON list: [{"name":"..","food_quantity":"..","food_unit_of_measurement":".."}]. URL: ${CURRENT_SERVER_URL}${upData.url}`], "model_name": "gemini-flash-latest" })
            });
            const recData = await recRes.json();
            const foodArray = JSON.parse(recData.response.replace(/```json|```/gi, "").trim());
            document.getElementById('products').value = foodArray.map(f => `${f.food_quantity} ${f.food_unit_of_measurement} ${f.name}`).join(', ');
        } catch (err) { alert(STRINGS.error_ocr); } finally { toggleLoader(); }
    });

    document.getElementById('pencilId')?.addEventListener('click', () => { document.getElementById('products').value = ''; });
    document.getElementById('pencilId2')?.addEventListener('click', () => { document.getElementById('products').value = ''; });
    [document.getElementById('arrowId'), document.getElementById('arrowId2')].forEach(b => b?.addEventListener('click', trackDietWithGemini));
};

/**
 * ЗАПУСК
 */
document.addEventListener('DOMContentLoaded', async () => {
    initButtons();
    initSelects();
    initControls();
    try {
        const response = await fetch('translations.json');
        if (response.ok) {
            translations = await response.json();
            applyTranslation(localStorage.getItem('appLanguage') || 'en');
        }
    } catch (e) { console.error("Translations failed", e); }
});