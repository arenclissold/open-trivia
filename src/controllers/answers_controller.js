import { Controller } from "@hotwired/stimulus";
import { useDispatch } from 'stimulus-use';

export default class extends Controller {
  static targets = ["answer"]

  checkAnswer(event) {
    if (event.currentTarget !== event.target) {
      const buttonAnswer = event.target.innerText.substring(3)
      const answer = this.element.dataset.correctAnswer
      const allAnswers = this.answerTargets

      allAnswers.forEach((button) => {
        button.disabled = true
        if (button.innerText.substring(3) === answer) {
          button.classList.add("correct")
        }
      })

      if (answer === buttonAnswer) {
        const globalCounter = localStorage.getItem('globalCounter');
        localStorage.setItem('globalCounter', Number(globalCounter) + 1)
        document.querySelector("#global-counter").innerText = localStorage.getItem('globalCounter')

        const quizCounter = document.querySelector("#quiz-counter")
        quizCounter.innerText = Number(quizCounter.innerText) + 1
      } else {
        event.target.classList.add("incorrect")
      }
    }
  }
}
