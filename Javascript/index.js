const taskmanager = new TaskManager(0);
console.log(taskmanager.task.length);

// this is sample data for task list items
const tasklst = [
  {
    id: 0,
    name: "taskname1",
    description: "task description",
    assignedTo: "dharani1",
    dueDate: "21/05/2021",
    status: "todo",
  },
  {
    id: 2,
    name: "taskname2",
    description: "task description2",
    assignedTo: "dharani2",
    dueDate: "1/07/2021",
    status: "inprogress",
  },
  {
    id: 3,
    name: "taskname3",
    description: "task description3",
    assignedTo: "dharani3",
    dueDate: "27/08/2021",
    status: "todo",
  },
];
// for (let i = 0; i < tasklst.length; i++) {
//   taskmanager.addTask(
//     tasklst[i].name,
//     tasklst[i].description,
//     tasklst[i].assignedTo,
//     tasklst[i].dueDate,
//     tasklst[i].status
//   );
// }

//getting values from the form and adding to taskmanager
const addToTaskLst = () => {
  let tastName = document.getElementById("taskName").value;
  let tastDesc = document.getElementById("taskDescription").value;
  let tastAssign = document.getElementById("idAssignedTo").value;
  let tastDueDate = document.getElementById("idDate").value;
  let tastStatus = document.getElementById("idStatus");
  let tastStatusValue = tastStatus.options[tastStatus.selectedIndex].value;
//   console.log(tastName);
//   console.log(tastDesc);
//   console.log(tastAssign);
//   console.log(tastDueDate);
//   console.log(tastStatusValue);
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
