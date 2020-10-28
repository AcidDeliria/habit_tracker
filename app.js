const list = document.getElementById("container1");
const addButton = document.getElementById("addButton")
const dateElement = document.getElementById("date");
const alertPopup = document.getElementById('alertmain');
const closeAlert = document.getElementById('closebtn');
let colorChoice = document.getElementById('habit-color').value;
let week = [false, false, false, false, false, false, false]

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
            addRow(habit.name, habit.id, habit.color, habit.week)
           }
        
    })
}
          
//saves items in the local storage

function save(){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(HABITLIST))
    
}
//habit object creator

function createHabit(name, colorChoice, week) {
    return { name: name, id: id, color: colorChoice, week: week, remover: false }
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

 //color coding buttons

document.addEventListener('click', handleClick)
function handleClick(event){
const element = event.target
    if (element.classList.contains('day-button')) {
        element.style.backgroundColor = element.parentNode.id;
        let habit = HABITLIST.find(function(habit){
            return habit.id == element.parentNode.dataset.habitId
        })
        if (element.classList.contains('selected')) {
            habit.week[element.dataset.day] = false;
            element.classList.remove('selected') //this true 
            element.style.backgroundColor = "#E7E7E7";
          } else {
            habit.week[element.dataset.day] = true;
          element.classList.add('selected')
          element.style.backgroundColor = element.parentNode.id;
        }

        console.log("day", element.dataset.day)
        console.log("habitId", element.parentNode.dataset.habitId)
        console.log("habit", habit)
        }
        
      save() 
    }



// add habit (row + push to array and local storage)

 function addHabit(){
    const habit = createHabit(document.getElementById('formfield').value, colorChoice,[false, false, false, false, false, false, false] )
    addRow(habit.name, habit.id, habit.color, habit.week);
    //handleClick()
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

function addRow(inputText, id , colorChoice, week) {
    if (inputText!='') {
        const row = 
        `

        <div class="row row-wrapper">
            <button class="removebutton" onclick="remover(this, ${id})">
                <i id="trash" class="far fa-trash-alt"></i>
            </button>

            <div class="habitname ib"  style = background-color:${colorChoice}><p>${inputText}</p></div>

            <div class="row row-yellow" id = ${colorChoice} data-habit-id="${id}">
                <button class="day-button ${week[0] && "selected"}" data-day="0" ${week[0] &&  `style = background-color:${colorChoice}`} >Mon</button>
                <button class="day-button ${week[1] && "selected"}" data-day="1" ${week[1] &&  `style = background-color:${colorChoice}`}>Tues</button>
                <button class="day-button ${week[2] && "selected"}" data-day="2" ${week[2] &&  `style = background-color:${colorChoice}`}>Wed</button>
                <button class="day-button ${week[3] && "selected"}" data-day="3" ${week[3] &&  `style = background-color:${colorChoice}`}>Thurs</button>
                <button class="day-button ${week[4] && "selected"}" data-day="4" ${week[4] &&  `style = background-color:${colorChoice}`}>Fri</button>
                <button class="day-button ${week[5] && "selected"}" data-day="5" ${week[5] &&  `style = background-color:${colorChoice}`}>Sat</button>
                <button class="day-button ${week[6] && "selected"}" data-day="6" ${week[6] &&  `style = background-color:${colorChoice}`}>Sun</button>
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
console.log(week)
}

  //remove button
function remover(element, id) {
    element.parentElement.remove();
    HABITLIST[id].remover = true;
    save();
}