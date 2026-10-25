// --- Audio Context สำหรับสร้างเสียงเอฟเฟกต์ iOS ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// 1. เสียงตอนกดปุ่ม Password (Keypad Click)
function playKeypadSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.035);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
        console.log("Audio playback error:", e);
    }
}

// 2. เสียงตอนปลดล็อคเข้าหน้า Home Screen (iOS Unlock Chime)
function playUnlockSound() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // เสียงตัวที่ 1 (Tone A)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        gain1.gain.setValueAtTime(0.18, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.1);

        // เสียงตัวที่ 2 (Tone B - ปลดล็อคสมบูรณ์)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(783.99, now + 0.05); // G5
        gain2.gain.setValueAtTime(0.22, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.05);
        osc2.stop(now + 0.22);
    } catch (e) {
        console.log("Audio playback error:", e);
    }
}

// --- Multi-language System (ระบบแปลภาษา 5 ภาษา + Safari Action Sheet) ---
const translations = {
    th: {
        translate_label: "แปลภาษา",
        translate_sheet_title: "แปลภาษาหน้าเว็บ",
        swipe_unlock: "ปัดขึ้นเพื่อปลดล็อค",
        passcode_title: "ป้อนรหัสผ่าน",
        cancel: "ยกเลิก",
        search: "ค้นหา",
        app_phone: "โทรศัพท์",
        app_messages: "ข้อความ",
        app_camera: "กล้อง",
        app_settings: "ตั้งค่า",
        app_notes: "โน้ต",
        app_photos: "รูปภาพ",
        app_weather: "สภาพอากาศ",
        app_music: "เพลง",
        notif_johan: "ส่งข้อความถึงคุณ",
        not_playing: "ไม่ได้เล่นอยู่",
        focus: "โหมดโฟกัส",
        entrance: "ทางเข้า",
        door_locked: "ประตูถูกล็อคแล้ว",
        bedroom: "ห้องนอน",
        speaker_off: "ลำโพงไม่ได้เปิด"
    },
    en: {
        translate_label: "Translate",
        translate_sheet_title: "Translate Page",
        swipe_unlock: "Swipe up to unlock",
        passcode_title: "Enter Passcode",
        cancel: "Cancel",
        search: "Search",
        app_phone: "Phone",
        app_messages: "Messages",
        app_camera: "Camera",
        app_settings: "Settings",
        app_notes: "Notes",
        app_photos: "Photos",
        app_weather: "Weather",
        app_music: "Music",
        notif_johan: "Sent you a message.",
        not_playing: "Not Playing",
        focus: "Focus",
        entrance: "Entrance",
        door_locked: "Door Locked",
        bedroom: "Bedroom",
        speaker_off: "Speaker Not Playing"
    },
    ja: {
        translate_label: "翻訳",
        translate_sheet_title: "Webページを翻訳",
        swipe_unlock: "スワイプして解除",
        passcode_title: "パスコードを入力",
        cancel: "キャンセル",
        search: "検索",
        app_phone: "電話",
        app_messages: "メッセージ",
        app_camera: "カメラ",
        app_settings: "設定",
        app_notes: "メモ",
        app_photos: "写真",
        app_weather: "天気",
        app_music: "ミュージック",
        notif_johan: "メッセージを送信しました",
        not_playing: "停止中",
        focus: "集中モード",
        entrance: "玄関",
        door_locked: "施錠済み",
        bedroom: "ベッドルーム",
        speaker_off: "スピーカー停止中"
    },
    ko: {
        translate_label: "번역",
        translate_sheet_title: "웹페이지 번역",
        swipe_unlock: "위로 쓸어올려서 잠금 해제",
        passcode_title: "암호 입력",
        cancel: "취소",
        search: "검색",
        app_phone: "전화",
        app_messages: "메시지",
        app_camera: "카메라",
        app_settings: "설정",
        app_notes: "메모",
        app_photos: "사진",
        app_weather: "날씨",
        app_music: "음악",
        notif_johan: "메시지를 보냈습니다.",
        not_playing: "재생 중이 아님",
        focus: "집중 모드",
        entrance: "현관",
        door_locked: "문 잠김",
        bedroom: "침실",
        speaker_off: "스피커 중지됨"
    },
    zh: {
        translate_label: "翻译",
        translate_sheet_title: "翻译网页",
        swipe_unlock: "向上轻滑以解锁",
        passcode_title: "输入密码",
        cancel: "取消",
        search: "搜索",
        app_phone: "电话",
        app_messages: "信息",
        app_camera: "相机",
        app_settings: "设置",
        app_notes: "备忘录",
        app_photos: "照片",
        app_weather: "天气",
        app_music: "音乐",
        notif_johan: "向您发送了一条消息",
        not_playing: "未在播放",
        focus: "专注模式",
        entrance: "入口",
        door_locked: "门已锁",
        bedroom: "卧室",
        speaker_off: "扬声器未播放"
    }
};

// ฟังก์ชันควบคุม Action Sheet แปลภาษาแบบ Safari
function openTranslateModal() {
    const modal = document.getElementById('translate-modal');
    if (modal) modal.classList.add('active');
}

function closeTranslateModal(event) {
    const modal = document.getElementById('translate-modal');
    if (modal) modal.classList.remove('active');
}

function selectLanguage(lang) {
    changeLanguage(lang);
    closeTranslateModal();
}

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // แสดงเครื่องหมายถูกที่ตัวเลือกภาษาปัจจุบัน
    document.querySelectorAll('.lang-option-item').forEach(btn => {
        btn.classList.remove('selected');
    });
    const activeOpt = document.getElementById(`opt-${lang}`);
    if (activeOpt) activeOpt.classList.add('selected');

    // แปลข้อความตาม data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.getElementById('lock-screen');
    const passcodeScreen = document.getElementById('passcode-screen');
    const homeScreen = document.getElementById('home-screen');
    const ccOverlay = document.getElementById('cc-overlay');
    const ncOverlay = document.getElementById('nc-overlay');
    const wallpaper = document.getElementById('wallpaper');
    const mainLock = document.getElementById('main-lock');
    const appWindow = document.getElementById('app-window');

    // โหลดภาษาล่าสุดที่เลือกไว้ (เริ่มต้นเป็น 'th')
    const savedLang = localStorage.getItem('selectedLanguage') || 'th';
    changeLanguage(savedLang);

    // 1. Clock Engine
    function updateClock() {
        const now = new Date();
        let h = now.getHours().toString().padStart(2, '0');
        let m = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${h}:${m}`;
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);

        if (document.getElementById('sb-time')) document.getElementById('sb-time').textContent = timeStr;
        if (document.getElementById('ls-time')) document.getElementById('ls-time').textContent = timeStr;
        if (document.getElementById('ls-date')) document.getElementById('ls-date').textContent = dateStr;
        if (document.getElementById('nc-time')) document.getElementById('nc-time').textContent = timeStr;
        if (document.getElementById('nc-date')) document.getElementById('nc-date').textContent = dateStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Unlock System
    const swipeUpArea = document.getElementById('swipe-up-area');
    if (swipeUpArea) {
        swipeUpArea.addEventListener('click', () => {
            if (mainLock) mainLock.classList.replace('fa-lock', 'fa-lock-open');
            setTimeout(() => {
                if (lockScreen) lockScreen.style.transform = 'translateY(-100%)';
                if (passcodeScreen) passcodeScreen.classList.add('active');
                if (wallpaper) wallpaper.classList.add('blur');
            }, 250);
        });
    }

    const CORRECT_PIN = "123456";
    let currentInput = "";
    const dots = document.querySelectorAll('.passcode-dots .dot');
    const dotsContainer = document.getElementById('passcode-dots');

    document.querySelectorAll('.key[data-num]').forEach(key => {
        key.addEventListener('click', () => {
            playKeypadSound(); // เล่นเสียงกดปุ่ม Keypad
            if (currentInput.length < 6) {
                currentInput += key.getAttribute('data-num');
                updateDots();
                if (currentInput.length === 6) {
                    setTimeout(checkPasscode, 150);
                }
            }
        });
    });

    const cancelPasscode = document.getElementById('cancel-passcode');
    if (cancelPasscode) {
        cancelPasscode.addEventListener('click', () => {
            currentInput = "";
            updateDots();
            if (passcodeScreen) passcodeScreen.classList.remove('active');
            if (lockScreen) lockScreen.style.transform = 'translateY(0)';
            if (wallpaper) wallpaper.classList.remove('blur');
            if (mainLock) mainLock.classList.replace('fa-lock-open', 'fa-lock');
        });
    }

    function updateDots() {
        dots.forEach((dot, idx) => dot.classList.toggle('filled', idx < currentInput.length));
    }

    function checkPasscode() {
        if (currentInput === CORRECT_PIN) {
            playUnlockSound(); // เล่นเสียงปลดล็อคเข้าหน้า Home
            if (passcodeScreen) passcodeScreen.classList.remove('active');
            if (lockScreen) lockScreen.style.display = 'none';
            if (wallpaper) {
                wallpaper.classList.remove('blur');
                wallpaper.style.backgroundImage = "url('https://i.pinimg.com/736x/a0/79/78/a07978b4f404bae022234ac944cce65c.jpg')"; 
            }
            if (homeScreen) homeScreen.classList.add('active');

            // เด้งหน้าต่างแปลภาษาให้อัตโนมัติหลังจากปลดล็อกสำเร็จ (หน่วงเวลา 0.5 วินาที)
            setTimeout(() => {
                openTranslateModal();
            }, 500);

        } else {
            if (dotsContainer) dotsContainer.classList.add('shake');
            setTimeout(() => {
                if (dotsContainer) dotsContainer.classList.remove('shake');
                currentInput = "";
                updateDots();
            }, 400);
        }
    }

    // 3. App Launch Engine
    const standaloneApps = {
        line: 'Line.html',
        notes: 'note.html',
        photos: 'photo.html'
    };

    document.querySelectorAll('.app').forEach(app => {
        app.addEventListener('click', (e) => {
            e.stopPropagation();
            const appKey = app.getAttribute('data-app');
            if (!appKey) return;

            // หากเป็นแอปที่มีไฟล์แยก ให้เปลี่ยนหน้าไปยังไฟล์ HTML ของแอปนั้นๆ
            if (standaloneApps[appKey]) {
                window.location.href = standaloneApps[appKey];
            } 
        });
    });

    const appHomeIndicator = document.getElementById('app-home-indicator');
    if (appHomeIndicator) {
        appHomeIndicator.addEventListener('click', () => {
            if (appWindow) appWindow.classList.remove('active');
        });
    }

    // 4. Status Bar Gesture Swiping
    const statusBar = document.getElementById('status-bar');
    let startY = 0, startX = 0;

    function handleSwipeDown(endY, endX) {
        if (homeScreen && homeScreen.classList.contains('active') && (endY - startY > 20 || endY === startY)) {
            const rect = statusBar.getBoundingClientRect();
            const relativeX = startX - rect.left;
            
            if (relativeX > rect.width * 0.55) {
                if (ccOverlay) ccOverlay.classList.add('active');
            } else {
                if (ncOverlay) ncOverlay.classList.add('active');
            }
        }
    }

    if (statusBar) {
        statusBar.addEventListener('mousedown', (e) => { startY = e.clientY; startX = e.clientX; });
        statusBar.addEventListener('mouseup', (e) => { handleSwipeDown(e.clientY, e.clientX); });
        statusBar.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; startX = e.touches[0].clientX; });
        statusBar.addEventListener('touchend', (e) => { handleSwipeDown(e.changedTouches[0].clientY, e.changedTouches[0].clientX); });
    }

    const homeIndicator = document.getElementById('home-indicator');
    const ccIndicator = document.getElementById('cc-indicator');
    const ncIndicator = document.getElementById('nc-indicator');

    if (homeIndicator) homeIndicator.addEventListener('click', closeOverlays);
    if (ccIndicator) ccIndicator.addEventListener('click', closeOverlays);
    if (ncIndicator) ncIndicator.addEventListener('click', closeOverlays);

    function closeOverlays() {
        if (ccOverlay) ccOverlay.classList.remove('active');
        if (ncOverlay) ncOverlay.classList.remove('active');
    }

    // 5. Handle Return to Home Screen from Apps/Chats
    function handleHomeHash() {
        if (window.location.hash === '#home') {
            playUnlockSound();
            const lockScreen = document.querySelector('.lock-screen');
            const homeScreen = document.querySelector('.home-screen');
            const wallpaper = document.querySelector('.wallpaper');

            if (lockScreen) {
                lockScreen.style.transform = 'translateY(-100%)';
                lockScreen.style.opacity = '0';
                lockScreen.style.pointerEvents = 'none';
            }
            if (homeScreen) {
                homeScreen.classList.add('active');
                homeScreen.style.opacity = '1';
                homeScreen.style.pointerEvents = 'auto';
                homeScreen.style.transform = 'scale(1)';
            }
            if (wallpaper) {
                wallpaper.classList.remove('blur');
                wallpaper.style.backgroundImage = "url('https://i.pinimg.com/736x/a0/79/78/a07978b4f404bae022234ac944cce65c.jpg')";
            }

            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    }

    // เรียกทำงานทันทีเมื่อเปิดหน้า และเมื่อมีการเปลี่ยน hash
    handleHomeHash();
    window.addEventListener('load', handleHomeHash);
    window.addEventListener('hashchange', handleHomeHash);
});