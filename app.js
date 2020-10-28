// var dayButtons = [].slice.call(document.querySelectorAll('.day-button'));
const habit = document.getElementById("habit-name");
const trash = document.querySelector("#trash");
const list = document.getElementById("container1");
const addButton = document.getElementById(".add-btn")
const dateElement = document.getElementById("date");
const task = formfield.value;

//Date Element

const options = {weekday : "long", month : "short", day : "numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// color coding buttons

// dayButtons.forEach(button => button.addEventListener(('click'), function () {
//   if (button.classList.contains('selected')) {
//         button.classList.remove('selected')
//       } else {
//       button.classList.add('selected')
//   }
// }))
document.addEventListener('click', function (event){
const element=event.target;
if (element.classList.contains('day-button')) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
      } else {
      element.classList.add('selected')
  }
    
}
})
// Function add Habit

document.getElementById('addButton').addEventListener('click', function (){
    const inputText=document.getElementById('formfield').value;
    if (inputText!='') {
        
        const row = `
        <div class="row row-wrapper">
            <button class="removebutton" onclick="remover(this)">
                <i id="trash" class="far fa-trash-alt"></i>
            </button>

            <div class="habitname ib"><p>${inputText}</p></div>

            <div class="row  row-yellow">
                <button class="day-button">Mon</button>
                <button class="day-button">Tues</button>
                <button class="day-button">Wed</button>
                <button class="day-button">Thurs</button>
                <button class="day-button">Fri</button>
                <button class="day-button">Sat</button>
                <button class="day-button">Sun</button>
            </div>
        </div>   
        `
    const position = "beforeEnd"
    list.insertAdjacentHTML(position, row)
    document.getElementById('formfield').value='';      
    }
    else{
        alert('Please Insert Habit Name');
    }
  
})
function remover(element) {
    element.parentElement.remove();  
}
document.getElementById('reset').addEventListener('click',()=>{
    localStorage.clear();
})

// document.addEventListener("keyup", function(event){
//     if(event.keyCode == 13) {

//         if(task) {

//         }
//     }
// })