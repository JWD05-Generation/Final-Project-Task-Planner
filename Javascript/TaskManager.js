//creating a class
class TaskManager {
  //initialise the current value and define task array for maintaining list of tasks
  constructor(currentId = 0) {
    this.task = [];
    this.id = currentId;
  }
  //add method to get task and push to task array
  addTask(taskname, desc, assignedTo, dueDate, status) {
    let taskitem = {
      id: this.id++,
      name: taskname,
      description: desc,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };
    //adding item to taskarray
    this.task.push(taskitem);
  }
  //get data from arraylist by passing input id
  getValuesPassingID(passingID) {
    let getValuesArr = [];

    for (let j = 0; j < this.task.length; j++) {
      if (this.task[j].id === passingID) {
        let getValuescurrent = {
          id: this.task[j].id,
          name: this.task[j].name,
          description: this.task[j].description,
          assignedTo: this.task[j].assignedTo,
          dueDate: this.task[j].dueDate,
          status: this.task[j].status,
        };
        getValuesArr.push(getValuescurrent);
        return getValuesArr;
      }
    }
  }
  //update task by passing id , taskname, desc, assignedTo, dueDate, status
  updatecurrentTask(passingID, taskname, desc, assignedTo, dueDate, status) {
      // console.log(this.task);
    for (let j = 0; j < this.task.length; j++) {
      console.log("insode j loop");
      if (this.task[j].id == passingID) {
        console.log("j value:" + j);
        // this.task[j].id,
        this.task[j].name = taskname;
        this.task[j].description = desc;
        this.task[j].assignedTo = assignedTo;
        this.task[j].dueDate = dueDate;
        this.task[j].status = status;
      } else {
        console.log("else false:" + this.task[j].id);
      }
    }    
  }
  //delete task by passing id
  deletecurrentTask(passingID) {
    //looping over the tasks
    for (let i = 0; i < this.task.length; i++) {
      const currentTask = this.task[i];
      if (currentTask.id === passingID) {
        this.task.splice(i, 1);
      }
    }
  }

  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.task);

    // Store the JSON string in localStorage
    localStorage.setItem("task", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.id);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("task")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("task");

      // Convert it to an array and store it in our TaskManager
      this.task = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.id = Number(currentId);
    }
  }
  
}
