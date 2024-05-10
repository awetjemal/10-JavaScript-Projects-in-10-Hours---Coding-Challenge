const canvasEl = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear');

const ctx = canvasEl.getContext('2d');

let size = 20;
let color = 'black';
let isPressed = false;

let x = undefined;
let y = undefined;

canvasEl.addEventListener('mousedown', (e) =>{

  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvasEl.addEventListener('mouseup', (e) =>{
  isPressed = false;
  // drawCircle(e.offsetX, e.offsetY);
});
canvasEl.addEventListener('mouseleave', ()=>{
  isPressed = false;
})
canvasEl.addEventListener('mousemove', (e) =>{
  if(isPressed){
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }  
});

increaseBtn.addEventListener('click', () =>{
  size += 5;
  if(size > 50){
    size = 50;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () =>{
  size -= 5;
  if(size < 5){
    size = 5;
  }
  updateSizeOnScreen();
});

clearBtn.addEventListener('click', () =>{
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
});
colorEl.addEventListener('change', (e) =>{
  color = colorEl.value;
  // console.log(e);
});
function drawCircle(x, y){
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 *Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2*size;
  ctx.stroke();
}

function updateSizeOnScreen(){
  sizeEl.innerText = size;
}
