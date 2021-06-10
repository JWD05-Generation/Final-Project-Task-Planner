//Getting the modal form to validate
let mainform = document.querySelector("#mainform");
const btnclear = document.querySelector("#btnclear");
//const btnsubmit = document.querySelector("#btnsubmit");

const validateTaskName = document.querySelector("#taskName");
const validateTaskDescription = document.querySelector("#taskDescription");
const validateTaskAssignedTo = document.querySelector("#assignedTo");
const validateTaskDueDate = document.querySelector("#date");
const validateTaskStatus = document.querySelector("#status");

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
