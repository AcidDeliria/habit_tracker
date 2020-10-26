const list = document.getElementById("container1");
const addButton = document.getElementById("addButton")
const dateElement = document.getElementById("date");
const alertPopup = document.getElementById('alertmain');
const closeAlert = document.getElementById('closebtn');
let colorChoice = document.getElementById('habit-color').value;

localStorage.clear();
let HABITLIST;
let id=0;
 HABITLIST = JSON.parse(localStorage.getItem('habit')) || []
     id = HABITLIST.length; 
     //loadHabit(HABITLIST);
      
//    //function loadHabit(array){
//        array.forEach(createHabit(){
//            addRow
//        }
    
//        )
//       }
          
//No habit text alert popup function

closeAlert.addEventListener('click' , removeAlert)


//Date Element

const options = {weekday : "long", month : "short", day : "numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

document.getElementById("habit-color").onchange = function() {
    backHEX = this.value;
    colorChoice = backHEX;
};

// color coding buttons

document.addEventListener('click', function (event){
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


addButton.addEventListener('click', addRow)

function addRow() {
    const inputText=document.getElementById('formfield').value;
    if (inputText!='') {
        const habit = createHabit(inputText, colorChoice)
        HABITLIST.push(habit)
        id++;
        
        const row = 
        `

        <div class="row row-wrapper">
            <button class="removebutton" onclick="remover(this)">
                <i id="trash" class="far fa-trash-alt"></i>
            </button>

            <div class="habitname ib"  style = background-color:${colorChoice}><p>${inputText}</p></div>

            <div class="row row-yellow" id = ${colorChoice}>
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
    save();
    loadHabit();
    document.getElementById('formfield').value='';      
    }
    else{
        addAlert();
    }
  
}

//hit enter insead of add btn

document.addEventListener('keypress', function(enter) {
    if (enter.keyCode === 13 || enter.which === 13) {
      addRow()

    };
  });

  //remove button
function remover(habit) {
    habit.parentElement.remove();
    HABITLIST.habit.id.remover = true;
    save();
}
function removeAlert() {
    alertPopup.classList.add('dis')
}

function addAlert () {
    alertPopup.classList.remove('dis')
}
function save(){
    localStorage.setItem('habit', JSON.stringify(HABITLIST))
}
function createHabit(name, colorChoice) {
    return { name: name, id: id, color: colorChoice, remover: false }
  }