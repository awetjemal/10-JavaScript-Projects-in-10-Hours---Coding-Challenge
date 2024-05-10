const pwEl = document.getElementById('pw');
const copyBtn = document.getElementById('copy');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateBtn = document.getElementById('generate');

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()+<>?";


function getUpper(){
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getLower(){
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getNumbers(){
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbols(){
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function generatePassword(){
  const passLength = lengthEl.value;
  let pass = '';
  if(upperEl.checked){
    pass += getUpper();
  }
  if(lowerEl.checked){
    pass += getLower();
  }
  if(numberEl.checked){
    pass += getNumbers();
  }
  if(symbolEl.checked){
    pass += getSymbols();
  }
  for(let i = pass.length ; i < passLength; i++){
    let p = generateX();
    if(p){
      pass += p;
    }
    
  }
  pwEl.innerText = pass;
}
function generateX(){
  const xPass = [];
  if(upperEl.checked){
    xPass.push(getUpper());
  }
  if(lowerEl.checked){
    xPass.push(getLower());
  }
  if(numberEl.checked){
    xPass.push(getNumbers());
  }
  if(symbolEl.checked){
    xPass.push(getSymbols());
  }
  // console.log(xPass);
  return xPass[Math.floor(Math.random() * xPass.length)]
}


generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', () =>{
  const textareaEl = document.createElement('textarea');
  const password = pwEl.innerText;
  if(!password){
    return;
  }
  textareaEl.value = password;
  document.body.appendChild(textareaEl);
  textareaEl.select();
  document.execCommand('copy');
  textareaEl.remove();
  alert('copied to clipboard');
});
