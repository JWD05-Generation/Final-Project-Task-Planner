const taskmanager = new TaskManager(0);
console.log(taskmanager.task);

let mainform = document.querySelector("#mainform");
const btnclear = document.querySelector("#btnClear");
const btnAddTask = document.querySelector("#btnAddTask");
// const btncancel = document.querySelector("#btncancel");
var fail = 0;

const idTaskName = document.querySelector("#idTaskName");
const idTaskDescription = document.querySelector("#idTaskDescription");
const idAssignedTo = document.querySelector("#idAssignedTo");
const idDate = document.querySelector("#idDate");
// const vaidAssignedTolidateTaskStatus = document.querySelector("#idStatus");
const idStatus = document.getElementById("idStatus");
  let idStatusValue = idStatus.options[idStatus.selectedIndex].value;


mainform.addEventListener("change", (e) => {

  e.preventDefault();
  e.stopPropagation();
  validationFields();

});
function validationFields(){
  fail = 0;
  
  //Form vidAssignedToalidation for Task Name input value is more than 5 characters
  if (idTaskName.value.length > 5) {
    idTaskName.classList.add("is-valid");
    idTaskName.classList.remove("is-invalid");
  } else {
    idTaskName.classList.add("is-invalid");
    idTaskName.classList.remove("is-valid");
    fail++;
  }
     
  //Form validation for Task Description input value is more than 5 characters
  if (idTaskDescription.value.length > 5) {
    idTaskDescription.classList.add("is-valid");
    idTaskDescription.classList.remove("is-invalid");
  } else {
    idTaskDescription.classList.add("is-invalid");
    idTaskDescription.classList.remove("is-valid");
    fail++;
  }
  
  //Form validation for Assigned To value is more than 5 characters
   if (idAssignedTo.value.length > 5) {
    idAssignedTo.classList.add("is-valid");
    idAssignedTo.classList.remove("is-invalid");
    
  } else {
    idAssignedTo.classList.add("is-invalid");
    idAssignedTo.classList.remove("is-valid");
    fail++;
  }
  
  //Form validation for Task Due Date input value is not empty
  // console.log("before "+ idDate.value)
  if (idDate.value !=='') {
    // console.log("if true "+ idDate.value)
    idDate.classList.add("is-valid");
    idDate.classList.remove("is-invalid");
   
  } else {
    // console.log("false "+ idDate.value)
    idDate.classList.add("is-invalid");
    idDate.classList.remove("is-valid");
    fail++;
  }
  
  //Form validation for Task Status input value is not empty
   idStatusValue = idStatus.options[idStatus.selectedIndex].value;
    if (idStatusValue !== 'Choose...') {
    idStatus.classList.add("is-valid");
    idStatus.classList.remove("is-invalid");
    
  } else {
    idStatus.classList.add("is-invalid");
    idStatus.classList.remove("is-valid");
    fail++;
  }
  console.log("fail value in mainframe:"+fail);
  if (fail > 0) {
   // fail = 0;
    return;
  }
}
 

//getting values from the form and adding to taskmanager
const addToTaskLst = () => {
 validationFields();
if(fail > 0){
  console.log("fail >0");
  return;
}else{
  console.log("false is fail: "+ fail);

  console.log(idTaskName.value);
  console.log(idTaskDescription.value);
  console.log(idAssignedTo.value);
  console.log(idDate.value);
  idStatusValue = idStatus.options[idStatus.selectedIndex].value;
  console.log(idStatusValue);
  taskmanager.addTask(
    idTaskName.value,
    idTaskDescription.value,
    idAssignedTo.value,
    idDate.value,
    idStatusValue
  );
  
  addTaskItemsToBody();
  clearFormValues();
 
  $('#exampleModal').trigger( "click" ); // for closing model
}
};

let cardParentTodo = document.querySelector("#idToDoCol");
let cardParentInProgress = document.querySelector("#idInProgCol");
let cardParentInReview = document.querySelector("#idInReviewCol");
let cardParentDone = document.querySelector("#idDoneCol");
btnAddTask.addEventListener("click",  (event) => {
  event.preventDefault();
  event.stopPropagation();
addToTaskLst();
});

//creating cards for each task in the taskmanager
function addTodoform(taskitem) {
  console.log("in add list");
  return `
    <div class="card mycardclass">
    <div class="card-body">
        <h3 class="card-title">Task Name: ${taskitem.name}</h3>
        <p class="card-text">Description: ${taskitem.description}</p>
        <p class="card-text">Assigned To: ${taskitem.assignedTo}</p>
        <p class="card-text">Due Date: ${taskitem.dueDate}</p>
        <p class="card-text">Status: ${taskitem.status}</p>
    </div>
    </div>
    `;
}
// add taskmanger task to the html body
function addTaskItemsToBody() {
  let htmlTodo="";
  let htmlinProgress="";
  let htmlinReview="";
  let htmlDone="";
  for (let j = 0; j < taskmanager.task.length; j++) {
    console.log("in for loop: " + taskmanager.task[j].status);
    if (taskmanager.task[j].status === "ToDo") {
      // console.log('for loop list if condition');
      htmlTodo += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "InProgress") {
      htmlinProgress += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "InReview") {
      htmlinReview += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "Done") {
      htmlDone += addTodoform(taskmanager.task[j]);
    }
  }
  cardParentTodo.innerHTML = htmlTodo;
  cardParentInProgress.innerHTML =htmlinProgress;
  cardParentInReview.innerHTML= htmlinReview;
  cardParentDone.innerHTML = htmlDone;
}

//Clear input fields in modal
clearFormValues=()=>{
  idTaskName.value = "";
  idTaskDescription.value = "";
  idAssignedTo.value = "";
  idDate.value = "";
  idStatus.selectedIndex = 0;
  // console.log("in clear form "+idStatus.options[idStatus.selectedIndex].value);
  idTaskName.classList.remove("is-valid");
  idTaskName.classList.remove("is-invalid");
  idTaskDescription.classList.remove("is-valid");
  idTaskDescription.classList.remove("is-invalid");
  idAssignedTo.classList.remove("is-valid");
  idAssignedTo.classList.remove("is-invalid");
  idDate.classList.remove("is-valid");
  idDate.classList.remove("is-invalid");
  idStatus.classList.remove("is-valid");
  idStatus.classList.remove("is-invalid");
}

btnClear.addEventListener("click", (event) => {
  clearFormValues();
  event.preventDefault();
  event.stopPropagation(); 

});
