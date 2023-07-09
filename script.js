// Define the Quiz object
const quiz = {
    questions: [],
    currentIndex: 0,
  //fetching from the json file using API
    loadQuestions: function() {
      return fetch('https://api.npoint.io/a8582a4ff7bb433da5ba')
        .then(response => response.json())
        .then(data => {
          this.questions = data.questions;
        });
    },
  
    displayQuestion: function() {
      const questionContainer = document.getElementById('question-container');
      questionContainer.innerHTML = '';
  
      const currentQuestion = this.questions[this.currentIndex];
  
      const questionElement = document.createElement('p');
      questionElement.textContent = `${this.currentIndex + 1}. ${currentQuestion.question}`;
      questionContainer.appendChild(questionElement);
  
      currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('input');
        optionElement.type = 'radio';
        optionElement.name = 'question';
        optionElement.value = option;
        optionElement.classList.add('option');
        questionContainer.appendChild(optionElement);
  
        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        questionContainer.appendChild(optionLabel);
  
        questionContainer.appendChild(document.createElement('br'));
      });
    },
  //calculating the score
    calculateScore: function() {
      const selectedOption = document.querySelector('input[type="radio"]:checked');
  
      if (selectedOption && selectedOption.value === this.questions[this.currentIndex].answer) {
        this.score++;
      }
    },
  //thank you message display
    displayThankYouMessage: function() {
      const messageContainer = document.getElementById('message-container');
      messageContainer.textContent = 'Thank you for taking the survey! your response and input matters to us.';
    },
  
    showQuizContainer: function() {
      document.getElementById('welcome-container').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
    },
  
    initialize: function() {
      this.loadQuestions().then(() => {
        this.displayQuestion();
      });
  
      document.getElementById('start-btn').addEventListener('click', () => {
        this.showQuizContainer();
      });
  
      document.getElementById('submit-btn').addEventListener('click', () => {
        this.calculateScore();
  
        if (this.currentIndex === this.questions.length - 1) {
          document.getElementById('submit-btn').disabled = true;
          this.displayThankYouMessage();
        } else {
          this.currentIndex++;
          this.displayQuestion();
        }
      });
  
      document.addEventListener('change', (event) => {
        if (event.target.matches('input[type="radio"]')) {
          document.getElementById('submit-btn').disabled = false;
        }
      });
    }
  };
  
  // Initialize the quiz
  quiz.initialize();
  