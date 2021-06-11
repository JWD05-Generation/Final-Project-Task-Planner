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
    this.task.push(taskitem );
  }
}
