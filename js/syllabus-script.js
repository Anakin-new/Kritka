const syllabusData = {
    math: [
        "Rolle's Theorem & Lagrange's Mean Value Theorem",
        "Cauchy's Mean Value Theorem & Applications",
        "Successive differentiation & Leibnitz Theorem",
        "Number System: Division algorithm & GCD/LCM",
        "Congruence relation & Modular arithmetic",
        "Group: Definition, Groups of numbers/residues",
        "Groups of matrices/functions/subsets",
        "Properties of Groups & Cyclic Groups",
        "Ring: Commutative ring, Ring with unity",
        "Ring of Polynomials & functions",
        "Elementary properties of ring & Fields"
    ],
    english: [
        "Vocabulary: Verbs, Adverbs, Adjectives",
        "Antonyms, Synonyms & Idioms",
        "Grammar: Tenses (Simple/Continuous/Perfect)",
        "Direct/Indirect Speech & Active/Passive Voice",
        "Sentences: Affirmative, Interrogative, Negation",
        "Writing: Letters, CVs, Tech Reports",
        "Precis, Comprehension & Paragraph writing",
        "Notices, Agenda & Circulars",
        "Secretarial: Effective Comm. & Listening skills",
        "Telephone handling, Meeting Agendas & Minutes",
        "Handling problem situations & Phonetics",
        "Presentation & Discussion Skills (Kinesics)",
        "Interviews, Overcoming Nervousness & Leadership"
    ],
    de: [
        "Fundamentals of semiconductor physics",
        "pn-junction diode (Depletion, Biasing, Switch)",
        "Bipolar Junction Transistor (CE config as switch)",
        "Logic families: TTL, ECL, CMOS",
        "Logic gates: AND, OR, NOT, NOR, NAND, XOR",
        "Boolean algebra & DeMorgan's theorem",
        "MAP simplification: Minimization & K-Map",
        "Sum of Product & Product of Sum (Combinational)",
        "Sequential: Half/Full Adder & Subtractor",
        "Flip-flops: RS, D, JK, T & Master-Slave",
        "Shift registers, Multiplexer, Encoder, Decoder"
    ],
    ds: [
        "Preliminaries: Algorithm complexity & Time-space",
        "Arrays: Representation, Traversal, Insert, Delete",
        "Multidimensional arrays & Address calculation",
        "Linked List: Linear, Circular, Doubly linked",
        "Linked List Operations",
        "Stacks: Definition, Implementation, Push & Pop",
        "Stack Applications (Polish notation, Quick sort)",
        "Queue: Implementation, Insert & Delete, Circular",
        "Trees: Binary Trees & Traversal Algorithms",
        "Threaded Trees & Binary Search Trees",
        "Sorting: Selection, Bubble, Merge, Radix, Quick",
        "Searching: Sequential & Linear search"
    ],
    dbms: [
        "Intro: Data Modeling, Fields, Records & Files",
        "Abstraction, Data Integration & Architecture",
        "Users, Structure, Advantages & Disadvantages",
        "Data Models: Entity, Attribute, Relationship",
        "File based, Traditional, Semantic, ER Model",
        "File Organization: Sequential & Index-Sequential",
        "Types of Indexes & Indexing using B-Tree",
        "Relational Model: Database, Algebra, Calculus",
        "Relational Database Design & Scheme",
        "Functional Dependency & Normal forms (1-3, BCNF)",
        "Decomposition & Multi-valued dependency",
        "Ms Access: Tables, Primary & Foreign Keys",
        "Query, Form, Relationships & Report Creation"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject all subjects
    Object.keys(syllabusData).forEach(subjectKey => {
        const listContainer = document.getElementById(`${subjectKey}-list`);
        if (listContainer) {
            listContainer.innerHTML = syllabusData[subjectKey].map((topic, index) => {
                // Unique ID for BCA
                const id = `bca_${subjectKey}_${index}`;
                const isChecked = localStorage.getItem(id) === 'true' ? 'checked' : '';
                
                return `
                    <div class="topic-row">
                        <span class="${isChecked ? 'completed-text' : ''}">${topic}</span>
                        <input type="checkbox" id="${id}" class="check-input sub-${subjectKey}" ${isChecked} onchange="saveAndCalc(this)">
                    </div>
                `;
            }).join('');
        }
    });
    calculateProgress();
});

function saveAndCalc(el) {
    localStorage.setItem(el.id, el.checked);
    // Add/Remove strikethrough class
    const span = el.previousElementSibling;
    if(el.checked) span.classList.add('completed-text');
    else span.classList.remove('completed-text');
    
    calculateProgress();
}

function calculateProgress() {
    // UPDATED SUBJECT KEYS FOR BCA
    const subjects = ['math', 'english', 'de', 'ds', 'dbms'];
    let totalChecked = 0;
    let totalTopics = 0;

    subjects.forEach(sub => {
        const checks = document.querySelectorAll(`.sub-${sub}`);
        const checked = document.querySelectorAll(`.sub-${sub}:checked`);
        
        totalChecked += checked.length;
        totalTopics += checks.length;

        // Prevent division by zero if a list is empty
        let subPercent = 0;
        if(checks.length > 0) {
            subPercent = Math.round((checked.length / checks.length) * 100);
        }
        
        const percentEl = document.getElementById(`${sub}-percent`);
        const fillEl = document.getElementById(`${sub}-fill`);
        
        if (percentEl) percentEl.innerText = subPercent + "%";
        if (fillEl) fillEl.style.width = subPercent + "%";
    });

    let grandPercent = 0;
    if (totalTopics > 0) {
        grandPercent = Math.round((totalChecked / totalTopics) * 100);
    }
    
    // Save as new key so it updates her BCA Dashboard correctly
    localStorage.setItem('total_bca_progress', grandPercent);
    
    document.getElementById('overall-fill').style.width = grandPercent + "%";
    document.getElementById('stat-text').innerText = `${totalChecked} / ${totalTopics} Topics Completed (${grandPercent}%)`;
}