// ===== QUIZ DATA =====
const quizQuestions = [
    {
        question: "What is the most abundant renewable energy source on Earth?",
        options: ["Solar energy", "Wind energy", "Hydropower", "Geothermal energy"],
        correct: 0
    },
    {
        question: "Which photovoltaic cell technology has shown the highest laboratory efficiency?",
        options: ["Monocrystalline Silicon", "Polycrystalline Silicon", "Perovskite Tandem", "Amorphous Silicon"],
        correct: 2
    },
    {
        question: "What does 'capacity factor' measure in renewable energy systems?",
        options: ["Maximum power output", "Actual output vs maximum possible output", "Energy storage capacity", "Grid connection efficiency"],
        correct: 1
    },
    {
        question: "Which country has the largest installed wind power capacity?",
        options: ["United States", "Germany", "China", "India"],
        correct: 2
    },
    {
        question: "What is the primary component of biogas?",
        options: ["Carbon dioxide", "Methane", "Hydrogen", "Nitrogen"],
        correct: 1
    },
    {
        question: "Which energy storage technology has the fastest response time?",
        options: ["Pumped hydro storage", "Lithium-ion batteries", "Compressed air energy storage", "Flywheel energy storage"],
        correct: 3
    },
    {
        question: "What is the purpose of a solar tracker?",
        options: ["Monitor energy production", "Increase panel efficiency by following the sun", "Track maintenance schedules", "Monitor weather conditions"],
        correct: 1
    },
    {
        question: "Which renewable energy source has the lowest carbon footprint over its lifecycle?",
        options: ["Solar PV", "Wind power", "Hydropower", "Nuclear energy"],
        correct: 1
    },
    {
        question: "What is 'grid parity' in the context of renewable energy?",
        options: ["When renewable energy cost equals grid electricity cost", "When all grids are connected", "When grid capacity is maximum", "When energy storage matches production"],
        correct: 0
    },
    {
        question: "Which of the following is NOT a type of concentrating solar power (CSP) technology?",
        options: ["Parabolic trough", "Solar power tower", "Solar pond", "Solar chimney"],
        correct: 3
    }
];

// ===== QUIZ STATE =====
let currentQuestion = 0;
let score = 0;
let quizActive = false;

// ===== DOM ELEMENTS =====
const quizStart = document.getElementById('quiz-start');
const quizQuestion = document.getElementById('quiz-question');
const quizResult = document.getElementById('quiz-result');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const progressFill = document.getElementById('progress-fill');
const scoreValue = document.getElementById('score-value');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const resultIcon = document.getElementById('result-icon');

// ===== QUIZ FUNCTIONS =====
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizActive = true;
    
    quizStart.classList.add('hidden');
    quizResult.classList.add('hidden');
    quizQuestion.classList.remove('hidden');
    
    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];
    
    questionText.textContent = q.question;
    questionNumber.textContent = `Question ${currentQuestion + 1}/${quizQuestions.length}`;
    progressFill.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    const q = quizQuestions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    // Show correct/wrong
    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }
    
    // Wait before next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    quizQuestion.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    scoreValue.textContent = score;
    
    // Customize message based on score
    if (score === 10) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Perfect Score!';
        resultMessage.textContent = 'Outstanding! You are a renewable energy expert!';
    } else if (score >= 7) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Great Job!';
        resultMessage.textContent = 'You have excellent knowledge of renewable energy!';
    } else if (score >= 4) {
        resultIcon.textContent = '👍';
        resultTitle.textContent = 'Good Effort!';
        resultMessage.textContent = 'You know the basics. Keep learning!';
    } else {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Keep Learning!';
        resultMessage.textContent = 'Study more about renewable energy to improve your score!';
    }
}

function restartQuiz() {
    quizResult.classList.add('hidden');
    startQuiz();
}

// ===== WORK CATEGORY TOGGLE =====
function toggleCategory(header) {
    const category = header.parentElement;
    const wasActive = category.classList.contains('active');
    
    // Close all categories
    document.querySelectorAll('.work-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Open clicked category if it wasn't active
    if (!wasActive) {
        category.classList.add('active');
    }
}

// ===== SMOOTH SCROLL TO WORK =====
function scrollToWork() {
    document.getElementById('work').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== CONTACT FORM HANDLER =====
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received. I will get back to you at ${email} soon.`);
    
    // Reset form
    e.target.reset();
}

// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ===== SCROLL EFFECTS =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.study-card, .work-category, .contact-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
