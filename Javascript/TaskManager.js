//creating a class
class TaskManager {
  //initialise the current value and define task array for maintaining list of tasks
  constructor(currentId = 0) {
    this.task = [];
    this.id = currentId;
  }
  //add method to get task and push to task array
  addTask(name, desc, assignedTo, dueDate, status) {
    let taskitem = {
      id: this.id++,
      name: name,
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
  //update task by passing id , name, desc, assignedTo, dueDate, status
  updatecurrentTask(passingID, name, desc, assignedTo, dueDate, status) {
    this.task[passingID].name = name;
    this.task[passingID].description = desc;
    this.task[passingID].assignedTo = assignedTo;
    this.task[passingID].dueDate = dueDate;
    this.task[passingID].status = status;
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
}
