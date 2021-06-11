// const taskmanager = new TaskManager(0);
// console.log(taskmanager.task);

//Getting the modal form to validate
let mainform = document.querySelector("#mainform");
const btnclear = document.querySelector("#btnclear");
const idAddTask = document.querySelector("#idAddTask");

const validateTaskName = document.querySelector("#taskName");
const validateTaskDescription = document.querySelector("#taskDescription");
const validateTaskAssignedTo = document.querySelector("#idAssignedTo");
const validateTaskDueDate = document.querySelector("#idDate");
const validateTaskStatus = document.querySelector("#idStatus");

//Clear input fields in modal
 btnclear.addEventListener("click", (event) => {
  validateTaskName.value = "";
  validateTaskDescription.value = "";
  validateTaskAssignedTo.value = "";
  validateTaskDueDate.value = "";
  validateTaskStatus.value = "";
  validateTaskName.classList.remove("is-valid");
  validateTaskName.classList.remove("is-invalid");
  validateTaskDescription.classList.remove("is-valid");
  validateTaskDescription.classList.remove("is-invalid");
  validateTaskAssignedTo.classList.remove("is-valid");
  validateTaskAssignedTo.classList.remove("is-invalid");
  validateTaskDueDate.classList.remove("is-valid");
  validateTaskDueDate.classList.remove("is-invalid");
  validateTaskStatus.classList.remove("is-valid");
  validateTaskStatus.classList.remove("is-invalid");
  event.preventDefault();
  event.stopPropagation();
});

//Validations
mainform.addEventListener("click", (e) => {

e.preventDefault();
e.stopPropagation();

let fail = 0;

//Form validation for Task Name input value is more than 5 characters
if (validateTaskName.value.length > 5) {
  validateTaskName.classList.add("is-valid");
  validateTaskName.classList.remove("is-invalid");
} else {
  validateTaskName.classList.add("is-invalid");
  validateTaskName.classList.remove("is-valid");
  fail++;
}
   
//Form validation for Task Description input value is more than 5 characters
if (validateTaskDescription.value.length > 5) {
  validateTaskDescription.classList.add("is-valid");
  validateTaskDescription.classList.remove("is-invalid");
} else {
  validateTaskDescription.classList.add("is-invalid");
  validateTaskDescription.classList.remove("is-valid");
  fail++;
}

//Form validation for Assigned To value is more than 5 characters
if (validateTaskAssignedTo.value.length > 5) {
  validateTaskAssignedTo.classList.add("is-valid");
  validateTaskAssignedTo.classList.remove("is-invalid");
} else {
  validateTaskAssignedTo.classList.add("is-invalid");
  validateTaskAssignedTo.classList.remove("is-valid");
  fail++;
}

//Form validation for Task Due Date input value is not empty
if (validateTaskDueDate.value) {
  validateTaskDueDate.classList.add("is-valid");
  validateTaskDueDate.classList.remove("is-invalid");
} else {
  validateTaskDueDate.classList.add("is-invalid");
  validateTaskDueDate.classList.remove("is-valid");
  fail++;
}

//Form validation for Task Status input value is not empty
if (validateTaskStatus.value !== 'Choose...' && validateTaskStatus.value !== '') {
  validateTaskStatus.classList.add("is-valid");
  validateTaskStatus.classList.remove("is-invalid");
} else {
  validateTaskStatus.classList.add("is-invalid");
  validateTaskStatus.classList.remove("is-valid");
  fail++;
}

if (fail > 0) {
  fail = 0;
  return;
}
});

idAddTask.addEventListener("submit", (e) => {
//getting values from the form and adding to taskmanager
const addToTaskLst = () => {
  let tastName = document.getElementById("taskName").value;
  let tastDesc = document.getElementById("taskDescription").value;
  let tastAssign = document.getElementById("idAssignedTo").value;
  let tastDueDate = document.getElementById("idDate").value;
  let tastStatus = document.getElementById("idStatus");
  let tastStatusValue = tastStatus.options[tastStatus.selectedIndex].value;
  console.log(tastName);
  console.log(tastDesc);
  console.log(tastAssign);
  console.log(tastDueDate);
  console.log(tastStatusValue);
  taskmanager.addTask(
    tastName,
    tastDesc,
    tastAssign,
    tastDueDate,
    tastStatusValue
  );
  addTaskItemsToBody();
};

let cardParentTodo = document.querySelector("#idTodod");
let cardParentInProgress = document.querySelector("#idInProg");
let cardParentInReview = document.querySelector("#idInReview");
let cardParentDone = document.querySelector("#idDone");
let btnaddTask = document.getElementById("idAddTask");
btnaddTask.addEventListener("click", addToTaskLst);

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
    if (taskmanager.task[j].status === "todo") {
      // console.log('for loop list if condition');
      htmlTodo += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "inprogress") {
      htmlinProgress += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "inreview") {
      htmlinReview += addTodoform(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "done") {
      htmlDone += addTodoform(taskmanager.task[j]);
    }
  }
  cardParentTodo.innerHTML = htmlTodo;
  cardParentInProgress.innerHTML =htmlinProgress;
  cardParentInReview.innerHTML= htmlinReview;
  cardParentDone.innerHTML = htmlDone;
}

});
