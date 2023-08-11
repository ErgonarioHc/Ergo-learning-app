document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    }
});

const quiz_answers = {
    "layer": ["layer 1", "layer 2", "layer 3"],
    "proof_type": ["proof of work", "proof of stake"],
    "economics": ["supply and demand", "inflation", "opportunity cost"],
    "ergo_tech": ["Sigma protocols", "EUTXO model", "Oracle pools"]
};

const questionKeys = Object.keys(quiz_answers);
let currentQuestionIndex = 0;
let correctAnswers = 0;

function startQuiz() {
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.style.display = "none";
    }

    const quizContainer = document.getElementById("quizContainer");
    if (quizContainer) {
        quizContainer.style.display = "block";
    }

    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < questionKeys.length) {
        const questionKey = questionKeys[currentQuestionIndex];
        runQuiz(questionKey);
        currentQuestionIndex++;
    } else {
        showResult();
    }
}

function runQuiz(questionKey) {
    const answers = quiz_answers[questionKey];
    if (!answers) {
        console.error(`Answers not found for questionKey: ${questionKey}`);
        return;
    }

    const questionText = getQuestionText(questionKey);
    const answerOptions = answers.map(answer => `<button class="answerOption">${answer}</button>`).join("");

    const questionTextElement = document.getElementById("questionText");
    questionTextElement.textContent = questionText;

    const answerOptionsElement = document.getElementById("answerOptions");
    answerOptionsElement.innerHTML = answerOptions;

    const answerButtons = document.querySelectorAll(".answerOption");
    answerButtons.forEach(button => {
        button.addEventListener("click", function() {
            checkAnswer(questionKey, button.textContent);
            showNextQuestion();
        });
    });
}

function checkAnswer(questionKey, userAnswer) {
    const answers = quiz_answers[questionKey];

    if (answers.includes(userAnswer.toLowerCase())) {
        correctAnswers++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

function getQuestionText(questionKey) {
    const questionTexts = {
        "layer": "Is it a layer 1, layer 2, or layer 3?",
        "proof_type": "Is Ergo proof of work or proof of stake?",
        "economics": "What's a key concept of economics: supply and demand, inflation, or opportunity cost?",
        "ergo_tech": "Which technology is a key part of Ergo's design: Sigma protocols, EUTXO model, or Oracle pools?"
    };
    return questionTexts[questionKey];
}

function showResult() {
    const quizContainer = document.getElementById("quizContainer");
    if (quizContainer) {
        quizContainer.style.display = "none";
    }

    const resultText = document.getElementById("resultText");
    resultText.textContent = `Your final score is: ${correctAnswers} out of ${questionKeys.length}`;
}

function showFeedback(isCorrect) {
    const feedback = isCorrect ? "Good job! Let's go..." : "So sorry, are you even an ergonaut?\nTry again";
    alert(feedback);
}

