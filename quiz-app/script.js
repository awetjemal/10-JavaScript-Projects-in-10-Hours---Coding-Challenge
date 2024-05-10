const quizData = [{
  question: 'what is the most used programming language in 2019?',
  a: 'Java',
  b: 'C',
  c: 'C#',
  d: 'python',
  answer: 'a'
}, {
  question: 'who is the president of the US?',
  a: 'Florin Pop',
  b: 'Donald Trump',
  c: 'Mike Pence',
  d: 'Mike Pompeo',
  answer: 'b'
}, {
  question: 'What does HTML stand for?',
  a: 'Hypertext Markup Language',
  b: 'Cascading Style Sheet',
  c: 'Jason Object Notation',
  d: 'Helicopters Terminals Motorboats Lamborginis',
  answer: 'a'
},{
  question: 'What year was javaScript launched?',
  a: '1996',
  b: '1995',
  c: '1994',
  d: 'None of the above',
  answer: 'b'
}];
//load quiz to the page
//lets first load only the first question

const questionElement = document.getElementById('question');
const aOption = document.getElementById('a-option');
const bOption = document.getElementById('b-option');
const cOption = document.getElementById('c-option');
const dOption = document.getElementById('d-option');
const button = document.getElementById('submit');
const quizContainer = document.querySelector('.quiz-container');
const answerEles = document.querySelectorAll('.answer');
let currentQuestion = 0;
let score = 0;

function loadQuiz(){
    deSelect();
  questionElement.innerHTML = quizData[currentQuestion].question;
    aOption.innerHTML = quizData[currentQuestion].a;
    bOption.innerHTML = quizData[currentQuestion].b;
    cOption.innerHTML = quizData[currentQuestion].c;
    dOption.innerHTML = quizData[currentQuestion].d;
    
}
//add event listener for the button
//add a way of detecting whether and which option is selected
function getSelected(){
 
  let answer = undefined
  answerEles.forEach((answerEl) =>{
    if(answerEl.checked){
      answer = answerEl.id;
    }
  });
  return answer;
 
}
function deSelect(){
  answerEles.forEach((ele) =>{
    ele.checked = false;
  });
}
button.addEventListener('click', () =>{
      
    if(getSelected()){
      if(getSelected() === quizData[currentQuestion].answer){
        score++;
      }
    currentQuestion++;
    }
    if(currentQuestion < quizData.length){
      loadQuiz();
    }
    else{
    quizContainer.innerHTML = `<h2>You answered correctly for ${score}/${quizData.length} Questions</h2>
    <button onclick="location.reload()">Reload</button>
    `;
  }  
  
});

loadQuiz();
getSelected();
//console.log(quizContainer);