const list = document.getElementById("container1");
const addButton = document.getElementById("addButton")
const dateElement = document.getElementById("date");
const alertPopup = document.getElementById('alertmain');
const closeAlert = document.getElementById('closebtn');
let colorChoice = document.getElementById('habit-color').value;
const clearBtn = document.getElementById('clearBtn');


//remove button, and local storage clear;

clearBtn.addEventListener('click',function (){
    localStorage.clear()
    document.getElementsByClassName('row-wrapper').remove()
})

let HABITLIST;
let id=0;
const LOCAL_STORAGE_KEY = "habit"
 HABITLIST = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
     id = HABITLIST.length; 
     loadHabit(HABITLIST);


//load items from local storage

function loadHabit(array){
        array.forEach(function(habit){
           if(!habit.remover){
            addRow(habit.name, habit.id, habit.color)
           }
        
    })
}
          
//saves items in the local storage

function save(){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(HABITLIST))
    
}
//habit object creator

function createHabit(name, colorChoice) {
    return { name: name, id: id, color: colorChoice, remover: false }
  }


//No habit text alert popup function

closeAlert.addEventListener('click' , removeAlert)

function removeAlert() {
    alertPopup.classList.add('dis')
}

function addAlert () {
    alertPopup.classList.remove('dis')
}

//Date Element

const options = {weekday : "long", month : "short", day : "numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

document.getElementById("habit-color").onchange = function() {
    backHEX = this.value;
    colorChoice = backHEX;
};



// color coding buttons

document.addEventListener('click', function(event){
const element=event.target;
if (element.classList.contains('day-button')) {
    element.style.backgroundColor = element.parentNode.id;
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
        element.style.backgroundColor = "#E7E7E7";
      } else {
      element.classList.add('selected')
      element.style.backgroundColor = element.parentNode.id;
    }
}})



// add habit (row + push to array and local storage)

 function addHabit(){
    const habit = createHabit(document.getElementById('formfield').value, colorChoice)
    addRow(habit.name, habit.id, habit.color);
    HABITLIST.push(habit);
    id++;
     save();
 }

//add habit on click and enter

 addButton.addEventListener('click', addHabit);
 document.addEventListener('keypress', function (e){
        if (e.key === 'Enter') {
            e.preventDefault()
        addHabit()
 }})



//create row and insert it to HTML

function addRow(inputText, id , colorChoice) {
    if (inputText!='') {
        const row = 
        `

        <div class="row row-wrapper">
            <button class="removebutton" onclick="remover(this, ${id})">
                <i id="trash" class="far fa-trash-alt"></i>
            </button>

            <div class="habitname ib"  style = background-color:${colorChoice}><p>${inputText}</p></div>

            <div class="row" id = ${colorChoice}>
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
        addAlert();
    }

}

  //remove button
function remover(element, id) {
    element.parentElement.remove();
    HABITLIST[id].remover = true;
    save();
}