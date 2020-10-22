const habit = document.getElementById("habit-name");
const trash = document.querySelector("#trash");
const list = document.getElementById("container1");
const addButton = document.getElementById("addButton")
const dateElement = document.getElementById("date");
const task = formfield.value;
const alertPopup = document.getElementById('alertmain')
const closeAlert = document.getElementById('closebtn')
let colorChoice = document.getElementById('habit-color').value

document.getElementById("habit-color").onchange = function() {
    backHEX = this.value;
    colorChoice = backHEX;
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

// color coding buttons

document.addEventListener('click', function (event){
const element=event.target;
if (element.classList.contains('day-button')) {
    element.style.backgroundColor = colorChoice
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
      } else {
      element.classList.add('selected')
    //   element.style.backgroundColor = element.parentNode.id;
    }
})


// document.addEventListener('click', function (event){
//     const element=event.target;
//     if (element.classList.contains('day-button')) {
//         if (element.hasAttribute('style', 'background-color=')) {
//             element.setAttribute('style', 'background-color=')
//           } else {
//           element.setAttribute('style', 'background-color='+colorChoice)
//       }
//     }
//     })
// Function add Habit

addButton.addEventListener('click', addRow)

function addRow(event) {
    const inputText=document.getElementById('formfield').value;
    if (inputText!='') {
        
        const row = `
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
    document.getElementById('formfield').value='';      
    }
    else{
        addAlert();
    }
  
}

//hit enter insead of add btn

document.addEventListener('keypress', function(enter) {
    if (enter.keyCode === 13 || enter.which === 13) {
      addRow(event)
    };
  });

  //remove button
function remover(element) {
    element.parentElement.remove();
}
 //color updater

 // Pebo was here xD