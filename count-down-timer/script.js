const daysElement = document.querySelector('.days-el');
const hoursElement = document.querySelector('.hours-el');
const minsElement = document.querySelector('.mins-el');
const secondsElement = document.querySelector('.seconds-el');

function countdownTimer(){
  const newYear = new Date('1 jan 2024');
  const today = new Date();
  const totalSeconds = Math.floor((newYear - today) / 1000);

  //based on total seconds determine day, hour , minute & second 
  const daysLeft = Math.floor(totalSeconds / 3600 / 24);
  const hoursLeft = Math.floor((totalSeconds / 3600 / 24) % 24);
  const minsLeft = Math.floor((totalSeconds / 60) % 60);
  const secondsLeft = Math.floor(totalSeconds % 60);

  //update the page based on the calculated values
  daysElement.innerHTML = daysLeft;
  hoursElement.innerHTML = formatNumber(hoursLeft);
  minsElement.innerHTML = formatNumber(minsLeft);
  secondsElement.innerHTML = formatNumber(secondsLeft);

 /*
  console.log('DaysLeft:  ' +daysLeft);
  console.log('HoursLeft:  ' +hoursLeft);
  console.log('MinsLeft: ' + minsLeft);
  console.log('SecondsLeft: ' + secondsLeft);
  */
}

function formatNumber(number){
  return number >= 10 ? number : ('0'+number) ;
}
countdownTimer();
setInterval(countdownTimer, 1000);
