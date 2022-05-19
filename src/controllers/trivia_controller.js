import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["questions", "difficulty", "category"]

  connect() {
    console.log("Trivia controller connected!");
    document.querySelector("#global-counter").innerText = localStorage.getItem('globalCounter')
  }

  getQuestions(event) {
    event.preventDefault()
    const quizCounter = document.querySelector("#quiz-counter")
    quizCounter.innerText = 0

    const baseUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
    const difficulty = `difficulty=${this.difficultyTarget.value}`;
    const category = `category=${this.categoryTarget.value}`
    console.log("getting questions");
    console.log(`${baseUrl}&${difficulty}&${category}`)
    fetch(`${baseUrl}&${difficulty}&${category}`)
      .then(res => res.json())
      .then((data) => {
        const questions = data.results;
        this.questionsTarget.innerHTML = ""
        questions.forEach((question) => {
          const prompt = question.question;
          const answers = question.incorrect_answers;
          const correctAnswer = question.correct_answer;
          const randomIndex = Math.floor(Math.random() * 4);
          answers.splice(randomIndex, 0, correctAnswer);
          this.questionsTarget.insertAdjacentHTML("beforeend",
            `<div class="card p-3 mt-3 shadow">
            <h3>${prompt}</h3>
            <div data-controller="answers" data-action="click->answers#checkAnswer" data-correct-answer="${correctAnswer}">
              <button data-answers-target="answer">A: ${answers[0]}</button>
              <button data-answers-target="answer">B: ${answers[1]}</button>
              <button data-answers-target="answer">C: ${answers[2]}</button>
              <button data-answers-target="answer">D: ${answers[3]}</button>
            </div>
          </div>`)
        });
      });
  }

  // reset() {
  //   const quizCounter = document.querySelector("#quiz-counter")
  //   quizCounter.innerText = 0
  //   this.questionsTarget.innerHTML = ""
  // }

}
