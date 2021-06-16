//Initialize new TaskManager with current id set to 0
const taskmanager = new TaskManager(0);
console.log(taskmanager.task);
//Select form in the modal
let mainform = document.querySelector("#mainform");
//Select buttons
const btnclear = document.querySelector("#btnClear");
const btnAddTask = document.querySelector("#btnAddTask");
const btnClose = document.querySelector("#btnClose");
//Select inputs
const taskId = document.querySelector("#taskId"); //hidden value having task id
const idTaskName = document.querySelector("#idTaskName");
const idTaskDescription = document.querySelector("#idTaskDescription");
const idAssignedTo = document.querySelector("#idAssignedTo");
const idDate = document.querySelector("#idDate");
const idStatus = document.getElementById("idStatus");
let idStatusValue = idStatus.options[idStatus.selectedIndex].value;
//Select columns of cards
let cardParentTodo = document.querySelector("#idToDoCol");
let cardParentInProgress = document.querySelector("#idInProgCol");
let cardParentInReview = document.querySelector("#idInReviewCol");
let cardParentDone = document.querySelector("#idDoneCol");

var fail = 0;

//Add a 'change' event listener to the form
mainform.addEventListener("change", (e) => {
  //Prevent default action
  e.preventDefault();
  e.stopPropagation();
  validationFields();
});
//Function to validate inpute fields
const validationFields = () => {
  fail = 0;
  //Check Task Name input value has more than 5 characters
  if (idTaskName.value.length > 5) {
    idTaskName.classList.add("is-valid");
    idTaskName.classList.remove("is-invalid");
  } else {
    idTaskName.classList.add("is-invalid");
    idTaskName.classList.remove("is-valid");
    fail++;
  }
  //Check Task Description input value has more than 5 characters
  if (idTaskDescription.value.length > 5) {
    idTaskDescription.classList.add("is-valid");
    idTaskDescription.classList.remove("is-invalid");
  } else {
    idTaskDescription.classList.add("is-invalid");
    idTaskDescription.classList.remove("is-valid");
    fail++;
  }
  //Check Assigned To value input value has more than 5 characters
  if (idAssignedTo.value.length > 5) {
    idAssignedTo.classList.add("is-valid");
    idAssignedTo.classList.remove("is-invalid");
  } else {
    idAssignedTo.classList.add("is-invalid");
    idAssignedTo.classList.remove("is-valid");
    fail++;
  }
  //Check Task Due Date input value is not empty
  if (idDate.value !== "") {
    idDate.classList.add("is-valid");
    idDate.classList.remove("is-invalid");
  } else {
    idDate.classList.add("is-invalid");
    idDate.classList.remove("is-valid");
    fail++;
  }
  //Check Task Status input value
  idStatusValue = idStatus.options[idStatus.selectedIndex].value;
  if (idStatusValue !== "Choose...") {
    idStatus.classList.add("is-valid");
    idStatus.classList.remove("is-invalid");
  } else {
    idStatus.classList.add("is-invalid");
    idStatus.classList.remove("is-valid");
    fail++;
  }
  if (fail > 0) {
    // fail = 0;
    return;
  }
};
//Getting values from the form and adding to taskmanager
const addToTaskLst = () => {
  console.log("in add taskList" + taskmanager.task);
  if (fail > 0) {
    // console.log("fail >0");
    return;
  } else {
    // console.log("false is fail: "+ fail);
    console.log("taskid:" + taskId.value);
    console.log(idTaskName.value);
    console.log(idTaskDescription.value);
    console.log(idAssignedTo.value);
    console.log(idDate.value);
    idStatusValue = idStatus.options[idStatus.selectedIndex].value;
    console.log(idStatusValue);
    if (taskId.value === "-1") {
      taskmanager.addTask(
        idTaskName.value,
        idTaskDescription.value,
        idAssignedTo.value,
        idDate.value,
        idStatusValue
      );
    } else {
      taskmanager.updatecurrentTask(
        taskId.value,
        idTaskName.value,
        idTaskDescription.value,
        idAssignedTo.value,
        idDate.value,
        idStatusValue
      );
    }
    addTaskItemsToBody();
    clearFormValues();
    $("#exampleModal").trigger("click"); // for closing modal
  }
};
//Onclick event validating the fields and adding task items
btnAddTask.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  validationFields();
  addToTaskLst();
});
//Creating cards for each task in the taskmanager
const addHtmlForm = (taskitem) => {
  console.log("in add list");
  return `
    <div class="card mycardclass">
    <div class="card-body">
        <h3 class="card-title">Task Name: ${taskitem.name}</h3>
        <p class="card-text">Description: ${taskitem.description}</p>
        <p class="card-text">Assigned To: ${taskitem.assignedTo}</p>
        <p class="card-text">Due Date: ${taskitem.dueDate}</p>
        <p class="card-text">Status: ${taskitem.status}</p>
        <button class="btn btn-outline-info" value="Edit" name="${taskitem.id}" onclick="editingDataModel(${taskitem.id})">Edit</button>
        <button class="btn btn-outline-danger" value="Delete" name="${taskitem.id}" onclick="deletingDataModel(${taskitem.id})">Delete</button>
    </div>
    </div>
    `;
};
//Creating cards for each task "done" in the taskmanager
const addHtmlFormDone = (taskitem) => {
  console.log("in add list");
  return `
    <div class="card mycardclass">
    <div class="card-body">
        <h3 class="card-title">Task Name: ${taskitem.name}</h3>
        <p class="card-text">Description: ${taskitem.description}</p>
        <p class="card-text">Assigned To: ${taskitem.assignedTo}</p>
        <p class="card-text">Due Date: ${taskitem.dueDate}</p>
        <p class="card-text">Status: ${taskitem.status}</p>
        <button class="btn btn-outline-danger" value="Delete" name="${taskitem.id}" onclick="deletingDataModel(${taskitem.id})">Delete</button>
    </div>
    </div>
    `;
};
//Add taskmanger task to the html body
function addTaskItemsToBody() {
  let htmlTodo = "";
  let htmlinProgress = "";
  let htmlinReview = "";
  let htmlDone = "";

  for (let j = 0; j < taskmanager.task.length; j++) {
    console.log("in for loop: " + taskmanager.task[j].status);
    if (taskmanager.task[j].status === "ToDo") {
      // console.log('for loop list if condition');
      htmlTodo += addHtmlForm(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "InProgress") {
      htmlinProgress += addHtmlForm(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "InReview") {
      htmlinReview += addHtmlForm(taskmanager.task[j]);
    } else if (taskmanager.task[j].status === "Done") {
      htmlDone += addHtmlFormDone(taskmanager.task[j]);
    }
  }
  cardParentTodo.innerHTML = htmlTodo;
  cardParentInProgress.innerHTML = htmlinProgress;
  cardParentInReview.innerHTML = htmlinReview;
  cardParentDone.innerHTML = htmlDone;
}
//Clear input fields in modal
clearFormValues = () => {
  taskId.value = "-1";
  idTaskName.value = "";
  idTaskDescription.value = "";
  idAssignedTo.value = "";
  idDate.value = "";
  idStatus.selectedIndex = 0;
  document.querySelector("#exampleModalLabel").innerHTML = "Add New Task";
  document.querySelector("#btnAddTask").value = "Add Task";
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
};
//Onclick event for clearing form
btnClear.addEventListener("click", (event) => {
  clearFormValues();
  event.preventDefault();
  event.stopPropagation();
});
//Populating data for edit on modalview
const editingDataModel = (taskID) => {
  console.log("in open Data model: currentid: " + taskID);

  document.querySelector("#exampleModalLabel").innerHTML = "Update Task";
  document.querySelector("#btnAddTask").value = "Update";

  $("#openDataModel").trigger("click");
  console.log();

  let currendTask = [];
  currendTask = taskmanager.getValuesPassingID(taskID);

  taskId.value = taskID;
  idTaskName.value = currendTask[0].name;
  idTaskDescription.value = currendTask[0].description;
  idAssignedTo.value = currendTask[0].assignedTo;
  idDate.value = currendTask[0].dueDate;

  $("#idStatus").val(currendTask[0].status);
  idStatusValue = idStatus.options[idStatus.selectedIndex].value;
};
//Function to delete task details onclick of Remove button
function deletingDataModel(taskID) {
  console.log("in open Data model: currentid: " + taskID);

  taskId.value = taskmanager.deletecurrentTask(taskID);
  taskmanager.deletecurrentTask(taskID);

  clearFormValues();
  addTaskItemsToBody();
  console.log(taskmanager.task);
}
//Onclick event modal closes and clearing form
btnClose.addEventListener("click", () => {
  clearFormValues();
});
