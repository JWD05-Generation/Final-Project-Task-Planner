class TaskManager{

    constructor(currentId= 0){
        this.task=[];
        this.id = currentId;
    }
addTask(name, desc,assignedTo,dueDate,status){
let task1 ={
    id :this.id++,
    name: name,
    description: desc,
    assignedTo: assignedTo,
    dueDate: dueDate,
    status: status,
}
this.task.push(task1);
}

}