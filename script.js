// Quiz Data (Sample Questions and Answers)
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2 // Correct answer is index 2 (Paris)
    },
    {
        question: "Which planet is known as the Red Planet?", // 2nd question
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1 // Correct answer is index 1 (Mars)
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3 // Correct answer is index 3 (Pacific Ocean)
    }
];

// Variables for Quiz
let currentQuestionIndex = 0; // To track the current question index
let score = 0; // To track the user's score
let selectedAnswers = []; // To store user's selected answers
let leaderboard = []; // To store leaderboard scores
let totalTime = 120; // Total quiz time in seconds (2 minutes)
let timerInterval; // Variable to store timer interval

// Function to start the quiz
function startQuiz() {
    document.getElementById('instructions-container').style.display = 'none'; // Hide instructions
    document.querySelector('.quiz-container').style.display = 'block'; // Show quiz container
    loadQuestion(); // Load the first question
    startTimer(); // Start the timer
}

// Function to start the timer
function startTimer() {
    const timerElement = document.getElementById('timer');

    // Timer interval set to 1 second
    timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval); // Stop timer if time is up
            submitQuiz(); // Auto-submit quiz
        } else {
            totalTime--; // Decrease total time by 1 second
            // Format time as MM:SS
            const minutes = Math.floor(totalTime / 60);
            const seconds = totalTime % 60;
            timerElement.textContent = `Time Left: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000); // Run this code every second
}

// Function to load the current question
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option-btn');

    // Update the question text and options
    questionElement.textContent = quizData[currentQuestionIndex].question; // Set question text
    options.forEach((btn, index) => {
        btn.textContent = quizData[currentQuestionIndex].options[index]; // Set option text
        btn.disabled = false; // Enable the buttons for selection
        btn.style.backgroundColor = '#3498db'; // Reset button color to default (Blue)
    });

    document.getElementById('next-btn').style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === quizData.length - 1 ? 'inline-block' : 'none';
}

// Function to handle user's answer selection
function checkAnswer(selectedOptionIndex) {
    selectedAnswers[currentQuestionIndex] = selectedOptionIndex; // Store user's selected answer

    // Highlight the selected option and disable all buttons after selection
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        // Correct answer: Green, Wrong answer: Red
        if (quizData[currentQuestionIndex].answer === index) {
            btn.style.backgroundColor = '#27ae60'; // Correct answer highlighted in green
        } else if (selectedOptionIndex === index) {
            btn.style.backgroundColor = '#e74c3c'; // Wrong answer highlighted in red
        }
        btn.disabled = true; // Disable all options after selection
    });

    // Calculate score if the answer is correct
    if (quizData[currentQuestionIndex].answer === selectedOptionIndex) {
        score += 10; // Increment score by 10 for each correct answer
    }
}

// Function to navigate to the next question
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++; // Move to the next question
        loadQuestion(); // Load the new question
    }
}

// Function to submit the quiz
function submitQuiz() {
    clearInterval(timerInterval); // Stop the timer
    showLeaderboard(); // Show leaderboard after quiz submission
}

// Function to show leaderboard
function showLeaderboard() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.leaderboard-container').style.display = 'block';

    leaderboard.push(score); // Add the user's score to the leaderboard

    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = ''; // Clear previous leaderboard

    // Sort and display leaderboard scores
    leaderboard.sort((a, b) => b - a);
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Player ${index + 1}: ${entry} points`;
        leaderboardElement.appendChild(listItem);
    });
}

// Function to restart the quiz
function restartQuiz() {
    // Reset all variables and UI elements for a new quiz
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    totalTime = 120; // Reset total time
    clearInterval(timerInterval); // Clear any existing timer
    document.querySelector('.leaderboard-container').style.display = 'none';
    document.getElementById('instructions-container').style.display = 'block'; // Show instructions again
}