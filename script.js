let inputElement = document.querySelector("#task-input"); //access the input
let listElement = document.querySelector("#task-list"); //access the list area
let registerButton = document.querySelector("#register"); //access the regButton
//Checking if the user already has tasks, if so, load them into the array
let tasks = JSON.parse(localStorage.getItem("@tasksList")) || [];

//Save the data in the user browser local storage 
function saveData() {
  localStorage.setItem("@tasksList", JSON.stringify(tasks));
}
//Refresh the screen with task list changes
function renderTask() {
  listElement.innerHTML = "";
  tasks.map((task) => {
    //Creating and rendering a new task
    let taskElement = document.createElement("span");
    taskElement.classList.add("task-text");
    let taskText = document.createTextNode(task);
    taskElement.appendChild(taskText);
    listElement.appendChild(taskElement);

    //saving the actual task position to after to delete
    let position = tasks.indexOf(task);

    //Creating and rendering the delete button (into the span task)
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", `deleteTask(${position})`);
    let deleteText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteText);
    taskElement.appendChild(deleteButton);

    // let breakElement = document.createElement("br");
    // breakElement.appendChild(breakElement);
  })
  saveData();
}

renderTask();

//Creating a new task with the input value
function createTask() {
  if (inputElement.value === '') {
    alert("Enter a name for your task!");
    return false;
  }
  else {
    //pushing a new task in the array
    let newTask = inputElement.value;
    tasks.push(newTask);
    console.log(tasks);
    renderTask();
  }
}
//calling the create task func on register button click 
registerButton.onclick = createTask;

function deleteTask(position) {
  tasks.splice(position, 1);
  renderTask();
}



