// --- SELECTORS ---
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const fill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent');
const taskSound = new Audio('assets/pop.mp3'); 

const DEFAULT_TASKS = ["Drink 3 Lt water", "Workout", "Revise BCA Topic"];

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    checkAndResetDay(); 
    updateClock();      
    loadDailyTasks();   
    updateGarden();     
});

// --- RESET & ARCHIVE ---
function checkAndResetDay() {
    const today = new Date().toDateString(); 
    const lastOpened = localStorage.getItem('last_opened_date');
    if (lastOpened && lastOpened !== today) {
        archiveToHistory(lastOpened);
    }
    localStorage.setItem('last_opened_date', today);
}

function archiveToHistory(oldDate) {
    const dailyTasks = JSON.parse(localStorage.getItem('sayli_daily')) || [];
    if (dailyTasks.length > 0) {
        const total = dailyTasks.length;
        const done = dailyTasks.filter(t => t.completed).length;
        const score = Math.round((done / total) * 100);
        const history = JSON.parse(localStorage.getItem('study_history')) || [];
        history.unshift({ date: oldDate, score: score, tasks: dailyTasks });
        localStorage.setItem('study_history', JSON.stringify(history));
        localStorage.removeItem('sayli_daily');
    }
}

// --- TASK LOGIC ---
function loadDailyTasks() {
    const saved = JSON.parse(localStorage.getItem('sayli_daily')) || [];
    taskList.innerHTML = "";
    DEFAULT_TASKS.forEach(taskText => {
        const existingDefault = saved.find(t => t.text === taskText);
        renderTask(taskText, existingDefault ? existingDefault.completed : false, true);
    });
    const customTasks = saved.filter(t => !DEFAULT_TASKS.includes(t.text));
    customTasks.forEach(t => renderTask(t.text, t.completed, false));
    saveData();
}

function addTask() {
    const val = taskInput.value.trim();
    if(!val) return;
    renderTask(val, false, false);
    saveData();
    taskInput.value = "";
    updateGarden();
}

function renderTask(text, isDone, isDefault) {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
        <input type="checkbox" class="checker" ${isDone ? 'checked' : ''} onchange="toggleTask(this)">
        <span class="${isDone ? 'done-text' : ''}">${text}</span>
        ${isDefault ? `<span style="margin-left:auto; font-size: 12px; opacity: 0.5;">🔒</span>` : `<button onclick="deleteTask(this)" style="margin-left:auto; border:none; background:none; cursor:pointer;">❌</button>`}
    `;
    taskList.appendChild(div);
}

function toggleTask(cb) {
    cb.nextElementSibling.classList.toggle('done-text');
    if (cb.checked) {
        taskSound.currentTime = 0; 
        taskSound.play().catch(e => {});
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#7fb069', '#f2c6c2', '#ffffff'] });
    }
    saveData();
    updateGarden();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveData();
    updateGarden();
}

function saveData() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({ text: item.querySelector('span').innerText, completed: item.querySelector('.checker').checked });
    });
    localStorage.setItem('sayli_daily', JSON.stringify(tasks));
}

// --- FLOWER SYNC LOGIC ---
function updateGarden() {
    // 1. To-Do Progress
    const all = document.querySelectorAll('.checker');
    const checked = document.querySelectorAll('.checker:checked');
    const dailyPercent = all.length ? Math.round((checked.length / all.length) * 100) : 0;
    if(fill) fill.style.width = dailyPercent + "%";
    if(percentText) percentText.innerText = dailyPercent;

    // 2. Syllabus Flower Growth
    const video = document.getElementById('plant-video');
    const bcaProgress = parseInt(localStorage.getItem('total_bca_progress')) || 0; // Updated key
    
    updateSidebarBadge(bcaProgress);

    if (video) {
        const syncVideo = () => {
            const duration = video.duration;
            if (duration) {
                // This jumps the video to the frame matching progress %
                video.currentTime = (duration * bcaProgress) / 100;
            }
        };
        if (video.readyState >= 1) syncVideo();
        else video.onloadedmetadata = syncVideo;
    }
}

function updateSidebarBadge(progress) {
    const sideBadge = document.getElementById('side-syllabus-stat');
    if(sideBadge) sideBadge.innerText = progress + "%";
}

// --- UTILS ---
function updateClock() {
    const now = new Date();
    const dEl = document.getElementById('current-date');
    const tEl = document.getElementById('current-time');
    if(dEl) dEl.innerText = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    if(tEl) tEl.innerText = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

setInterval(updateClock, 1000);
taskInput.addEventListener("keypress", (e) => { if(e.key === "Enter") addTask(); });

const myMessages = ["Kittuuuuu meri ek loti suar behen🌸❤", "Gu kha💖", "Suar hai tuu", "Cutest sis ever❤️"];

function showSurprise() {
    const modal = document.getElementById('surprise-overlay');
    document.getElementById('surprise-text').innerText = myMessages[Math.floor(Math.random() * myMessages.length)];
    modal.style.display = "flex";
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

function closeSurprise() { document.getElementById('surprise-overlay').style.display = "none"; }
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-overlay').classList.toggle('active');
}