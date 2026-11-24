let answers = {};
let locked = false;

function selectChoice(selectedCard) {
    if (locked) return;

    const qId = selectedCard.dataset.questionId;
    const cId = selectedCard.dataset.choiceId;
    if (!qId || !cId) return;

    answers[qId] = cId;

    const cards = selectedCard.closest(".question-block").querySelectorAll(".choice");
    cards.forEach(function (card) {
        const isPicked = card === selectedCard;
        card.querySelector(".checkbox").src = isPicked ? "checked.png" : "unchecked.jpg";
        card.classList.toggle("selected", isPicked);
        card.classList.toggle("unselected", !isPicked);
    });

    if (Object.keys(answers).length === 3) {
        locked = true;
        showResult();
    }
}

function showResult() {
    let winner = answers.one;
    const counts = {};

    for (const qId of ["one", "two", "three"]) {
        const cId = answers[qId];
        counts[cId] = (counts[cId] || 0) + 1;
        if (counts[cId] > counts[winner]) {
            winner = cId;
        }
    }

    const result = RESULTS_MAP[winner] || RESULTS_MAP.blep;
    const titleEl = document.getElementById("result-title");
    if (titleEl) {
        titleEl.textContent = result.title;
        document.getElementById("fortune-text").textContent = result.contents;
    } else {
        document.getElementById("fortune-text").textContent = result.title + " — " + result.contents;
    }
    document.getElementById("results").classList.remove("results-hidden");
}

    const result = RESULTS_MAP[winner] || RESULTS_MAP.blep;
    document.getElementById("result-title").textContent = result.title;
    document.getElementById("fortune-text").textContent = result.contents;
    document.getElementById("results").classList.remove("results-hidden");

function restartQuiz() {
    answers = {};
    locked = false;
    document.getElementById("results").classList.add("results-hidden");

    document.querySelectorAll(".choice").forEach(function (card) {
        card.classList.remove("selected", "unselected");
        card.querySelector(".checkbox").src = "unchecked.jpg";
    });
}