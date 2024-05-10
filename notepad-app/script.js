//const notesEl = document.querySelector('.note');

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
  notes.forEach((note) =>{
    addNewNote(note);
    console.log(note);
  });
}
const addBtn = document.getElementById('add');


addBtn.addEventListener('click', ()=>{
  addNewNote();
});

function addNewNote(text = ""){
  
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  
  noteEl.innerHTML = `
  <div class="tools">
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="delete"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div class="main ">
  <textarea class="text" ></textarea>
  </div>
  `;
  const mainEl = noteEl.querySelector('.main');
  const textAreaEl = noteEl.querySelector('textarea');

  const editBtn = noteEl.querySelector('.edit');
  const deleteBtn = noteEl.querySelector('.delete');

  textAreaEl.value = text;
 // mainEl.innerHTML = marked(text);

  editBtn.addEventListener('click', () => {
    //const {value} = text;
    let val = textAreaEl.value;
    mainEl.innerHTML = marked.parse(val);
    updateLS();
    // mainEl.classList.toggle('hidden');
    // textAreaEl.classList.toggle('hidden');
    // console.log(mainEl );
    // console.log( textAreaEl);
  });
  deleteBtn.addEventListener('click', () => {
    noteEl.remove();
    updateLS();
  });
  textAreaEl.addEventListener('input', (e) => {
    // const {value} = e.target;
    // mainEl.innerHTML = marked.parse(value);
  });
  document.body.appendChild(noteEl);
}
function updateLS(){
  const textNotes = document.querySelectorAll("textarea");
  const notes = [];
  textNotes.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(textNotes);
}
/*/
  <div class="note">
            
            
        </div> 
*/ 