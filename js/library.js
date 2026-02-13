// 1. UPDATED BCA SUBJECTS FROM SYLLABUS IMAGES
const subjects = [
    { id: "BCA0201", name: "Mathematics-II", icon: "📐", video: "#" },
    { id: "BCA0202", name: "Communicative English", icon: "🗣️", video: "#" },
    { id: "BCA0203", name: "Digital Electronics", icon: "🔌", video: "#" },
    { id: "BCA0204", name: "Data Structures", icon: "📊", video: "#" },
    { id: "BCA0205", name: "Database Management System", icon: "🗄️", video: "#" }
];

// 2. UNIT DATA MAPPED FROM SYLLABUS
const syllabusUnits = {
    "Mathematics-II": [
        { name: "Unit-I: Rolle's & Lagrange's Theorem", link: "#" },
        { name: "Unit-II: Number System & Integer Arithmetic", link: "#" },
        { name: "Unit-III: Group Theory & Cyclic Groups", link: "#" },
        { name: "Unit-IV: Rings & Fields", link: "#" }
    ],
    "Communicative English": [
        { name: "Unit-I: Vocabulary & Grammar", link: "#" },
        { name: "Unit-II: Writing Skills (Letters/CV)", link: "#" },
        { name: "Unit-III: Secretarial Skills", link: "#" },
        { name: "Unit-IV: Presentation & Discussion", link: "#" }
    ],
    "Digital Electronics": [
        { name: "Unit-I: Semiconductor Physics & ICs", link: "#" },
        { name: "Unit-II: Logic Gates & Boolean Algebra", link: "#" },
        { name: "Unit-III: MAP Simplification (K-Map)", link: "#" },
        { name: "Unit-IV: Sequential Circuits (Flip-Flops)", link: "#" }
    ],
    "Data Structures": [
        { name: "Unit-I: Algorithms & Arrays", link: "#" },
        { name: "Unit-II: Linked Lists (Linear/Circular)", link: "#" },
        { name: "Unit-III: Stacks & Queues", link: "#" },
        { name: "Unit-IV: Trees, Sorting & Searching", link: "#" }
    ],
    "Database Management System": [
        { name: "Unit-I: Intro to DBMS & Data Models", link: "#" },
        { name: "Unit-II: File Org & Relational Model", link: "#" },
        { name: "Unit-III: Relational DB Design (Normal Forms)", link: "#" },
        { name: "Unit-IV: MS Access Operations", link: "#" }
    ]
};

// 3. GENERATE INTERFACE
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shelf-container');
    
    subjects.forEach(sub => {
        const shelf = document.createElement('div');
        shelf.className = "shelf";
        shelf.innerHTML = `
            <div class="shelf-title">
                <span>${sub.icon}</span>
                <div>
                    <div style="font-size: 0.7rem; opacity: 0.6;">${sub.id}</div>
                    <div>${sub.name}</div>
                </div>
            </div>
            <div class="resource-grid">
                <a href="${sub.video}" class="resource-card">
                    <span class="res-icon">🎬</span>
                    <span>Video Lectures</span>
                </a>
                <div class="resource-card" onclick="openUnits('${sub.name}')" style="cursor:pointer">
                    <span class="res-icon">📂</span>
                    <span>Unit Notes</span>
                </div>
            </div>
        `;
        container.appendChild(shelf);
    });
});

// 4. MODAL CONTROL
function openUnits(subjectName) {
    const modal = document.getElementById('pdf-modal');
    const list = document.getElementById('unit-list');
    const title = document.getElementById('modal-title');

    title.innerText = subjectName;
    list.innerHTML = "";

    const units = syllabusUnits[subjectName] || [];
    
    if (units.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:20px; opacity:0.5;'>Coming soon... 🌸</p>";
    } else {
        units.forEach(u => {
            list.innerHTML += `
                <a href="${u.link}" class="unit-row">
                    <span>📄 ${u.name}</span>
                    <span style="color:var(--sage)">Get ➔</span>
                </a>
            `;
        });
    }
    modal.style.display = "flex";
}

function closePDFs() {
    document.getElementById('pdf-modal').style.display = "none";
}