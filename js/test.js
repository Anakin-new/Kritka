let currentQuestions = [];
let userAnswers = [];
let timerInterval;
let timeLeft = 1800; // 30 Minutes

function loadChapters() {
    const subSelect = document.getElementById('subject-select');
    const chapSelect = document.getElementById('chapter-select');
    const selectedSub = subSelect.value;

    chapSelect.innerHTML = '<option value="">-- Select Unit --</option>';

    if (selectedSub && quizData[selectedSub]) {
        const chapters = Object.keys(quizData[selectedSub]);
        chapters.forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = chap;
            chapSelect.appendChild(option);
        });
    }
}

function startTest() {
    const sub = document.getElementById('subject-select').value;
    const chap = document.getElementById('chapter-select').value;
    
    if (!sub || !chap) return alert("Please pick a subject and unit first! 🌸");

    currentQuestions = quizData[sub][chap];
    document.getElementById('test-info').innerText = `${sub}`;
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';

    renderQuestions();
    startTimer();
}

function renderQuestions() {
    const area = document.getElementById('questions-area');
    area.innerHTML = currentQuestions.map((q, i) => `
        <div class="q-card">
            <p style="font-weight: 700; color: var(--brown); margin-bottom:15px;">Q${i+1}. ${q.q}</p>
            ${q.options.map((opt, j) => `
                <label class="option">
                    <input type="radio" name="q${i}" value="${j}"> ${opt}
                </label>
            `).join('')}
        </div>
    `).join('');
}

function startTimer() {
    timeLeft = 1800; 
    timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('time-left').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) finishTest();
    }, 1000);
}

function finishTest() {
    clearInterval(timerInterval);
    let score = 0;
    userAnswers = []; 

    currentQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const val = selected ? parseInt(selected.value) : null;
        userAnswers.push(val); 

        if (val === q.correct) score++;
    });

    const finalPercent = Math.round((score / currentQuestions.length) * 100);
    
    // Logic: If she scores > 80%, we update her syllabus progress slightly
    if (finalPercent >= 80) {
        let currentProg = parseInt(localStorage.getItem('total_bca_progress')) || 0;
        localStorage.setItem('total_bca_progress', Math.min(100, currentProg + 2));
    }

    document.getElementById('result-score').innerText = `${score} / ${currentQuestions.length}`;
    
    let msg = "";
    if(finalPercent === 100) msg = "Perfect! You're a BCA Queen! 👑";
    else if(finalPercent >= 70) msg = "Great job! Your flower is growing! 🌱";
    else msg = "Good try! Let's revise and try again. ✨";
    
    document.getElementById('result-msg').innerText = msg;
    
    if (finalPercent >= 80) confetti({ particleCount: 150, spread: 70, origin: {y: 0.6} });
    document.getElementById('result-modal').style.display = 'flex';
}

function showReview() {
    const reviewArea = document.getElementById('review-area');
    reviewArea.style.display = 'block';
    reviewArea.innerHTML = '<h3 style="margin-top:20px; color:var(--sage)">Answer Key</h3>';

    currentQuestions.forEach((q, i) => {
        const isCorrect = userAnswers[i] === q.correct;
        const div = document.createElement('div');
        div.className = `review-item ${isCorrect ? 'correct-bg' : 'wrong-bg'}`;
        div.innerHTML = `
            <p><b>Q${i+1}:</b> ${q.q}</p>
            <p style="font-size: 0.85rem;">Correct: <b>${q.options[q.correct]}</b></p>
        `;
        reviewArea.appendChild(div);
    });
}