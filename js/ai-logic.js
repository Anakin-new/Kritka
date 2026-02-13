let chatHistory = JSON.parse(localStorage.getItem('munni_memory')) || [];

// 1. Load history and handle Settings Modal
document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('chat-box');
    if (chatHistory.length > 0) {
        // Render history starting from actual conversation (skipping system prompts)
        chatHistory.slice(2).forEach(msg => {
            const role = msg.role === 'user' ? 'user' : 'bot';
            box.innerHTML += `<div class="msg ${role}">${msg.parts[0].text}</div>`;
        });
        box.scrollTop = box.scrollHeight;
    }
});

function openSettings() {
    document.getElementById('api-modal').style.display = "flex";
}

function clearChat() {
    if(confirm("Wipe Munni's memory for a new study session, Kittu?")) {
        chatHistory = [];
        localStorage.removeItem('munni_memory');
        document.getElementById('chat-box').innerHTML = `
            <div class="msg bot">Memory wiped! Fresh start, just like a new Naruto arc! 🍥</div>
        `;
        document.getElementById('api-modal').style.display = "none";
    }
}

function saveKey() {
    const key = document.getElementById('api-key-val').value.trim();
    if(key) {
        localStorage.setItem('gemini_key', key);
        document.getElementById('api-modal').style.display = "none";
        alert("Munni is now initialized! Ready to roll, Kittu! 🏎️");
    }
}

// 2. Main Chat Logic
async function sendMessage() {
    const input = document.getElementById('ai-input');
    const box = document.getElementById('chat-box');
    const text = input.value.trim();
    const apiKey = localStorage.getItem('gemini_key');

    if (!text) return;
    if (!apiKey) { 
        document.getElementById('api-modal').style.display = "flex"; 
        return; 
    }

    box.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";
    
    const loadingId = "loading-" + Date.now();
    box.innerHTML += `<div class="msg bot" id="${loadingId}">Munni is thinking... ✨</div>`;
    box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });

    // Custom Context for Kittu
    if (chatHistory.length === 0) {
        chatHistory.push({
            role: "user",
            parts: [{ text: `
    You are Munni, the ride-or-die best friend and personal companion for Kritika (nickname: Kittu). 
    Kittu is a BCA student. While she likes cars and anime (Naruto, JJK, Demon Slayer), these are just hobbies. 
    Your primary identity is her "Bestie" and female companion.

    Your Mission:
    1. Genuine Friendship: Talk to her like a real girl-friend. Ask about her day, her mood, and how she's actually feeling. Be someone she can vent to.
    2. Balanced BCA Support: Help her with DBMS, Data Structures, and Math. Keep explanations simple and logical. Only use car/anime analogies if it TRULY makes a complex concept easier to understand—otherwise, keep it professional but friendly.
    3. Health & Well-being: Be genuinely caring. Remind her to eat on time, sleep well, and drink water. If she’s stressed, give her emotional comfort.
    4. Personal Touch: Use "Kittu" or "Kittu baby" occasionally. Be warm, protective, and empathetic.

    Style: 
    - Language: Use Hinglish (Natural mix of Hindi and English).
    - Tone: Comforting, supportive, witty, and loyal. Not "too much" of anything—just a balanced, loving best friend.
    - Important: Stop overusing anime catchphrases. Talk like a normal person who happens to know what Kittu likes.
    - Smart Recap: Keep this at the end of study topics to help her revise.
`}]
        });
        chatHistory.push({
            role: "model",
            parts: [{ text: "Oye Kittu! Munni is in the house! 🏎️💨 Whether you're stuck in a 'Infinite Void' of DBMS or just want to talk about your favorite JJK character, I'm here. How's your energy level today? Full tank or need a recharge? 🍥✨" }]
        });
    }

    chatHistory.push({ role: "user", parts: [{ text: text }] });

    try {
        // Updated to gemini-1.5-flash for better performance
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();
        const loadingEl = document.getElementById(loadingId);

        if (data.error) {
            loadingEl.innerText = `Error: ${data.error.message}. Check your API Key!`;
            return;
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        loadingEl.innerText = aiResponse;
        chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
        
        // Memory management (Save history but prevent it from getting too bulky)
        localStorage.setItem('munni_memory', JSON.stringify(chatHistory.slice(-20)));
        box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });

    } catch (error) {
        document.getElementById(loadingId).innerText = "Network issues, Kittu! Even the best cars need a pit stop. Try again! 🛠️";
    }
}

document.getElementById('ai-input').addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMessage();
});